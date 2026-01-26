import React, { useState } from 'react';

/* ---------------- DATA ---------------- */

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan / Coupe', upcharge: 0 },
  { id: 'mid', label: 'Truck / 2-Row SUV / Crossover', upcharge: 50 },
  { id: 'large', label: '3-Row SUV / Large Truck', upcharge: 100 },
];

const DETAIL_SERVICES = [
  { id: 'full', name: 'Full Detail (Interior + Exterior)', base: 249, category: 'detail' },
  { id: 'interior', name: 'Interior Detail', base: 159, category: 'detail' },
  { id: 'exterior', name: 'Exterior Detail', base: 139, category: 'detail' },
];

const OTHER_SERVICES = [
  { id: 'ceramic', name: 'Ceramic Coating', price: 799 },
  { id: 'ppf', name: 'Paint Protection Film (PPF)', price: 1299 },
  { id: 'tint-auto', name: 'Automotive Window Tint', price: 299 },
];

/* ---------------- MAIN ---------------- */

export default function BookAppointment() {
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

  return (
    <section style={pageStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={titleStyle}>Book Your Appointment</h1>
        <p style={subtitleStyle}>Auto detailing & protection services</p>

        {/* STEP 1 – CUSTOMER INFO */}
        <div style={cardStyle}>
          <StepBadge number={1} title="Your Information" />
          <div style={gridTwo}>
            <Input label="First Name *" />
            <Input label="Last Name *" />
            <Input label="Phone *" />
            <Input label="Email *" />
          </div>
        </div>

        {/* STEP 2 – VEHICLE */}
        <div style={cardStyle}>
          <StepBadge number={2} title="Your Vehicle" />

          <div style={gridThree}>
            <Input label="Year" value={vehicle.year} onChange={v => setVehicle({ ...vehicle, year: v })} />
            <Input label="Make" value={vehicle.make} onChange={v => setVehicle({ ...vehicle, make: v })} />
            <Input label="Model" value={vehicle.model} onChange={v => setVehicle({ ...vehicle, model: v })} />
          </div>

          <div style={vehicleTypeGrid}>
            {VEHICLE_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => setVehicleType(type)}
                style={{
                  ...selectCard,
                  ...(vehicleType?.id === type.id ? activeCard : {}),
                }}
              >
                <strong>{type.label}</strong>
                {type.upcharge > 0 && (
                  <span style={{ color: '#1aff6a' }}> +${type.upcharge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3 – SERVICES */}
        <div style={cardStyle}>
          <StepBadge number={3} title="Select a Service" />

          <div style={serviceGrid}>
            {[...DETAIL_SERVICES, ...OTHER_SERVICES].map(service => {
              const price =
                service.category === 'detail'
                  ? vehicleType
                    ? service.base + vehicleType.upcharge
                    : 'Select vehicle'
                  : service.price;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  style={{
                    ...selectCard,
                    ...(selectedService?.id === service.id ? activeCard : {}),
                  }}
                >
                  <h4 style={{ margin: 0 }}>{service.name}</h4>
                  <span style={{ color: '#1aff6a', fontWeight: 600 }}>
                    {typeof price === 'number' ? `$${price}` : price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4 – DATE & TIME */}
        <div style={twoCol}>
          <div style={cardStyle}>
            <StepBadge number={4} title="Select a Date" />
            <Calendar onSelect={setSelectedDate} />
          </div>

          <div style={cardStyle}>
            <StepBadge number={5} title="Select a Time" />
            {!selectedDate ? <EmptyTime /> : (
              <TimeSlots selected={selectedTime} onSelect={setSelectedTime} />
            )}
          </div>
        </div>

        {/* CONFIRM */}
        {selectedTime && totalPrice && (
          <div style={confirmCard}>
            <h3 style={{ marginBottom: 12 }}>Confirm Appointment</h3>

            <textarea
              placeholder="Special requests (optional)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={textareaStyle}
            />

            <button style={confirmBtn}>
              Confirm Appointment – ${totalPrice}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StepBadge({ number, title }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
      <div style={stepCircle}>{number}</div>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

function Calendar({ onSelect }) {
  return (
    <div style={calendarGrid}>
      {Array.from({ length: 31 }).map((_, i) => (
        <button key={i} onClick={() => onSelect(i + 1)} style={dateBtn}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

function EmptyTime() {
  return (
    <div style={{ opacity: 0.5, padding: 40 }}>
      Select a date to see available times
    </div>
  );
}

function TimeSlots({ selected, onSelect }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map(time => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          style={{
            ...timeBtn,
            ...(selected === time ? activeCard : {}),
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageStyle = {
  minHeight: '100vh',
  padding: '80px 24px',
  background: 'radial-gradient(circle at top, rgba(255,255,255,0.04), #000)',
};

const titleStyle = { color: '#fff', fontSize: 42 };
const subtitleStyle = { color: 'rgba(255,255,255,0.6)', marginBottom: 40 };

const cardStyle = {
  background: 'rgba(15,15,15,0.9)',
  borderRadius: 18,
  padding: 32,
  marginBottom: 24,
  border: '1px solid rgba(255,255,255,0.08)',
};

const gridTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 20,
};

const gridThree = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: 16,
};

const vehicleTypeGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
  gap: 16,
  marginTop: 24,
};

const serviceGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
  gap: 16,
};

const selectCard = {
  padding: 20,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  cursor: 'pointer',
};

const activeCard = {
  borderColor: '#1aff6a',
  boxShadow: '0 0 0 2px rgba(26,255,106,0.25)',
};

const twoCol = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 24,
};

const confirmCard = {
  marginTop: 32,
  padding: 32,
  borderRadius: 20,
  background: 'rgba(10,20,10,0.9)',
  border: '1px solid rgba(26,255,106,0.3)',
};

const textareaStyle = {
  width: '100%',
  minHeight: 100,
  marginBottom: 16,
  padding: 14,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.1)',
};

const confirmBtn = {
  width: '100%',
  padding: 16,
  borderRadius: 14,
  background: '#1aff6a',
  color: '#000',
  fontWeight: 700,
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
};

const calendarGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7,1fr)',
  gap: 8,
};

const dateBtn = {
  height: 40,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  border: 'none',
};

const timeBtn = {
  padding: 14,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.1)',
};

const stepCircle = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '#e80200',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
};

const labelStyle = { color: '#e80200', fontSize: 13, marginBottom: 6 };
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
};
