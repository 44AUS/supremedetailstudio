import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Calendar, ClipboardList, 
  LogOut, Menu, X, ChevronRight 
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/services', icon: Settings, label: 'Services' },
    { path: '/admin/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/admin/bookings', icon: ClipboardList, label: 'Bookings' },
  ];

  return (
    <div style={styles.layout} data-testid="admin-layout">
      {/* Mobile Header */}
      <div style={styles.mobileHeader}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.menuBtn}
          data-testid="mobile-menu-toggle"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 style={styles.mobileTitle}>SUPREME DETAIL ADMIN</h1>
      </div>

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        ...(sidebarOpen ? styles.sidebarOpen : {}),
      }}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>SUPREME DETAIL</h2>
          <span style={styles.badge}>ADMIN</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
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
                {isActive && <ChevronRight size={16} style={styles.navArrow} />}
              </NavLink>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <NavLink to="/" style={styles.backLink}>
            ← Back to Website
          </NavLink>
          <button onClick={handleLogout} style={styles.logoutBtn} data-testid="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet />
      </main>
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
};

// Add responsive styles
const mediaQuery = `
  @media (max-width: 1024px) {
    .admin-layout .mobileHeader { display: flex !important; }
    .admin-layout .sidebar { 
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    .admin-layout .sidebar.open { transform: translateX(0); }
    .admin-layout .main { margin-left: 0; padding-top: 80px; }
    .admin-layout .overlay { display: block !important; }
  }
`;
