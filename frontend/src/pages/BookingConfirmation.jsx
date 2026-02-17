import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, Calendar, Clock, MapPin, Car, User, 
  Phone, Mail, Loader2, AlertCircle, Home, Sparkles
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://supremedetailstudio-production.up.railway.app';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [businessSettings, setBusinessSettings] = useState(null);

  useEffect(() => {
    fetchBooking();
    fetchBusinessSettings();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`);
      if (!response.ok) throw new Error('Booking not found');
      const data = await response.json();
      setBooking(data);
    } catch (err) {
      setError('Unable to find your booking. Please contact us for assistance.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/settings/business`);
      if (response.ok) {
        const data = await response.json();
        setBusinessSettings(data);
      }
    } catch (err) {
      console.error('Error fetching business settings:', err);
    }
  };

  // Format time to include AM/PM if not already present
  const formatTime = (time) => {
    if (!time) return '';
    // If time already has AM/PM, return as is
    if (time.includes('AM') || time.includes('PM')) return time;
    // Convert 24h format to 12h with AM/PM
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: '#e80200' }} />
          <p style={styles.loadingText}>Loading your booking details...</p>
        </div>
        <style>{spinnerStyle}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorContainer}>
          <AlertCircle size={64} style={{ color: '#ef4444' }} />
          <h2 style={styles.errorTitle}>BOOKING NOT FOUND</h2>
          <p style={styles.errorText}>{error}</p>
          <Link to="/" style={styles.homeBtn}>
            <Home size={18} />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page} data-testid="booking-confirmation-page">
      <div style={styles.container}>
        {/* Success Header */}
        <div style={styles.successHeader}>
          <div style={styles.successIcon}>
            <CheckCircle2 size={64} style={{ color: '#10b981' }} />
          </div>
          <h1 style={styles.title}>BOOKING CONFIRMED!</h1>
          <p style={styles.subtitle}>
            Thank you for choosing Supreme Detail Studio. We've received your appointment request.
          </p>
          <div style={styles.bookingRef}>
            <span style={styles.refLabel}>Booking Reference:</span>
            <span style={styles.refValue}>#{booking?.id?.slice(-8).toUpperCase()}</span>
          </div>
        </div>

        {/* Booking Details Card */}
        <div style={styles.detailsCard}>
          <h2 style={styles.cardTitle}>
            <Sparkles size={20} style={{ color: '#e80200' }} />
            APPOINTMENT DETAILS
          </h2>

          {/* Date & Time */}
          <div style={styles.section}>
            <div style={styles.detailRow}>
              <div style={styles.detailItem}>
                <Calendar size={20} style={styles.detailIcon} />
                <div style={styles.detailContent}>
                  <span style={styles.detailLabel}>Date</span>
                  <span style={styles.detailValue}>{booking?.booking_date}</span>
                </div>
              </div>
              <div style={styles.detailItem}>
                <Clock size={20} style={styles.detailIcon} />
                <div style={styles.detailContent}>
                  <span style={styles.detailLabel}>Time</span>
                  <span style={styles.detailValue}>{booking?.booking_time}</span>
                </div>
              </div>
              <div style={styles.detailItem}>
                <MapPin size={20} style={styles.detailIcon} />
                <div style={styles.detailContent}>
                  <span style={styles.detailLabel}>Location</span>
                  <span style={styles.detailValue}>
                    {booking?.service_location === 'shop' ? 'In Shop' : 'Mobile Service'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service(s) */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>SERVICE{booking?.services?.length > 1 ? 'S' : ''}</h3>
            {booking?.services && booking.services.length > 0 ? (
              <>
                {booking.services.map((service, idx) => (
                  <div key={idx} style={{...styles.serviceBox, marginBottom: idx < booking.services.length - 1 ? '8px' : '0'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={styles.serviceName}>{service.service_name}</span>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#ababab' }}>
                        {service.duration_minutes || 60} minutes
                      </span>
                    </div>
                    <span style={styles.servicePrice}>${service.base_price?.toFixed(2)}</span>
                  </div>
                ))}
                {booking.services.length > 1 && (
                  <div style={{...styles.serviceBox, marginTop: '12px', background: '#0a0a0a', borderColor: '#e80200'}}>
                    <span style={{...styles.serviceName, color: '#e80200'}}>TOTAL ({booking.total_duration || 0} min)</span>
                    <span style={{...styles.servicePrice, color: '#e80200'}}>${booking?.total_price?.toFixed(2)}</span>
                  </div>
                )}
              </>
            ) : (
              <div style={styles.serviceBox}>
                <span style={styles.serviceName}>{booking?.service_name}</span>
                <span style={styles.servicePrice}>${booking?.total_price?.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Vehicle */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>VEHICLE</h3>
            <div style={styles.vehicleBox}>
              <Car size={24} style={{ color: '#e80200' }} />
              <div style={styles.vehicleInfo}>
                <span style={styles.vehicleName}>
                  {booking?.vehicle_year} {booking?.vehicle_make} {booking?.vehicle_model}
                </span>
                <span style={styles.vehicleType}>
                  {booking?.vehicle_type?.replace('-', ' ').replace('suv', 'SUV')}
                  {booking?.vehicle_color && ` • ${booking.vehicle_color}`}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>CONTACT INFORMATION</h3>
            <div style={styles.contactGrid}>
              <div style={styles.contactItem}>
                <User size={16} style={{ color: '#ababab' }} />
                <span>{booking?.customer_first_name} {booking?.customer_last_name}</span>
              </div>
              <div style={styles.contactItem}>
                <Phone size={16} style={{ color: '#ababab' }} />
                <span>{booking?.customer_phone}</span>
              </div>
              <div style={styles.contactItem}>
                <Mail size={16} style={{ color: '#ababab' }} />
                <span>{booking?.customer_email}</span>
              </div>
              <div style={styles.contactItem}>
                <MapPin size={16} style={{ color: '#ababab' }} />
                <span>{booking?.customer_address}</span>
              </div>
            </div>
          </div>

          {booking?.notes && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>NOTES</h3>
              <p style={styles.notesText}>{booking.notes}</p>
            </div>
          )}
        </div>

        {/* What's Next */}
        <div style={styles.nextStepsCard}>
          <h2 style={styles.cardTitle}>WHAT'S NEXT?</h2>
          <ul style={styles.stepsList}>
            <li style={styles.stepItem}>
              <span style={styles.stepNumber}>1</span>
              <span>We'll send you a confirmation email with your booking details.</span>
            </li>
            <li style={styles.stepItem}>
              <span style={styles.stepNumber}>2</span>
              <span>We may contact you to confirm your appointment or discuss any special requirements.</span>
            </li>
            <li style={styles.stepItem}>
              <span style={styles.stepNumber}>3</span>
              <span>
                {booking?.service_location === 'shop' 
                  ? 'Please arrive at our Marietta location 5-10 minutes before your scheduled time.'
                  : 'Our team will arrive at your location at the scheduled time. Please ensure access to water and electricity.'}
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.contactCard}>
          <p style={styles.contactText}>
            Questions? Call us at{' '}
            <a href="tel:5024170690" style={styles.phoneLink}>(502) 417-0690</a>
          </p>
        </div>

        {/* Back Home Button */}
        <Link to="/" style={styles.backBtn} data-testid="back-home-btn">
          <Home size={18} />
          Back to Home
        </Link>
      </div>

      <style>{spinnerStyle}</style>
    </div>
  );
}

const spinnerStyle = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const styles = {
  page: {
    minHeight: '100vh',
    background: '#000',
    padding: '80px 20px',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '20px',
  },
  loadingText: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    gap: '20px',
  },
  errorTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '2px',
  },
  errorText: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
    maxWidth: '400px',
  },
  homeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    background: '#e80200',
    color: '#fff',
    textDecoration: 'none',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '1px',
    marginTop: '10px',
  },
  successHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  successIcon: {
    marginBottom: '24px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '36px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 16px 0',
    letterSpacing: '3px',
  },
  subtitle: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
    margin: '0 0 24px 0',
    lineHeight: 1.6,
  },
  bookingRef: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: 'rgba(232, 2, 0, 0.1)',
    border: '1px solid rgba(232, 2, 0, 0.3)',
  },
  refLabel: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },
  refValue: {
    color: '#e80200',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '2px',
  },
  detailsCard: {
    background: '#0a0a0a',
    border: '1px solid #262626',
    padding: '32px',
    marginBottom: '24px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 24px 0',
    letterSpacing: '1px',
  },
  section: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #262626',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#ababab',
    margin: '0 0 12px 0',
    letterSpacing: '2px',
  },
  detailRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  detailIcon: {
    color: '#e80200',
    marginTop: '2px',
  },
  detailContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
  },
  detailValue: {
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
  },
  serviceBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: '#111111',
    border: '1px solid #262626',
  },
  serviceName: {
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  servicePrice: {
    color: '#e80200',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
  },
  vehicleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    background: '#111111',
    border: '1px solid #262626',
  },
  vehicleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  vehicleName: {
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: 600,
  },
  vehicleType: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
  },
  notesText: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    lineHeight: 1.6,
    padding: '12px 16px',
    background: '#111111',
    border: '1px solid #262626',
    margin: 0,
  },
  nextStepsCard: {
    background: '#0a0a0a',
    border: '1px solid #262626',
    padding: '32px',
    marginBottom: '24px',
  },
  stepsList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    lineHeight: 1.6,
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    background: 'rgba(232, 2, 0, 0.15)',
    border: '1px solid rgba(232, 2, 0, 0.3)',
    color: '#e80200',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactCard: {
    textAlign: 'center',
    padding: '24px',
    marginBottom: '24px',
  },
  contactText: {
    color: '#ababab',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    margin: 0,
  },
  phoneLink: {
    color: '#e80200',
    fontWeight: 600,
    textDecoration: 'none',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '16px',
    background: 'transparent',
    border: '1px solid #262626',
    color: '#ababab',
    textDecoration: 'none',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '1px',
    transition: 'all 0.2s ease',
  },
};
