import React, { useState, useEffect } from 'react';
import { Search, FileText, Eye, Trash2, Loader2, X, Phone, Mail, User, Calendar, Car } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

const STATUS_COLORS = {
  new: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', label: 'New' },
  contacted: { bg: 'rgba(234, 179, 8, 0.15)', color: '#eab308', label: 'Contacted' },
  closed: { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', label: 'Closed' },
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/quotes`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to fetch quotes');
      const data = await response.json();
      setQuotes(data.quotes);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (quoteId, status) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/quotes/${quoteId}/status?status=${status}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        fetchQuotes();
        if (selectedQuote && selectedQuote._id === quoteId) {
          setSelectedQuote({ ...selectedQuote, status });
        }
      }
    } catch (err) {
      console.error('Error updating quote status:', err);
    }
  };

  const deleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/quotes/${quoteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.ok) {
        fetchQuotes();
        if (selectedQuote?._id === quoteId) {
          setShowModal(false);
          setSelectedQuote(null);
        }
      }
    } catch (err) {
      console.error('Error deleting quote:', err);
    }
  };

  const viewQuote = (quote) => {
    setSelectedQuote(quote);
    setShowModal(true);
    if (!quote.seen_by_admin) {
      updateStatus(quote._id, quote.status || 'new');
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const name = `${q.first_name} ${q.last_name}`.toLowerCase();
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm) ||
      q.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || q.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const newCount = quotes.filter(q => q.status === 'new').length;

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading quote requests...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>QUOTE REQUESTS</h1>
          <p style={styles.subtitle}>
            {newCount} new request{newCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={styles.filtersRow}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterGroup}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Quotes</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div style={styles.emptyState}>
          <FileText size={48} style={{ color: '#525252' }} />
          <h3 style={styles.emptyTitle}>No Quote Requests</h3>
          <p style={styles.emptyText}>There are no quote requests to display</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>STATUS</th>
                <th style={styles.th}>NAME</th>
                <th style={styles.th}>SERVICE</th>
                <th style={styles.th}>CONTACT</th>
                <th style={styles.th}>DESCRIPTION</th>
                <th style={styles.th}>DATE</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => {
                const statusInfo = STATUS_COLORS[quote.status] || STATUS_COLORS.new;
                return (
                  <tr key={quote._id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, background: statusInfo.bg, color: statusInfo.color }}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.customerName}>{quote.first_name} {quote.last_name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.serviceType}>{quote.service_type}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.contactCell}>
                        <span>{quote.email}</span>
                        <span style={styles.phone}>{quote.phone}</span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.messagePreview}>
                        {quote.description.substring(0, 60)}
                        {quote.description.length > 60 && '...'}
                      </div>
                    </td>
                    <td style={styles.td}>
                      {new Date(quote.created_at).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionsCell}>
                        <button onClick={() => viewQuote(quote)} style={styles.viewBtn}>
                          <Eye size={14} /> View
                        </button>
                        <button onClick={() => deleteQuote(quote._id)} style={styles.deleteBtn}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quote Detail Modal */}
      {showModal && selectedQuote && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Quote Request</h2>
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
                    <div style={styles.infoValue}>{selectedQuote.first_name} {selectedQuote.last_name}</div>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <FileText size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Service Type</div>
                    <div style={{ ...styles.infoValue, textTransform: 'capitalize' }}>{selectedQuote.service_type}</div>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <Mail size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Email</div>
                    <a href={`mailto:${selectedQuote.email}`} style={styles.infoLink}>{selectedQuote.email}</a>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <Phone size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Phone</div>
                    <a href={`tel:${selectedQuote.phone}`} style={styles.infoLink}>{selectedQuote.phone}</a>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <Calendar size={16} style={styles.infoIcon} />
                  <div>
                    <div style={styles.infoLabel}>Received</div>
                    <div style={styles.infoValue}>{new Date(selectedQuote.created_at).toLocaleString()}</div>
                  </div>
                </div>
                {selectedQuote.service_type === 'automotive' && (selectedQuote.vehicle_year || selectedQuote.vehicle_make || selectedQuote.vehicle_model) && (
                  <div style={styles.infoItem}>
                    <Car size={16} style={styles.infoIcon} />
                    <div>
                      <div style={styles.infoLabel}>Vehicle</div>
                      <div style={styles.infoValue}>
                        {[selectedQuote.vehicle_year, selectedQuote.vehicle_make, selectedQuote.vehicle_model].filter(Boolean).join(' ')}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.messageSection}>
                <div style={styles.messageLabel}>DESCRIPTION</div>
                <div style={styles.messageText}>{selectedQuote.description}</div>
              </div>

              <div style={styles.statusSection}>
                <div style={styles.messageLabel}>STATUS</div>
                <div style={styles.statusBtnGroup}>
                  {Object.entries(STATUS_COLORS).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(selectedQuote._id, key)}
                      style={{
                        ...styles.statusBtn,
                        background: selectedQuote.status === key ? info.bg : 'transparent',
                        color: selectedQuote.status === key ? info.color : '#ababab',
                        border: selectedQuote.status === key ? `1px solid ${info.color}` : '1px solid #262626',
                      }}
                    >
                      {info.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.modalActions}>
                <button onClick={() => deleteQuote(selectedQuote._id)} style={styles.deleteActionBtn}>
                  <Trash2 size={16} /> Delete
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
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  customerName: {
    fontWeight: 600,
    color: '#fff',
  },
  serviceType: {
    textTransform: 'capitalize',
    color: '#ababab',
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
  statusSection: {
    marginBottom: '24px',
  },
  statusBtnGroup: {
    display: 'flex',
    gap: '10px',
  },
  statusBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
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
