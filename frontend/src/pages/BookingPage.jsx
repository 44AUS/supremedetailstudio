import React, { useState } from 'react';

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 60%)',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <h1
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '42px',
            letterSpacing: '1.5px',
            color: '#fff',
            marginBottom: '8px',
          }}
        >
          Book Your Appointment
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Montserrat', sans-serif", marginBottom: '40px' }}>
          Auto Detailing and Window Tinting – Select a date and time
        </p>

        {/* STEP 1 – INFO */}
        <div style={cardStyle}>
          <StepBadge number={1} title="Your Information" />

          <div style={gridTwo}>
            <Input label="First Name *" placeholder="John" />
            <Input label="Last Name *" placeholder="Smith" />
            <Input label="Phone *" placeholder="(678) 555-1234" />
            <Input label="Email *" placeholder="john@example.com" />
          </div>
        </div>

        {/* STEP 2 + 3 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          {/* STEP 2 – DATE */}
          <div style={cardStyle}>
            <StepBadge number={2} title="Select a Date" />
            <Calendar onSelect={setSelectedDate} />
          </div>

          {/* STEP 3 – TIME */}
          <div style={cardStyle}>
            <StepBadge number={3} title="Select a Time" />

            {!selectedDate ? (
              <EmptyTime />
            ) : (
              <TimeSlots />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StepBadge({ number, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#e80200',
          color: '#000',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        {number}
      </div>
      <h3 style={{ color: '#fff', fontSize: '18px', fontFamily: "'Montserrat', sans-serif", margin: 0 }}>{title}</h3>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: '6px',
          color: '#e80200',
          fontSize: '13px',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          outline: 'none',
          fontSize: '14px',
        }}
      />
    </div>
  );
}

function Calendar({ onSelect }) {
  return (
    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
      <h4 style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", marginBottom: '20px' }}>January 2026</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
        }}
      >
        {Array.from({ length: 31 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i + 1)}
            style={{
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyTime() {
  return (
    <div
      style={{
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '3px solid #e80200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        🕒
      </div>
      <span>Select a date to see available times</span>
    </div>
  );
}

function TimeSlots() {
  return (
    <div style={{ display: 'grid', gap: '10px' }}>
      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map(time => (
        <button
          key={time}
          style={{
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const cardStyle = {
  background: 'rgba(15,15,15,0.9)',
  borderRadius: '18px',
  padding: '32px',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
};

const gridTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
};
