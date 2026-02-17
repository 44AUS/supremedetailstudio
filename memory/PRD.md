# Supreme Detail Studio - PRD

## Original Problem Statement
1. When time slots are partially available (e.g., 9am and 10am available but rest taken), only services that fit within the available time window should be bookable (including buffer time)
2. Buffer time should be editable in business settings
3. Booking form order: Vehicle first, Service second, then Info, Location, Schedule
4. Shop-only service notifications
5. Utilities requirement warnings
6. AM/PM time formatting
7. Conditional shop address on confirmation

## Architecture
- **Frontend**: React.js with Framer Motion animations
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Booking Form Order (Updated Feb 17, 2026)
1. **Vehicle** - Select vehicle type, year, make, model, color
2. **Service** - Select services (filtered by available time)
3. **Info** - Customer name, email, phone, address
4. **Location** - In Shop or Mobile Service
5. **Schedule** - Date and Time selection

## Core Features Implemented

### Time-Based Service Filtering
- Availability API returns `buffer_minutes` and `available_minutes` per slot
- Services exceeding available time window are automatically hidden
- Blue info banner shows remaining time when slot selected
- Current service duration displayed in real-time

### Buffer Time Management
- Configurable buffer time between bookings (default: 60 min)
- Editable via Admin → Services → Business Settings
- Buffer time used in availability calculations

### Location & Utility Restrictions
- Shop-only services show amber warning when mobile selected
- Services not requiring utilities show green info message
- `requires_utilities` field on services (admin editable)

### Confirmation Page
- AM/PM time formatting
- Shop address shown only for "In Shop" bookings
- "Save for records" reminder message

## API Endpoints

### Availability
`GET /api/availability/{date}?total_duration={minutes}`
Returns:
```json
{
  "available": true,
  "buffer_minutes": 60,
  "slots": [
    {"time": "09:00", "available": true, "available_minutes": 120},
    {"time": "10:00", "available": true, "available_minutes": 60},
    {"time": "11:00", "available": false, "available_minutes": 0}
  ]
}
```

### Business Settings
`GET/PUT /api/settings/business`
- `booking_buffer_minutes`: Buffer time between appointments

## Test Data
- Booking at 11am tomorrow (120 min duration)
- 9am slot: 120 min available
- 10am slot: 60 min available
- 11am-1pm: blocked (booking + buffer)

## Prioritized Backlog

### P0 - DONE
- ✅ Form reorder (Vehicle → Service → Info → Location → Schedule)
- ✅ Time-based service filtering
- ✅ Configurable buffer time
- ✅ Location restriction warnings
- ✅ Utilities requirement system

### P1
- Email confirmations
- Multi-vehicle booking

### P2
- Calendar sync
- Print/PDF confirmation
