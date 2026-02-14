import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        const error = await response.json();
        toast.error(error.detail || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          First and Last Name <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Email <span style={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Phone Number <span style={styles.required}>*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Questions/Comments <span style={styles.required}>*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please give us a brief description of your questions, comments, or concerns."
          style={styles.textarea}
          required
          disabled={loading}
          rows={4}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button
          type="submit"
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    fontFamily: "'Montserrat', sans-serif",
  },
  required: {
    color: '#ef4444',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: "'Montserrat', sans-serif",
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '14px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Montserrat', sans-serif",
  },
  buttonContainer: {
    marginTop: '20px',
    textAlign: 'right',
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 32px',
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
};

export default ContactForm;
