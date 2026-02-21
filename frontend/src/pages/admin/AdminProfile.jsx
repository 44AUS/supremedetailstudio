import React, { useState, useEffect, useRef } from 'react';
import { Save, Loader2, AlertCircle, CheckCircle, Camera, Trash2, User, Lock } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function AdminProfile() {
  const [adminUsername, setAdminUsername] = useState('');
  const [headshotUrl, setHeadshotUrl] = useState(null);
  const [headshotHover, setHeadshotHover] = useState(false);
  const headshotInputRef = useRef(null);

  // Username form
  const [usernameForm, setUsernameForm] = useState({ new_username: '', current_password: '' });
  const [usernameSaving, setUsernameSaving] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');

  // Password form
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    // Fetch username
    const fetchUsername = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAdminUsername(data.username);
          setUsernameForm(f => ({ ...f, new_username: data.username }));
        }
      } catch (err) { console.error(err); }
    };
    // Check headshot
    const checkHeadshot = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/admin/headshot`, { method: 'HEAD' });
        if (resp.ok) setHeadshotUrl(`${API_URL}/api/admin/headshot?t=${Date.now()}`);
      } catch (err) { /* no headshot */ }
    };
    fetchUsername();
    checkHeadshot();
  }, []);

  const handleHeadshotUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const resp = await fetch(`${API_URL}/api/admin/headshot`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      if (resp.ok) {
        setHeadshotUrl(`${API_URL}/api/admin/headshot?t=${Date.now()}`);
      } else {
        const data = await resp.json();
        alert(data.detail || 'Failed to upload headshot');
      }
    } catch (err) {
      alert('Failed to upload headshot');
    }
    e.target.value = '';
  };

  const handleHeadshotDelete = async () => {
    if (!window.confirm('Remove your headshot?')) return;
    try {
      await fetch(`${API_URL}/api/admin/headshot`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setHeadshotUrl(null);
    } catch (err) {
      alert('Failed to remove headshot');
    }
  };

  const handleChangeUsername = async () => {
    setUsernameError('');
    setUsernameSuccess('');
    if (!usernameForm.new_username || usernameForm.new_username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }
    if (!usernameForm.current_password) {
      setUsernameError('Please enter your password to confirm');
      return;
    }
    setUsernameSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/change-username`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          current_password: usernameForm.current_password,
          new_username: usernameForm.new_username,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to change username');
      }
      setUsernameSuccess('Username changed successfully!');
      setAdminUsername(usernameForm.new_username.trim());
      setUsernameForm({ new_username: usernameForm.new_username.trim(), current_password: '' });
      setTimeout(() => setUsernameSuccess(''), 3000);
    } catch (err) {
      setUsernameError(err.message);
    } finally {
      setUsernameSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to change password');
      }
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>EDIT PROFILE</h1>
          <p style={styles.subtitle}>Manage your admin account settings</p>
        </div>
      </div>

      <div style={styles.grid}>
        {/* Headshot Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Camera size={18} style={{ color: '#e80200' }} />
            Profile Photo
          </h2>
          <p style={styles.cardDesc}>Upload a headshot that can be sent to customers in On My Way texts.</p>
          <div style={styles.avatarRow}>
            <input
              ref={headshotInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleHeadshotUpload}
            />
            <div
              style={{
                ...styles.avatarCircle,
                border: headshotHover ? '2px solid #e80200' : '2px solid #333',
              }}
              onClick={() => headshotInputRef.current?.click()}
              onMouseEnter={() => setHeadshotHover(true)}
              onMouseLeave={() => setHeadshotHover(false)}
            >
              {headshotUrl ? (
                <>
                  <img src={headshotUrl} alt="Admin" style={styles.avatarImg} />
                  {headshotHover && (
                    <div style={styles.avatarOverlay}>
                      <Camera size={18} color="#fff" />
                      <span style={styles.avatarOverlayText}>Change</span>
                    </div>
                  )}
                </>
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <Camera size={24} color={headshotHover ? '#e80200' : '#525252'} />
                  <span style={{ ...styles.avatarPlaceholderText, color: headshotHover ? '#e80200' : '#525252' }}>Add Photo</span>
                </div>
              )}
            </div>
            <div style={styles.avatarActions}>
              <button
                onClick={() => headshotInputRef.current?.click()}
                style={styles.uploadBtn}
              >
                {headshotUrl ? 'Change Photo' : 'Upload Photo'}
              </button>
              {headshotUrl && (
                <button onClick={handleHeadshotDelete} style={styles.removeBtn}>
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <User size={18} style={{ color: '#e80200' }} />
            Change Username
          </h2>
          <p style={styles.cardDesc}>Current username: <strong style={{ color: '#fff' }}>{adminUsername}</strong></p>
          {usernameError && (
            <div style={styles.errorBox}>
              <AlertCircle size={16} />
              <span>{usernameError}</span>
            </div>
          )}
          {usernameSuccess && (
            <div style={styles.successBox}>
              <CheckCircle size={16} />
              <span>{usernameSuccess}</span>
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Username</label>
            <input
              type="text"
              value={usernameForm.new_username}
              onChange={(e) => setUsernameForm({ ...usernameForm, new_username: e.target.value })}
              style={styles.input}
              placeholder="Enter new username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={usernameForm.current_password}
              onChange={(e) => setUsernameForm({ ...usernameForm, current_password: e.target.value })}
              style={styles.input}
              placeholder="Enter your password to confirm"
            />
          </div>
          <button onClick={handleChangeUsername} disabled={usernameSaving} style={styles.saveBtn}>
            {usernameSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            {usernameSaving ? 'Saving...' : 'Update Username'}
          </button>
        </div>

        {/* Password Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Lock size={18} style={{ color: '#e80200' }} />
            Change Password
          </h2>
          <p style={styles.cardDesc}>Choose a strong password with at least 6 characters.</p>
          {passwordError && (
            <div style={styles.errorBox}>
              <AlertCircle size={16} />
              <span>{passwordError}</span>
            </div>
          )}
          {passwordSuccess && (
            <div style={styles.successBox}>
              <CheckCircle size={16} />
              <span>{passwordSuccess}</span>
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Password</label>
            <input
              type="password"
              value={passwordForm.current_password}
              onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
              style={styles.input}
              placeholder="Enter current password"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              value={passwordForm.new_password}
              onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
              style={styles.input}
              placeholder="Enter new password"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirm_password}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
              style={styles.input}
              placeholder="Confirm new password"
            />
          </div>
          <button onClick={handleChangePassword} disabled={passwordSaving} style={styles.saveBtn}>
            {passwordSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            {passwordSaving ? 'Saving...' : 'Update Password'}
          </button>
        </div>
      </div>
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
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '28px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 8px 0',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  cardDesc: {
    fontSize: '13px',
    color: '#ababab',
    margin: '0 0 20px 0',
    fontFamily: "'Montserrat', sans-serif",
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  avatarCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a1a',
    position: 'relative',
    transition: 'border-color 0.2s',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
  },
  avatarOverlayText: {
    fontSize: '11px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
  },
  avatarPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  avatarPlaceholderText: {
    fontSize: '11px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    transition: 'color 0.2s',
  },
  avatarActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '12px',
    background: 'transparent',
    border: '1px solid #333',
    color: '#ababab',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(232, 2, 0, 0.1)',
    border: '1px solid rgba(232, 2, 0, 0.3)',
    color: '#f87171',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '16px',
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#34d399',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '16px',
  },
  inputGroup: {
    marginBottom: '16px',
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
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    background: '#e80200',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    marginTop: '4px',
  },
};
