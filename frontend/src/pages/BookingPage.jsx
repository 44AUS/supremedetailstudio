import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Mail, Car, Calendar, Clock, 
  ChevronRight, CheckCircle2, Sparkles, Shield, 
  Droplets, Sun, ArrowRight, ChevronLeft
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan / Coupe', upcharge: 0, icon: '🚗' },
  { id: 'mid', label: 'Truck / 2-Row SUV', upcharge: 50, icon: '🚙' },
  { id: 'large', label: '3-Row SUV / Large Truck', upcharge: 100, icon: '🚐' },
];

const DETAIL_SERVICES = [
  { 
    id: 'full', 
    name: 'Full Detail', 
    description: 'Complete interior & exterior treatment',
    base: 249, 
    category: 'detail',
    icon: Sparkles,
    popular: true
  },
  { 
    id: 'interior', 
    name: 'Interior Detail', 
    description: 'Deep clean & condition all surfaces',
    base: 159, 
    category: 'detail',
    icon: Sun,
    popular: false
  },
  { 
    id: 'exterior', 
    name: 'Exterior Detail', 
    description: 'Paint correction & protection',
    base: 139, 
    category: 'detail',
    icon: Droplets,
    popular: false
  },
];

const OTHER_SERVICES = [
  { 
    id: 'ceramic', 
    name: 'Ceramic Coating', 
    description: 'Long-lasting paint protection',
    price: 799,
    icon: Shield,
    popular: false
  },
  { 
    id: 'ppf', 
    name: 'Paint Protection Film', 
    description: 'Ultimate scratch & chip protection',
    price: 1299,
    icon: Shield,
    popular: true
  },
  { 
    id: 'tint-auto', 
    name: 'Window Tint', 
    description: 'Premium automotive tinting',
    price: 299,
    icon: Sun,
    popular: false
  },
];

