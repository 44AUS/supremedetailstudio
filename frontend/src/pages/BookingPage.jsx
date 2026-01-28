import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Mail, Car, Calendar, Clock, 
  ChevronRight, CheckCircle2, Sparkles, Shield, 
  Droplets, Sun, ArrowRight, ChevronLeft, MapPin,
  Building2, Truck, ChevronDown, Palette, Loader2,
  CarFront, Info, Zap
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const SERVICE_LOCATIONS = [
  { 
    id: 'shop', 
    label: 'In Shop', 
    description: 'Drop off at our Marietta location',
    icon: Building2,
    upcharge: 0
  },
  { 
    id: 'mobile', 
    label: 'Mobile Service', 
    description: 'We come to you',
    icon: Truck,
    upcharge: 50
  },
];

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan / Coupe', upcharge: 0, icon: '🚗', category: 'sedan' },
  { id: 'suv-2row', label: '2-Row SUV / Crossover / Truck', upcharge: 50, icon: '🚙', category: 'suv' },
  { id: 'suv-3row', label: '3-Row SUV / Large Truck', upcharge: 100, icon: '🚐', category: 'large' },
];

// Paint colors database by manufacturer - curated common colors
const PAINT_COLORS_BY_MAKE = {
  'Toyota': [
    { code: '040', name: 'Super White', hex: '#FFFFFF' },
    { code: '1F7', name: 'Classic Silver Metallic', hex: '#C0C0C0' },
    { code: '1G3', name: 'Magnetic Gray Metallic', hex: '#6B6B6B' },
    { code: '202', name: 'Black', hex: '#0A0A0A' },
    { code: '3T3', name: 'Ruby Flare Pearl', hex: '#8B2942' },
    { code: '8X8', name: 'Blueprint', hex: '#1E3A5F' },
    { code: '1J9', name: 'Celestial Silver Metallic', hex: '#A8A8A8' },
    { code: '8W7', name: 'Blue Crush Metallic', hex: '#0066B3' },
    { code: '3U5', name: 'Supersonic Red', hex: '#CC0000' },
    { code: '089', name: 'Wind Chill Pearl', hex: '#E8E8E8' },
  ],
  'Honda': [
    { code: 'NH-883P', name: 'Platinum White Pearl', hex: '#E8E8E8' },
    { code: 'NH-731P', name: 'Crystal Black Pearl', hex: '#1A1A1A' },
    { code: 'NH-830M', name: 'Lunar Silver Metallic', hex: '#B8B8B8' },
    { code: 'R-569M', name: 'Radiant Red Metallic', hex: '#CC2222' },
    { code: 'B-588P', name: 'Obsidian Blue Pearl', hex: '#1E3050' },
    { code: 'NH-797M', name: 'Modern Steel Metallic', hex: '#5A5A5A' },
    { code: 'YR-592M', name: 'Sonic Gray Pearl', hex: '#7A7A7A' },
    { code: 'G-548M', name: 'Aegean Blue Metallic', hex: '#2E5A7A' },
    { code: 'NH-788P', name: 'San Marino Red', hex: '#AA2233' },
    { code: 'YR-604M', name: 'Meteorite Gray Metallic', hex: '#4A4A4A' },
  ],
  'Ford': [
    { code: 'YZ', name: 'Oxford White', hex: '#FFFFFF' },
    { code: 'UM', name: 'Shadow Black', hex: '#0A0A0A' },
    { code: 'JS', name: 'Ingot Silver Metallic', hex: '#A0A0A0' },
    { code: 'J7', name: 'Magnetic Metallic', hex: '#4A4A4A' },
    { code: 'D1', name: 'Race Red', hex: '#CC0000' },
    { code: 'FT', name: 'Blue Metallic', hex: '#1E3A5F' },
    { code: 'N1', name: 'Agate Black Metallic', hex: '#1A1A1A' },
    { code: 'HG', name: 'Velocity Blue', hex: '#0044AA' },
    { code: 'AJ', name: 'Rapid Red Metallic', hex: '#AA2233' },
    { code: 'LK', name: 'Carbonized Gray Metallic', hex: '#3A3A3A' },
  ],
  'Chevrolet': [
    { code: 'GAZ', name: 'Summit White', hex: '#FFFFFF' },
    { code: 'GBA', name: 'Black', hex: '#0A0A0A' },
    { code: 'GAN', name: 'Silver Ice Metallic', hex: '#C0C0C0' },
    { code: 'G9K', name: 'Shadow Gray Metallic', hex: '#5A5A5A' },
    { code: 'G7C', name: 'Red Hot', hex: '#CC0000' },
    { code: 'GXH', name: 'Northsky Blue Metallic', hex: '#1E4070' },
    { code: 'GNO', name: 'Mosaic Black Metallic', hex: '#1A1A1A' },
    { code: 'G1W', name: 'Iridescent Pearl Tricoat', hex: '#E8E8E8' },
    { code: 'GKZ', name: 'Cherry Red Tintcoat', hex: '#8B0000' },
    { code: 'GJI', name: 'Satin Steel Metallic', hex: '#7A7A7A' },
  ],
  'BMW': [
    { code: '300', name: 'Alpine White', hex: '#FFFFFF' },
    { code: '668', name: 'Jet Black', hex: '#0A0A0A' },
    { code: 'A52', name: 'Space Gray Metallic', hex: '#5A5A5A' },
    { code: 'A89', name: 'Imperial Blue Metallic', hex: '#1E3050' },
    { code: 'B39', name: 'Mineral Gray Metallic', hex: '#6B6B6B' },
    { code: 'C1G', name: 'Phytonic Blue Metallic', hex: '#2E4A6A' },
    { code: '475', name: 'Black Sapphire Metallic', hex: '#1A1A2E' },
    { code: 'C31', name: 'Portimao Blue Metallic', hex: '#0044AA' },
    { code: 'X13', name: 'Brooklyn Gray Metallic', hex: '#4A4A4A' },
    { code: 'C4A', name: 'Skyscraper Gray Metallic', hex: '#8A8A8A' },
  ],
  'Mercedes-Benz': [
    { code: '149', name: 'Polar White', hex: '#FFFFFF' },
    { code: '040', name: 'Black', hex: '#0A0A0A' },
    { code: '992', name: 'Selenite Gray Metallic', hex: '#6A6A6A' },
    { code: '890', name: 'Obsidian Black Metallic', hex: '#1A1A1A' },
    { code: '197', name: 'Obsidian Black', hex: '#0A0A0A' },
    { code: '359', name: 'Brilliant Blue Metallic', hex: '#0044AA' },
    { code: '896', name: 'Designo Diamond White', hex: '#F0F0F0' },
    { code: '988', name: 'Diamond Silver Metallic', hex: '#C0C0C0' },
    { code: '589', name: 'Lunar Blue Metallic', hex: '#1E3A5F' },
    { code: '996', name: 'High-Tech Silver Metallic', hex: '#A8A8A8' },
  ],
  'Audi': [
    { code: 'LY9C', name: 'Ibis White', hex: '#FFFFFF' },
    { code: 'LY9T', name: 'Mythos Black Metallic', hex: '#0A0A0A' },
    { code: 'LX7R', name: 'Daytona Gray Pearl', hex: '#5A5A5A' },
    { code: 'LZ9Y', name: 'Glacier White Metallic', hex: '#E8E8E8' },
    { code: 'LY5Q', name: 'Navarra Blue Metallic', hex: '#1E3050' },
    { code: 'LX6X', name: 'Floret Silver Metallic', hex: '#B8B8B8' },
    { code: 'LY9Z', name: 'Brilliant Black', hex: '#0A0A0A' },
    { code: 'LZ5F', name: 'Ascari Blue Metallic', hex: '#2E4A7A' },
    { code: 'LY8X', name: 'Quantum Gray', hex: '#4A4A4A' },
    { code: 'LZ3M', name: 'Tango Red Metallic', hex: '#CC2222' },
  ],
  'Nissan': [
    { code: 'QAB', name: 'Brilliant Silver Metallic', hex: '#C0C0C0' },
    { code: 'KH3', name: 'Super Black', hex: '#0A0A0A' },
    { code: 'QM1', name: 'Fresh Powder', hex: '#FFFFFF' },
    { code: 'RAY', name: 'Gun Metallic', hex: '#5A5A5A' },
    { code: 'RBY', name: 'Deep Blue Pearl', hex: '#1E3050' },
    { code: 'NAH', name: 'Scarlet Ember Tintcoat', hex: '#8B2942' },
    { code: 'KAD', name: 'Magnetic Black Pearl', hex: '#1A1A1A' },
    { code: 'NAJ', name: 'Boulder Gray Pearl', hex: '#6B6B6B' },
    { code: 'EAH', name: 'Pearl White Tricoat', hex: '#F0F0F0' },
    { code: 'GAT', name: 'Storm Blue', hex: '#2E4A6A' },
  ],
  'Hyundai': [
    { code: 'NKA', name: 'Aurora Black Pearl', hex: '#0A0A0A' },
    { code: 'W8Y', name: 'Quartz White Pearl', hex: '#FFFFFF' },
    { code: 'R4R', name: 'Calypso Red', hex: '#CC2222' },
    { code: 'YB7', name: 'Cyber Gray Metallic', hex: '#6B6B6B' },
    { code: 'N4U', name: 'Phantom Black', hex: '#1A1A1A' },
    { code: 'S3B', name: 'Shimmering Silver', hex: '#C0C0C0' },
    { code: 'WC9', name: 'Atlas White', hex: '#FFFFFF' },
    { code: 'N5M', name: 'Amazon Gray', hex: '#5A5A5A' },
    { code: 'PH3', name: 'Portofino Gray', hex: '#8A8A8A' },
    { code: 'W4Y', name: 'Creamy White Pearl', hex: '#F0E8E0' },
  ],
  'Kia': [
    { code: 'ABP', name: 'Aurora Black Pearl', hex: '#0A0A0A' },
    { code: 'SWP', name: 'Snow White Pearl', hex: '#FFFFFF' },
    { code: 'C4G', name: 'Gravity Gray', hex: '#5A5A5A' },
    { code: 'KLG', name: 'Steel Gray', hex: '#6B6B6B' },
    { code: 'B4U', name: 'Deep Sea Blue', hex: '#1E3050' },
    { code: 'R4R', name: 'Runway Red', hex: '#CC2222' },
    { code: 'MST', name: 'Mineral Silver', hex: '#C0C0C0' },
    { code: 'ACB', name: 'Clear White', hex: '#FFFFFF' },
    { code: 'D9Y', name: 'Ceramic Silver', hex: '#B8B8B8' },
    { code: 'P2M', name: 'Platinum Graphite', hex: '#4A4A4A' },
  ],
  'Mazda': [
    { code: '25D', name: 'Snowflake White Pearl', hex: '#FFFFFF' },
    { code: '41W', name: 'Jet Black Mica', hex: '#0A0A0A' },
    { code: '46V', name: 'Soul Red Crystal Metallic', hex: '#8B2942' },
    { code: '47C', name: 'Machine Gray Metallic', hex: '#5A5A5A' },
    { code: '42M', name: 'Deep Crystal Blue Mica', hex: '#1E3050' },
    { code: '45P', name: 'Sonic Silver Metallic', hex: '#C0C0C0' },
    { code: '46G', name: 'Polymetal Gray Metallic', hex: '#6B6B6B' },
    { code: '41V', name: 'Titanium Flash Mica', hex: '#4A4A4A' },
    { code: '25Y', name: 'Rhodium White Premium', hex: '#E8E8E8' },
    { code: '42S', name: 'Eternal Blue Mica', hex: '#2E4A6A' },
  ],
  'Subaru': [
    { code: 'K1X', name: 'Crystal White Pearl', hex: '#FFFFFF' },
    { code: 'D4S', name: 'Crystal Black Silica', hex: '#0A0A0A' },
    { code: 'M1Y', name: 'Ice Silver Metallic', hex: '#C0C0C0' },
    { code: 'MAD', name: 'Magnetite Gray Metallic', hex: '#5A5A5A' },
    { code: 'H8R', name: 'Pure Red', hex: '#CC2222' },
    { code: 'E8H', name: 'Dark Blue Pearl', hex: '#1E3050' },
    { code: 'N3U', name: 'Abyss Blue Pearl', hex: '#1A2A4A' },
    { code: '4S2', name: 'WR Blue Pearl', hex: '#0044AA' },
    { code: 'GT2', name: 'Autumn Green Metallic', hex: '#2A4A2A' },
    { code: 'G2U', name: 'Sapphire Blue Pearl', hex: '#2E4A7A' },
  ],
  'Volkswagen': [
    { code: 'LC9A', name: 'Pure White', hex: '#FFFFFF' },
    { code: 'LC9X', name: 'Deep Black Pearl', hex: '#0A0A0A' },
    { code: 'LB7W', name: 'Platinum Gray Metallic', hex: '#6B6B6B' },
    { code: 'LA7W', name: 'Reflex Silver Metallic', hex: '#C0C0C0' },
    { code: 'LH1Z', name: 'Atlantic Blue Metallic', hex: '#1E3050' },
    { code: 'LC9Z', name: 'Urano Gray', hex: '#5A5A5A' },
    { code: 'LG7S', name: 'Pyrite Silver Metallic', hex: '#8A8A8A' },
    { code: 'LP5Z', name: 'Cornflower Blue', hex: '#4A6A9A' },
    { code: 'LY3D', name: 'Tornado Red', hex: '#CC2222' },
    { code: 'LS8Y', name: 'Rising Blue Metallic', hex: '#2E5A7A' },
  ],
  'Lexus': [
    { code: '077', name: 'Ultra White', hex: '#FFFFFF' },
    { code: '212', name: 'Obsidian', hex: '#0A0A0A' },
    { code: '1J7', name: 'Atomic Silver', hex: '#A8A8A8' },
    { code: '1L1', name: 'Eminent White Pearl', hex: '#F0F0F0' },
    { code: '8X5', name: 'Ultrasonic Blue Mica 2.0', hex: '#0044AA' },
    { code: '3T5', name: 'Matador Red Mica', hex: '#8B2942' },
    { code: '1G1', name: 'Nebula Gray Pearl', hex: '#6B6B6B' },
    { code: '223', name: 'Caviar', hex: '#1A1A1A' },
    { code: '8Y5', name: 'Grecian Water', hex: '#4A7A8A' },
    { code: '1K4', name: 'Cloudburst Gray', hex: '#5A5A5A' },
  ],
  'Tesla': [
    { code: 'PPSW', name: 'Pearl White Multi-Coat', hex: '#FFFFFF' },
    { code: 'PBSB', name: 'Solid Black', hex: '#0A0A0A' },
    { code: 'PMNG', name: 'Midnight Silver Metallic', hex: '#5A5A5A' },
    { code: 'PPSB', name: 'Deep Blue Metallic', hex: '#1E3050' },
    { code: 'PPSR', name: 'Red Multi-Coat', hex: '#CC2222' },
    { code: 'MSS', name: 'Midnight Cherry Red', hex: '#4A1A2A' },
    { code: 'QW', name: 'Quicksilver', hex: '#C0C0C0' },
    { code: 'PMSS', name: 'Ultra White', hex: '#F8F8F8' },
  ],
  'Jeep': [
    { code: 'PW7', name: 'Bright White', hex: '#FFFFFF' },
    { code: 'PX8', name: 'Black', hex: '#0A0A0A' },
    { code: 'PAU', name: 'Billet Silver Metallic', hex: '#A8A8A8' },
    { code: 'PGG', name: 'Granite Crystal Metallic', hex: '#5A5A5A' },
    { code: 'PRM', name: 'Velvet Red Pearl', hex: '#6A2A3A' },
    { code: 'PBM', name: 'Patriot Blue Pearl', hex: '#1E3050' },
    { code: 'PDN', name: 'Sting Gray', hex: '#7A7A7A' },
    { code: 'PJD', name: 'Hydro Blue Pearl', hex: '#4A6A7A' },
    { code: 'PRY', name: 'Firecracker Red', hex: '#CC2222' },
    { code: 'PAE', name: 'Earl', hex: '#3A3A3A' },
  ],
  'RAM': [
    { code: 'PW7', name: 'Bright White', hex: '#FFFFFF' },
    { code: 'PX8', name: 'Diamond Black Crystal', hex: '#0A0A0A' },
    { code: 'PAU', name: 'Billet Silver Metallic', hex: '#A8A8A8' },
    { code: 'PGG', name: 'Granite Crystal Metallic', hex: '#5A5A5A' },
    { code: 'PRV', name: 'Delmonico Red Pearl', hex: '#6A2A3A' },
    { code: 'PBM', name: 'Patriot Blue Pearl', hex: '#1E3050' },
    { code: 'PR4', name: 'Flame Red', hex: '#CC2222' },
    { code: 'PAE', name: 'Anvil Gray', hex: '#6A6A6A' },
    { code: 'PJD', name: 'Hydro Blue Pearl', hex: '#4A6A7A' },
    { code: 'PWD', name: 'Ivory Pearl Tri-Coat', hex: '#F0E8E0' },
  ],
  'GMC': [
    { code: 'GAZ', name: 'Summit White', hex: '#FFFFFF' },
    { code: 'GBA', name: 'Onyx Black', hex: '#0A0A0A' },
    { code: 'GAN', name: 'Quicksilver Metallic', hex: '#B8B8B8' },
    { code: 'G9K', name: 'Satin Steel Metallic', hex: '#6B6B6B' },
    { code: 'G7C', name: 'Cayenne Red Tintcoat', hex: '#8B2942' },
    { code: 'GXH', name: 'Pacific Blue Metallic', hex: '#1E4070' },
    { code: 'GNO', name: 'Carbon Black Metallic', hex: '#1A1A1A' },
    { code: 'GJI', name: 'Hunter Metallic', hex: '#2A4A2A' },
    { code: 'G1W', name: 'White Frost Tricoat', hex: '#E8E8E8' },
    { code: 'GKZ', name: 'Volcanic Red Tintcoat', hex: '#6A1A2A' },
  ],
  'Default': [
    { code: 'WHT', name: 'White', hex: '#FFFFFF' },
    { code: 'BLK', name: 'Black', hex: '#0A0A0A' },
    { code: 'SLV', name: 'Silver', hex: '#C0C0C0' },
    { code: 'GRY', name: 'Gray', hex: '#6B6B6B' },
    { code: 'RED', name: 'Red', hex: '#CC2222' },
    { code: 'BLU', name: 'Blue', hex: '#1E3050' },
    { code: 'GRN', name: 'Green', hex: '#2A4A2A' },
    { code: 'BRN', name: 'Brown', hex: '#4A3A2A' },
    { code: 'GLD', name: 'Gold', hex: '#B8A060' },
    { code: 'BEG', name: 'Beige', hex: '#D8C8B0' },
  ],
};

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
    maxWidth: '800px',
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
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
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
    fontSize: '11px',
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
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
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
    width: '100%',
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
  select: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px',
    paddingRight: '48px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    appearance: 'none',
  },
  selectArrow: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.4)',
    pointerEvents: 'none',
  },
  locationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  locationCard: (selected) => ({
    position: 'relative',
    padding: '28px',
    borderRadius: '18px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: selected ? '0 10px 30px rgba(220, 38, 38, 0.2)' : 'none',
  }),
  locationIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(220, 38, 38, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  locationLabel: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '18px',
    marginBottom: '6px',
  },
  locationDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
  },
  locationUpcharge: {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 600,
    marginTop: '12px',
  },
  // Pickup & Delivery Styles
  pickupDeliveryContainer: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '18px',
    padding: '24px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  pickupDeliveryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  pickupDeliveryTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
  },
  pickupDeliveryDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: 1.5,
  },
  pickupOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  pickupOptionCard: (selected) => ({
    position: 'relative',
    padding: '20px',
    borderRadius: '14px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: selected ? '0 8px 20px rgba(220, 38, 38, 0.15)' : 'none',
  }),
  pickupOptionTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    marginBottom: '4px',
  },
  pickupOptionSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
  },
  pickupOptionPrice: {
    color: '#ef4444',
    fontSize: '13px',
    fontWeight: 600,
    marginTop: '8px',
  },
  distanceNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 16px',
    background: 'rgba(220, 38, 38, 0.1)',
    borderRadius: '12px',
    marginBottom: '16px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    lineHeight: 1.5,
  },
  distanceOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  distanceCard: (selected) => ({
    position: 'relative',
    padding: '16px',
    borderRadius: '12px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  }),
  distanceLabel: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '14px',
    marginBottom: '4px',
  },
  distancePrice: {
    color: '#ef4444',
    fontSize: '16px',
    fontWeight: 700,
  },
  // Mobile Utilities Styles
  utilitiesContainer: {
    background: 'rgba(59, 130, 246, 0.08)',
    borderRadius: '18px',
    padding: '24px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  utilitiesHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  utilitiesTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
  },
  utilitiesDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  utilitiesCheckbox: (checked) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '20px',
    borderRadius: '14px',
    background: checked ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.03)',
    border: checked ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    width: '100%',
  }),
  checkboxBox: (checked) => ({
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: checked ? '#22c55e' : 'rgba(255,255,255,0.1)',
    border: checked ? 'none' : '2px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  }),
  checkboxText: {
    flex: 1,
  },
  checkboxLabel: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    display: 'block',
    marginBottom: '10px',
  },
  checkboxItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
  },
  utilitiesWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'rgba(245, 158, 11, 0.1)',
    borderRadius: '12px',
    marginTop: '16px',
    color: '#f59e0b',
    fontSize: '13px',
  },
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
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '12px',
    marginTop: '16px',
  },
  colorCard: (selected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '12px',
    background: selected ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.03)',
    border: selected ? '2px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }),
  colorSwatch: (hex) => ({
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: hex,
    border: hex === '#FFFFFF' || hex === '#F0F0F0' || hex === '#E8E8E8' || hex === '#F8F8F8' 
      ? '1px solid rgba(255,255,255,0.3)' 
      : 'none',
    flexShrink: 0,
  }),
  colorName: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.3,
  },
  colorCode: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
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
    boxSizing: 'border-box',
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
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: 'rgba(255,255,255,0.5)',
  },
};

