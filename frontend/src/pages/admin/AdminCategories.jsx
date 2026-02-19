import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, GripVertical, Tag } from 'lucide-react';
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

function SortableCategory({ category, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...styles.categoryItem, ...style }} data-testid={`category-${category.name}`}>
      <div {...attributes} {...listeners} style={styles.dragHandle}>
        <GripVertical size={18} />
      </div>
      <div style={styles.categoryInfo}>
        <div style={styles.categoryName}>{category.label}</div>
        <div style={styles.categorySlug}>{category.name}</div>
        {category.description && (
          <div style={styles.categoryDesc}>{category.description}</div>
        )}
        <div style={styles.categoryMeta}>
          {category.is_addon && <span style={styles.addonBadge}>Add-on</span>}
          {category.can_combine_with?.length > 0 && (
            <span style={styles.combineBadge}>
              Combines with: {category.can_combine_with.join(', ')}
            </span>
          )}
        </div>
      </div>
      <div style={styles.categoryActions}>
        <button onClick={() => onEdit(category)} style={styles.editBtn} data-testid={`edit-${category.name}`}>
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(category.id)} style={styles.deleteBtn} data-testid={`delete-${category.name}`}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    description: '',
    sort_order: 0,
    can_combine_with: [],
    is_addon: false,
    applies_to_categories: []
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex(c => c.id === active.id);
      const newIndex = categories.findIndex(c => c.id === over.id);
      const newOrder = arrayMove(categories, oldIndex, newIndex);
      setCategories(newOrder);

      // Update sort orders
      const token = localStorage.getItem('adminToken');
      const updates = newOrder.map((cat, idx) => ({
        id: cat.id,
        sort_order: idx
      }));

      try {
        await fetch(`${API_URL}/api/categories/reorder`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updates)
        });
      } catch (err) {
        console.error('Error reordering:', err);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      label: category.label || '',
      description: category.description || '',
      sort_order: category.sort_order || 0,
      can_combine_with: category.can_combine_with || [],
      is_addon: category.is_addon || false,
      applies_to_categories: category.applies_to_categories || []
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      label: '',
      description: '',
      sort_order: categories.length,
      can_combine_with: [],
      is_addon: false,
      applies_to_categories: []
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.label) {
      alert('Name and label are required');
      return;
    }

    setSaving(true);
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCategories();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to save category');
      }
    } catch (err) {
      alert('Error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchCategories();
      }
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const toggleCombineWith = (categoryName) => {
    setFormData(prev => ({
      ...prev,
      can_combine_with: prev.can_combine_with.includes(categoryName)
        ? prev.can_combine_with.filter(c => c !== categoryName)
        : [...prev.can_combine_with, categoryName]
    }));
  };

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
          <h1 style={styles.title}>Service Categories</h1>
          <p style={styles.subtitle}>Organize your services into categories. Drag to reorder.</p>
        </div>
        <button onClick={handleAdd} style={styles.addBtn} data-testid="add-category-btn">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div style={styles.categoryList}>
            {categories.map((category) => (
              <SortableCategory
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {categories.length === 0 && (
        <div style={styles.empty}>
          <Tag size={48} style={{ opacity: 0.3 }} />
          <p>No categories yet. Add your first category to get started.</p>
        </div>
      )}

      {/* Category Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setShowForm(false)} style={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category Name (slug)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  style={styles.input}
                  placeholder="e.g., interior"
                  disabled={!!editingCategory}
                  data-testid="category-name-input"
                />
                <span style={styles.helpText}>Unique identifier (lowercase, no spaces)</span>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Display Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Interior Detail"
                  data-testid="category-label-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                  placeholder="Optional description"
                  data-testid="category-description-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.is_addon}
                    onChange={(e) => setFormData({ ...formData, is_addon: e.target.checked })}
                    style={styles.checkbox}
                    data-testid="category-is-addon"
                  />
                  <span>This is an add-on category</span>
                </label>
                <span style={styles.helpText}>Add-on categories appear as extras after main service selection</span>
              </div>

              {!formData.is_addon && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Can Combine With</label>
                  <div style={styles.checkboxGrid}>
                    {categories.filter(c => c.name !== formData.name && !c.is_addon).map(cat => (
                      <label key={cat.id} style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.can_combine_with.includes(cat.name)}
                          onChange={() => toggleCombineWith(cat.name)}
                          style={styles.checkbox}
                        />
                        <span>{cat.label}</span>
                      </label>
                    ))}
                  </div>
                  <span style={styles.helpText}>Select which categories can be booked together</span>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} style={styles.saveBtn} data-testid="save-category-btn">
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save Category'}
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
    maxWidth: '900px',
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
    marginBottom: '32px',
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
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    background: '#111111',
    border: '1px solid #262626',
  },
  dragHandle: {
    color: '#525252',
    cursor: 'grab',
    padding: '4px',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  categorySlug: {
    fontSize: '12px',
    color: '#525252',
    fontFamily: "'Montserrat', sans-serif",
  },
  categoryDesc: {
    fontSize: '13px',
    color: '#ababab',
    marginTop: '4px',
    fontFamily: "'Montserrat', sans-serif",
  },
  categoryMeta: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  addonBadge: {
    padding: '2px 8px',
    fontSize: '11px',
    background: 'rgba(139, 92, 246, 0.2)',
    color: '#a78bfa',
    fontFamily: "'Montserrat', sans-serif",
  },
  combineBadge: {
    padding: '2px 8px',
    fontSize: '11px',
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    fontFamily: "'Montserrat', sans-serif",
  },
  categoryActions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    padding: '8px',
    background: 'rgba(59, 130, 246, 0.2)',
    border: 'none',
    color: '#60a5fa',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '8px',
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
  helpText: {
    fontSize: '12px',
    color: '#525252',
    marginTop: '6px',
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
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
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    padding: '12px',
    background: '#0a0a0a',
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
