import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Mail, Car, Calendar, Clock, 
  ChevronRight, CheckCircle2, Sparkles, Shield, 
  Droplets, Sun, ArrowRight
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
  const [currentStep, setCurrentStep] = useState(1);

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-600/30 text-red-500 text-sm font-medium mb-6">
              <Sparkles size={14} />
              Premium Auto Care
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
              BOOK YOUR <span className="text-red-600">APPOINTMENT</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the finest auto detailing & protection services in Georgia. 
              Your vehicle deserves the best care.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 -translate-y-1/2 rounded-full">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(completedSteps / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {progressSteps.map((step, idx) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step.completed 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                        : currentStep === step.num
                          ? 'bg-white/10 text-white border-2 border-red-600'
                          : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 size={20} /> : step.num}
                  </motion.div>
                  <span className={`mt-2 text-xs font-medium ${step.completed ? 'text-red-500' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* STEP 1 – CUSTOMER INFO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-xl bg-white/[0.03] rounded-3xl p-8 border border-white/10 shadow-2xl"
            data-testid="step-1-card"
          >
            <StepHeader number={1} title="Your Information" icon={User} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
            className="backdrop-blur-xl bg-white/[0.03] rounded-3xl p-8 border border-white/10 shadow-2xl"
            data-testid="step-2-card"
          >
            <StepHeader number={2} title="Your Vehicle" icon={Car} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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

            <div className="mt-8">
              <p className="text-gray-400 text-sm mb-4">Select your vehicle size:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {VEHICLE_TYPES.map((type) => (
                  <VehicleTypeCard
                    key={type.id}
                    type={type}
                    selected={vehicleType?.id === type.id}
                    onClick={() => setVehicleType(type)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* STEP 3 – SERVICES */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-xl bg-white/[0.03] rounded-3xl p-8 border border-white/10 shadow-2xl"
            data-testid="step-3-card"
          >
            <StepHeader number={3} title="Select a Service" icon={Sparkles} />

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Droplets size={18} className="text-red-500" />
                Detailing Services
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-red-500" />
                Protection Services
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
          </motion.div>

          {/* STEP 4 & 5 – DATE & TIME */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-3 backdrop-blur-xl bg-white/[0.03] rounded-3xl p-8 border border-white/10 shadow-2xl"
              data-testid="step-4-card"
            >
              <StepHeader number={4} title="Select a Date" icon={Calendar} />
              <div className="mt-8">
                <CalendarPicker selected={selectedDate} onSelect={setSelectedDate} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2 backdrop-blur-xl bg-white/[0.03] rounded-3xl p-8 border border-white/10 shadow-2xl"
              data-testid="step-5-card"
            >
              <StepHeader number={5} title="Select a Time" icon={Clock} />
              <div className="mt-8">
                {!selectedDate ? (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-500">Select a date to view available times</p>
                  </div>
                ) : (
                  <TimeSlotPicker 
                    slots={TIME_SLOTS}
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                  />
                )}
              </div>
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
                className="backdrop-blur-xl bg-gradient-to-br from-red-950/40 to-black/60 rounded-3xl p-8 border border-red-600/30 shadow-2xl shadow-red-600/10"
                data-testid="confirmation-card"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      CONFIRM YOUR BOOKING
                    </h3>
                    <div className="space-y-2 text-gray-400">
                      <p className="flex items-center gap-2">
                        <Sparkles size={16} className="text-red-500" />
                        {selectedService?.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={16} className="text-red-500" />
                        {selectedDate && `Day ${selectedDate}`} at {selectedTime}
                      </p>
                      {vehicleType && (
                        <p className="flex items-center gap-2">
                          <Car size={16} className="text-red-500" />
                          {vehicleType.label}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <textarea
                      placeholder="Any special requests? (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-24 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-red-600/50 transition-colors"
                      data-testid="special-requests-textarea"
                    />
                  </div>

                  <div className="text-center lg:text-right">
                    <div className="text-sm text-gray-400 mb-2">Total</div>
                    <div className="text-4xl font-bold text-white mb-4">${totalPrice}</div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
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
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StepHeader({ number, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
        <span className="text-white font-bold text-lg">{number}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {title.toUpperCase()}
        </h3>
      </div>
      {Icon && <Icon size={20} className="text-red-500 ml-auto" />}
    </div>
  );
}

function InputField({ label, icon: Icon, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400 flex items-center gap-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 focus:bg-white/[0.07] transition-all duration-300`}
          data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
    </div>
  );
}

function VehicleTypeCard({ type, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-6 rounded-2xl border text-left transition-all duration-300 ${
        selected 
          ? 'bg-red-600/20 border-red-600 shadow-lg shadow-red-600/20' 
          : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
      }`}
      data-testid={`vehicle-type-${type.id}`}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 size={20} className="text-red-500" />
        </div>
      )}
      <div className="text-3xl mb-3">{type.icon}</div>
      <h4 className="text-white font-semibold mb-1">{type.label}</h4>
      {type.upcharge > 0 && (
        <span className="text-red-500 text-sm font-medium">+${type.upcharge}</span>
      )}
    </motion.button>
  );
}

function ServiceCard({ service, price, selected, onClick }) {
  const Icon = service.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-6 rounded-2xl border text-left transition-all duration-300 ${
        selected 
          ? 'bg-red-600/20 border-red-600 shadow-lg shadow-red-600/20' 
          : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
      }`}
      data-testid={`service-${service.id}`}
    >
      {service.popular && (
        <div className="absolute -top-3 right-4">
          <span className="px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-full">
            POPULAR
          </span>
        </div>
      )}
      {selected && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 size={20} className="text-red-500" />
        </div>
      )}
      <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
        <Icon size={20} className="text-red-500" />
      </div>
      <h4 className="text-white font-semibold mb-1">{service.name}</h4>
      <p className="text-gray-500 text-sm mb-3">{service.description}</p>
      <div className="text-xl font-bold text-white">
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
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-white font-semibold">{currentMonth} {currentYear}</h4>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
            <ChevronRight size={18} className="rotate-180" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
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
              whileHover={!isPast ? { scale: 1.1 } : {}}
              whileTap={!isPast ? { scale: 0.95 } : {}}
              onClick={() => !isPast && onSelect(day)}
              disabled={isPast}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                isSelected 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : isToday
                    ? 'bg-white/10 text-white border border-red-600/50'
                    : isPast
                      ? 'text-gray-700 cursor-not-allowed'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
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
    <div className="grid grid-cols-2 gap-3">
      {slots.map((slot) => (
        <motion.button
          key={slot.time}
          whileHover={slot.available ? { scale: 1.02 } : {}}
          whileTap={slot.available ? { scale: 0.98 } : {}}
          onClick={() => slot.available && onSelect(slot.time)}
          disabled={!slot.available}
          className={`px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${
            selected === slot.time
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : slot.available
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                : 'bg-white/[0.02] text-gray-600 cursor-not-allowed line-through'
          }`}
          data-testid={`time-slot-${slot.time.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <Clock size={14} className="inline mr-2" />
          {slot.time}
        </motion.button>
      ))}
    </div>
  );
}
