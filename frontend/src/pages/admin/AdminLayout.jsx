import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Calendar, ClipboardList,
  LogOut, Menu, X, ChevronRight, Users, Mail, Lock, Save, Loader2, AlertCircle, CheckCircle
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [shopName, setShopName] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    // Verify auth on mount
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Invalid token');
        }
      } catch {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    verifyToken();
  }, [navigate]);

  // Fetch unread message count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/api/admin/contact-messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const unread = data.messages.filter(msg => !msg.read).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch shop name from business settings
  useEffect(() => {
    const fetchShopName = async () => {
      try {
        const response = await fetch(`${API_URL}/api/settings/business`);
        if (response.ok) {
          const data = await response.json();
          if (data.shop_name) setShopName(data.shop_name);
        }
      } catch (err) {
        console.error('Failed to fetch shop name:', err);
      }
    };
    fetchShopName();
  }, []);

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    setPasswordSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to change password');
      }
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/services', icon: Settings, label: 'Services' },
    { path: '/admin/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/admin/bookings', icon: ClipboardList, label: 'Bookings' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/contacts', icon: Mail, label: 'Contact Messages' },
  ];

  return (
    <div className="admin-layout" style={styles.layout} data-testid="admin-layout">
      <style>{mediaQuery}</style>
      {/* Mobile Header */}
      <div className="mobile-header" style={styles.mobileHeader}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.menuBtn}
          data-testid="mobile-menu-toggle"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 style={styles.mobileTitle}>{shopName ? `${shopName.toUpperCase()} ADMIN` : 'ADMIN'}</h1>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`} style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>{shopName ? shopName.toUpperCase() : 'ADMIN PANEL'}</h2>
          <span style={styles.badge}>ADMIN</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const showBadge = item.path === '/admin/contacts' && unreadCount > 0;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
                onClick={() => setSidebarOpen(false)}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {showBadge && (
                  <span style={styles.unreadBadge}>{unreadCount}</span>
                )}
                {isActive && <ChevronRight size={16} style={styles.navArrow} />}
              </NavLink>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <NavLink to="/" style={styles.backLink}>
            ← Back to Website
          </NavLink>
          <button onClick={() => { setShowPasswordModal(true); setPasswordError(''); setPasswordSuccess(''); }} style={styles.logoutBtn} data-testid="change-password-btn">
            <Lock size={18} />
            <span>Change Password</span>
          </button>
          <button onClick={handleLogout} style={styles.logoutBtn} data-testid="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="overlay" style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="main" style={styles.main}>
        <Outlet />
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>CHANGE PASSWORD</h2>
              <button onClick={() => setShowPasswordModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              {passwordError && (
                <div style={styles.errorBox}>
                  <AlertCircle size={16} />
                  <span>{passwordError}</span>
                </div>
              )}
              {passwordSuccess && (
                <div style={styles.successBox}>
                  <CheckCircle size={16} />
                  <span>{passwordSuccess}</span>
                </div>
              )}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                  style={styles.input}
                  placeholder="Enter current password"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                  style={styles.input}
                  placeholder="Enter new password"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                  style={styles.input}
                  placeholder="Confirm new password"
                />
              </div>
              <div style={styles.modalFooter}>
                <button onClick={() => setShowPasswordModal(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={handleChangePassword} disabled={passwordSaving} style={styles.saveBtn}>
                  {passwordSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  {passwordSaving ? 'Saving...' : 'Update Password'}
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
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#000',
  },
  mobileHeader: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: '#0a0a0a',
    borderBottom: '1px solid #262626',
    alignItems: 'center',
    padding: '0 16px',
    zIndex: 100,
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
  },
  mobileTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
    marginLeft: '12px',
  },
  sidebar: {
    width: '260px',
    background: '#0a0a0a',
    borderRight: '1px solid #262626',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
  },
  sidebarOpen: {},
  sidebarHeader: {
    padding: '28px 24px',
    borderBottom: '1px solid #262626',
  },
  logo: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '2px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    background: '#e80200',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
  },
  nav: {
    flex: 1,
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    color: '#ababab',
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  navItemActive: {
    background: 'rgba(232, 2, 0, 0.1)',
    color: '#fff',
    borderLeft: '3px solid #e80200',
    marginLeft: '-3px',
  },
  navArrow: {
    marginLeft: 'auto',
    color: '#e80200',
  },
  unreadBadge: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '20px',
    height: '20px',
    padding: '0 6px',
    borderRadius: '10px',
    background: '#e80200',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: "'Montserrat', sans-serif",
  },
  sidebarFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #262626',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  backLink: {
    color: '#ababab',
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    transition: 'color 0.2s ease',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 40,
    display: 'none',
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    padding: '32px',
    minHeight: '100vh',
    overflowY: 'auto',
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
    width: '100%',
    maxWidth: '420px',
    background: '#0a0a0a',
    border: '1px solid #262626',
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
    letterSpacing: '1px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#ababab',
    cursor: 'pointer',
    padding: '4px',
  },
  modalBody: {
    padding: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  label: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#ababab',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelBtn: {
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '1px',
    cursor: 'pointer',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    fontSize: '13px',
    marginBottom: '16px',
    fontFamily: "'Montserrat', sans-serif",
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#10b981',
    fontSize: '13px',
    marginBottom: '16px',
    fontFamily: "'Montserrat', sans-serif",
  },
};

// Add responsive styles
const mediaQuery = `
  @media (max-width: 768px) {
    .admin-layout .mobile-header { display: flex !important; }
    .admin-layout .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 50;
    }
    .admin-layout .sidebar.open { transform: translateX(0); }
    .admin-layout .main { margin-left: 0 !important; padding: 16px !important; padding-top: 76px !important; }
    .admin-layout .overlay { display: block !important; }
  }
`;
