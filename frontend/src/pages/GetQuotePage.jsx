import React, { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

const serviceTypes = [
  { key: 'automotive', title: 'Automotive', icon: '🚗', subtitle: 'Vehicles & boats' },
  { key: 'residential', title: 'Residential', icon: '🏠', subtitle: 'Home windows & glass' },
  { key: 'commercial', title: 'Commercial', icon: '🏢', subtitle: 'Business properties' },
  { key: 'security', title: 'Security Film', icon: '🛡️', subtitle: 'Safety & security' },
];

export default function GetQuote() {
  const [isMobile] = useState(window.innerWidth < 768);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType) {
      toast.error('Please select a service type.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service_type: selectedType }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const error = await response.json();
        toast.error(error.detail || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section style={styles.page}>
        <div style={{ ...styles.container, textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h1 style={styles.heading}>Quote Request Received!</h1>
          <p style={styles.subtext}>
            Thank you for reaching out. We&apos;ll review your request and get back to you within 24 hours.
          </p>
          <a href="/" style={styles.backBtn}>Back to Home</a>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Get a <span style={{ color: '#e80200' }}>Free Quote</span>
        </h1>
        <p style={styles.subtext}>
          Fill out the form below and we&apos;ll get back to you within 24 hours with a custom quote.
        </p>

        <form onSubmit={handleSubmit} style={styles.formWrap}>
          {/* Step 1: Service Type */}
          <div style={styles.section}>
            <h3 style={styles.stepLabel}>1&nbsp;&nbsp;What type of service do you need?</h3>
            <div style={{ ...styles.typeGrid, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }}>
              {serviceTypes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSelectedType(s.key)}
                  style={{
                    ...styles.typeCard,
                    border: selectedType === s.key ? '1px solid #e80200' : '1px solid rgba(255,255,255,0.08)',
                    background: selectedType === s.key ? 'rgba(232, 2, 0, 0.08)' : 'rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={styles.typeTitle}>{s.title}</div>
                  <div style={styles.typeSub}>{s.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Contact Info */}
          <div style={styles.section}>
            <h3 style={styles.stepLabel}>2&nbsp;&nbsp;Your Contact Information</h3>
            <div style={{ ...styles.row, flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={styles.field}>
                <label style={styles.label}>First Name <span style={styles.req}>*</span></label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required disabled={loading} style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Last Name <span style={styles.req}>*</span></label>
                <input name="last_name" value={form.last_name} onChange={handleChange} required disabled={loading} style={styles.input} />
              </div>
            </div>
            <div style={{ ...styles.row, flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={styles.field}>
                <label style={styles.label}>Email <span style={styles.req}>*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required disabled={loading} style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Phone <span style={styles.req}>*</span></label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required disabled={loading} style={styles.input} />
              </div>
            </div>
          </div>

          {/* Step 3: Vehicle Info (automotive only) */}
          {selectedType === 'automotive' && (
            <div style={styles.section}>
              <h3 style={styles.stepLabel}>3&nbsp;&nbsp;Vehicle Information</h3>
              <div style={{ ...styles.row, flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={styles.field}>
                  <label style={styles.label}>Year</label>
                  <input name="vehicle_year" value={form.vehicle_year} onChange={handleChange} placeholder="e.g. 2024" disabled={loading} style={styles.input} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Make</label>
                  <input name="vehicle_make" value={form.vehicle_make} onChange={handleChange} placeholder="e.g. BMW" disabled={loading} style={styles.input} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Model</label>
                  <input name="vehicle_model" value={form.vehicle_model} onChange={handleChange} placeholder="e.g. M4" disabled={loading} style={styles.input} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          <div style={styles.section}>
            <h3 style={styles.stepLabel}>{selectedType === 'automotive' ? '4' : '3'}&nbsp;&nbsp;Tell us what you need</h3>
            <div style={styles.field}>
              <label style={styles.label}>Description <span style={styles.req}>*</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                disabled={loading}
                rows={4}
                placeholder="Describe what services you're interested in, any specific concerns, or questions you have..."
                style={styles.textarea}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 80px)',
    background: 'radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 60%)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '40px 20px 80px',
  },
  container: {
    width: '100%',
    maxWidth: '800px',
  },
  heading: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '42px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '40px',
    textAlign: 'center',
  },
  formWrap: {
    background: 'rgba(15, 15, 15, 0.9)',
    borderRadius: '18px',
    padding: '40px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
  },
  section: {
    marginBottom: '32px',
  },
  stepLabel: {
    fontFamily: "'Oswald', sans-serif",
    color: '#e80200',
    letterSpacing: '1px',
    fontSize: '16px',
    marginBottom: '18px',
    textTransform: 'uppercase',
  },
  typeGrid: {
    display: 'grid',
    gap: '14px',
  },
  typeCard: {
    borderRadius: '14px',
    padding: '22px 14px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.25s ease',
    outline: 'none',
  },
  typeTitle: {
    fontFamily: "'Oswald', sans-serif",
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '14px',
    marginBottom: '4px',
  },
  typeSub: {
    fontSize: '12px',
    fontFamily: "'Montserrat', sans-serif",
    color: 'rgba(255,255,255,0.5)',
  },
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '0',
  },
  field: {
    flex: 1,
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px',
    fontFamily: "'Montserrat', sans-serif",
  },
  req: {
    color: '#ef4444',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 16px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'Montserrat', sans-serif",
    transition: 'border 0.2s',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 16px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'Montserrat', sans-serif",
    resize: 'vertical',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    border: 'none',
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
  },
  backBtn: {
    display: 'inline-block',
    marginTop: '24px',
    padding: '14px 32px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 700,
    textDecoration: 'none',
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
};
