import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Send, Users, Filter, Search, Edit2, Save, X, Loader2,
  Settings, FileText, Phone, Clock, CheckCircle, AlertCircle, ToggleLeft, ToggleRight
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';
const getToken = () => localStorage.getItem('adminToken');

const TABS = [
  { key: 'conversations', label: 'Conversations', icon: MessageSquare },
  { key: 'mass', label: 'Mass Text', icon: Users },
  { key: 'templates', label: 'Templates', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminSMS() {
  const [activeTab, setActiveTab] = useState('conversations');
  const [loading, setLoading] = useState(true);

  // Conversations state
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [convoSearch, setConvoSearch] = useState('');
  const messagesEndRef = useRef(null);

  // Mass text state
  const [massMessage, setMassMessage] = useState('');
  const [massFilters, setMassFilters] = useState({ tags: '', min_bookings: '', min_spent: '' });
  const [customerCount, setCustomerCount] = useState(0);
  const [massSending, setMassSending] = useState(false);
  const [showMassConfirm, setShowMassConfirm] = useState(false);
  const [massResult, setMassResult] = useState(null);

  // Templates state
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateSaving, setTemplateSaving] = useState(false);

  // Settings state
  const [smsSettings, setSmsSettings] = useState({
    sms_enabled: false, reminder_enabled: true, reminder_hours_before: 24,
    review_request_enabled: true, review_delay_hours: 2, review_url: '', twilio_phone_number: '',
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sms/conversations`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch message thread
  const fetchMessages = async (phone) => {
    try {
      const res = await fetch(`${API_URL}/api/sms/logs?phone=${encodeURIComponent(phone)}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.reverse());
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Select conversation
  const selectConversation = async (convo) => {
    setSelectedConvo(convo);
    await fetchMessages(convo.phone);
    // Mark as read
    if (convo.unread_count > 0) {
      await fetch(`${API_URL}/api/sms/logs/mark-read?phone=${encodeURIComponent(convo.phone)}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchConversations();
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConvo) return;
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          to_phone: selectedConvo.phone,
          message: newMessage,
          customer_id: selectedConvo.customer_id,
        }),
      });
      if (res.ok) {
        setNewMessage('');
        await fetchMessages(selectedConvo.phone);
        fetchConversations();
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  // Mass text
  const fetchCustomerCount = async () => {
    const params = new URLSearchParams();
    if (massFilters.tags) params.set('tags', massFilters.tags);
    if (massFilters.min_bookings) params.set('min_bookings', massFilters.min_bookings);
    if (massFilters.min_spent) params.set('min_spent', massFilters.min_spent);
    try {
      const res = await fetch(`${API_URL}/api/sms/customer-count?${params}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCustomerCount(data.count);
      }
    } catch (err) {
      console.error('Failed to fetch customer count:', err);
    }
  };

  const handleMassSend = async () => {
    setMassSending(true);
    setMassResult(null);
    try {
      const body = { message: massMessage };
      if (massFilters.tags) body.filter_tags = massFilters.tags.split(',').map(t => t.trim());
      if (massFilters.min_bookings) body.filter_min_bookings = parseInt(massFilters.min_bookings);
      if (massFilters.min_spent) body.filter_min_spent = parseFloat(massFilters.min_spent);
      const res = await fetch(`${API_URL}/api/sms/mass-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        setMassResult(data.message);
        setMassMessage('');
        setShowMassConfirm(false);
      }
    } catch (err) {
      console.error('Failed to send mass text:', err);
    } finally {
      setMassSending(false);
    }
  };

  // Templates
  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sms/templates`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    }
  };

  const saveTemplate = async () => {
    if (!editingTemplate) return;
    setTemplateSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/sms/templates/${editingTemplate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          name: editingTemplate.name,
          body: editingTemplate.body,
          is_active: editingTemplate.is_active,
        }),
      });
      if (res.ok) {
        setEditingTemplate(null);
        fetchTemplates();
      }
    } catch (err) {
      console.error('Failed to save template:', err);
    } finally {
      setTemplateSaving(false);
    }
  };

  // Settings
  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings/sms`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSmsSettings(data);
      }
    } catch (err) {
      console.error('Failed to fetch SMS settings:', err);
    }
  };

  const saveSettings = async () => {
    setSettingsSaving(true);
    setSettingsSuccess('');
    try {
      const res = await fetch(`${API_URL}/api/settings/sms`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          sms_enabled: smsSettings.sms_enabled,
          reminder_enabled: smsSettings.reminder_enabled,
          reminder_hours_before: parseInt(smsSettings.reminder_hours_before) || 24,
          review_request_enabled: smsSettings.review_request_enabled,
          review_delay_hours: parseInt(smsSettings.review_delay_hours) || 2,
          review_url: smsSettings.review_url,
        }),
      });
      if (res.ok) {
        setSettingsSuccess('Settings saved successfully');
        setTimeout(() => setSettingsSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSettingsSaving(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    fetchTemplates();
    fetchSettings();
  }, []);

  useEffect(() => {
    if (activeTab === 'mass') fetchCustomerCount();
  }, [activeTab, massFilters]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll conversations every 15s
  useEffect(() => {
    const interval = setInterval(fetchConversations, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredConversations = conversations.filter(c => {
    if (!convoSearch) return true;
    const q = convoSearch.toLowerCase();
    return (c.customer_name || '').toLowerCase().includes(q) || (c.phone || '').includes(q);
  });

  const formatTime = (ts) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      const now = new Date();
      const diff = now - d;
      if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' });
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch { return ''; }
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>SMS / Texting</h1>
          <p style={styles.subtitle}>Manage conversations, mass texts, and templates</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{ ...styles.tab, ...(activeTab === tab.key ? styles.tabActive : {}) }}
            >
              <Icon size={16} />
              {!isMobile && <span>{tab.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'conversations' && (
        <div style={styles.conversationLayout}>
          {/* Conversation List */}
          <div style={{ ...styles.convoList, ...(selectedConvo && isMobile ? { display: 'none' } : {}) }}>
            <div style={styles.convoSearchWrap}>
              <Search size={16} style={{ color: '#525252' }} />
              <input
                placeholder="Search conversations..."
                value={convoSearch}
                onChange={(e) => setConvoSearch(e.target.value)}
                style={styles.convoSearchInput}
              />
            </div>
            {loading ? (
              <div style={styles.emptyState}><Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /></div>
            ) : filteredConversations.length === 0 ? (
              <div style={styles.emptyState}>
                <MessageSquare size={32} style={{ color: '#525252' }} />
                <span style={{ color: '#525252', fontSize: '14px' }}>No conversations yet</span>
              </div>
            ) : (
              filteredConversations.map((convo) => (
                <button
                  key={convo.phone}
                  onClick={() => selectConversation(convo)}
                  style={{
                    ...styles.convoItem,
                    ...(selectedConvo?.phone === convo.phone ? styles.convoItemActive : {}),
                  }}
                >
                  <div style={styles.convoAvatar}>
                    {(convo.customer_name || '?')[0].toUpperCase()}
                  </div>
                  <div style={styles.convoInfo}>
                    <div style={styles.convoNameRow}>
                      <span style={styles.convoName}>{convo.customer_name || convo.phone}</span>
                      <span style={styles.convoTime}>{formatTime(convo.last_timestamp)}</span>
                    </div>
                    <div style={styles.convoPreviewRow}>
                      <span style={styles.convoPreview}>
                        {convo.last_direction === 'outbound' ? 'You: ' : ''}
                        {(convo.last_message || '').substring(0, 50)}
                        {(convo.last_message || '').length > 50 ? '...' : ''}
                      </span>
                      {convo.unread_count > 0 && (
                        <span style={styles.convoUnread}>{convo.unread_count}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Message Thread */}
          <div style={{ ...styles.messagePanel, ...((!selectedConvo && isMobile) ? { display: 'none' } : {}) }}>
            {selectedConvo ? (
              <>
                <div style={styles.messagePanelHeader}>
                  {isMobile && (
                    <button onClick={() => setSelectedConvo(null)} style={styles.backBtn}>
                      <X size={18} />
                    </button>
                  )}
                  <div style={styles.convoAvatar}>
                    {(selectedConvo.customer_name || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={styles.headerName}>{selectedConvo.customer_name || 'Unknown'}</div>
                    <div style={styles.headerPhone}>{selectedConvo.phone}</div>
                  </div>
                </div>
                <div style={styles.messageThread}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        ...styles.messageBubbleWrap,
                        justifyContent: msg.direction === 'outbound' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div style={{
                        ...styles.messageBubble,
                        ...(msg.direction === 'outbound' ? styles.outboundBubble : styles.inboundBubble),
                      }}>
                        <div style={styles.messageText}>{msg.message_body}</div>
                        <div style={styles.messageTime}>
                          {formatTime(msg.created_at)}
                          {msg.direction === 'outbound' && msg.status === 'failed' && (
                            <AlertCircle size={12} style={{ color: '#ef4444', marginLeft: '4px' }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div style={styles.messageInputWrap}>
                  <input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    style={styles.messageInput}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={sending || !newMessage.trim()}
                    style={{ ...styles.sendBtn, opacity: sending || !newMessage.trim() ? 0.5 : 1 }}
                  >
                    {sending ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.emptyState}>
                <MessageSquare size={48} style={{ color: '#262626' }} />
                <span style={{ color: '#525252', fontSize: '15px' }}>Select a conversation</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mass' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Mass Text Message</h2>
          <p style={styles.sectionDesc}>Send a text message to multiple customers at once.</p>

          <div style={styles.massGrid}>
            <div style={styles.massLeft}>
              <label style={styles.formLabel}>Message</label>
              <textarea
                value={massMessage}
                onChange={(e) => setMassMessage(e.target.value)}
                placeholder="Type your message here..."
                style={styles.massTextarea}
                rows={6}
              />
              <div style={styles.charCount}>{massMessage.length} characters</div>
            </div>
            <div style={styles.massRight}>
              <h3 style={styles.filterTitle}><Filter size={16} /> Filters (optional)</h3>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Tags (comma separated)</label>
                <input
                  value={massFilters.tags}
                  onChange={(e) => setMassFilters({ ...massFilters, tags: e.target.value })}
                  placeholder="e.g. vip, returning"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Min Bookings</label>
                <input
                  type="number"
                  value={massFilters.min_bookings}
                  onChange={(e) => setMassFilters({ ...massFilters, min_bookings: e.target.value })}
                  placeholder="e.g. 2"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Min Total Spent ($)</label>
                <input
                  type="number"
                  value={massFilters.min_spent}
                  onChange={(e) => setMassFilters({ ...massFilters, min_spent: e.target.value })}
                  placeholder="e.g. 500"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.recipientCount}>
                <Users size={16} />
                <span>{customerCount} recipient{customerCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {massResult && (
            <div style={styles.successBanner}>
              <CheckCircle size={16} /> {massResult}
            </div>
          )}

          <button
            onClick={() => setShowMassConfirm(true)}
            disabled={!massMessage.trim() || customerCount === 0}
            style={{ ...styles.primaryBtn, opacity: !massMessage.trim() || customerCount === 0 ? 0.5 : 1 }}
          >
            <Send size={16} /> Send to {customerCount} Customer{customerCount !== 1 ? 's' : ''}
          </button>

          {/* Confirm modal */}
          {showMassConfirm && (
            <div style={styles.modalOverlay} onClick={() => setShowMassConfirm(false)}>
              <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.confirmTitle}>Confirm Mass Text</h3>
                <p style={styles.confirmText}>
                  You are about to send a text message to <strong>{customerCount}</strong> customer{customerCount !== 1 ? 's' : ''}.
                  This action cannot be undone.
                </p>
                <div style={styles.confirmPreview}>"{massMessage}"</div>
                <div style={styles.confirmActions}>
                  <button onClick={() => setShowMassConfirm(false)} style={styles.cancelBtn}>Cancel</button>
                  <button onClick={handleMassSend} disabled={massSending} style={styles.dangerBtn}>
                    {massSending ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
                    {massSending ? 'Sending...' : 'Send Now'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'templates' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Message Templates</h2>
          <p style={styles.sectionDesc}>Customize automated SMS messages sent during the booking lifecycle.</p>

          <div style={styles.variableRef}>
            <span style={styles.variableRefTitle}>Available Variables:</span>
            {['{SHOP_NAME}', '{SHOP_NUMBER}', '{BOOKING_DATE_TIME}', '{VEHICLE_INFO}', '{CUSTOMER_NAME}', '{REVIEW_URL}', '{ETA}', '{SERVICE_NAME}'].map(v => (
              <span key={v} style={styles.variableTag}>{v}</span>
            ))}
          </div>

          <div style={styles.templateList}>
            {templates.map((t) => (
              <div key={t.id} style={styles.templateCard}>
                <div style={styles.templateHeader}>
                  <div>
                    <h3 style={styles.templateName}>{t.name}</h3>
                    <span style={styles.templateKey}>{t.template_key}</span>
                  </div>
                  <div style={styles.templateActions}>
                    <span style={{
                      ...styles.activeBadge,
                      background: t.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                      color: t.is_active ? '#10b981' : '#6b7280',
                    }}>
                      {t.is_active ? 'Active' : 'Disabled'}
                    </span>
                    <button onClick={() => setEditingTemplate({ ...t })} style={styles.editBtn}>
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                </div>
                <p style={styles.templateBody}>{t.body}</p>
              </div>
            ))}
          </div>

          {/* Edit Template Modal */}
          {editingTemplate && (
            <div style={styles.modalOverlay} onClick={() => setEditingTemplate(null)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>Edit Template</h2>
                  <button onClick={() => setEditingTemplate(null)} style={styles.closeBtn}><X size={20} /></button>
                </div>
                <div style={styles.modalBody}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Template Name</label>
                    <input
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Message Body</label>
                    <textarea
                      value={editingTemplate.body}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                      style={styles.massTextarea}
                      rows={5}
                    />
                  </div>
                  <div style={styles.toggleRow}>
                    <span style={styles.formLabel}>Active</span>
                    <button
                      onClick={() => setEditingTemplate({ ...editingTemplate, is_active: !editingTemplate.is_active })}
                      style={styles.toggleBtn}
                    >
                      {editingTemplate.is_active
                        ? <ToggleRight size={28} color="#10b981" />
                        : <ToggleLeft size={28} color="#525252" />}
                    </button>
                  </div>
                  <div style={styles.variableRef}>
                    <span style={styles.variableRefTitle}>Variables:</span>
                    {['{SHOP_NAME}', '{SHOP_NUMBER}', '{BOOKING_DATE_TIME}', '{VEHICLE_INFO}', '{CUSTOMER_NAME}', '{REVIEW_URL}', '{ETA}'].map(v => (
                      <span key={v} style={styles.variableTag}>{v}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.modalFooter}>
                  <button onClick={() => setEditingTemplate(null)} style={styles.cancelBtn}>Cancel</button>
                  <button onClick={saveTemplate} disabled={templateSaving} style={styles.saveBtn}>
                    {templateSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>SMS Settings</h2>
          <p style={styles.sectionDesc}>Configure Twilio integration and automation settings.</p>

          <div style={styles.settingsGrid}>
            {/* SMS Enabled */}
            <div style={styles.settingsCard}>
              <div style={styles.settingsCardHeader}>
                <h3 style={styles.settingsCardTitle}>SMS Enabled</h3>
                <button
                  onClick={() => setSmsSettings({ ...smsSettings, sms_enabled: !smsSettings.sms_enabled })}
                  style={styles.toggleBtn}
                >
                  {smsSettings.sms_enabled
                    ? <ToggleRight size={32} color="#10b981" />
                    : <ToggleLeft size={32} color="#525252" />}
                </button>
              </div>
              <p style={styles.settingsCardDesc}>Turn SMS on or off globally.</p>
            </div>

            {/* Twilio Number */}
            <div style={styles.settingsCard}>
              <h3 style={styles.settingsCardTitle}>Twilio Phone Number</h3>
              <p style={styles.settingsCardDesc}>Configured via environment variable.</p>
              <div style={styles.readOnlyField}>
                <Phone size={14} />
                {smsSettings.twilio_phone_number || 'Not configured'}
              </div>
            </div>

            {/* Reminder Settings */}
            <div style={styles.settingsCard}>
              <div style={styles.settingsCardHeader}>
                <h3 style={styles.settingsCardTitle}>Appointment Reminders</h3>
                <button
                  onClick={() => setSmsSettings({ ...smsSettings, reminder_enabled: !smsSettings.reminder_enabled })}
                  style={styles.toggleBtn}
                >
                  {smsSettings.reminder_enabled
                    ? <ToggleRight size={28} color="#10b981" />
                    : <ToggleLeft size={28} color="#525252" />}
                </button>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Hours Before Appointment</label>
                <input
                  type="number"
                  value={smsSettings.reminder_hours_before}
                  onChange={(e) => setSmsSettings({ ...smsSettings, reminder_hours_before: e.target.value })}
                  style={styles.formInput}
                  min={1}
                />
              </div>
            </div>

            {/* Review Request Settings */}
            <div style={styles.settingsCard}>
              <div style={styles.settingsCardHeader}>
                <h3 style={styles.settingsCardTitle}>Review Requests</h3>
                <button
                  onClick={() => setSmsSettings({ ...smsSettings, review_request_enabled: !smsSettings.review_request_enabled })}
                  style={styles.toggleBtn}
                >
                  {smsSettings.review_request_enabled
                    ? <ToggleRight size={28} color="#10b981" />
                    : <ToggleLeft size={28} color="#525252" />}
                </button>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Delay After Completion (hours)</label>
                <input
                  type="number"
                  value={smsSettings.review_delay_hours}
                  onChange={(e) => setSmsSettings({ ...smsSettings, review_delay_hours: e.target.value })}
                  style={styles.formInput}
                  min={0}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Review URL</label>
                <input
                  value={smsSettings.review_url}
                  onChange={(e) => setSmsSettings({ ...smsSettings, review_url: e.target.value })}
                  placeholder="https://g.page/your-business/review"
                  style={styles.formInput}
                />
              </div>
            </div>
          </div>

          {settingsSuccess && (
            <div style={styles.successBanner}>
              <CheckCircle size={16} /> {settingsSuccess}
            </div>
          )}

          <button onClick={saveSettings} disabled={settingsSaving} style={styles.primaryBtn}>
            {settingsSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '24px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: 0,
  },
  subtitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#525252',
    margin: '4px 0 0',
  },
  tabBar: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px',
    borderBottom: '1px solid #262626',
    paddingBottom: '0',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#525252',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#fff',
    borderBottomColor: '#e80200',
  },
  // Conversations
  conversationLayout: {
    display: 'flex',
    gap: '0',
    height: 'calc(100vh - 250px)',
    minHeight: '500px',
    border: '1px solid #262626',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  convoList: {
    width: '350px',
    minWidth: '300px',
    borderRight: '1px solid #262626',
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0a0a',
    overflowY: 'auto',
  },
  convoSearchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderBottom: '1px solid #262626',
  },
  convoSearchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },
  convoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #1a1a1a',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.15s',
  },
  convoItemActive: {
    background: '#1a1a1a',
  },
  convoAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(232, 2, 0, 0.15)',
    color: '#e80200',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    flexShrink: 0,
  },
  convoInfo: {
    flex: 1,
    minWidth: 0,
  },
  convoNameRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  convoName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  convoTime: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#525252',
    flexShrink: 0,
  },
  convoPreviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convoPreview: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  },
  convoUnread: {
    background: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: '8px',
  },
  messagePanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#111111',
  },
  messagePanelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderBottom: '1px solid #262626',
    background: '#0a0a0a',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '4px',
  },
  headerName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
  },
  headerPhone: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#525252',
  },
  messageThread: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  messageBubbleWrap: {
    display: 'flex',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 14px',
    borderRadius: '16px',
  },
  outboundBubble: {
    background: '#e80200',
    borderBottomRightRadius: '4px',
  },
  inboundBubble: {
    background: '#262626',
    borderBottomLeftRadius: '4px',
  },
  messageText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#fff',
    lineHeight: 1.5,
    wordBreak: 'break-word',
  },
  messageTime: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  messageInputWrap: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px',
    borderTop: '1px solid #262626',
    background: '#0a0a0a',
  },
  messageInput: {
    flex: 1,
    padding: '12px 16px',
    background: '#1a1a1a',
    border: '1px solid #262626',
    borderRadius: '24px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    outline: 'none',
  },
  sendBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    flex: 1,
    padding: '40px',
    color: '#525252',
  },
  // Section
  section: {
    padding: '0',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 4px',
  },
  sectionDesc: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#525252',
    margin: '0 0 24px',
  },
  // Mass Text
  massGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '24px',
    marginBottom: '24px',
  },
  massLeft: {},
  massRight: {
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '8px',
    padding: '20px',
  },
  massTextarea: {
    width: '100%',
    padding: '14px 16px',
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    lineHeight: 1.6,
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  charCount: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#525252',
    marginTop: '6px',
    textAlign: 'right',
  },
  filterTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#ababab',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
  },
  recipientCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(232, 2, 0, 0.1)',
    border: '1px solid rgba(232, 2, 0, 0.2)',
    borderRadius: '8px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    color: '#e80200',
    marginTop: '16px',
  },
  // Form
  formGroup: {
    marginBottom: '16px',
  },
  formLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#ababab',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px',
  },
  formInput: {
    width: '100%',
    padding: '10px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    borderRadius: '6px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  // Buttons
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: '#e80200',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cancelBtn: {
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid #262626',
    borderRadius: '6px',
    color: '#ababab',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#e80200',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  dangerBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#e80200',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  editBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: 'transparent',
    border: '1px solid #262626',
    borderRadius: '6px',
    color: '#ababab',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  // Templates
  variableRef: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  variableRefTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#525252',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  variableTag: {
    padding: '4px 10px',
    background: 'rgba(232, 2, 0, 0.1)',
    border: '1px solid rgba(232, 2, 0, 0.2)',
    borderRadius: '4px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#e80200',
  },
  templateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  templateCard: {
    padding: '20px',
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '8px',
  },
  templateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  templateName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
  },
  templateKey: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#525252',
  },
  templateActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  activeBadge: {
    padding: '4px 10px',
    borderRadius: '4px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  templateBody: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
    lineHeight: 1.7,
    margin: 0,
  },
  // Settings
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  settingsCard: {
    padding: '24px',
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '8px',
  },
  settingsCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  settingsCardTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
  },
  settingsCardDesc: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#525252',
    margin: '0 0 12px',
  },
  readOnlyField: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    borderRadius: '6px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
  },
  toggleBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '6px',
    color: '#10b981',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    marginBottom: '16px',
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #262626',
  },
  modalTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#525252',
    cursor: 'pointer',
    padding: '4px',
  },
  modalBody: {
    padding: '24px',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid #262626',
  },
  confirmModal: {
    background: '#111111',
    border: '1px solid #262626',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '480px',
    width: '100%',
  },
  confirmTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 12px',
  },
  confirmText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
    lineHeight: 1.7,
    margin: '0 0 16px',
  },
  confirmPreview: {
    padding: '12px 16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    borderRadius: '8px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  confirmActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
};
