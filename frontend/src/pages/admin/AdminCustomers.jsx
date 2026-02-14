import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, Eye, Edit2, Trash2, Download, Upload, 
  User, Phone, Mail, MapPin, Calendar, DollarSign,
  Tag, X, Loader2, ChevronDown, Clock, Car
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [importData, setImportData] = useState('');
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchCustomers = async (search = '') => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/customers`;
      if (search) url += `?search=${encodeURIComponent(search)}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      fetchCustomers(value);
    }, 300);
  };

  const fetchCustomerBookings = async (customerId) => {
    try {
      const response = await fetch(`${API_URL}/api/customers/${customerId}/bookings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setCustomerBookings(data);
    } catch (err) {
      console.error('Error fetching customer bookings:', err);
      setCustomerBookings([]);
    }
  };

  const openViewModal = async (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
    await fetchCustomerBookings(customer.id);
  };

  const openEditModal = (customer = null) => {
    if (customer) {
      setEditForm({
        id: customer.id,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        notes: customer.notes || '',
        tags: customer.tags?.join(', ') || ''
      });
    } else {
      setEditForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        tags: ''
      });
    }
    setShowEditModal(true);
  };

  const handleSaveCustomer = async () => {
    setSaving(true);
    try {
      const tags = editForm.tags ? editForm.tags.split(',').map(t => t.trim()).filter(t => t) : [];
      const payload = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
        notes: editForm.notes,
        tags
      };

      const isEdit = !!editForm.id;
      const url = isEdit ? `${API_URL}/api/customers/${editForm.id}` : `${API_URL}/api/customers`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to save customer');
      }

      setShowEditModal(false);
      fetchCustomers(searchTerm);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/customers/${customerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to delete customer');
      fetchCustomers(searchTerm);
      if (showViewModal && selectedCustomer?.id === customerId) {
        setShowViewModal(false);
      }
    } catch (err) {
      alert('Failed to delete customer');
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_URL}/api/customers/export/csv`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to export');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export customers');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImportData(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      alert('Please select a CSV file or paste CSV data');
      return;
    }

    setSaving(true);
    setImportResult(null);
    try {
      const response = await fetch(`${API_URL}/api/customers/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ csv_data: importData }),
      });

      if (!response.ok) throw new Error('Failed to import');
      
      const result = await response.json();
      setImportResult(result);
      fetchCustomers(searchTerm);
    } catch (err) {
      alert('Failed to import customers');
    } finally {
      setSaving(false);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      in_progress: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      complete: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      incomplete: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
      cancelled: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
    };
    return styles[status] || styles.pending;
  };

  if (loading && customers.length === 0) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div data-testid="admin-customers">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>CUSTOMERS</h1>
          <p style={styles.subtitle}>{customers.length} total customers</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => setShowImportModal(true)} style={styles.secondaryBtn} data-testid="import-btn">
            <Upload size={16} /> Import
          </button>
          <button onClick={handleExport} style={styles.secondaryBtn} data-testid="export-btn">
            <Download size={16} /> Export
          </button>
          <button onClick={() => openEditModal()} style={styles.primaryBtn} data-testid="add-customer-btn">
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <Search size={18} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
          data-testid="search-customers-input"
        />
      </div>

      {/* Customers Table */}
      {customers.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>CUSTOMER</th>
                <th style={styles.th}>CONTACT</th>
                <th style={styles.th}>BOOKINGS</th>
                <th style={styles.th}>TOTAL SPENT</th>
                <th style={styles.th}>LAST VISIT</th>
                <th style={styles.th}>TAGS</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} style={styles.tableRow} data-testid={`customer-row-${customer.id}`}>
                  <td style={styles.td}>
                    <div style={styles.customerCell}>
                      <span style={styles.customerName}>
                        {customer.first_name} {customer.last_name}
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.contactCell}>
                      <span style={styles.contactEmail}>{customer.email}</span>
                      <span style={styles.contactPhone}>{customer.phone}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.bookingsCount}>{customer.total_bookings || 0}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.totalSpent}>${(customer.total_spent || 0).toFixed(2)}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.lastVisit}>
                      {customer.last_booking_date ? new Date(customer.last_booking_date).toLocaleDateString() : '-'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.tagsCell}>
                      {customer.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} style={styles.tag}>{tag}</span>
                      ))}
                      {customer.tags?.length > 2 && (
                        <span style={styles.moreTag}>+{customer.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button onClick={() => openViewModal(customer)} style={styles.actionBtn} data-testid={`view-customer-${customer.id}`}>
                        <Eye size={16} />
                      </button>
                      <button onClick={() => openEditModal(customer)} style={styles.actionBtn} data-testid={`edit-customer-${customer.id}`}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteCustomer(customer.id)} style={styles.deleteBtn} data-testid={`delete-customer-${customer.id}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <User size={48} style={{ color: '#525252' }} />
          <h3 style={styles.emptyTitle}>No customers found</h3>
          <p style={styles.emptyText}>
            {searchTerm ? 'Try adjusting your search' : 'Customers will appear here when bookings are made'}
          </p>
        </div>
      )}

      {/* View Customer Modal */}
      {showViewModal && selectedCustomer && (
        <div style={styles.modalOverlay} onClick={() => setShowViewModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()} data-testid="customer-view-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>CUSTOMER DETAILS</h2>
              <button onClick={() => setShowViewModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {/* Customer Info */}
              <div style={styles.customerHeader}>
                <div style={styles.customerAvatar}>
                  {selectedCustomer.first_name?.[0]}{selectedCustomer.last_name?.[0]}
                </div>
                <div>
                  <h3 style={styles.customerFullName}>
                    {selectedCustomer.first_name} {selectedCustomer.last_name}
                  </h3>
                  <p style={styles.customerSince}>
                    Customer since {selectedCustomer.first_booking_date ? new Date(selectedCustomer.first_booking_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div style={styles.statsRow}>
                <div style={styles.statBox}>
                  <Calendar size={20} style={{ color: '#3b82f6' }} />
                  <span style={styles.statValue}>{selectedCustomer.total_bookings || 0}</span>
                  <span style={styles.statLabel}>Total Visits</span>
                </div>
                <div style={styles.statBox}>
                  <DollarSign size={20} style={{ color: '#10b981' }} />
                  <span style={styles.statValue}>${(selectedCustomer.total_spent || 0).toFixed(2)}</span>
                  <span style={styles.statLabel}>Total Spent</span>
                </div>
                <div style={styles.statBox}>
                  <Clock size={20} style={{ color: '#f59e0b' }} />
                  <span style={styles.statValue}>
                    {selectedCustomer.last_booking_date ? new Date(selectedCustomer.last_booking_date).toLocaleDateString() : '-'}
                  </span>
                  <span style={styles.statLabel}>Last Visit</span>
                </div>
              </div>

              {/* Contact Info */}
              <div style={styles.infoSection}>
                <h4 style={styles.sectionTitle}>Contact Information</h4>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={14} style={{ color: '#ababab' }} />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={14} style={{ color: '#ababab' }} />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  {selectedCustomer.address && (
                    <div style={styles.infoItem}>
                      <MapPin size={14} style={{ color: '#ababab' }} />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {selectedCustomer.tags?.length > 0 && (
                <div style={styles.infoSection}>
                  <h4 style={styles.sectionTitle}>Tags</h4>
                  <div style={styles.tagsList}>
                    {selectedCustomer.tags.map((tag, i) => (
                      <span key={i} style={styles.tagLarge}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCustomer.notes && (
                <div style={styles.infoSection}>
                  <h4 style={styles.sectionTitle}>Notes</h4>
                  <p style={styles.notesText}>{selectedCustomer.notes}</p>
                </div>
              )}

              {/* Booking History */}
              <div style={styles.infoSection}>
                <h4 style={styles.sectionTitle}>Booking History</h4>
                {customerBookings.length > 0 ? (
                  <div style={styles.bookingsList}>
                    {customerBookings.map((booking) => {
                      const statusStyle = getStatusStyle(booking.status);
                      return (
                        <div key={booking.id} style={styles.bookingItem}>
                          <div style={styles.bookingMain}>
                            <div style={styles.bookingService}>
                              <Car size={16} style={{ color: '#e80200' }} />
                              <span>{booking.service_name}</span>
                            </div>
                            <div style={styles.bookingMeta}>
                              <span>{booking.booking_date} at {booking.booking_time}</span>
                              <span style={{ color: '#ababab' }}>
                                {booking.vehicle_year} {booking.vehicle_make} {booking.vehicle_model}
                              </span>
                            </div>
                          </div>
                          <div style={styles.bookingRight}>
                            <span style={{
                              ...styles.statusBadge,
                              background: statusStyle.bg,
                              color: statusStyle.color,
                            }}>
                              {booking.status?.replace('_', ' ')}
                            </span>
                            <span style={styles.bookingPrice}>${booking.total_price?.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={styles.noBookings}>No bookings found</p>
                )}
              </div>

              {/* Actions */}
              <div style={styles.modalActions}>
                <button onClick={() => { setShowViewModal(false); openEditModal(selectedCustomer); }} style={styles.editBtn}>
                  <Edit2 size={16} /> Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Customer Modal */}
      {showEditModal && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.modalSmall} onClick={(e) => e.stopPropagation()} data-testid="customer-edit-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{editForm.id ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}</h2>
              <button onClick={() => setShowEditModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name *</label>
                  <input
                    type="text"
                    value={editForm.first_name}
                    onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                    style={styles.input}
                    data-testid="customer-first-name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name *</label>
                  <input
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                    style={styles.input}
                    data-testid="customer-last-name"
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={styles.input}
                  data-testid="customer-email"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone *</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  style={styles.input}
                  data-testid="customer-phone"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  style={styles.input}
                  data-testid="customer-address"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Tags (comma separated)</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  placeholder="VIP, Repeat, Referral"
                  style={styles.input}
                  data-testid="customer-tags"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Notes</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  style={styles.textarea}
                  rows={3}
                  data-testid="customer-notes"
                />
              </div>

              <div style={styles.formActions}>
                <button onClick={() => setShowEditModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={handleSaveCustomer} disabled={saving} style={styles.saveBtn} data-testid="save-customer-btn">
                  {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                  {editForm.id ? 'Update Customer' : 'Add Customer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div style={styles.modalOverlay} onClick={() => setShowImportModal(false)}>
          <div style={styles.modalSmall} onClick={(e) => e.stopPropagation()} data-testid="import-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>IMPORT CUSTOMERS</h2>
              <button onClick={() => setShowImportModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <p style={styles.importInfo}>
                Upload a CSV file with columns: First Name, Last Name, Email, Phone, Address, Notes, Tags
              </p>
              
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              <button onClick={() => fileInputRef.current?.click()} style={styles.uploadBtn}>
                <Upload size={16} /> Select CSV File
              </button>
              
              <p style={styles.orText}>OR paste CSV data below:</p>
              
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="First Name,Last Name,Email,Phone,Address,Notes,Tags&#10;John,Doe,john@email.com,555-1234,123 Main St,Great customer,VIP"
                style={styles.importTextarea}
                rows={6}
                data-testid="import-csv-data"
              />

              {importResult && (
                <div style={styles.importResult}>
                  <span style={{ color: '#10b981' }}>Imported: {importResult.imported}</span>
                  <span style={{ color: '#f59e0b' }}>Skipped: {importResult.skipped}</span>
                </div>
              )}

              <div style={styles.formActions}>
                <button onClick={() => setShowImportModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={handleImport} disabled={saving} style={styles.saveBtn} data-testid="import-submit-btn">
                  {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                  Import Customers
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
    flexWrap: 'wrap',
    gap: '16px',
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
  headerActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
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
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '1px',
    cursor: 'pointer',
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
  searchContainer: {
    position: 'relative',
    marginBottom: '24px',
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
    maxWidth: '400px',
    padding: '12px 14px 12px 44px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
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
  },
  customerName: {
    fontWeight: 600,
    color: '#fff',
  },
  contactCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  contactEmail: {
    fontSize: '13px',
    color: '#fff',
  },
  contactPhone: {
    fontSize: '12px',
    color: '#ababab',
  },
  bookingsCount: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 600,
    color: '#3b82f6',
  },
  totalSpent: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#10b981',
  },
  lastVisit: {
    fontSize: '13px',
    color: '#ababab',
  },
  tagsCell: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '4px 8px',
    background: 'rgba(232, 2, 0, 0.1)',
    color: '#e80200',
    fontSize: '11px',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
  },
  moreTag: {
    padding: '4px 8px',
    background: '#262626',
    color: '#ababab',
    fontSize: '11px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '8px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  deleteBtn: {
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
  },
  emptyText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
    margin: 0,
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
    maxWidth: '700px',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: '#111111',
    border: '1px solid #262626',
  },
  modalSmall: {
    width: '100%',
    maxWidth: '500px',
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
  customerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  customerAvatar: {
    width: '64px',
    height: '64px',
    background: '#e80200',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
  },
  customerFullName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 4px 0',
  },
  customerSince: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
    margin: 0,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  statValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
  },
  statLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#ababab',
    textTransform: 'uppercase',
  },
  infoSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#e80200',
    margin: '0 0 12px 0',
    letterSpacing: '0.5px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  tagsList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tagLarge: {
    padding: '6px 12px',
    background: 'rgba(232, 2, 0, 0.1)',
    color: '#e80200',
    fontSize: '12px',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.5px',
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
  bookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bookingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  bookingMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  bookingService: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  bookingMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    color: '#fff',
  },
  bookingRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  statusBadge: {
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: "'Oswald', sans-serif",
    textTransform: 'uppercase',
  },
  bookingPrice: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
  },
  noBookings: {
    padding: '20px',
    textAlign: 'center',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },
  modalActions: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #262626',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#ababab',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    background: '#0a0a0a',
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
    justifyContent: 'flex-end',
    gap: '12px',
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
    fontWeight: 600,
    cursor: 'pointer',
  },
  importInfo: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#ababab',
    marginBottom: '16px',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'center',
  },
  orText: {
    textAlign: 'center',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    margin: '16px 0',
  },
  importTextarea: {
    width: '100%',
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '13px',
    fontFamily: 'monospace',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  importResult: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '16px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
  },
};
