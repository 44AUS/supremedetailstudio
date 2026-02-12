import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Loader2, 
  AlertCircle, Package, Building2, Truck, Clock, DollarSign, Tag, GripVertical, Settings
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Sortable Category Card Component
function SortableCategoryCard({ category, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={{...categoryCardStyle, ...style}} data-testid={`category-card-${category.id}`}>
      <div {...attributes} {...listeners} style={dragHandleStyle}>
        <GripVertical size={16} />
      </div>
      <div style={categoryInfoStyle}>
        <span style={categoryLabelStyle}>{category.label}</span>
        <span style={categoryNameStyle}>{category.name}</span>
      </div>
      <div style={categoryActionsStyle}>
        <button onClick={() => onEdit(category)} style={iconBtnStyle} data-testid={`edit-category-${category.id}`}>
          <Edit2 size={14} />
        </button>
        <button onClick={() => onDelete(category.id)} style={iconBtnDangerStyle} data-testid={`delete-category-${category.id}`}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

const categoryCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  background: '#0a0a0a',
  border: '1px solid #262626',
  minWidth: '200px',
};

const dragHandleStyle = {
  cursor: 'grab',
  color: '#525252',
  display: 'flex',
  alignItems: 'center',
};

const categoryInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: 1,
};

const categoryLabelStyle = {
  fontFamily: "'Oswald', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  color: '#fff',
};

const categoryNameStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '11px',
  color: '#ababab',
};

const categoryActionsStyle = {
  display: 'flex',
  gap: '6px',
};

const iconBtnStyle = {
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid #262626',
  color: '#ababab',
  cursor: 'pointer',
};

