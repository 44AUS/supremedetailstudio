import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, CheckCircle, AlertCircle,
  TrendingUp, Package, Loader2, ArrowRight, ChevronLeft,
  ChevronRight, XCircle, User, Phone, Mail, MapPin, Car, Eye,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

const fmt = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  in_progress: { label: 'In Progress', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  complete: { label: 'Complete', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  incomplete: { label: 'Incomplete', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  cancelled: { label: 'Cancelled', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.15)' },
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Calendar state
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [allBookings, setAllBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const getToken = () => localStorage.getItem('adminToken');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchStats();
    fetchAllBookings();
    fetchCategories();
    fetchServices();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard/stats`, {
        headers: { Authorization: `Bearer ${getToken()}` },
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

  const fetchAllBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setAllBookings(data);
    } catch (err) {
      console.error('Failed to load bookings for calendar');
    } finally {
      setBookingsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      setAllBookings(prev =>
        prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const togglePaid = async (bookingId, currentPaid) => {
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/paid`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ is_paid: !currentPaid }),
      });
      if (!response.ok) throw new Error('Failed to update payment status');
      setAllBookings(prev =>
        prev.map(b => (b.id === bookingId ? { ...b, is_paid: !currentPaid } : b))
      );
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, is_paid: !currentPaid });
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
  };

  const getCategoryColor = (booking) => {
    if (!booking) return '#e80200';
    // Find the service to get its category
    const svc = services.find(s => s.id === booking.service_id || s.name === booking.service_name);
    const catName = svc?.category || '';
    const cat = categories.find(c => c.name === catName);
    return cat?.color || '#e80200';
  };

  // Group bookings by date
  const bookingsByDate = {};
  allBookings.forEach(booking => {
    const date = booking.booking_date;
    if (!bookingsByDate[date]) bookingsByDate[date] = [];
    bookingsByDate[date].push(booking);
  });

  // Calendar helpers
  const viewMonth = calendarDate.getMonth();
  const viewYear = calendarDate.getFullYear();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const monthName = calendarDate.toLocaleString('default', { month: 'long' });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const prevMonth = () => setCalendarDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(viewYear, viewMonth + 1, 1));

  const handleDayClick = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const selectedDayBookings = selectedDate ? (bookingsByDate[selectedDate] || []) : [];

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
    return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  };

  return (
    <div data-testid="admin-dashboard">
      <div style={{ ...styles.header, ...(isMobile && { marginBottom: '20px' }) }}>
        <h1 style={{ ...styles.title, ...(isMobile && { fontSize: '24px', letterSpacing: '1px' }) }}>DASHBOARD</h1>
        <p style={{ ...styles.subtitle, ...(isMobile && { fontSize: '13px' }) }}>Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        ...styles.statsGrid,
        ...(isMobile && { gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '24px' }),
      }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{
              ...styles.statCard,
              ...(isMobile && { padding: '14px 10px', flexDirection: 'column', gap: '8px', textAlign: 'center' }),
            }} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
              <div style={{
                ...styles.statIcon,
                background: `${stat.color}20`,
                ...(isMobile && { width: '36px', height: '36px' }),
              }}>
                <Icon size={isMobile ? 18 : 24} color={stat.color} />
              </div>
              <div style={{ ...styles.statContent, ...(isMobile && { alignItems: 'center' }) }}>
                <span style={{ ...styles.statValue, ...(isMobile && { fontSize: '20px' }) }}>{stat.value}</span>
                <span style={{ ...styles.statLabel, ...(isMobile && { fontSize: '10px' }) }}>{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Calendar + Revenue */}
      <div style={{ ...styles.section, ...(isMobile && { marginBottom: '24px' }) }}>
        <div style={{ ...styles.sectionHeader, ...(isMobile && { marginBottom: '12px' }) }}>
          <h2 style={{ ...styles.sectionTitle, ...(isMobile && { fontSize: '15px' }) }}>
            <Calendar size={isMobile ? 16 : 20} style={{ marginRight: '8px' }} />
            BOOKING CALENDAR
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexDirection: 'column', width: '100%' }}>
        <div style={{ ...styles.calendarContainer, width: '100%', ...(isMobile && { padding: '14px' }) }}>
          {/* Month Navigation */}
          <div style={styles.calendarNav}>
            <button onClick={prevMonth} style={styles.calendarNavBtn}>
              <ChevronLeft size={20} />
            </button>
            <h3 style={styles.calendarMonth}>{monthName} {viewYear}</h3>
            <button onClick={nextMonth} style={styles.calendarNavBtn}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Weekday Headers */}
          <div style={styles.weekdayRow}>
            {WEEKDAYS.map(day => (
              <div key={day} style={styles.weekdayLabel}>{day}</div>
            ))}
          </div>

          {/* Day Grid */}
          {bookingsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', color: '#ababab' }}>
              <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <div style={styles.dayGrid}>
              {/* Empty cells before first day */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} style={styles.dayEmpty} />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayBookings = bookingsByDate[dateStr] || [];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    style={{
                      ...styles.dayCell,
                      ...(isToday ? styles.dayCellToday : {}),
                      ...(isSelected ? styles.dayCellSelected : {}),
                    }}
                  >
                    <span style={{
                      ...styles.dayNumber,
                      color: isSelected ? '#fff' : isToday ? '#e80200' : '#fff',
                    }}>
                      {day}
                    </span>
                    <div style={styles.dayCellBookings}>
                      {dayBookings
                        .sort((a, b) => (a.booking_time || '').localeCompare(b.booking_time || ''))
                        .slice(0, isMobile ? 2 : 3)
                        .map((b, idx) => {
                          const catColor = getCategoryColor(b);
                          const isComplete = b.status === 'complete';
                          return (
                            <div
                              key={idx}
                              style={{
                                ...styles.calBookingBar,
                                borderLeft: `3px solid ${isComplete ? '#22c55e' : catColor}`,
                                background: isComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                              }}
                              title={`${b.booking_time} - ${b.customer_first_name} ${b.customer_last_name} - ${b.service_name}`}
                            >
                              <span style={styles.calBookingText}>
                                {b.service_name?.length > (isMobile ? 8 : 14) ? b.service_name.slice(0, isMobile ? 8 : 14) + '…' : b.service_name}
                              </span>
                              <span style={styles.calBookingCustomer}>
                                {b.customer_first_name}
                              </span>
                            </div>
                          );
                        })}
                      {dayBookings.length > (isMobile ? 2 : 3) && (
                        <span style={styles.calMoreCount}>+{dayBookings.length - (isMobile ? 2 : 3)} more</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected Day Bookings Panel */}
          {selectedDate && (
            <div style={styles.dayDetailPanel}>
              <div style={{ ...styles.dayDetailHeader, ...(isMobile && { flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }) }}>
                <h3 style={{ ...styles.dayDetailTitle, ...(isMobile && { fontSize: '14px' }) }}>
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={styles.dayDetailCount}>
                    {selectedDayBookings.length} booking{selectedDayBookings.length !== 1 ? 's' : ''}
                  </span>
                  {selectedDayBookings.some(b => b.is_paid) && (
                    <span style={styles.dayRevenueTag}>
                      <DollarSign size={12} />
                      ${fmt(selectedDayBookings
                        .filter(b => b.is_paid)
                        .reduce((sum, b) => sum + (b.total_price || 0), 0))} revenue
                    </span>
                  )}
                </div>
              </div>

              {selectedDayBookings.length > 0 ? (
                <div style={styles.dayBookingsList}>
                  {selectedDayBookings
                    .sort((a, b) => (a.booking_time || '').localeCompare(b.booking_time || ''))
                    .map(booking => {
                      const sc = getStatusStyle(booking.status);
                      return (
                        <button
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                          style={{
                            ...styles.dayBookingItem,
                            ...(isMobile && { flexWrap: 'wrap', gap: '8px', padding: '12px' }),
                          }}
                        >
                          <div style={{ ...styles.dayBookingTime, ...(isMobile && { minWidth: 'auto', fontSize: '13px' }) }}>
                            <Clock size={14} style={{ color: '#e80200' }} />
                            <span>{booking.booking_time}</span>
                          </div>
                          <div style={{ ...styles.dayBookingInfo, ...(isMobile && { flex: '1 1 auto', minWidth: '120px' }) }}>
                            <span style={{ ...styles.dayBookingCustomer, ...(isMobile && { fontSize: '13px' }) }}>
                              {booking.customer_first_name} {booking.customer_last_name}
                            </span>
                            <span style={{ ...styles.dayBookingService, ...(isMobile && { fontSize: '11px' }) }}>{booking.service_name}</span>
                          </div>
                          <span style={{
                            ...styles.dayBookingStatus,
                            background: sc.bg,
                            color: sc.color,
                            ...(isMobile && { fontSize: '10px', padding: '3px 8px' }),
                          }}>
                            {sc.label}
                          </span>
                          {booking.is_paid && (
                            <span style={styles.paidMiniTag}>
                              <DollarSign size={10} /> Paid
                            </span>
                          )}
                          <Eye size={isMobile ? 14 : 16} style={{ color: '#525252', flexShrink: 0 }} />
                        </button>
                      );
                    })}
                </div>
              ) : (
                <div style={styles.dayEmpty2}>
                  <Calendar size={24} style={{ color: '#525252' }} />
                  <span>No bookings on this day</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Revenue Panel */}
        <div style={{ ...styles.revenuePanel, width: '100%', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }}>
          <div style={styles.revenueCard}>
            <div style={{ ...styles.revenueIconWrap, background: 'rgba(16, 185, 129, 0.15)' }}>
              <DollarSign size={20} color="#10b981" />
            </div>
            <span style={styles.revenueValue}>${fmt(stats?.today_revenue || 0)}</span>
            <span style={styles.revenueLabel}>Today</span>
          </div>
          <div style={styles.revenueCard}>
            <div style={{ ...styles.revenueIconWrap, background: 'rgba(59, 130, 246, 0.15)' }}>
              <DollarSign size={20} color="#3b82f6" />
            </div>
            <span style={styles.revenueValue}>${fmt(stats?.monthly_revenue || 0)}</span>
            <span style={styles.revenueLabel}>This Month</span>
          </div>
          <div style={styles.revenueCard}>
            <div style={{ ...styles.revenueIconWrap, background: 'rgba(139, 92, 246, 0.15)' }}>
              <DollarSign size={20} color="#8b5cf6" />
            </div>
            <span style={styles.revenueValue}>${fmt(stats?.yearly_revenue || 0)}</span>
            <span style={styles.revenueLabel}>This Year</span>
          </div>
          <div style={styles.revenueCard}>
            <div style={{ ...styles.revenueIconWrap, background: 'rgba(245, 158, 11, 0.15)' }}>
              <DollarSign size={20} color="#f59e0b" />
            </div>
            <span style={styles.revenueValue}>${fmt(stats?.total_revenue || 0)}</span>
            <span style={styles.revenueLabel}>All Time</span>
          </div>
        </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{ ...styles.section, ...(isMobile && { marginBottom: '24px' }) }}>
        <div style={{ ...styles.sectionHeader, ...(isMobile && { marginBottom: '12px' }) }}>
          <h2 style={{ ...styles.sectionTitle, ...(isMobile && { fontSize: '15px' }) }}>RECENT BOOKINGS</h2>
          <Link to="/admin/bookings" style={{ ...styles.viewAllLink, ...(isMobile && { fontSize: '12px' }) }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {stats?.recent_bookings?.length > 0 ? (
          isMobile ? (
            /* Mobile: Card Layout */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {stats.recent_bookings.map((booking) => {
                const statusStyle = getStatusStyle(booking.status);
                return (
                  <div key={booking.id} style={{
                    background: '#111111',
                    border: '1px solid #262626',
                    padding: '14px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                        {booking.customer_first_name} {booking.customer_last_name}
                      </span>
                      <span style={{
                        ...styles.statusBadge,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        fontSize: '10px',
                        padding: '3px 8px',
                      }}>
                        {statusStyle.label}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#ababab', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {booking.service_name}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#6b7280' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {booking.booking_date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {booking.booking_time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Desktop: Table Layout */
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
                        {statusStyle.label}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div style={styles.emptyState}>
            <Calendar size={48} style={{ color: '#525252' }} />
            <p>No recent bookings</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ ...styles.section, ...(isMobile && { marginBottom: '24px' }) }}>
        <h2 style={styles.sectionTitle}>QUICK ACTIONS</h2>
        <div style={{ ...styles.actionsGrid, ...(isMobile && { gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }) }}>
          <Link to="/admin/services" style={{ ...styles.actionCard, ...(isMobile && { padding: '16px 10px', fontSize: '11px', gap: '8px' }) }}>
            <Package size={isMobile ? 20 : 24} />
            <span>Services</span>
          </Link>
          <Link to="/admin/schedule" style={{ ...styles.actionCard, ...(isMobile && { padding: '16px 10px', fontSize: '11px', gap: '8px' }) }}>
            <Calendar size={isMobile ? 20 : 24} />
            <span>Schedule</span>
          </Link>
          <Link to="/admin/bookings" style={{ ...styles.actionCard, ...(isMobile && { padding: '16px 10px', fontSize: '11px', gap: '8px' }) }}>
            <Users size={isMobile ? 20 : 24} />
            <span>Bookings</span>
          </Link>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div style={{ ...styles.modalOverlay, ...(isMobile && { padding: '0' }) }} onClick={() => setSelectedBooking(null)}>
          <div style={{
            ...styles.modal,
            ...(isMobile && { maxWidth: '100%', maxHeight: '100vh', height: '100vh', borderRadius: 0 }),
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.modalHeader, ...(isMobile && { padding: '16px' }) }}>
              <h2 style={{ ...styles.modalTitle, ...(isMobile && { fontSize: '16px' }) }}>BOOKING DETAILS</h2>
              <button onClick={() => setSelectedBooking(null)} style={styles.closeBtn}>
                <XCircle size={isMobile ? 22 : 24} />
              </button>
            </div>

            <div style={{ ...styles.modalContent, ...(isMobile && { padding: '16px' }) }}>
              {/* Booking Reference */}
              <div style={{ ...styles.bookingReference, ...(isMobile && { padding: '12px', marginBottom: '16px' }) }}>
                <span style={styles.referenceLabel}>Customer Ref:</span>
                <span style={{ ...styles.referenceValue, ...(isMobile && { fontSize: '15px' }) }}>#{selectedBooking.id?.slice(-8).toUpperCase()}</span>
              </div>

              {/* Status Section */}
              <div style={styles.statusSection}>
                <span style={styles.modalLabel}>Status:</span>
                <div style={{ ...styles.statusButtons, ...(isMobile && { gap: '6px' }) }}>
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => updateBookingStatus(selectedBooking.id, status)}
                      disabled={updatingStatus}
                      style={{
                        ...styles.statusBtn,
                        background: selectedBooking.status === status ? config.bg : 'transparent',
                        color: selectedBooking.status === status ? config.color : '#ababab',
                        borderColor: selectedBooking.status === status ? config.color : '#262626',
                        ...(isMobile && { padding: '6px 10px', fontSize: '11px' }),
                      }}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Status */}
              <div style={styles.paymentSection}>
                <span style={styles.modalLabel}>Payment:</span>
                <button
                  onClick={() => togglePaid(selectedBooking.id, selectedBooking.is_paid)}
                  style={{
                    ...styles.paidToggleBtn,
                    background: selectedBooking.is_paid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                    color: selectedBooking.is_paid ? '#10b981' : '#6b7280',
                    borderColor: selectedBooking.is_paid ? '#10b981' : '#525252',
                  }}
                >
                  <DollarSign size={16} />
                  {selectedBooking.is_paid ? 'PAID' : 'UNPAID'}
                </button>
              </div>

              {/* Customer Info */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>
                  <User size={isMobile ? 16 : 18} />
                  Customer
                </h3>
                <div style={{ ...styles.infoGrid, ...(isMobile && { gridTemplateColumns: '1fr', gap: '10px' }) }}>
                  <div style={{ ...styles.infoItem, ...(isMobile && { fontSize: '13px' }) }}>
                    <User size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_first_name} {selectedBooking.customer_last_name}</span>
                  </div>
                  <div style={{ ...styles.infoItem, ...(isMobile && { fontSize: '13px' }) }}>
                    <Phone size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_phone}</span>
                  </div>
                  <div style={{ ...styles.infoItem, ...(isMobile && { fontSize: '13px' }) }}>
                    <Mail size={14} style={{ color: '#ababab' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedBooking.customer_email}</span>
                  </div>
                  <div style={{ ...styles.infoItem, ...(isMobile && { fontSize: '13px' }) }}>
                    <MapPin size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>
                  <Car size={18} />
                  Vehicle
                </h3>
                <div style={styles.vehicleInfo}>
                  <span style={styles.vehicleMake}>
                    {selectedBooking.vehicle_year} {selectedBooking.vehicle_make} {selectedBooking.vehicle_model}
                  </span>
                  <span style={styles.vehicleType}>Type: {selectedBooking.vehicle_type}</span>
                  {selectedBooking.vehicle_color && (
                    <span style={styles.vehicleType}>Color: {selectedBooking.vehicle_color}</span>
                  )}
                </div>
              </div>

              {/* Appointment Info */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>
                  <Calendar size={18} />
                  Appointment
                </h3>
                <div style={styles.appointmentInfo}>
                  <div style={styles.appointmentItem}>
                    <Calendar size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.booking_date}</span>
                  </div>
                  <div style={styles.appointmentItem}>
                    <Clock size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.booking_time}</span>
                  </div>
                  <div style={styles.appointmentItem}>
                    <MapPin size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.service_location === 'shop' ? 'In Shop' : 'Mobile Service'}</span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>Service Details</h3>
                <div style={styles.serviceDetailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Service:</span>
                    <span style={styles.detailValue}>{selectedBooking.service_name}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Location:</span>
                    <span style={styles.detailValue}>
                      {selectedBooking.service_location === 'shop' ? 'In Shop' : 'Mobile Service'}
                    </span>
                  </div>
                  {selectedBooking.pickup_delivery === 'yes' && (
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Pickup & Delivery:</span>
                      <span style={styles.detailValue}>
                        {selectedBooking.pickup_distance === 'under15' ? 'Under 15 miles (+$50)' : 'Over 15 miles (+$75)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>Price</h3>
                <div style={styles.priceBreakdown}>
                  {selectedBooking.services && selectedBooking.services.length > 0 ? (
                    selectedBooking.services.map((service, idx) => (
                      <div key={idx} style={styles.priceRow}>
                        <span style={styles.priceLabel}>
                          {service.service_name}
                          {service.duration_minutes && (
                            <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '8px' }}>
                              ({service.duration_minutes} min)
                            </span>
                          )}
                        </span>
                        <span style={styles.priceValue}>${fmt(service.base_price || 0)}</span>
                      </div>
                    ))
                  ) : (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>{selectedBooking.service_name}</span>
                      <span style={styles.priceValue}>—</span>
                    </div>
                  )}

                  {selectedBooking.vehicle_type && selectedBooking.vehicle_type !== 'sedan' && (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>
                        Vehicle Size ({selectedBooking.vehicle_type === 'suv-2row' ? '2-Row SUV' : '3-Row SUV'})
                      </span>
                      <span style={styles.priceValue}>
                        +${selectedBooking.vehicle_type === 'suv-2row' ? '50.00' : '100.00'}
                      </span>
                    </div>
                  )}

                  {selectedBooking.service_location === 'mobile' && (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>Mobile Service Fee</span>
                      <span style={styles.priceValue}>+$50.00</span>
                    </div>
                  )}

                  {selectedBooking.pickup_delivery === 'yes' && (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>
                        Pickup & Delivery ({selectedBooking.pickup_distance === 'over15' ? '>15mi' : '<15mi'})
                      </span>
                      <span style={styles.priceValue}>
                        +${selectedBooking.pickup_distance === 'over15' ? '75.00' : '50.00'}
                      </span>
                    </div>
                  )}

                  <div style={{ ...styles.priceRow, ...styles.totalRow }}>
                    <span style={styles.totalLabel}>TOTAL</span>
                    <span style={styles.totalPrice}>${fmt(selectedBooking.total_price || 0)}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={styles.infoSection}>
                  <h3 style={styles.infoTitle}>Notes</h3>
                  <p style={styles.notesText}>{selectedBooking.notes}</p>
                </div>
              )}

              {/* View Full Details Link */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #262626' }}>
                <Link
                  to="/admin/bookings"
                  style={styles.viewFullLink}
                  onClick={() => setSelectedBooking(null)}
                >
                  View in Bookings Page <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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
    display: 'flex',
    alignItems: 'center',
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

  // Calendar styles
  calendarContainer: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '20px',
    boxSizing: 'border-box',
  },
  calendarNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  calendarNavBtn: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    cursor: 'pointer',
  },
  calendarMonth: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '1px',
  },
  weekdayRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '3px',
    marginBottom: '6px',
  },
  weekdayLabel: {
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    color: '#525252',
    padding: '6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  dayGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '3px',
  },
  dayEmpty: {
    aspectRatio: '1',
  },
  dayCell: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '3px',
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    cursor: 'pointer',
    padding: '4px 5px',
    transition: 'all 0.15s ease',
    textAlign: 'left',
    verticalAlign: 'top',
    overflow: 'hidden',
  },
  dayCellToday: {
    border: '1px solid rgba(232, 2, 0, 0.5)',
    background: 'rgba(232, 2, 0, 0.05)',
  },
  dayCellSelected: {
    background: 'rgba(232, 2, 0, 0.15)',
    border: '1px solid #e80200',
  },
  dayNumber: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '2px',
  },
  dayCellBookings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    overflow: 'hidden',
  },
  calBookingBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 4px',
    background: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  calBookingText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  calBookingCustomer: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    color: '#ababab',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: 'auto',
  },
  calMoreCount: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    fontWeight: 600,
    color: '#ababab',
    textAlign: 'center',
    padding: '1px 0',
  },

  // Day detail panel
  dayDetailPanel: {
    marginTop: '16px',
    borderTop: '1px solid #262626',
    paddingTop: '16px',
  },
  dayDetailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  dayDetailTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '0.5px',
  },
  dayDetailCount: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
  },
  dayBookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dayBookingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'border-color 0.15s ease',
  },
  dayBookingTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    minWidth: '80px',
    flexShrink: 0,
  },
  dayBookingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
    minWidth: 0,
  },
  dayBookingCustomer: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  dayBookingService: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#ababab',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  dayBookingStatus: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  dayEmpty2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '32px',
    color: '#525252',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },

  // Bookings table
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

  // Modal styles
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
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: '#111111',
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
    background: 'transparent',
    border: 'none',
    color: '#ababab',
    cursor: 'pointer',
    padding: '4px',
  },
  modalContent: {
    padding: '24px',
  },
  bookingReference: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(232, 2, 0, 0.05)',
    border: '1px solid rgba(232, 2, 0, 0.2)',
    marginBottom: '24px',
  },
  referenceLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#ababab',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  referenceValue: {
    fontFamily: "'Courier New', monospace",
    fontSize: '18px',
    fontWeight: 700,
    color: '#e80200',
    letterSpacing: '1px',
  },
  statusSection: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #262626',
  },
  modalLabel: {
    display: 'block',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#ababab',
    marginBottom: '12px',
    letterSpacing: '1px',
  },
  statusButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  statusBtn: {
    padding: '8px 14px',
    border: '1px solid #262626',
    fontSize: '12px',
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'transparent',
  },
  infoSection: {
    marginBottom: '20px',
  },
  infoTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#e80200',
    margin: '0 0 12px 0',
    letterSpacing: '0.5px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  vehicleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  vehicleMake: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  vehicleType: {
    fontSize: '14px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  appointmentInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  appointmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  serviceDetailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
  },
  detailValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  priceBreakdown: {
    padding: '16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '8px',
  },
  priceLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
  },
  priceValue: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  totalRow: {
    paddingTop: '12px',
    borderTop: '2px solid #262626',
    marginTop: '4px',
    paddingBottom: 0,
  },
  totalLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
  },
  totalPrice: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#e80200',
  },
  notesText: {
    padding: '14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#ababab',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.6,
    margin: 0,
  },
  viewFullLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  revenuePanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  revenueCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '28px 32px',
    background: '#111111',
    border: '1px solid #262626',
    textAlign: 'center',
  },
  revenueIconWrap: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
  },
  revenueLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#ababab',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  revenuePaidNote: {
    textAlign: 'center',
    padding: '8px',
  },
  dayRevenueTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 10px',
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Montserrat', sans-serif",
  },
  paidMiniTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    padding: '2px 8px',
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  paymentSection: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #262626',
  },
  paidToggleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    cursor: 'pointer',
    border: '1px solid #262626',
    transition: 'all 0.2s',
  },
};
