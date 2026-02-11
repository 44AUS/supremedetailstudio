import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, CheckCircle, Clock, AlertCircle, 
  XCircle, Loader2, ChevronDown, Calendar, User, Car,
  MapPin, Phone, Mail
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  in_progress: { label: 'In Progress', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  complete: { label: 'Complete', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  incomplete: { label: 'Incomplete', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  cancelled: { label: 'Cancelled', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, dateFilter]);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/bookings`;
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (dateFilter) params.append('date', dateFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
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
      
      // Update local state
      setBookings(prev =>
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

  const filteredBookings = bookings.filter((booking) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.customer_first_name?.toLowerCase().includes(searchLower) ||
      booking.customer_last_name?.toLowerCase().includes(searchLower) ||
      booking.customer_email?.toLowerCase().includes(searchLower) ||
      booking.service_name?.toLowerCase().includes(searchLower) ||
      booking.vehicle_make?.toLowerCase().includes(searchLower) ||
      booking.vehicle_model?.toLowerCase().includes(searchLower)
    );
  });

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading && bookings.length === 0) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div data-testid="admin-bookings">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>BOOKINGS</h1>
          <p style={styles.subtitle}>{bookings.length} total bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filtersRow}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, email, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            data-testid="search-bookings-input"
          />
        </div>
        <div style={styles.filterGroup}>
          <Filter size={16} style={{ color: '#ababab' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.filterSelect}
            data-testid="status-filter"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <Calendar size={16} style={{ color: '#ababab' }} />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={styles.filterDate}
            data-testid="date-filter"
          />
        </div>
      </div>

      {/* Bookings Table */}
      {filteredBookings.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>DATE</th>
                <th style={styles.th}>TIME</th>
                <th style={styles.th}>CUSTOMER</th>
                <th style={styles.th}>SERVICE</th>
                <th style={styles.th}>VEHICLE</th>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const statusConfig = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
                return (
                  <tr key={booking.id} style={styles.tableRow} data-testid={`booking-row-${booking.id}`}>
                    <td style={styles.td}>{booking.booking_date}</td>
                    <td style={styles.td}>{booking.booking_time}</td>
                    <td style={styles.td}>
                      <div style={styles.customerCell}>
                        <span style={styles.customerName}>
                          {booking.customer_first_name} {booking.customer_last_name}
                        </span>
                        <span style={styles.customerEmail}>{booking.customer_email}</span>
                      </div>
                    </td>
                    <td style={styles.td}>{booking.service_name}</td>
                    <td style={styles.td}>
                      {booking.vehicle_year} {booking.vehicle_make} {booking.vehicle_model}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background: statusConfig.bg,
                        color: statusConfig.color,
                        border: `1px solid ${statusConfig.color}30`,
                      }}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => openBookingModal(booking)}
                        style={styles.viewBtn}
                        data-testid={`view-booking-${booking.id}`}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <Calendar size={48} style={{ color: '#525252' }} />
          <h3 style={styles.emptyTitle}>No bookings found</h3>
          <p style={styles.emptyText}>
            {searchTerm || statusFilter || dateFilter
              ? 'Try adjusting your filters'
              : 'Bookings will appear here when customers book appointments'}
          </p>
        </div>
      )}

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()} data-testid="booking-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>BOOKING DETAILS</h2>
              <button onClick={() => setShowModal(false)} style={styles.closeBtn}>
                <XCircle size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {/* Status Section */}
              <div style={styles.statusSection}>
                <span style={styles.modalLabel}>Status:</span>
                <div style={styles.statusButtons}>
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
                      }}
                      data-testid={`status-btn-${status}`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>
                  <User size={18} />
                  Customer
                </h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <User size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_first_name} {selectedBooking.customer_last_name}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_phone}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Mail size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_email}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={14} style={{ color: '#ababab' }} />
                    <span>{selectedBooking.customer_address}</span>
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
                    <span style={styles.vehicleColor}>Color: {selectedBooking.vehicle_color}</span>
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
                  <div style={styles.appointmentDate}>
                    <Calendar size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.booking_date}</span>
                  </div>
                  <div style={styles.appointmentTime}>
                    <Clock size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.booking_time}</span>
                  </div>
                  <div style={styles.appointmentLocation}>
                    <MapPin size={16} style={{ color: '#e80200' }} />
                    <span>{selectedBooking.service_location === 'shop' ? 'In Shop' : 'Mobile Service'}</span>
                  </div>
                </div>
              </div>

              {/* Service & Price */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>Service & Price</h3>
                <div style={styles.priceSection}>
                  <span style={styles.serviceName}>{selectedBooking.service_name}</span>
                  <span style={styles.totalPrice}>${selectedBooking.total_price?.toFixed(2)}</span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={styles.notesSection}>
                  <h3 style={styles.infoTitle}>Notes</h3>
                  <p style={styles.notesText}>{selectedBooking.notes}</p>
                </div>
              )}
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
  filterDate: {
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
  customerCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  customerName: {
    fontWeight: 600,
    color: '#fff',
  },
  customerEmail: {
    fontSize: '12px',
    color: '#ababab',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
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
  vehicleColor: {
    fontSize: '14px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  appointmentInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  appointmentDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  appointmentTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  appointmentLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  serviceName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
  },
  totalPrice: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#e80200',
  },
  notesSection: {
    marginTop: '20px',
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
};
