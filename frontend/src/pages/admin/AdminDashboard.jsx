import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, CheckCircle, AlertCircle, 
  TrendingUp, Package, Loader2, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <AlertCircle size={40} />
        <p>{error}</p>
      </div>
    );
  }

  const statCards = [
    { label: "Today's Bookings", value: stats?.today_bookings || 0, icon: Calendar, color: '#3b82f6' },
    { label: 'Pending', value: stats?.pending_bookings || 0, icon: Clock, color: '#f59e0b' },
    { label: 'In Progress', value: stats?.in_progress_bookings || 0, icon: TrendingUp, color: '#8b5cf6' },
    { label: 'Completed', value: stats?.completed_bookings || 0, icon: CheckCircle, color: '#10b981' },
    { label: 'Total Bookings', value: stats?.total_bookings || 0, icon: Users, color: '#e80200' },
    { label: 'Active Services', value: stats?.active_services || 0, icon: Package, color: '#06b6d4' },
  ];

  const getStatusStyle = (status) => {
    const statusStyles = {
      pending: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', text: 'Pending' },
      in_progress: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', text: 'In Progress' },
      complete: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', text: 'Complete' },
      incomplete: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', text: 'Incomplete' },
    };
    return statusStyles[status] || statusStyles.pending;
  };

  return (
    <div data-testid="admin-dashboard">
      <div style={styles.header}>
        <h1 style={styles.title}>DASHBOARD</h1>
        <p style={styles.subtitle}>Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
              <div style={{ ...styles.statIcon, background: `${stat.color}20` }}>
                <Icon size={24} color={stat.color} />
              </div>
              <div style={styles.statContent}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>RECENT BOOKINGS</h2>
          <Link to="/admin/bookings" style={styles.viewAllLink}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {stats?.recent_bookings?.length > 0 ? (
          <div style={styles.bookingsTable}>
            <div style={styles.tableHeader}>
              <span style={{ flex: 2 }}>Customer</span>
              <span style={{ flex: 2 }}>Service</span>
              <span style={{ flex: 1 }}>Date</span>
              <span style={{ flex: 1 }}>Time</span>
              <span style={{ flex: 1 }}>Status</span>
            </div>
            {stats.recent_bookings.map((booking) => {
              const statusStyle = getStatusStyle(booking.status);
              return (
                <div key={booking.id} style={styles.tableRow}>
                  <span style={{ flex: 2, color: '#fff' }}>
                    {booking.customer_first_name} {booking.customer_last_name}
                  </span>
                  <span style={{ flex: 2 }}>{booking.service_name}</span>
                  <span style={{ flex: 1 }}>{booking.booking_date}</span>
                  <span style={{ flex: 1 }}>{booking.booking_time}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{
                      ...styles.statusBadge,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}>
                      {statusStyle.text}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Calendar size={48} style={{ color: '#525252' }} />
            <p>No recent bookings</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>QUICK ACTIONS</h2>
        <div style={styles.actionsGrid}>
          <Link to="/admin/services" style={styles.actionCard}>
            <Package size={24} />
            <span>Manage Services</span>
          </Link>
          <Link to="/admin/schedule" style={styles.actionCard}>
            <Calendar size={24} />
            <span>Update Schedule</span>
          </Link>
          <Link to="/admin/bookings" style={styles.actionCard}>
            <Users size={24} />
            <span>View All Bookings</span>
          </Link>
        </div>
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
  header: {
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
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#ef4444',
    gap: '16px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'border-color 0.2s ease',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  statValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    fontWeight: 700,
    color: '#fff',
  },
  statLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
  },
  section: {
    marginBottom: '40px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '1px',
  },
  viewAllLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#e80200',
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
  },
  bookingsTable: {
    background: '#111111',
    border: '1px solid #262626',
  },
  tableHeader: {
    display: 'flex',
    padding: '16px 20px',
    background: '#0a0a0a',
    borderBottom: '1px solid #262626',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#ababab',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  tableRow: {
    display: 'flex',
    padding: '16px 20px',
    borderBottom: '1px solid #262626',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
    alignItems: 'center',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 600,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#525252',
    gap: '12px',
    fontFamily: "'Montserrat', sans-serif",
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '28px 20px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#ababab',
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
};
