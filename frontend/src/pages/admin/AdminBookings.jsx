import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Eye, CheckCircle, Clock, AlertCircle,
  XCircle, Loader2, ChevronDown, Calendar, User, Car,
  MapPin, Phone, Mail, Plus, Edit2, Save, X, Trash2,
  DollarSign
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

const fmt = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  in_progress: { label: 'In Progress', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  complete: { label: 'Complete', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  incomplete: { label: 'Incomplete', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  cancelled: { label: 'Cancelled', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
};

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan / Coupe' },
  { id: 'suv-2row', label: '2-Row SUV / Crossover' },
  { id: 'suv-3row', label: '3-Row SUV / Large Truck' },
];

const emptyBookingForm = {
  customer_first_name: '',
  customer_last_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  service_location: 'shop',
  vehicle_year: '',
  vehicle_make: '',
  vehicle_model: '',
  vehicle_type: 'sedan',
  vehicle_color: '',
  service_id: '',
  service_name: '',
  booking_date: '',
  booking_time: '',
  total_price: 0,
  notes: '',
  status: 'pending',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState(emptyBookingForm);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerResults, setCustomerResults] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [customerSearchLoading, setCustomerSearchLoading] = useState(false);
  const customerSearchRef = React.useRef(null);

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, [statusFilter, dateFilter]);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

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
      setBookings(prev =>
        prev.map(b => (b.id === bookingId ? { ...b, is_paid: !currentPaid } : b))
      );
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, is_paid: !currentPaid });
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  // Customer search with debounce
  const searchTimeoutRef = React.useRef(null);
  const searchCustomers = (query) => {
    setCustomerSearch(query);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!query || query.length < 2) {
      setCustomerResults([]);
      setShowCustomerDropdown(false);
      return;
    }
    searchTimeoutRef.current = setTimeout(async () => {
      setCustomerSearchLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/customers?search=${encodeURIComponent(query)}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCustomerResults(data);
          setShowCustomerDropdown(data.length > 0);
        }
      } catch (err) {
        console.error('Customer search error:', err);
      } finally {
        setCustomerSearchLoading(false);
      }
    }, 300);
  };

  const selectCustomer = async (customer) => {
    setBookingForm(prev => ({
      ...prev,
      customer_first_name: customer.first_name || '',
      customer_last_name: customer.last_name || '',
      customer_phone: customer.phone || '',
      customer_email: customer.email || '',
      customer_address: customer.address || '',
    }));
    setCustomerSearch(`${customer.first_name} ${customer.last_name}`);
    setShowCustomerDropdown(false);

    // Try to fetch last booking to auto-fill vehicle info
    try {
      const response = await fetch(`${API_URL}/api/customers/${customer.id}/bookings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        const bookings = await response.json();
        if (bookings.length > 0) {
          const lastBooking = bookings[0];
          setBookingForm(prev => ({
            ...prev,
            vehicle_year: lastBooking.vehicle_year || prev.vehicle_year,
            vehicle_make: lastBooking.vehicle_make || prev.vehicle_make,
            vehicle_model: lastBooking.vehicle_model || prev.vehicle_model,
            vehicle_type: lastBooking.vehicle_type || prev.vehicle_type,
            vehicle_color: lastBooking.vehicle_color || prev.vehicle_color,
          }));
        }
      }
    } catch (err) {
      // Silently fail - vehicle info is optional
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (customerSearchRef.current && !customerSearchRef.current.contains(e.target)) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Open create/edit modal
  const openCreateBooking = () => {
    setEditingBooking(null);
    setBookingForm(emptyBookingForm);
    setCustomerSearch('');
    setCustomerResults([]);
    setShowCustomerDropdown(false);
    setError('');
    setShowEditModal(true);
  };

  const openEditBooking = (booking) => {
    setEditingBooking(booking);
    setBookingForm({
      customer_first_name: booking.customer_first_name || '',
      customer_last_name: booking.customer_last_name || '',
      customer_phone: booking.customer_phone || '',
      customer_email: booking.customer_email || '',
      customer_address: booking.customer_address || '',
      service_location: booking.service_location || 'shop',
      vehicle_year: booking.vehicle_year || '',
      vehicle_make: booking.vehicle_make || '',
      vehicle_model: booking.vehicle_model || '',
      vehicle_type: booking.vehicle_type || 'sedan',
      vehicle_color: booking.vehicle_color || '',
      service_id: booking.service_id || '',
      service_name: booking.service_name || '',
      booking_date: booking.booking_date || '',
      booking_time: booking.booking_time || '',
      total_price: booking.total_price || 0,
      notes: booking.notes || '',
      status: booking.status || 'pending',
    });
    setError('');
    setShowEditModal(true);
    setShowModal(false);
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setBookingForm({
        ...bookingForm,
        service_id: service.id,
        service_name: service.name,
        total_price: service.base_price || 0,
      });
    }
  };

  const saveBooking = async () => {
    // Validation
    if (!bookingForm.customer_first_name || !bookingForm.customer_email || !bookingForm.customer_phone) {
      setError('Customer name, email, and phone are required');
      return;
    }
    if (!bookingForm.booking_date || !bookingForm.booking_time) {
      setError('Booking date and time are required');
      return;
    }
    if (!bookingForm.service_name) {
      setError('Please select a service');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const isEdit = !!editingBooking;
      const url = isEdit 
        ? `${API_URL}/api/bookings/${editingBooking.id}`
        : `${API_URL}/api/bookings/admin`;
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(bookingForm),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to save booking');
      }

      setShowEditModal(false);
      fetchBookings();
    } catch (err) {
      setError(err.message || 'Failed to save booking');
    } finally {
      setSaving(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to delete booking');
      fetchBookings();
      setShowModal(false);
    } catch (err) {
      alert('Failed to delete booking');
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
        <button onClick={openCreateBooking} style={styles.addBtn} data-testid="add-booking-btn">
          <Plus size={18} />
          Add Booking
        </button>
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
                <th style={styles.th}>PAID</th>
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
                        onClick={() => togglePaid(booking.id, booking.is_paid)}
                        style={{
                          ...styles.paidBadge,
                          background: booking.is_paid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                          color: booking.is_paid ? '#10b981' : '#6b7280',
                          border: `1px solid ${booking.is_paid ? '#10b98130' : '#6b728030'}`,
                        }}
                      >
                        <DollarSign size={12} />
                        {booking.is_paid ? 'Paid' : 'Unpaid'}
                      </button>
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
              {/* Booking Reference */}
              <div style={styles.bookingReference}>
                <span style={styles.referenceLabel}>Customer Ref:</span>
                <span style={styles.referenceValue}>#{selectedBooking.id?.slice(-8).toUpperCase()}</span>
                <span style={styles.fullIdLabel}>Full ID: {selectedBooking.id}</span>
              </div>

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

              {/* Service Details */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>
                  <MapPin size={18} />
                  Service Details
                </h3>
                <div style={styles.serviceDetailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Service Location:</span>
                    <span style={styles.detailValue}>
                      {selectedBooking.service_location === 'shop' ? '🏪 In Shop' : '🚗 Mobile Service'}
                    </span>
                  </div>
                  {selectedBooking.service_location === 'shop' && (
                    <>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Pickup & Delivery:</span>
                        <span style={styles.detailValue}>
                          {selectedBooking.pickup_delivery === 'yes' ? '✅ Yes' : selectedBooking.pickup_delivery === 'no' ? '❌ No' : 'Not specified'}
                        </span>
                      </div>
                      {selectedBooking.pickup_delivery === 'yes' && selectedBooking.pickup_distance && (
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Pickup Distance:</span>
                          <span style={styles.detailValue}>
                            {selectedBooking.pickup_distance === 'under15' ? 'Under 15 miles (+$50)' : 'Over 15 miles (+$75)'}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Service & Price Breakdown */}
              <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>Service & Price Breakdown</h3>
                <div style={styles.priceBreakdown}>
                  {/* Display all services if multi-service booking, otherwise show single service */}
                  {selectedBooking.services && selectedBooking.services.length > 0 ? (
                    selectedBooking.services.map((service, idx) => (
                      <div key={idx} style={styles.priceRow}>
                        <span style={styles.priceLabel}>
                          {service.service_name}
                          <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '8px' }}>
                            ({service.duration_minutes || 60} min)
                          </span>
                        </span>
                        <span style={styles.priceValue}>${fmt(service.base_price || 0)}</span>
                      </div>
                    ))
                  ) : (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>{selectedBooking.service_name}</span>
                      <span style={styles.priceValue}>
                        {(() => {
                          // Find the service to get base price
                          const service = services.find(s => s.id === selectedBooking.service_id);
                          if (service) {
                            return `$${fmt(service.base_price || 0)}`;
                          }
                          return 'Base price';
                        })()}
                      </span>
                    </div>
                  )}

                  {/* Vehicle Type Upcharge */}
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

                  {/* Mobile Service Upcharge */}
                  {selectedBooking.service_location === 'mobile' && (
                    <div style={styles.priceRow}>
                      <span style={styles.priceLabel}>Mobile Service Fee</span>
                      <span style={styles.priceValue}>+$50.00</span>
                    </div>
                  )}

                  {/* Pickup & Delivery Charge */}
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

                  {/* Total */}
                  <div style={{...styles.priceRow, ...styles.totalRow}}>
                    <span style={styles.totalLabel}>TOTAL</span>
                    <span style={styles.totalPrice}>${fmt(selectedBooking.total_price || 0)}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={styles.notesSection}>
                  <h3 style={styles.infoTitle}>Notes</h3>
                  <p style={styles.notesText}>{selectedBooking.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={styles.modalActions}>
                <button onClick={() => openEditBooking(selectedBooking)} style={styles.editBtn} data-testid="edit-booking-btn">
                  <Edit2 size={16} /> Edit Booking
                </button>
                <button onClick={() => deleteBooking(selectedBooking.id)} style={styles.deleteBtn} data-testid="delete-booking-btn">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Booking Modal */}
      {showEditModal && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.editModal} onClick={(e) => e.stopPropagation()} data-testid="booking-form-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingBooking ? 'EDIT BOOKING' : 'ADD NEW BOOKING'}
              </h2>
              <button onClick={() => setShowEditModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {error && (
                <div style={styles.errorBox}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Customer Info */}
              <div style={styles.formSection}>
                <h3 style={styles.formSectionTitle}>Customer Information</h3>

                {/* Customer Search */}
                <div ref={customerSearchRef} style={{ position: 'relative', marginBottom: '16px' }}>
                  <label style={styles.formLabel}>Search Existing Customer</label>
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#525252' }} />
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => searchCustomers(e.target.value)}
                      onFocus={() => { if (customerResults.length > 0) setShowCustomerDropdown(true); }}
                      style={{ ...styles.formInput, paddingLeft: '38px' }}
                      placeholder="Type name, email, or phone..."
                      data-testid="customer-search-input"
                    />
                    {customerSearchLoading && (
                      <Loader2 size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ababab', animation: 'spin 1s linear infinite' }} />
                    )}
                  </div>
                  {showCustomerDropdown && (
                    <div style={styles.customerDropdown}>
                      {customerResults.map(customer => (
                        <button
                          key={customer.id}
                          onClick={() => selectCustomer(customer)}
                          style={styles.customerOption}
                          data-testid={`customer-option-${customer.id}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={styles.customerAvatar}>
                              <User size={14} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={styles.customerOptionName}>
                                {customer.first_name} {customer.last_name}
                              </div>
                              <div style={styles.customerOptionDetails}>
                                {customer.email} {customer.phone ? `· ${customer.phone}` : ''}
                              </div>
                            </div>
                            <div style={styles.customerBookingCount}>
                              {customer.total_bookings || 0} booking{(customer.total_bookings || 0) !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>First Name *</label>
                    <input
                      type="text"
                      value={bookingForm.customer_first_name}
                      onChange={(e) => setBookingForm({...bookingForm, customer_first_name: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-first-name"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Last Name *</label>
                    <input
                      type="text"
                      value={bookingForm.customer_last_name}
                      onChange={(e) => setBookingForm({...bookingForm, customer_last_name: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-last-name"
                    />
                  </div>
                </div>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone *</label>
                    <input
                      type="tel"
                      value={bookingForm.customer_phone}
                      onChange={(e) => setBookingForm({...bookingForm, customer_phone: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-phone"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email *</label>
                    <input
                      type="email"
                      value={bookingForm.customer_email}
                      onChange={(e) => setBookingForm({...bookingForm, customer_email: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-email"
                    />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Address</label>
                  <input
                    type="text"
                    value={bookingForm.customer_address}
                    onChange={(e) => setBookingForm({...bookingForm, customer_address: e.target.value})}
                    style={styles.formInput}
                    data-testid="booking-address"
                  />
                </div>
              </div>

              {/* Vehicle Info */}
              <div style={styles.formSection}>
                <h3 style={styles.formSectionTitle}>Vehicle Information</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Year</label>
                    <input
                      type="text"
                      value={bookingForm.vehicle_year}
                      onChange={(e) => setBookingForm({...bookingForm, vehicle_year: e.target.value})}
                      style={styles.formInput}
                      placeholder="2024"
                      data-testid="booking-vehicle-year"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Make</label>
                    <input
                      type="text"
                      value={bookingForm.vehicle_make}
                      onChange={(e) => setBookingForm({...bookingForm, vehicle_make: e.target.value})}
                      style={styles.formInput}
                      placeholder="Toyota"
                      data-testid="booking-vehicle-make"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Model</label>
                    <input
                      type="text"
                      value={bookingForm.vehicle_model}
                      onChange={(e) => setBookingForm({...bookingForm, vehicle_model: e.target.value})}
                      style={styles.formInput}
                      placeholder="Camry"
                      data-testid="booking-vehicle-model"
                    />
                  </div>
                </div>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Vehicle Type</label>
                    <select
                      value={bookingForm.vehicle_type}
                      onChange={(e) => setBookingForm({...bookingForm, vehicle_type: e.target.value})}
                      style={styles.formSelect}
                      data-testid="booking-vehicle-type"
                    >
                      {VEHICLE_TYPES.map(vt => (
                        <option key={vt.id} value={vt.id}>{vt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Color</label>
                    <input
                      type="text"
                      value={bookingForm.vehicle_color}
                      onChange={(e) => setBookingForm({...bookingForm, vehicle_color: e.target.value})}
                      style={styles.formInput}
                      placeholder="Black"
                      data-testid="booking-vehicle-color"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Appointment */}
              <div style={styles.formSection}>
                <h3 style={styles.formSectionTitle}>Service & Appointment</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Service *</label>
                    <select
                      value={bookingForm.service_id}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      style={styles.formSelect}
                      data-testid="booking-service"
                    >
                      <option value="">Select a service...</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.name} - ${fmt(s.base_price || 0)}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Location</label>
                    <select
                      value={bookingForm.service_location}
                      onChange={(e) => setBookingForm({...bookingForm, service_location: e.target.value})}
                      style={styles.formSelect}
                      data-testid="booking-location"
                    >
                      <option value="shop">In Shop</option>
                      <option value="mobile">Mobile Service</option>
                    </select>
                  </div>
                </div>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Date *</label>
                    <input
                      type="date"
                      value={bookingForm.booking_date}
                      onChange={(e) => setBookingForm({...bookingForm, booking_date: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-date"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Time *</label>
                    <input
                      type="time"
                      value={bookingForm.booking_time}
                      onChange={(e) => setBookingForm({...bookingForm, booking_time: e.target.value})}
                      style={styles.formInput}
                      data-testid="booking-time"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Price ($)</label>
                    <input
                      type="number"
                      value={bookingForm.total_price}
                      onChange={(e) => setBookingForm({...bookingForm, total_price: parseFloat(e.target.value) || 0})}
                      style={styles.formInput}
                      min="0"
                      step="0.01"
                      data-testid="booking-price"
                    />
                  </div>
                </div>
                {editingBooking && (
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Status</label>
                    <select
                      value={bookingForm.status}
                      onChange={(e) => setBookingForm({...bookingForm, status: e.target.value})}
                      style={styles.formSelect}
                      data-testid="booking-status"
                    >
                      {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Notes</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  style={styles.formTextarea}
                  rows={3}
                  placeholder="Any special requests or notes..."
                  data-testid="booking-notes"
                />
              </div>

              {/* Form Actions */}
              <div style={styles.formActions}>
                <button onClick={() => setShowEditModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={saveBooking} disabled={saving} style={styles.saveBtn} data-testid="save-booking-btn">
                  {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  {editingBooking ? 'Update Booking' : 'Create Booking'}
                </button>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '1px',
    cursor: 'pointer',
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
    userSelect: 'all',
  },
  fullIdLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#6b7280',
    marginLeft: 'auto',
    userSelect: 'all',
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
  },
  totalLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
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
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #262626',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#3b82f6',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  editModal: {
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    background: '#0a0a0a',
    border: '1px solid #262626',
    overflow: 'auto',
  },
  formSection: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #262626',
  },
  formSectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#e80200',
    margin: '0 0 16px 0',
    letterSpacing: '1px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#ababab',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  formInput: {
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
  formSelect: {
    width: '100%',
    padding: '12px 14px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  formTextarea: {
    width: '100%',
    padding: '12px 14px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  cancelBtn: {
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '1px',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '20px',
    fontFamily: "'Montserrat', sans-serif",
  },
  customerDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#111111',
    border: '1px solid #262626',
    borderTop: 'none',
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 10,
  },
  customerOption: {
    width: '100%',
    padding: '12px 14px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #1a1a1a',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.15s ease',
    color: '#fff',
  },
  customerAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(232, 2, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#e80200',
    flexShrink: 0,
  },
  customerOptionName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  customerOptionDetails: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  customerBookingCount: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#ababab',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  paidBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    background: 'transparent',
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