const TIME_SLOTS = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '4:00 PM', available: true },
];

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: '100vh',
    background: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.08), transparent 50%, transparent)',
    pointerEvents: 'none',
  },
  glowOrb1: {
    position: 'absolute',
    top: 0,
    left: '25%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15), transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  glowOrb2: {
    position: 'absolute',
    bottom: '25%',
    right: '20%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08), transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  hero: {
    position: 'relative',
    padding: '100px 24px 40px',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    borderRadius: '50px',
    background: 'rgba(220, 38, 38, 0.15)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '24px',
  },
  title: {
    fontSize: 'clamp(32px, 6vw, 56px)',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '16px',
    fontFamily: 'Oswald, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  titleAccent: {
    color: '#dc2626',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '18px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  progressContainer: {
    maxWidth: '700px',
    margin: '50px auto 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    left: '40px',
    right: '40px',
    top: '50%',
    height: '3px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '2px',
    transform: 'translateY(-50%)',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #dc2626, #ef4444)',
    borderRadius: '2px',
    transition: 'width 0.5s ease',
  },
  progressStep: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressCircle: (completed, active) => ({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    transition: 'all 0.3s ease',
    background: completed ? '#dc2626' : 'rgba(255,255,255,0.05)',
    border: active && !completed ? '2px solid #dc2626' : completed ? 'none' : '1px solid rgba(255,255,255,0.1)',
    color: completed || active ? '#fff' : 'rgba(255,255,255,0.4)',
    boxShadow: completed ? '0 0 20px rgba(220, 38, 38, 0.4)' : 'none',
    cursor: 'pointer',
  }),
  progressLabel: (completed) => ({
    marginTop: '8px',
    fontSize: '12px',
    fontWeight: 500,
    color: completed ? '#ef4444' : 'rgba(255,255,255,0.4)',
  }),
  content: {
    position: 'relative',
    padding: '0 24px 80px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  stepNumber: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'Oswald, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  formGrid: (cols) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '20px',
  }),
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0,
  },
  label: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  required: {
    color: '#ef4444',
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.3)',
  },
  input: (hasIcon) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: hasIcon ? '16px 16px 16px 48px' : '16px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
  }),
  vehicleTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '24px',
  },
  vehicleCard: (selected) => ({
    position: 'relative',
    padding: '24px',
    borderRadius: '18px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    boxShadow: selected ? '0 10px 30px rgba(220, 38, 38, 0.2)' : 'none',
  }),
  vehicleIcon: {
    fontSize: '36px',
    marginBottom: '12px',
  },
  vehicleLabel: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    marginBottom: '4px',
  },
  vehicleUpcharge: {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 500,
  },
  checkIcon: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    color: '#ef4444',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  serviceCard: (selected) => ({
    position: 'relative',
    padding: '24px',
    borderRadius: '18px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    boxShadow: selected ? '0 10px 30px rgba(220, 38, 38, 0.2)' : 'none',
  }),
  popularBadge: {
    position: 'absolute',
    top: '-10px',
    right: '16px',
    padding: '4px 12px',
    background: '#dc2626',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  serviceIconWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(220, 38, 38, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  serviceName: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '6px',
  },
  serviceDesc: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '13px',
    marginBottom: '12px',
    lineHeight: 1.5,
  },
  servicePrice: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: 700,
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gap: '24px',
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  calendarMonth: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '18px',
  },
  calendarNav: {
    display: 'flex',
    gap: '8px',
  },
  calendarNavBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  calendarWeekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    marginBottom: '12px',
  },
  calendarWeekday: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.4)',
    padding: '8px 0',
  },
  calendarDays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
  },
  calendarDay: (selected, isToday, isPast) => ({
    aspectRatio: '1',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 500,
    cursor: isPast ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    background: selected ? '#dc2626' : isToday ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
    color: isPast ? 'rgba(255,255,255,0.2)' : selected ? '#fff' : '#fff',
    border: isToday && !selected ? '1px solid rgba(220, 38, 38, 0.5)' : 'none',
    boxShadow: selected ? '0 8px 20px rgba(220, 38, 38, 0.4)' : 'none',
  }),
  emptyTimeState: {
    textAlign: 'center',
    padding: '48px 20px',
  },
  emptyTimeIcon: {
    color: 'rgba(255,255,255,0.2)',
    marginBottom: '16px',
  },
  emptyTimeText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '14px',
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  timeSlot: (selected, available) => ({
    padding: '16px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: available ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    background: selected ? '#dc2626' : 'rgba(255,255,255,0.03)',
    color: !available ? 'rgba(255,255,255,0.2)' : '#fff',
    border: selected ? 'none' : '1px solid rgba(255,255,255,0.08)',
    textDecoration: !available ? 'line-through' : 'none',
    boxShadow: selected ? '0 8px 20px rgba(220, 38, 38, 0.4)' : 'none',
  }),
  confirmCard: {
    background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.3), rgba(0,0,0,0.5))',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
    marginTop: '32px',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    boxShadow: '0 25px 50px rgba(220, 38, 38, 0.1)',
  },
  confirmContent: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
  },
  confirmTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '12px',
    fontFamily: 'Oswald, sans-serif',
    textTransform: 'uppercase',
  },
  confirmDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  confirmDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
  },
  confirmIcon: {
    color: '#ef4444',
  },
  textarea: {
    width: '100%',
    maxWidth: '400px',
    height: '80px',
    padding: '14px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
  },
  confirmRight: {
    textAlign: 'right',
  },
  totalLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '4px',
  },
  totalPrice: {
    fontSize: '40px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '16px',
  },
  confirmBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)',
    transition: 'all 0.3s ease',
  },
};