/* ---------------- MAIN ---------------- */

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [serviceLocation, setServiceLocation] = useState(null);
  const [pickupDelivery, setPickupDelivery] = useState(null); // null, 'yes', or 'no'
  const [pickupDistance, setPickupDistance] = useState('under15'); // 'under15' or 'over15'
  const [mobileUtilitiesConfirmed, setMobileUtilitiesConfirmed] = useState(false); // For mobile service water/electric confirmation
  const [vehicle, setVehicle] = useState({ year: '', make: '', model: '' });
  const [vehicleType, setVehicleType] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');

  // API data states
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  // Generate years (last 30 years)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let y = currentYear + 1; y >= currentYear - 30; y--) {
      yearList.push(y.toString());
    }
    setYears(yearList);
  }, []);

  // Fetch makes when year is selected
  const fetchMakes = useCallback(async (year) => {
    if (!year) {
      setMakes([]);
      return;
    }
    setLoadingMakes(true);
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
      );
      const data = await response.json();
      if (data.Results) {
        // Get unique makes sorted alphabetically
        const makeList = [...new Set(data.Results.map(m => m.MakeName))]
          .filter(m => m)
          .sort();
        setMakes(makeList);
      }
    } catch (error) {
      console.error('Error fetching makes:', error);
      // Fallback to common makes
      setMakes(['Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 
        'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover',
        'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Porsche', 
        'RAM', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo']);
    }
    setLoadingMakes(false);
  }, []);

  // Fetch models when make is selected
  const fetchModels = useCallback(async (year, make) => {
    if (!year || !make) {
      setModels([]);
      return;
    }
    setLoadingModels(true);
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
      );
      const data = await response.json();
      if (data.Results) {
        const modelList = [...new Set(data.Results.map(m => m.Model_Name))]
          .filter(m => m)
          .sort();
        setModels(modelList);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
    }
    setLoadingModels(false);
  }, []);

  // Effect to fetch makes when year changes
  useEffect(() => {
    if (vehicle.year) {
      fetchMakes(vehicle.year);
      setVehicle(prev => ({ ...prev, make: '', model: '' }));
      setModels([]);
      setSelectedColor(null);
    }
  }, [vehicle.year, fetchMakes]);

  // Effect to fetch models when make changes
  useEffect(() => {
    if (vehicle.year && vehicle.make) {
      fetchModels(vehicle.year, vehicle.make);
      setVehicle(prev => ({ ...prev, model: '' }));
      setSelectedColor(null);
    }
  }, [vehicle.make, vehicle.year, fetchModels]);

  // Get paint colors for selected make
  const getPaintColors = () => {
    if (!vehicle.make) return [];
    const makeKey = Object.keys(PAINT_COLORS_BY_MAKE).find(
      key => vehicle.make.toLowerCase().includes(key.toLowerCase()) || 
             key.toLowerCase().includes(vehicle.make.toLowerCase())
    );
    return PAINT_COLORS_BY_MAKE[makeKey] || PAINT_COLORS_BY_MAKE['Default'];
  };

  // Calculate total price
  const locationUpcharge = serviceLocation?.upcharge || 0;
  const vehicleUpcharge = vehicleType?.upcharge || 0;
  
  // Pickup & Delivery pricing
  let pickupDeliveryCharge = 0;
  if (serviceLocation?.id === 'shop' && pickupDelivery === 'yes') {
    pickupDeliveryCharge = pickupDistance === 'over15' ? 75 : 50;
  }
  
  const totalPrice = selectedService
    ? selectedService.category === 'detail'
      ? vehicleType
        ? selectedService.base + vehicleUpcharge + locationUpcharge + pickupDeliveryCharge
        : null
      : selectedService.price + locationUpcharge + pickupDeliveryCharge
    : null;

  const progressSteps = [
    { num: 1, label: 'Info', completed: formData.firstName && formData.email && formData.address },
    { num: 2, label: 'Location', completed: serviceLocation !== null },
    { num: 3, label: 'Vehicle', completed: vehicleType !== null && vehicle.make && selectedColor },
    { num: 4, label: 'Service', completed: selectedService !== null },
    { num: 5, label: 'Schedule', completed: selectedDate && selectedTime },
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
            <div style={{ ...styles.progressFill, width: `${(completedSteps / 5) * 100}%` }} />
          </div>
          {progressSteps.map((step) => (
            <div key={step.num} style={styles.progressStep}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={styles.progressCircle(step.completed, false)}
              >
                {step.completed ? <CheckCircle2 size={18} /> : step.num}
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
          <div style={{ marginTop: '20px' }}>
            <InputField 
              label="Address" 
              icon={MapPin}
              value={formData.address}
              onChange={(v) => setFormData({...formData, address: v})}
              placeholder="123 Main St, Marietta, GA 30060"
              required
            />
          </div>
        </motion.div>

        {/* STEP 2 – SERVICE LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={styles.card}
          data-testid="step-2-location-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>SERVICE LOCATION</h3>
            <MapPin size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
          </div>

          <div style={{ ...styles.locationGrid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
            {SERVICE_LOCATIONS.map((location) => {
              const Icon = location.icon;
              return (
                <motion.button
                  key={location.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setServiceLocation(location);
                    // Reset pickup/delivery when changing location
                    if (location.id !== 'shop') {
                      setPickupDelivery(null);
                      setPickupDistance('under15');
                    }
                    // Reset mobile utilities when changing location
                    if (location.id !== 'mobile') {
                      setMobileUtilitiesConfirmed(false);
                    }
                  }}
                  style={styles.locationCard(serviceLocation?.id === location.id)}
                  data-testid={`location-${location.id}`}
                >
                  {serviceLocation?.id === location.id && (
                    <CheckCircle2 size={20} style={styles.checkIcon} />
                  )}
                  <div style={styles.locationIcon}>
                    <Icon size={28} style={{ color: '#ef4444' }} />
                  </div>
                  <div style={styles.locationLabel}>{location.label}</div>
                  <div style={styles.locationDesc}>{location.description}</div>
                  {location.upcharge > 0 && (
                    <div style={styles.locationUpcharge}>+${location.upcharge}</div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Service Utilities Requirement - Only shows when Mobile is selected */}
          <AnimatePresence>
            {serviceLocation?.id === 'mobile' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: '24px' }}
              >
                <div style={styles.utilitiesContainer}>
                  <div style={styles.utilitiesHeader}>
                    <Droplets size={20} style={{ color: '#3b82f6' }} />
                    <span style={styles.utilitiesTitle}>Utility Access Required</span>
                  </div>
                  <p style={styles.utilitiesDesc}>
                    For mobile detailing, we require access to <strong>water</strong> and <strong>electrical hookups</strong> at your location to complete the job properly.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setMobileUtilitiesConfirmed(!mobileUtilitiesConfirmed)}
                    style={styles.utilitiesCheckbox(mobileUtilitiesConfirmed)}
                    data-testid="utilities-confirm"
                  >
                    <div style={styles.checkboxBox(mobileUtilitiesConfirmed)}>
                      {mobileUtilitiesConfirmed && <CheckCircle2 size={18} style={{ color: '#fff' }} />}
                    </div>
                    <div style={styles.checkboxText}>
                      <span style={styles.checkboxLabel}>Yes, I confirm I have easy access to:</span>
                      <div style={styles.checkboxItems}>
                        <span style={styles.checkboxItem}>
                          <Droplets size={14} style={{ color: '#3b82f6' }} /> Water hookup / hose connection
                        </span>
                        <span style={styles.checkboxItem}>
                          <Zap size={14} style={{ color: '#eab308' }} /> Electrical outlet (standard 120V)
                        </span>
                      </div>
                    </div>
                  </motion.button>

                  {!mobileUtilitiesConfirmed && (
                    <div style={styles.utilitiesWarning}>
                      <Info size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                      <span>Please confirm utility access to proceed with mobile service booking.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pickup & Delivery Option - Only shows when In Shop is selected */}
          <AnimatePresence>
            {serviceLocation?.id === 'shop' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: '24px' }}
              >
                <div style={styles.pickupDeliveryContainer}>
                  <div style={styles.pickupDeliveryHeader}>
                    <CarFront size={20} style={{ color: '#ef4444' }} />
                    <span style={styles.pickupDeliveryTitle}>Pickup & Delivery Service</span>
                  </div>
                  <p style={styles.pickupDeliveryDesc}>
                    Don't have time to drop off? We'll pick up your vehicle and deliver it back to you!
                  </p>

                  <div style={styles.pickupOptions}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPickupDelivery('no')}
                      style={styles.pickupOptionCard(pickupDelivery === 'no')}
                      data-testid="pickup-no"
                    >
                      {pickupDelivery === 'no' && (
                        <CheckCircle2 size={18} style={styles.checkIcon} />
                      )}
                      <div style={styles.pickupOptionTitle}>No Thanks</div>
                      <div style={styles.pickupOptionSubtitle}>I'll drop off myself</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPickupDelivery('yes')}
                      style={styles.pickupOptionCard(pickupDelivery === 'yes')}
                      data-testid="pickup-yes"
                    >
                      {pickupDelivery === 'yes' && (
                        <CheckCircle2 size={18} style={styles.checkIcon} />
                      )}
                      <div style={styles.pickupOptionTitle}>Yes, Please!</div>
                      <div style={styles.pickupOptionSubtitle}>Pick up & deliver my car</div>
                      <div style={styles.pickupOptionPrice}>Starting at +$50</div>
                    </motion.button>
                  </div>

                  {/* Distance Selection - Only shows when pickup is selected */}
                  <AnimatePresence>
                    {pickupDelivery === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: '16px' }}
                      >
                        <div style={styles.distanceNote}>
                          <Info size={16} style={{ color: '#ef4444', flexShrink: 0 }} />
                          <span>Select the distance from our Marietta location to your address:</span>
                        </div>
                        <div style={styles.distanceOptions}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPickupDistance('under15')}
                            style={styles.distanceCard(pickupDistance === 'under15')}
                            data-testid="distance-under15"
                          >
                            {pickupDistance === 'under15' && (
                              <CheckCircle2 size={16} style={{ ...styles.checkIcon, top: '8px', right: '8px' }} />
                            )}
                            <div style={styles.distanceLabel}>Under 15 miles</div>
                            <div style={styles.distancePrice}>+$50</div>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPickupDistance('over15')}
                            style={styles.distanceCard(pickupDistance === 'over15')}
                            data-testid="distance-over15"
                          >
                            {pickupDistance === 'over15' && (
                              <CheckCircle2 size={16} style={{ ...styles.checkIcon, top: '8px', right: '8px' }} />
                            )}
                            <div style={styles.distanceLabel}>Over 15 miles</div>
                            <div style={styles.distancePrice}>+$75</div>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* STEP 3 – VEHICLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.card}
          data-testid="step-3-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>YOUR VEHICLE</h3>
            <Car size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
          </div>

          <div style={{ ...styles.formGrid(3), ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
            <SelectField
              label="Year"
              value={vehicle.year}
              onChange={(v) => setVehicle({...vehicle, year: v})}
              options={years}
              placeholder="Select Year"
            />
            <SelectField
              label="Make"
              value={vehicle.make}
              onChange={(v) => setVehicle({...vehicle, make: v})}
              options={makes}
              placeholder={loadingMakes ? "Loading..." : "Select Make"}
              disabled={!vehicle.year || loadingMakes}
            />
            <SelectField
              label="Model"
              value={vehicle.model}
              onChange={(v) => setVehicle({...vehicle, model: v})}
              options={models}
              placeholder={loadingModels ? "Loading..." : "Select Model"}
              disabled={!vehicle.make || loadingModels}
            />
          </div>

          {/* Vehicle Type Selection */}
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '24px', marginBottom: '16px' }}>
            Select your vehicle type:
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

          {/* Color Selection */}
          {vehicle.make && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ ...styles.sectionTitle, marginTop: '32px' }}>
                <Palette size={18} style={{ color: '#ef4444' }} />
                Select Your Paint Color
                <span style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>
                  ({vehicle.make} Colors)
                </span>
              </div>
              <div style={styles.colorGrid}>
                {getPaintColors().map((color) => (
                  <motion.button
                    key={color.code}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedColor(color)}
                    style={styles.colorCard(selectedColor?.code === color.code)}
                    data-testid={`color-${color.code}`}
                  >
                    <div style={styles.colorSwatch(color.hex)} />
                    <div>
                      <div style={styles.colorName}>{color.name}</div>
                      <div style={styles.colorCode}>{color.code}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* STEP 4 – SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={styles.card}
          data-testid="step-4-card"
        >
          <div style={styles.stepHeader}>
            <div style={styles.stepNumber}>4</div>
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
                ? service.base + vehicleUpcharge + locationUpcharge + pickupDeliveryCharge
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
                price={service.price + locationUpcharge + pickupDeliveryCharge}
                selected={selectedService?.id === service.id}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </motion.div>

        {/* STEP 5 & 6 – DATE & TIME */}
        <div style={{ ...styles.twoColGrid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={styles.card}
            data-testid="step-5-card"
          >
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>5</div>
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
            data-testid="step-6-card"
          >
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>6</div>
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
                      <MapPin size={16} style={styles.confirmIcon} />
                      {serviceLocation?.label}
                      {serviceLocation?.id === 'shop' && pickupDelivery === 'yes' && (
                        <span style={{ color: '#ef4444' }}> + Pickup & Delivery ({pickupDistance === 'over15' ? '>15mi' : '<15mi'})</span>
                      )}
                    </div>
                    <div style={styles.confirmDetail}>
                      <Calendar size={16} style={styles.confirmIcon} />
                      Day {selectedDate} at {selectedTime}
                    </div>
                    {vehicleType && (
                      <div style={styles.confirmDetail}>
                        <Car size={16} style={styles.confirmIcon} />
                        {vehicle.year} {vehicle.make} {vehicle.model} ({vehicleType.label})
                      </div>
                    )}
                    {selectedColor && (
                      <div style={styles.confirmDetail}>
                        <Palette size={16} style={styles.confirmIcon} />
                        {selectedColor.name} ({selectedColor.code})
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

function SelectField({ label, value, onChange, options, placeholder, disabled }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputContainer}>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={{
            ...styles.select,
            borderColor: focused ? 'rgba(220, 38, 38, 0.5)' : 'rgba(255,255,255,0.08)',
            background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
            opacity: disabled ? 0.5 : 1,
          }}
          data-testid={`select-${label.toLowerCase()}`}
        >
          <option value="" style={{ background: '#1a1a1a' }}>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: '#1a1a1a' }}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={18} style={styles.selectArrow} />
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
