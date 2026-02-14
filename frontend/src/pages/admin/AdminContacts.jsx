import React, { useState, useEffect } from 'react';
import { Search, Mail, MailOpen, Eye, Trash2, Loader2, X, Phone, User, Calendar } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/contact-messages`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId, read) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/contact-messages/${messageId}/read?read=${read}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Error marking message:', err);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/contact-messages/${messageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === messageId) {
          setShowModal(false);
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const viewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    if (!message.read) {
      markAsRead(message._id, true);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.phone.includes(searchTerm) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterRead === 'all' ||
      (filterRead === 'read' && msg.read) ||
      (filterRead === 'unread' && !msg.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>CONTACT MESSAGES</h1>
          <p style={styles.subtitle}>
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={styles.filtersRow}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div style={styles.emptyState}>
          <Mail size={48} style={{ color: '#525252' }} />
          <h3 style={styles.emptyTitle}>No Messages Found</h3>
          <p style={styles.emptyText}>There are no contact messages to display</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>NAME</th>
                <th style={styles.th}>CONTACT</th>
                <th style={styles.th}>MESSAGE</th>
                <th style={styles.th}>DATE</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message._id} style={styles.tableRow}>
                  <td style={styles.td}>
                    {message.read ? (
                      <MailOpen size={18} style={{ color: '#525252' }} />
                    ) : (
                      <Mail size={18} style={{ color: '#e80200' }} />
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.customerName}>{message.name}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.contactCell}>
                      <span>{message.email}</span>
                      <span style={styles.phone}>{message.phone}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.messagePreview}>
                      {message.message.substring(0, 80)}
                      {message.message.length > 80 && '...'}
                    </div>
                  </td>
                  <td style={styles.td}>
                    {new Date(message.created_at).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionsCell}>
                      <button
                        onClick={() => viewMessage(message)}
                        style={styles.viewBtn}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        style={styles.deleteBtn}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Contact Message</h2>
              <button onClick={() => setShowModal(false)} style={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <User size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Name</div>
                    <div style={styles.infoValue}>{selectedMessage.name}</div>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Mail size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Email</div>
                    <a href={`mailto:${selectedMessage.email}`} style={styles.infoLink}>
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Phone size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Phone</div>
                    <a href={`tel:${selectedMessage.phone}`} style={styles.infoLink}>
                      {selectedMessage.phone}
                    </a>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <Calendar size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Received</div>
                    <div style={styles.infoValue}>
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.messageSection}>
                <div style={styles.messageLabel}>MESSAGE</div>
                <div style={styles.messageText}>{selectedMessage.message}</div>
              </div>

              <div style={styles.modalActions}>
                <button
                  onClick={() => {
                    markAsRead(selectedMessage._id, !selectedMessage.read);
                    setSelectedMessage({ ...selectedMessage, read: !selectedMessage.read });
                  }}
                  style={styles.actionBtn}
                >
                  {selectedMessage.read ? <Mail size={16} /> : <MailOpen size={16} />}
                  Mark as {selectedMessage.read ? 'Unread' : 'Read'}
                </button>
                <button onClick={() => deleteMessage(selectedMessage._id)} style={styles.deleteActionBtn}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '2px',
  },
  subtitle: {
    color: '#ababab',
    fontSize: '15px',
    margin: 0,
    fontFamily: "'Montserrat', sans-serif",
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#ababab',
    gap: '16px',
  },
  filtersRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '250px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#525252',
  },
  searchInput: {
    width: '100%',
    padding: '12px 14px 12px 44px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  filterSelect: {
    padding: '12px 0',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#111111',
    border: '1px solid #262626',
  },
  tableHeader: {
    background: '#0a0a0a',
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#ababab',
    letterSpacing: '1px',
    borderBottom: '1px solid #262626',
  },
  tableRow: {
    borderBottom: '1px solid #262626',
    transition: 'background 0.2s',
  },
  td: {
    padding: '14px 16px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    verticalAlign: 'middle',
  },
  customerName: {
    fontWeight: 600,
    color: '#fff',
  },
  contactCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  phone: {
    fontSize: '12px',
    color: '#ababab',
  },
  messagePreview: {
    color: '#ababab',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  actionsCell: {
    display: 'flex',
    gap: '8px',
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ef4444',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    background: '#111111',
    border: '1px solid #262626',
  },
  emptyTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    margin: '16px 0 8px 0',
    letterSpacing: '1px',
  },
  emptyText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
    margin: 0,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#0a0a0a',
    border: '1px solid #262626',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #262626',
  },
  modalTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '1px',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ababab',
    cursor: 'pointer',
    padding: '4px',
  },
  modalBody: {
    padding: '24px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #262626',
  },
  infoItem: {
    display: 'flex',
    gap: '12px',
  },
  infoIcon: {
    color: '#e80200',
    flexShrink: 0,
    marginTop: '2px',
  },
  infoLabel: {
    fontSize: '11px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '15px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
  },
  infoLink: {
    fontSize: '15px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  messageSection: {
    marginBottom: '24px',
  },
  messageLabel: {
    fontSize: '11px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  messageText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    background: '#111111',
    padding: '16px',
    border: '1px solid #262626',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  deleteActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
