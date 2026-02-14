import React, { useState, useEffect } from 'react';
import { 
  Save, Loader2, AlertCircle, Calendar, Clock, 
  Plus, Trash2, CheckCircle 
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DAYS_OF_WEEK = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

export default function AdminSchedule() {
  const [schedule, setSchedule] = useState({
    business_hours: [],
    closed_dates: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newClosedDate, setNewClosedDate] = useState({ date: '', reason: '' });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`${API_URL}/api/schedule`);
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      
      // Ensure all days are present
      const hoursMap = {};
      data.business_hours?.forEach(h => { hoursMap[h.day] = h; });
      
      const fullHours = DAYS_OF_WEEK.map(day => ({
        day,
        is_open: hoursMap[day]?.is_open ?? (day !== 'sunday'),
        open_time: hoursMap[day]?.open_time || '09:00',
        close_time: hoursMap[day]?.close_time || '18:00',
      }));
      
      setSchedule({
        business_hours: fullHours,
        closed_dates: data.closed_dates || [],
      });
    } catch (err) {
      setError('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_URL}/api/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) throw new Error('Failed to save schedule');
      setSuccess('Schedule saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save schedule');
    } finally {
      setSaving(false);
    }
  };

  const updateHours = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      business_hours: prev.business_hours.map(h =>
        h.day === day ? { ...h, [field]: value } : h
      ),
    }));
  };

  const addClosedDate = async () => {
    if (!newClosedDate.date) return;
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/schedule/closed-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          date: newClosedDate.date,
          reason: newClosedDate.reason || 'Holiday',
        }),
      });
      if (!response.ok) throw new Error('Failed to add closed date');
      setSchedule(prev => ({
        ...prev,
        closed_dates: [...prev.closed_dates, { date: newClosedDate.date, reason: newClosedDate.reason || 'Holiday' }],
      }));
      setNewClosedDate({ date: '', reason: '' });
    } catch (err) {
      setError('Failed to add closed date');
    }
  };

  const removeClosedDate = async (date) => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/schedule/closed-dates/${date}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) throw new Error('Failed to remove closed date');
      setSchedule(prev => ({
        ...prev,
        closed_dates: prev.closed_dates.filter(d => d.date !== date),
      }));
    } catch (err) {
      setError('Failed to remove closed date');
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading schedule...</p>
      </div>
    );
  }

  return (
    <div data-testid="admin-schedule">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>SCHEDULE</h1>
          <p style={styles.subtitle}>Set your business hours and closed days</p>
        </div>
        <button onClick={handleSave} style={styles.saveBtn} disabled={saving} data-testid="save-schedule-btn">
          {saving ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Schedule
            </>
          )}
        </button>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={styles.successBox}>
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Business Hours */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Clock size={20} />
          BUSINESS HOURS
        </h2>
        <div style={styles.hoursGrid}>
          {schedule.business_hours.map((day) => (
            <div key={day.day} style={styles.dayRow} data-testid={`day-row-${day.day}`}>
              <div style={styles.dayName}>
                {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={day.is_open}
                  onChange={(e) => updateHours(day.day, 'is_open', e.target.checked)}
                  style={styles.checkbox}
                  data-testid={`toggle-${day.day}`}
                />
                <span style={{
                  ...styles.toggleStatus,
                  color: day.is_open ? '#10b981' : '#ef4444',
                }}>
                  {day.is_open ? 'Open' : 'Closed'}
                </span>
              </label>
              {day.is_open && (
                <div style={styles.timeInputs}>
                  <input
                    type="time"
                    value={day.open_time}
                    onChange={(e) => updateHours(day.day, 'open_time', e.target.value)}
                    style={styles.timeInput}
                    data-testid={`open-time-${day.day}`}
                  />
                  <span style={styles.timeSeparator}>to</span>
                  <input
                    type="time"
                    value={day.close_time}
                    onChange={(e) => updateHours(day.day, 'close_time', e.target.value)}
                    style={styles.timeInput}
                    data-testid={`close-time-${day.day}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Closed Dates / Holidays */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Calendar size={20} />
          CLOSED DATES & HOLIDAYS
        </h2>
        
        <div style={styles.addClosedForm}>
          <input
            type="date"
            value={newClosedDate.date}
            onChange={(e) => setNewClosedDate({ ...newClosedDate, date: e.target.value })}
            style={styles.dateInput}
            data-testid="new-closed-date-input"
          />
          <input
            type="text"
            value={newClosedDate.reason}
            onChange={(e) => setNewClosedDate({ ...newClosedDate, reason: e.target.value })}
            placeholder="Reason (e.g., Holiday, Vacation)"
            style={styles.reasonInput}
            data-testid="new-closed-reason-input"
          />
          <button onClick={addClosedDate} style={styles.addDateBtn} data-testid="add-closed-date-btn">
            <Plus size={18} />
            Add
          </button>
        </div>

        {schedule.closed_dates.length > 0 ? (
          <div style={styles.closedDatesList}>
            {schedule.closed_dates.map((closedDate) => (
              <div key={closedDate.date} style={styles.closedDateItem} data-testid={`closed-date-${closedDate.date}`}>
                <div style={styles.closedDateInfo}>
                  <span style={styles.closedDateValue}>{closedDate.date}</span>
                  <span style={styles.closedDateReason}>{closedDate.reason || 'No reason specified'}</span>
                </div>
                <button 
                  onClick={() => removeClosedDate(closedDate.date)} 
                  style={styles.removeBtn}
                  data-testid={`remove-closed-${closedDate.date}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Calendar size={32} style={{ color: '#525252' }} />
            <p>No closed dates set</p>
          </div>
        )}
      </div>

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
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#10b981',
    fontSize: '14px',
    marginBottom: '24px',
    fontFamily: "'Montserrat', sans-serif",
  },
  section: {
    background: '#111111',
    border: '1px solid #262626',
    padding: '24px',
    marginBottom: '24px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 24px 0',
    letterSpacing: '1px',
  },
  hoursGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  dayRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  dayName: {
    width: '120px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.5px',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    width: '100px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#e80200',
  },
  toggleStatus: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
  },
  timeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: 'auto',
  },
  timeInput: {
    padding: '10px 14px',
    background: '#111111',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
  },
  timeSeparator: {
    color: '#ababab',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
  },
  addClosedForm: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  dateInput: {
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    minWidth: '180px',
  },
  reasonInput: {
    flex: 1,
    minWidth: '200px',
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid #262626',
    color: '#fff',
    fontSize: '14px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
  },
  addDateBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 20px',
    background: '#e80200',
    border: 'none',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  closedDatesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  closedDateItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: '#0a0a0a',
    border: '1px solid #262626',
  },
  closedDateInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  closedDateValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
  },
  closedDateReason: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
    color: '#ababab',
  },
  removeBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    cursor: 'pointer',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    color: '#525252',
    gap: '12px',
    fontFamily: "'Montserrat', sans-serif",
  },
};