/* ---------------- MAIN ---------------- */

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [vehicle, setVehicle] = useState({ year: '', make: '', model: '' });
  const [vehicleType, setVehicleType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');

  const totalPrice = selectedService
    ? selectedService.category === 'detail'
      ? vehicleType
        ? selectedService.base + vehicleType.upcharge
        : null
      : selectedService.price
    : null;

  const progressSteps = [
    { num: 1, label: 'Info', completed: formData.firstName && formData.email },
    { num: 2, label: 'Vehicle', completed: vehicleType !== null },
    { num: 3, label: 'Service', completed: selectedService !== null },
    { num: 4, label: 'Schedule', completed: selectedDate && selectedTime },
  ];

  const completedSteps = progressSteps.filter(s => s.completed).length;

  // Responsive handling
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={styles.page}>
      {/* Background Effects */}
      <div style={styles.gradientOverlay} />
      <div style={styles.glowOrb1} />
      <div style={styles.glowOrb2} />

      {/* Hero Section */}
      <div style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.badge}>
            <Sparkles size={14} />
            Premium Auto Care
          </div>
          <h1 style={styles.title}>
            BOOK YOUR <span style={styles.titleAccent}>APPOINTMENT</span>
          </h1>
          <p style={styles.subtitle}>
            Experience the finest auto detailing & protection services in Georgia. 
            Your vehicle deserves the best care.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.progressContainer}
        >
          <div style={styles.progressLine}>
            <div style={{ ...styles.progressFill, width: `${(completedSteps / 4) * 100}%` }} />
          </div>
          {progressSteps.map((step) => (
            <div key={step.num} style={styles.progressStep}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={styles.progressCircle(step.completed, false)}
              >
                {step.completed ? <CheckCircle2 size={20} /> : step.num}
              </motion.div>
              <span style={styles.progressLabel(step.completed)}>{step.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        
        {/* STEP 1 – CUSTOMER INFO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={styles.card}
          data-testid="step-1-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>YOUR INFORMATION</h3>
            <User size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
          </div>
          
          <div style={{ ...styles.formGrid(2), ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
            <InputField 
              label="First Name" 
              icon={User}
              value={formData.firstName}
              onChange={(v) => setFormData({...formData, firstName: v})}
              placeholder="John"
              required
            />
            <InputField 
              label="Last Name" 
              icon={User}
              value={formData.lastName}
              onChange={(v) => setFormData({...formData, lastName: v})}
              placeholder="Doe"
              required
            />
            <InputField 
              label="Phone" 
              icon={Phone}
              value={formData.phone}
              onChange={(v) => setFormData({...formData, phone: v})}
              placeholder="(555) 123-4567"
              type="tel"
              required
            />
            <InputField 
              label="Email" 
              icon={Mail}
              value={formData.email}
              onChange={(v) => setFormData({...formData, email: v})}
              placeholder="john@example.com"
              type="email"
              required
            />
          </div>
        </motion.div>

        {/* STEP 2 – VEHICLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.card}
          data-testid="step-2-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>YOUR VEHICLE</h3>
            <Car size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
          </div>

          <div style={{ ...styles.formGrid(3), ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
            <InputField 
              label="Year" 
              value={vehicle.year}
              onChange={(v) => setVehicle({...vehicle, year: v})}
              placeholder="2024"
            />
            <InputField 
              label="Make" 
              value={vehicle.make}
              onChange={(v) => setVehicle({...vehicle, make: v})}
              placeholder="Tesla"
            />
            <InputField 
              label="Model" 
              value={vehicle.model}
              onChange={(v) => setVehicle({...vehicle, model: v})}
              placeholder="Model S"
            />
          </div>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '24px', marginBottom: '16px' }}>
            Select your vehicle size:
          </p>
          <div style={styles.vehicleTypeGrid}>
            {VEHICLE_TYPES.map((type) => (
              <VehicleTypeCard
                key={type.id}
                type={type}
                selected={vehicleType?.id === type.id}
                onClick={() => setVehicleType(type)}
              />
            ))}
          </div>
        </motion.div>

        {/* STEP 3 – SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={styles.card}
          data-testid="step-3-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>SELECT A SERVICE</h3>
            <Sparkles size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
          </div>

          <div style={styles.sectionTitle}>
            <Droplets size={18} style={{ color: '#ef4444' }} />
            Detailing Services
          </div>
          <div style={styles.serviceGrid}>
            {DETAIL_SERVICES.map((service) => {
              const price = vehicleType 
                ? service.base + vehicleType.upcharge 
                : 'Select vehicle';
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  price={price}
                  selected={selectedService?.id === service.id}
                  onClick={() => setSelectedService(service)}
                />
              );
            })}
          </div>

          <div style={styles.sectionTitle}>
            <Shield size={18} style={{ color: '#ef4444' }} />
            Protection Services
          </div>
          <div style={styles.serviceGrid}>
            {OTHER_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                price={service.price}
                selected={selectedService?.id === service.id}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </motion.div>

        {/* STEP 4 & 5 – DATE & TIME */}
        <div style={{ ...styles.twoColGrid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={styles.card}
            data-testid="step-4-card"
          >
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>4</div>
              <h3 style={styles.stepTitle}>SELECT A DATE</h3>
              <Calendar size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
            </div>
            <CalendarPicker selected={selectedDate} onSelect={setSelectedDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={styles.card}
            data-testid="step-5-card"
          >
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>5</div>
              <h3 style={styles.stepTitle}>SELECT A TIME</h3>
              <Clock size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
            </div>
            {!selectedDate ? (
              <div style={styles.emptyTimeState}>
                <Calendar size={48} style={styles.emptyTimeIcon} />
                <p style={styles.emptyTimeText}>Select a date to view available times</p>
              </div>
            ) : (
              <TimeSlotPicker 
                slots={TIME_SLOTS}
                selected={selectedTime}
                onSelect={setSelectedTime}
              />
            )}
          </motion.div>
        </div>

        {/* CONFIRMATION */}
        <AnimatePresence>
          {selectedTime && totalPrice && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={styles.confirmCard}
              data-testid="confirmation-card"
            >
              <div style={styles.confirmContent}>
                <div>
                  <h3 style={styles.confirmTitle}>CONFIRM YOUR BOOKING</h3>
                  <div style={styles.confirmDetails}>
                    <div style={styles.confirmDetail}>
                      <Sparkles size={16} style={styles.confirmIcon} />
                      {selectedService?.name}
                    </div>
                    <div style={styles.confirmDetail}>
                      <Calendar size={16} style={styles.confirmIcon} />
                      Day {selectedDate} at {selectedTime}
                    </div>
                    {vehicleType && (
                      <div style={styles.confirmDetail}>
                        <Car size={16} style={styles.confirmIcon} />
                        {vehicleType.label}
                      </div>
                    )}
                  </div>
                </div>

                <textarea
                  placeholder="Any special requests? (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={styles.textarea}
                  data-testid="special-requests-textarea"
                />

                <div style={styles.confirmRight}>
                  <div style={styles.totalLabel}>Total</div>
                  <div style={styles.totalPrice}>${totalPrice}</div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={styles.confirmBtn}
                    data-testid="confirm-appointment-btn"
                  >
                    Confirm Appointment
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InputField({ label, icon: Icon, value, onChange, placeholder, type = 'text', required }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>
        {label}
        {required && <span style={styles.required}>*</span>}
      </label>
      <div style={styles.inputContainer}>
        {Icon && <Icon size={18} style={styles.inputIcon} />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...styles.input(!!Icon),
            borderColor: focused ? 'rgba(220, 38, 38, 0.5)' : 'rgba(255,255,255,0.08)',
            background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
          }}
          data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
    </div>
  );
}

function VehicleTypeCard({ type, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.vehicleCard(selected),
        borderColor: hovered && !selected ? 'rgba(255,255,255,0.2)' : selected ? '#dc2626' : 'rgba(255,255,255,0.08)',
      }}
      data-testid={`vehicle-type-${type.id}`}
    >
      {selected && (
        <CheckCircle2 size={20} style={styles.checkIcon} />
      )}
      <div style={styles.vehicleIcon}>{type.icon}</div>
      <div style={styles.vehicleLabel}>{type.label}</div>
      {type.upcharge > 0 && (
        <div style={styles.vehicleUpcharge}>+${type.upcharge}</div>
      )}
    </motion.button>
  );
}

function ServiceCard({ service, price, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.serviceCard(selected),
        borderColor: hovered && !selected ? 'rgba(255,255,255,0.2)' : selected ? '#dc2626' : 'rgba(255,255,255,0.08)',
      }}
      data-testid={`service-${service.id}`}
    >
      {service.popular && (
        <div style={styles.popularBadge}>POPULAR</div>
      )}
      {selected && (
        <CheckCircle2 size={20} style={styles.checkIcon} />
      )}
      <div style={styles.serviceIconWrapper}>
        <Icon size={20} style={{ color: '#ef4444' }} />
      </div>
      <div style={styles.serviceName}>{service.name}</div>
      <div style={styles.serviceDesc}>{service.description}</div>
      <div style={styles.servicePrice}>
        {typeof price === 'number' ? `$${price}` : price}
      </div>
    </motion.button>
  );
}

function CalendarPicker({ selected, onSelect }) {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay();
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div>
      <div style={styles.calendarHeader}>
        <div style={styles.calendarMonth}>{currentMonth} {currentYear}</div>
        <div style={styles.calendarNav}>
          <button style={styles.calendarNavBtn}>
            <ChevronLeft size={18} />
          </button>
          <button style={styles.calendarNavBtn}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div style={styles.calendarWeekdays}>
        {weekDays.map((day) => (
          <div key={day} style={styles.calendarWeekday}>{day}</div>
        ))}
      </div>
      
      <div style={styles.calendarDays}>
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isPast = day < today.getDate();
          const isToday = day === today.getDate();
          const isSelected = selected === day;
          
          return (
            <motion.button
              key={day}
              whileHover={!isPast ? { scale: 1.15 } : {}}
              whileTap={!isPast ? { scale: 0.95 } : {}}
              onClick={() => !isPast && onSelect(day)}
              disabled={isPast}
              style={styles.calendarDay(isSelected, isToday, isPast)}
              data-testid={`calendar-day-${day}`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function TimeSlotPicker({ slots, selected, onSelect }) {
  return (
    <div style={styles.timeGrid}>
      {slots.map((slot) => (
        <motion.button
          key={slot.time}
          whileHover={slot.available ? { scale: 1.03 } : {}}
          whileTap={slot.available ? { scale: 0.97 } : {}}
          onClick={() => slot.available && onSelect(slot.time)}
          disabled={!slot.available}
          style={styles.timeSlot(selected === slot.time, slot.available)}
          data-testid={`time-slot-${slot.time.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <Clock size={14} />
          {slot.time}
        </motion.button>
      ))}
    </div>
  );
}