const iconBtnDangerStyle = {
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#ef4444',
  cursor: 'pointer',
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', label: '', description: '', sort_order: 0 });
  const [businessSettings, setBusinessSettings] = useState({
    shop_name: '',
    shop_address: '',
    shop_phone: '',
    shop_email: '',
    mobile_service_upcharge: 50,
    mobile_service_description: 'We come to you'
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const emptyService = {
    name: '',
    category: 'interior',
    description: '',
    base_price: 0,
    vehicle_pricing: { sedan: 0, suv_2row: 50, suv_3row: 100 },
    duration_minutes: 60,
    is_active: true,
    shop_available: true,
    mobile_available: true,
    image_url: '',
  };

  const [formData, setFormData] = useState(emptyService);

  useEffect(() => {
    fetchServices();
    fetchCategories();
    fetchBusinessSettings();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchBusinessSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/settings/business`);
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setBusinessSettings(data);
    } catch (err) {
      console.error('Failed to load business settings:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const url = editingService 
        ? `${API_URL}/api/services/${editingService.id}`
        : `${API_URL}/api/services`;
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save service');
      
      await fetchServices();
      handleCloseForm();
    } catch (err) {
      setError('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Failed to delete service');
      await fetchServices();
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      category: service.category || 'interior',
      description: service.description || '',
      base_price: service.base_price || 0,
      vehicle_pricing: service.vehicle_pricing || { sedan: 0, suv_2row: 50, suv_3row: 100 },
      duration_minutes: service.duration_minutes || 60,
      is_active: service.is_active !== false,
      shop_available: service.shop_available !== false,
      mobile_available: service.mobile_available !== false,
      image_url: service.image_url || '',
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
    setFormData(emptyService);
    setError('');
  };

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({...emptyService, category: categories[0]?.name || 'interior'});
    setShowForm(true);
  };

  // Category CRUD functions
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', label: '', description: '', sort_order: categories.length + 1 });
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      label: category.label,
      description: category.description || '',
      sort_order: category.sort_order || 0
    });
    setShowCategoryForm(true);
  };

  const handleSaveCategory = async () => {
    setSaving(true);
    setError('');
    try {
      const url = editingCategory 
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`;
      
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(categoryFormData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to save category');
      }
      
      await fetchCategories();
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (err) {
      setError(err.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? Services using it must be moved first.')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to delete category');
      }
      await fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div data-testid="admin-services">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>SERVICES</h1>
          <p style={styles.subtitle}>Manage your service offerings and pricing</p>
        </div>
        <div style={styles.headerButtons}>
          <button onClick={handleAddCategory} style={styles.secondaryBtn} data-testid="manage-categories-btn">
            <Tag size={18} />
            Add Category
          </button>
          <button onClick={handleAddNew} style={styles.addBtn} data-testid="add-service-btn">
            <Plus size={20} />
            Add Service
          </button>
        </div>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <AlertCircle size={18} />
          <span>{error}</span>
          <button onClick={() => setError('')} style={styles.errorClose}><X size={16} /></button>
        </div>
      )}

      {/* Categories Section */}
      <div style={styles.categoriesSection}>
        <h3 style={styles.sectionTitle}>CATEGORIES</h3>
        <div style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <div key={cat.id} style={styles.categoryCard}>
              <div style={styles.categoryInfo}>
                <span style={styles.categoryLabel}>{cat.label}</span>
                <span style={styles.categoryName}>{cat.name}</span>
              </div>
              <div style={styles.categoryActions}>
                <button onClick={() => handleEditCategory(cat)} style={styles.iconBtn} data-testid={`edit-category-${cat.id}`}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDeleteCategory(cat.id)} style={styles.iconBtnDanger} data-testid={`delete-category-${cat.id}`}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalSmall} data-testid="category-form-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingCategory ? 'EDIT CATEGORY' : 'ADD NEW CATEGORY'}
              </h2>
              <button onClick={() => setShowCategoryForm(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category Name (internal) *</label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., ceramic_coating"
                  data-testid="category-name-input"
                  disabled={!!editingCategory}
                />
                <span style={styles.helpText}>Lowercase, no spaces (used internally)</span>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Display Label *</label>
                <input
                  type="text"
                  value={categoryFormData.label}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Ceramic Coating"
                  data-testid="category-label-input"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  style={styles.textarea}
                  placeholder="Category description..."
                  rows={2}
                  data-testid="category-description-input"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sort Order</label>
                <input
                  type="number"
                  value={categoryFormData.sort_order}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, sort_order: parseInt(e.target.value) || 0 })}
                  style={styles.input}
                  min="0"
                  data-testid="category-sort-input"
                />
              </div>
              <div style={styles.modalFooter}>
                <button onClick={() => setShowCategoryForm(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={handleSaveCategory} disabled={saving} style={styles.saveBtn} data-testid="save-category-btn">
                  {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal} data-testid="service-form-modal">
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingService ? 'EDIT SERVICE' : 'ADD NEW SERVICE'}
              </h2>
              <button onClick={handleCloseForm} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGrid}>
                {/* Name */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input}
                    placeholder="e.g., Deluxe Interior Detail"
                    data-testid="service-name-input"
                  />
                </div>

                {/* Category */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={styles.select}
                    data-testid="service-category-select"
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={styles.textarea}
                    placeholder="Service description..."
                    rows={3}
                    data-testid="service-description-input"
                  />
                </div>

                {/* Base Price */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Base Price (Sedan) $</label>
                  <input
                    type="number"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                    style={styles.input}
                    min="0"
                    data-testid="service-price-input"
                  />
                </div>

                {/* Duration */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 60 })}
                    style={styles.input}
                    min="15"
                    step="15"
                    data-testid="service-duration-input"
                  />
                </div>

                {/* Vehicle Pricing */}
                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Vehicle Size Upcharge</label>
                  <div style={styles.pricingGrid}>
                    <div style={styles.pricingItem}>
                      <span>2-Row SUV</span>
                      <input
                        type="number"
                        value={formData.vehicle_pricing?.suv_2row || 0}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          vehicle_pricing: { 
                            ...formData.vehicle_pricing, 
                            suv_2row: parseFloat(e.target.value) || 0 
                          } 
                        })}
                        style={styles.smallInput}
                        min="0"
                        data-testid="suv-2row-price-input"
                      />
                    </div>
                    <div style={styles.pricingItem}>
                      <span>3-Row SUV / Large</span>
                      <input
                        type="number"
                        value={formData.vehicle_pricing?.suv_3row || 0}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          vehicle_pricing: { 
                            ...formData.vehicle_pricing, 
                            suv_3row: parseFloat(e.target.value) || 0 
                          } 
                        })}
                        style={styles.smallInput}
                        min="0"
                        data-testid="suv-3row-price-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Availability</label>
                  <div style={styles.togglesGrid}>
                    <label style={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        data-testid="service-active-toggle"
                      />
                      <span style={styles.toggleSlider}></span>
                      <span style={styles.toggleLabel}>Active</span>
                    </label>
                    <label style={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={formData.shop_available}
                        onChange={(e) => setFormData({ ...formData, shop_available: e.target.checked })}
                        data-testid="service-shop-toggle"
                      />
                      <span style={styles.toggleSlider}></span>
                      <span style={styles.toggleLabel}>
                        <Building2 size={14} /> In Shop
                      </span>
                    </label>
                    <label style={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={formData.mobile_available}
                        onChange={(e) => setFormData({ ...formData, mobile_available: e.target.checked })}
                        data-testid="service-mobile-toggle"
                      />
                      <span style={styles.toggleSlider}></span>
                      <span style={styles.toggleLabel}>
                        <Truck size={14} /> Mobile
                      </span>
                    </label>
                  </div>
                </div>

                {/* Image URL */}
                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    style={styles.input}
                    placeholder="https://example.com/image.jpg"
                    data-testid="service-image-input"
                  />
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button onClick={handleCloseForm} style={styles.cancelBtn}>
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                style={styles.saveBtn} 
                disabled={saving || !formData.name}
                data-testid="save-service-btn"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingService ? 'Update Service' : 'Add Service'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <div style={styles.emptyState}>
          <Package size={48} />
          <p>No services yet</p>
          <button onClick={handleAddNew} style={styles.addBtnSmall}>
            <Plus size={18} /> Add Your First Service
          </button>
        </div>
      ) : (
        <div style={styles.servicesGrid}>
          {services.map((service) => (
            <div 
              key={service.id} 
              style={{
                ...styles.serviceCard,
                opacity: service.is_active ? 1 : 0.6,
              }}
              data-testid={`service-card-${service.id}`}
            >
              <div style={styles.cardHeader}>
                <span style={styles.categoryBadge}>{service.category}</span>
                <div style={styles.cardActions}>
                  <button onClick={() => handleEdit(service)} style={styles.iconBtn} data-testid={`edit-service-${service.id}`}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(service.id)} style={styles.iconBtnDanger} data-testid={`delete-service-${service.id}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 style={styles.serviceName}>{service.name}</h3>
              <p style={styles.serviceDesc}>{service.description || 'No description'}</p>

              <div style={styles.serviceInfo}>
                <div style={styles.infoItem}>
                  <DollarSign size={16} />
                  <span>From ${service.base_price}</span>
                </div>
                <div style={styles.infoItem}>
                  <Clock size={16} />
                  <span>{service.duration_minutes} min</span>
                </div>
              </div>

              <div style={styles.availabilityRow}>
                {service.shop_available && (
                  <span style={styles.availBadge}>
                    <Building2 size={12} /> Shop
                  </span>
                )}
                {service.mobile_available && (
                  <span style={styles.availBadge}>
                    <Truck size={12} /> Mobile
                  </span>
                )}
                {!service.is_active && (
                  <span style={styles.inactiveBadge}>Inactive</span>
                )}
              </div>
            </div>
          ))}
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
    fontWeight: 700,
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
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '24px',
    fontFamily: "'Montserrat', sans-serif",
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#525252',
    gap: '16px',
    fontFamily: "'Montserrat', sans-serif",
  },
  addBtnSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  serviceCard: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '24px',
    transition: 'border-color 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  categoryBadge: {
    padding: '4px 10px',
    background: 'rgba(232, 2, 0, 0.15)',
    color: '#e80200',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
  },
  iconBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #262626',
    color: '#ababab',
    cursor: 'pointer',
  },
  iconBtnDanger: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    cursor: 'pointer',
  },
  serviceName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    letterSpacing: '0.5px',
  },
  serviceDesc: {
    color: '#ababab',
    fontSize: '14px',
    margin: '0 0 16px 0',
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.5,
  },
  serviceInfo: {
    display: 'flex',
    gap: '20px',
    marginBottom: '16px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
  },
  availabilityRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  availBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    background: 'rgba(16, 185, 129, 0.15)',
    color: '#10b981',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: "'Montserrat', sans-serif",
  },
  inactiveBadge: {
    padding: '4px 8px',
    background: 'rgba(107, 114, 128, 0.15)',
    color: '#6b7280',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: "'Montserrat', sans-serif",
  },
  // Modal Styles
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
    maxWidth: '640px',
    maxHeight: '90vh',
    background: '#0a0a0a',
    border: '1px solid #262626',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
    flex: 1,
    overflow: 'auto',
    padding: '24px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
  select: {
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
  textarea: {
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
    minHeight: '80px',
  },
  pricingGrid: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  pricingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ababab',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
  },
  smallInput: {
    width: '80px',
    padding: '8px 10px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
  },
  togglesGrid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    background: '#262626',
    position: 'relative',
    transition: 'background 0.2s ease',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#ababab',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #262626',
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
  // Category styles
  headerButtons: {
    display: 'flex',
    gap: '12px',
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
    fontWeight: 700,
    letterSpacing: '1px',
    cursor: 'pointer',
  },
  errorClose: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    marginLeft: 'auto',
    padding: '4px',
  },
  categoriesSection: {
    marginBottom: '32px',
    padding: '20px',
    background: '#111111',
    border: '1px solid #262626',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#ababab',
    margin: '0 0 16px 0',
    letterSpacing: '1px',
  },
  categoriesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  categoryCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    minWidth: '200px',
  },
  categoryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  categoryLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
  },
  categoryName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    color: '#ababab',
  },
  categoryActions: {
    display: 'flex',
    gap: '6px',
  },
  modalSmall: {
    width: '100%',
    maxWidth: '420px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  helpText: {
    fontSize: '11px',
    color: '#6b7280',
    fontFamily: "'Montserrat', sans-serif",
  },
};
