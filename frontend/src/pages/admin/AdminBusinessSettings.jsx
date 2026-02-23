import React, { useState, useEffect, useRef } from 'react';
import { Save, Loader2, Building2, Phone, Mail, MapPin, DollarSign, Clock, Car, Image, Trash2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function AdminBusinessSettings() {
  const [settings, setSettings] = useState({
    shop_name: '',
    shop_address: '',
    shop_phone: '',
    shop_email: '',
    mobile_service_upcharge: 50,
    mobile_service_description: 'We come to you',
    minimum_booking_notice_days: 1,
    enable_shop_bookings: true,
    enable_mobile_bookings: true,
    booking_buffer_minutes: 60,
    enable_custom_vehicles: false
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoHover, setLogoHover] = useState(false);
  const logoInputRef = useRef(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchSettings();
    checkLogo();
  }, []);

  const checkLogo = async () => {
    try {
      const resp = await fetch(`${API_URL}/api/admin/logo`, { method: 'HEAD' });
      if (resp.ok) setLogoUrl(`${API_URL}/api/admin/logo?t=${Date.now()}`);
      else setLogoUrl(null);
    } catch (err) { setLogoUrl(null); }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const resp = await fetch(`${API_URL}/api/admin/logo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (resp.ok) {
        setLogoUrl(`${API_URL}/api/admin/logo?t=${Date.now()}`);
      } else {
        const data = await resp.json();
        setMessage({ type: 'error', text: data.detail || 'Failed to upload logo' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to upload logo' });
    }
    e.target.value = '';
  };

  const handleLogoDelete = async () => {
    if (!window.confirm('Remove the shop logo?')) return;
    try {
      await fetch(`${API_URL}/api/admin/logo`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogoUrl(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to remove logo' });
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/settings/business`);
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/settings/business`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Business Settings</h1>
        <p style={styles.subtitle}>Configure your shop information and booking preferences</p>
      </div>

      {message.text && (
        <div style={{
          ...styles.message,
          background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(232, 2, 0, 0.3)',
          color: message.type === 'success' ? '#22c55e' : '#e80200'
        }}>
          {message.text}
        </div>
      )}

      <div style={styles.grid}>
        {/* Logo Upload */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Image size={20} />
            Shop Logo
          </h2>
          <p style={styles.helpText}>Upload a logo to display in the admin sidebar. If no logo is uploaded, your shop name text will be shown instead.</p>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={handleLogoUpload}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '16px' }}>
            <div
              style={{
                width: '160px',
                height: '72px',
                border: logoHover ? '2px solid #e80200' : '2px dashed #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#0a0a0a',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'border-color 0.2s',
              }}
              onClick={() => logoInputRef.current?.click()}
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <Image size={20} color={logoHover ? '#e80200' : '#525252'} />
                  <span style={{ fontSize: '11px', color: logoHover ? '#e80200' : '#525252', fontFamily: "'Montserrat', sans-serif" }}>Upload Logo</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => logoInputRef.current?.click()} style={styles.uploadBtn}>
                {logoUrl ? 'Change Logo' : 'Upload Logo'}
              </button>
              {logoUrl && (
                <button onClick={handleLogoDelete} style={styles.removeBtn}>
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shop Information */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Building2 size={20} />
            Shop Information
          </h2>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Shop Name</label>
            <input
              type="text"
              value={settings.shop_name}
              onChange={(e) => setSettings({ ...settings, shop_name: e.target.value })}
              style={styles.input}
              placeholder="e.g., Supreme Detail Studio"
              data-testid="shop-name-input"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <MapPin size={14} /> Shop Address
            </label>
            <input
              type="text"
              value={settings.shop_address}
              onChange={(e) => setSettings({ ...settings, shop_address: e.target.value })}
              style={styles.input}
              placeholder="e.g., 123 Main St, Marietta, GA 30060"
              data-testid="shop-address-input"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Phone size={14} /> Shop Phone
            </label>
            <input
              type="tel"
              value={settings.shop_phone}
              onChange={(e) => setSettings({ ...settings, shop_phone: e.target.value })}
              style={styles.input}
              placeholder="e.g., (502) 417-0690"
              data-testid="shop-phone-input"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={14} /> Shop Email
            </label>
            <input
              type="email"
              value={settings.shop_email}
              onChange={(e) => setSettings({ ...settings, shop_email: e.target.value })}
              style={styles.input}
              placeholder="e.g., info@supremedetailstudio.com"
              data-testid="shop-email-input"
            />
          </div>
        </div>

        {/* Mobile Service */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <DollarSign size={20} />
            Mobile Service
          </h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Service Upcharge ($)</label>
            <input
              type="number"
              value={settings.mobile_service_upcharge}
              onChange={(e) => setSettings({ ...settings, mobile_service_upcharge: parseFloat(e.target.value) || 0 })}
              style={styles.input}
              min="0"
              data-testid="mobile-upcharge-input"
            />
            <span style={styles.helpText}>Additional charge for mobile service visits</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Service Description</label>
            <input
              type="text"
              value={settings.mobile_service_description}
              onChange={(e) => setSettings({ ...settings, mobile_service_description: e.target.value })}
              style={styles.input}
              placeholder="e.g., We come to you"
              data-testid="mobile-description-input"
            />
          </div>
        </div>

        {/* Booking Preferences */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Clock size={20} />
            Booking Preferences
          </h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Minimum Booking Notice (days)</label>
            <input
              type="number"
              value={settings.minimum_booking_notice_days}
              onChange={(e) => setSettings({ ...settings, minimum_booking_notice_days: parseInt(e.target.value) || 0 })}
              style={styles.input}
              min="0"
              max="30"
              data-testid="minimum-notice-input"
            />
            <span style={styles.helpText}>Customers must book at least this many days in advance (0 = same-day booking allowed)</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Buffer Time Between Bookings (minutes)</label>
            <input
              type="number"
              value={settings.booking_buffer_minutes}
              onChange={(e) => setSettings({ ...settings, booking_buffer_minutes: parseInt(e.target.value) || 60 })}
              style={styles.input}
              min="0"
              max="180"
              step="15"
              data-testid="buffer-time-input"
            />
            <span style={styles.helpText}>Time reserved after each appointment for cleanup/prep</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Booking Options</label>
            <div style={styles.toggleGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={settings.enable_shop_bookings}
                  onChange={(e) => setSettings({ ...settings, enable_shop_bookings: e.target.checked })}
                  style={styles.checkbox}
                  data-testid="enable-shop-bookings"
                />
                <span>Enable In-Shop Bookings</span>
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={settings.enable_mobile_bookings}
                  onChange={(e) => setSettings({ ...settings, enable_mobile_bookings: e.target.checked })}
                  style={styles.checkbox}
                  data-testid="enable-mobile-bookings"
                />
                <span>Enable Mobile Service Bookings</span>
              </label>
            </div>
          </div>
        </div>

        {/* Vehicle Selection */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Car size={20} />
            Vehicle Selection
          </h2>

          <div style={styles.inputGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.enable_custom_vehicles}
                onChange={(e) => setSettings({ ...settings, enable_custom_vehicles: e.target.checked })}
                style={styles.checkbox}
                data-testid="enable-custom-vehicles"
              />
              <span>Enable Custom Vehicle List</span>
            </label>
            <span style={styles.helpText}>
              When enabled, customers will select from your custom vehicle list. 
              When disabled, customers can manually enter their vehicle information.
            </span>
          </div>

          {!settings.enable_custom_vehicles && (
            <div style={styles.infoBox}>
              <p>Currently using manual vehicle entry. Customers will type their vehicle year, make, and model.</p>
            </div>
          )}

          {settings.enable_custom_vehicles && (
            <div style={styles.infoBox}>
              <p>Using custom vehicle list. Manage your vehicles in the <strong>Vehicles</strong> section.</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div style={styles.footer}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={styles.saveBtn}
          data-testid="save-settings-btn"
        >
          {saving ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '14px',
    color: '#ababab',
    margin: 0,
    fontFamily: "'Montserrat', sans-serif",
  },
  message: {
    padding: '12px 16px',
    border: '1px solid',
    marginBottom: '24px',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
  },
  card: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '24px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#e80200',
    margin: '0 0 24px 0',
    paddingBottom: '16px',
    borderBottom: '1px solid #262626',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#ababab',
    marginBottom: '8px',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  helpText: {
    fontSize: '12px',
    color: '#525252',
    marginTop: '6px',
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
  },
  toggleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#e80200',
    cursor: 'pointer',
  },
  infoBox: {
    padding: '12px 16px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    marginTop: '12px',
    fontSize: '13px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '12px',
    background: 'transparent',
    border: '1px solid #333',
    color: '#ababab',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  footer: {
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    transition: 'all 0.2s ease',
  },
};
