import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, Car, Search, Upload, ChevronRight, ChevronDown } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const VEHICLE_TYPE_BADGES = {
  'sedan':    { label: 'Sedan', bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  'suv-2row': { label: '2-Row SUV', bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  'suv-3row': { label: '3-Row SUV', bg: 'rgba(249,115,22,0.15)', color: '#fb923c' },
  'aircraft': { label: 'Aircraft', bg: 'rgba(168,85,247,0.15)', color: '#a855f7' },
};

export default function AdminVehicles() {
  const [makes, setMakes] = useState([]);
  const [makeCounts, setMakeCounts] = useState({});
  const [expandedMakes, setExpandedMakes] = useState({});
  const [expandedYears, setExpandedYears] = useState({});
  const [makeVehicles, setMakeVehicles] = useState({});
  const [loadingMakes, setLoadingMakes] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [formData, setFormData] = useState({
    year: '', make: '', model: '', trim: '', vehicle_type: 'sedan', is_active: true
  });

  useEffect(() => {
    fetchMakes();
    fetchTotalCount();
  }, []);

  const fetchMakes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/makes`);
      if (response.ok) {
        const data = await response.json();
        setMakes(data);
      }
    } catch (err) {
      console.error('Error fetching makes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/count`);
      if (response.ok) {
        const data = await response.json();
        setTotalCount(data.count);
      }
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  const fetchMakeVehicles = async (make) => {
    setLoadingMakes(prev => ({ ...prev, [make]: true }));
    try {
      const response = await fetch(`${API_URL}/api/vehicles?make=${encodeURIComponent(make)}`);
      if (response.ok) {
        const data = await response.json();
        setMakeVehicles(prev => ({ ...prev, [make]: data }));
        setMakeCounts(prev => ({ ...prev, [make]: data.length }));
      }
    } catch (err) {
      console.error('Error fetching vehicles for make:', err);
    } finally {
      setLoadingMakes(prev => ({ ...prev, [make]: false }));
    }
  };

  const toggleMake = (make) => {
    const isExpanding = !expandedMakes[make];
    setExpandedMakes(prev => ({ ...prev, [make]: isExpanding }));
    if (isExpanding && !makeVehicles[make]) {
      fetchMakeVehicles(make);
    }
  };

  const toggleYear = (make, year) => {
    const key = `${make}-${year}`;
    setExpandedYears(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Search with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }
    const timeout = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/vehicles?limit=200`);
        if (response.ok) {
          const data = await response.json();
          const q = searchTerm.toLowerCase();
          const filtered = data.filter(v =>
            (v.year || '').toLowerCase().includes(q) ||
            (v.make || '').toLowerCase().includes(q) ||
            (v.model || '').toLowerCase().includes(q) ||
            (v.trim || '').toLowerCase().includes(q)
          );
          setSearchResults(filtered.slice(0, 100));
        }
      } catch (err) {
        console.error('Error searching:', err);
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormData({ year: '', make: '', model: '', trim: '', vehicle_type: 'sedan', is_active: true });
    setShowForm(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      year: vehicle.year || '',
      make: vehicle.make || '',
      model: vehicle.model || '',
      trim: vehicle.trim || '',
      vehicle_type: vehicle.vehicle_type || 'sedan',
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
    const payload = { ...formData };
    if (!payload.trim) payload.trim = null;

    try {
      const url = editingVehicle
        ? `${API_URL}/api/vehicles/${editingVehicle.id}`
        : `${API_URL}/api/vehicles`;
      const method = editingVehicle ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowForm(false);
        // Refresh the make's vehicles if expanded
        if (makeVehicles[formData.make]) {
          fetchMakeVehicles(formData.make);
        }
        if (editingVehicle && editingVehicle.make !== formData.make && makeVehicles[editingVehicle.make]) {
          fetchMakeVehicles(editingVehicle.make);
        }
        fetchMakes();
        fetchTotalCount();
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

  const handleDelete = async (vehicle) => {
    if (!window.confirm(`Delete ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ' ' + vehicle.trim : ''}?`)) return;
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/vehicles/${vehicle.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        if (makeVehicles[vehicle.make]) {
          fetchMakeVehicles(vehicle.make);
        }
        fetchTotalCount();
      }
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkText.trim()) { alert('Please enter vehicle data'); return; }
    const lines = bulkText.trim().split('\n');
    const vehiclesToAdd = [];
    for (const line of lines) {
      const parts = line.trim().split(/[,\t]+/);
      if (parts.length >= 3) {
        vehiclesToAdd.push({
          year: parts[0].trim(),
          make: parts[1].trim(),
          model: parts[2].trim(),
          trim: parts[3]?.trim() || null,
          vehicle_type: parts[4]?.trim() || 'sedan',
          is_active: true
        });
      }
    }
    if (vehiclesToAdd.length === 0) {
      alert('No valid vehicles found. Format: Year, Make, Model, Trim (optional), Type (optional)');
      return;
    }
    setSaving(true);
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/vehicles/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(vehiclesToAdd)
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchMakes();
        fetchTotalCount();
        setShowBulkModal(false);
        setBulkText('');
      } else { throw new Error('Bulk import failed'); }
    } catch (err) { alert('Error importing vehicles'); }
    finally { setSaving(false); }
  };

  // Get year groups for a make
  const getYearGroups = (make) => {
    const vehicles = makeVehicles[make] || [];
    const groups = {};
    vehicles.forEach(v => {
      const y = v.year || 'Unknown';
      if (!groups[y]) groups[y] = [];
      groups[y].push(v);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  };

  const filteredMakes = !searchTerm.trim()
    ? makes
    : makes.filter(m => m.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  const renderVehicleCard = (vehicle) => {
    const badge = VEHICLE_TYPE_BADGES[vehicle.vehicle_type] || VEHICLE_TYPE_BADGES['sedan'];
    return (
      <div
        key={vehicle.id}
        style={{ ...styles.vehicleCard, opacity: vehicle.is_active === false ? 0.5 : 1 }}
      >
        <div style={styles.vehicleInfo}>
          <div style={styles.vehicleYear}>{vehicle.year}</div>
          <div style={styles.vehicleModel}>
            {vehicle.model}
            {vehicle.trim && <span style={styles.vehicleTrim}> {vehicle.trim}</span>}
          </div>
          <div style={styles.badgeRow}>
            <span style={{ ...styles.typeBadge, background: badge.bg, color: badge.color }}>
              {badge.label}
            </span>
            {vehicle.is_active === false && <span style={styles.inactiveBadge}>Inactive</span>}
          </div>
        </div>
        <div style={styles.vehicleActions}>
          <button onClick={() => handleEdit(vehicle)} style={styles.editBtn}><Edit2 size={14} /></button>
          <button onClick={() => handleDelete(vehicle)} style={styles.deleteBtn}><Trash2 size={14} /></button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#fff' }} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Vehicle Management</h1>
          <p style={styles.subtitle}>
            {totalCount > 0 ? `${totalCount.toLocaleString()} vehicles across ${makes.length} makes` : 'Manage vehicles for booking'}
          </p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => setShowBulkModal(true)} style={styles.bulkBtn}>
            <Upload size={18} /> Bulk Import
          </button>
          <button onClick={handleAdd} style={styles.addBtn}>
            <Plus size={18} /> Add Vehicle
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
          placeholder="Search by make, model, year, or trim..."
          style={styles.searchInput}
        />
        {searchLoading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite', color: '#525252' }} />}
      </div>

      {/* Search Results */}
      {searchResults !== null ? (
        <div>
          <p style={{ ...styles.subtitle, marginBottom: '16px' }}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
          {searchResults.length > 0 ? (
            <div style={styles.vehicleGrid}>
              {searchResults.map(v => renderVehicleCard(v))}
            </div>
          ) : (
            <div style={styles.empty}>
              <Search size={32} style={{ opacity: 0.3 }} />
              <p>No vehicles match your search.</p>
            </div>
          )}
        </div>
      ) : (
        /* Make List */
        filteredMakes.length > 0 ? (
          <div style={styles.makeList}>
            {filteredMakes.map(make => (
              <div key={make} style={styles.makeSection}>
                <button
                  onClick={() => toggleMake(make)}
                  style={styles.makeHeader}
                >
                  {expandedMakes[make]
                    ? <ChevronDown size={18} style={{ color: '#e80200', flexShrink: 0 }} />
                    : <ChevronRight size={18} style={{ color: '#525252', flexShrink: 0 }} />
                  }
                  <span style={styles.makeName}>{make}</span>
                  {makeCounts[make] != null && (
                    <span style={styles.makeCount}>({makeCounts[make].toLocaleString()})</span>
                  )}
                </button>

                {expandedMakes[make] && (
                  <div style={styles.makeBody}>
                    {loadingMakes[make] ? (
                      <div style={styles.makeLoading}>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: '#525252' }} />
                        <span style={{ color: '#525252', fontFamily: "'Montserrat', sans-serif", fontSize: '13px' }}>Loading vehicles...</span>
                      </div>
                    ) : (
                      getYearGroups(make).map(([year, yearVehicles]) => {
                        const yearKey = `${make}-${year}`;
                        const isYearExpanded = expandedYears[yearKey];
                        return (
                          <div key={year}>
                            <button
                              onClick={() => toggleYear(make, year)}
                              style={styles.yearHeader}
                            >
                              {isYearExpanded
                                ? <ChevronDown size={14} style={{ color: '#ababab', flexShrink: 0 }} />
                                : <ChevronRight size={14} style={{ color: '#525252', flexShrink: 0 }} />
                              }
                              <span style={styles.yearLabel}>{year}</span>
                              <span style={styles.yearCount}>({yearVehicles.length})</span>
                            </button>
                            {isYearExpanded && (
                              <div style={styles.vehicleGrid}>
                                {yearVehicles.map(v => renderVehicleCard(v))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <Car size={48} style={{ opacity: 0.3 }} />
            <p>No vehicles found. Add vehicles or run the import script.</p>
          </div>
        )
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button onClick={() => setShowForm(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Year</label>
                <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} style={styles.input} placeholder="e.g., 2024" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Make</label>
                <input type="text" value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} style={styles.input} placeholder="e.g., Toyota" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Model</label>
                <input type="text" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} style={styles.input} placeholder="e.g., Camry" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Trim (optional)</label>
                <input type="text" value={formData.trim} onChange={(e) => setFormData({ ...formData, trim: e.target.value })} style={styles.input} placeholder="e.g., SRT, GT, Sport" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Vehicle Type</label>
                <select
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                  style={styles.input}
                >
                  <option value="sedan">Sedan / Coupe</option>
                  <option value="suv-2row">2-Row SUV / Crossover / Truck</option>
                  <option value="suv-3row">3-Row SUV / Large Truck</option>
                  <option value="aircraft">Aircraft</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} style={styles.checkbox} />
                  <span>Active (visible on booking page)</span>
                </label>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
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
              <button onClick={() => setShowBulkModal(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.bulkHint}>
                Format: <strong>Year, Make, Model, Trim (optional), Type (optional)</strong><br />
                Types: sedan, suv-2row, suv-3row, aircraft
              </p>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                style={styles.textarea}
                placeholder={`2024, Toyota, Camry\n2024, Dodge, Challenger, Hellcat, sedan\n2024, Ford, F-150, Raptor, suv-2row`}
                rows={10}
              />
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowBulkModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleBulkImport} disabled={saving} style={styles.saveBtn}>
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
  page: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
  loadingWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 8px 0', fontFamily: "'Oswald', sans-serif", letterSpacing: '2px', textTransform: 'uppercase' },
  subtitle: { fontSize: '14px', color: '#ababab', margin: 0, fontFamily: "'Montserrat', sans-serif" },
  headerActions: { display: 'flex', gap: '12px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, background: '#e80200', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" },
  bulkBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, background: 'transparent', color: '#fff', border: '1px solid #262626', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" },
  searchBar: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#111111', border: '1px solid #262626', marginBottom: '24px' },
  searchInput: { flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: "'Montserrat', sans-serif" },
  // Make list
  makeList: { display: 'flex', flexDirection: 'column', gap: '4px' },
  makeSection: { background: '#111111', border: '1px solid #262626', overflow: 'hidden' },
  makeHeader: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' },
  makeName: { fontSize: '16px', fontWeight: 600, color: '#fff', fontFamily: "'Oswald', sans-serif", letterSpacing: '1px', textTransform: 'uppercase', flex: 1 },
  makeCount: { fontSize: '13px', color: '#525252', fontFamily: "'Montserrat', sans-serif" },
  makeBody: { padding: '0 20px 16px', borderTop: '1px solid #262626' },
  makeLoading: { display: 'flex', alignItems: 'center', gap: '8px', padding: '20px 0', justifyContent: 'center' },
  // Year groups
  yearHeader: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', cursor: 'pointer', background: 'transparent', border: 'none', width: '100%', textAlign: 'left' },
  yearLabel: { fontSize: '14px', fontWeight: 600, color: '#e80200', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.5px' },
  yearCount: { fontSize: '12px', color: '#525252', fontFamily: "'Montserrat', sans-serif" },
  // Vehicle cards
  vehicleGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', padding: '4px 0 12px' },
  vehicleCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0a0a0a', border: '1px solid #262626' },
  vehicleInfo: { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 },
  vehicleYear: { fontSize: '11px', color: '#ababab', fontFamily: "'Montserrat', sans-serif" },
  vehicleModel: { fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: "'Montserrat', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  vehicleTrim: { fontSize: '12px', fontWeight: 400, fontStyle: 'italic', color: '#ababab' },
  badgeRow: { display: 'flex', gap: '6px', marginTop: '3px', alignItems: 'center', flexWrap: 'wrap' },
  typeBadge: { fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.3px' },
  inactiveBadge: { fontSize: '9px', color: '#e80200', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: 'uppercase' },
  vehicleActions: { display: 'flex', gap: '4px', flexShrink: 0 },
  editBtn: { padding: '6px', background: 'rgba(59, 130, 246, 0.2)', border: 'none', color: '#60a5fa', cursor: 'pointer' },
  deleteBtn: { padding: '6px', background: 'rgba(232, 2, 0, 0.2)', border: 'none', color: '#e80200', cursor: 'pointer' },
  empty: { textAlign: 'center', padding: '60px', color: '#ababab', fontFamily: "'Montserrat', sans-serif" },
  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modal: { background: '#111111', border: '1px solid #262626', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #262626' },
  modalTitle: { fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0, fontFamily: "'Oswald', sans-serif", letterSpacing: '1px', textTransform: 'uppercase' },
  closeBtn: { background: 'none', border: 'none', color: '#ababab', cursor: 'pointer' },
  modalBody: { padding: '24px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#ababab', marginBottom: '8px', fontFamily: "'Oswald', sans-serif", letterSpacing: '1px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '12px 16px', fontSize: '14px', background: '#0a0a0a', border: '1px solid #262626', color: '#fff', fontFamily: "'Montserrat', sans-serif", outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px 16px', fontSize: '14px', background: '#0a0a0a', border: '1px solid #262626', color: '#fff', fontFamily: "'Montserrat', sans-serif", outline: 'none', boxSizing: 'border-box', resize: 'vertical' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#fff', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" },
  checkbox: { width: '18px', height: '18px', accentColor: '#e80200', cursor: 'pointer' },
  bulkHint: { fontSize: '13px', color: '#ababab', marginBottom: '16px', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.6 },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '20px 24px', borderTop: '1px solid #262626' },
  cancelBtn: { padding: '10px 20px', fontSize: '14px', background: 'transparent', border: '1px solid #262626', color: '#fff', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" },
  saveBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, background: '#e80200', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" },
};
