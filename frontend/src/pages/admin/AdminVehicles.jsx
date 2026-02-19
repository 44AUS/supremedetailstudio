import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, Car, Search, Upload } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    is_active: true
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles`);
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormData({ year: '', make: '', model: '', is_active: true });
    setShowForm(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      year: vehicle.year || '',
      make: vehicle.make || '',
      model: vehicle.model || '',
      is_active: vehicle.is_active !== false
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.year || !formData.make || !formData.model) {
      alert('Year, make, and model are required');
      return;
    }

    setSaving(true);
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingVehicle
        ? `${API_URL}/api/vehicles/${editingVehicle.id}`
        : `${API_URL}/api/vehicles`;
      const method = editingVehicle ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchVehicles();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to save vehicle');
      }
    } catch (err) {
      alert('Error saving vehicle');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchVehicles();
      }
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkText.trim()) {
      alert('Please enter vehicle data');
      return;
    }

    const lines = bulkText.trim().split('\n');
    const vehiclesToAdd = [];

    for (const line of lines) {
      const parts = line.trim().split(/[,\t]+/);
      if (parts.length >= 3) {
        vehiclesToAdd.push({
          year: parts[0].trim(),
          make: parts[1].trim(),
          model: parts[2].trim(),
          is_active: true
        });
      }
    }

    if (vehiclesToAdd.length === 0) {
      alert('No valid vehicles found. Format: Year, Make, Model (one per line)');
      return;
    }

    setSaving(true);
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_URL}/api/vehicles/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vehiclesToAdd)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchVehicles();
        setShowBulkModal(false);
        setBulkText('');
      } else {
        throw new Error('Bulk import failed');
      }
    } catch (err) {
      alert('Error importing vehicles');
    } finally {
      setSaving(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const search = searchTerm.toLowerCase();
    return (
      v.year?.toLowerCase().includes(search) ||
      v.make?.toLowerCase().includes(search) ||
      v.model?.toLowerCase().includes(search)
    );
  });

  // Group by make
  const groupedVehicles = filteredVehicles.reduce((acc, v) => {
    const make = v.make || 'Other';
    if (!acc[make]) acc[make] = [];
    acc[make].push(v);
    return acc;
  }, {});

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Vehicle Management</h1>
          <p style={styles.subtitle}>
            Manage the vehicles that customers can select during booking.
            {vehicles.length > 0 && <span> ({vehicles.length} vehicles)</span>}
          </p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => setShowBulkModal(true)} style={styles.bulkBtn} data-testid="bulk-import-btn">
            <Upload size={18} />
            Bulk Import
          </button>
          <button onClick={handleAdd} style={styles.addBtn} data-testid="add-vehicle-btn">
            <Plus size={18} />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchBar}>
        <Search size={18} style={{ color: '#525252' }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search vehicles..."
          style={styles.searchInput}
          data-testid="vehicle-search"
        />
      </div>

      {/* Vehicle List */}
      {Object.keys(groupedVehicles).length > 0 ? (
        <div style={styles.makeGroups}>
          {Object.entries(groupedVehicles).sort().map(([make, makeVehicles]) => (
            <div key={make} style={styles.makeGroup}>
              <h3 style={styles.makeTitle}>{make}</h3>
              <div style={styles.vehicleGrid}>
                {makeVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    style={{
                      ...styles.vehicleCard,
                      opacity: vehicle.is_active ? 1 : 0.5
                    }}
                    data-testid={`vehicle-${vehicle.id}`}
                  >
                    <div style={styles.vehicleInfo}>
                      <div style={styles.vehicleYear}>{vehicle.year}</div>
                      <div style={styles.vehicleModel}>{vehicle.model}</div>
                      {!vehicle.is_active && <span style={styles.inactiveBadge}>Inactive</span>}
                    </div>
                    <div style={styles.vehicleActions}>
                      <button onClick={() => handleEdit(vehicle)} style={styles.editBtn}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(vehicle.id)} style={styles.deleteBtn}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <Car size={48} style={{ opacity: 0.3 }} />
          <p>No vehicles found. Add vehicles to show on the booking page.</p>
          <p style={styles.emptyHint}>
            Tip: Use "Bulk Import" to add multiple vehicles at once.
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
              </h2>
              <button onClick={() => setShowForm(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., 2024"
                  data-testid="vehicle-year-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Make</label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Toyota"
                  data-testid="vehicle-make-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Camry"
                  data-testid="vehicle-model-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={styles.checkbox}
                    data-testid="vehicle-active-toggle"
                  />
                  <span>Active (visible on booking page)</span>
                </label>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={styles.saveBtn} data-testid="save-vehicle-btn">
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Bulk Import Vehicles</h2>
              <button onClick={() => setShowBulkModal(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <p style={styles.bulkHint}>
                Enter one vehicle per line in format: <strong>Year, Make, Model</strong>
              </p>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                style={styles.textarea}
                placeholder="2024, Toyota, Camry
2024, Honda, Accord
2023, Ford, F-150
2024, Tesla, Model 3"
                rows={10}
                data-testid="bulk-import-textarea"
              />
            </div>

            <div style={styles.modalFooter}>
              <button onClick={() => setShowBulkModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleBulkImport} disabled={saving} style={styles.saveBtn} data-testid="bulk-import-submit">
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                {saving ? 'Importing...' : 'Import Vehicles'}
              </button>
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
  page: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
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
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  bulkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 600,
    background: 'transparent',
    color: '#fff',
    border: '1px solid #262626',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#111111',
    border: '1px solid #262626',
    marginBottom: '24px',
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'Montserrat', sans-serif",
  },
  makeGroups: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  makeGroup: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '20px',
  },
  makeTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#e80200',
    margin: '0 0 16px 0',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  vehicleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  vehicleCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  vehicleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  vehicleYear: {
    fontSize: '12px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  vehicleModel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  inactiveBadge: {
    fontSize: '10px',
    color: '#e80200',
    marginTop: '4px',
    fontFamily: "'Montserrat', sans-serif",
  },
  vehicleActions: {
    display: 'flex',
    gap: '6px',
  },
  editBtn: {
    padding: '6px',
    background: 'rgba(59, 130, 246, 0.2)',
    border: 'none',
    color: '#60a5fa',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px',
    background: 'rgba(232, 2, 0, 0.2)',
    border: 'none',
    color: '#e80200',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
  },
  emptyHint: {
    fontSize: '13px',
    marginTop: '8px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#111111',
    border: '1px solid #262626',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #262626',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#ababab',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
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
  textarea: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
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
  bulkHint: {
    fontSize: '13px',
    color: '#ababab',
    marginBottom: '16px',
    fontFamily: "'Montserrat', sans-serif",
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #262626',
  },
  cancelBtn: {
    padding: '10px 20px',
    fontSize: '14px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
};
