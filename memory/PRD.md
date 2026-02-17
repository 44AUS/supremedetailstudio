# Supreme Detail Studio - PRD

## Original Problem Statement
1. When a customer is booking on the booking page if a service is only available for in shop it should notify them and make them change their selection before proceeding.
2. Add AM/PM to all times on booking and confirmation pages.
3. Show shop address only for "in shop" on confirmation page.
4. Let customers know to save the information for their records.
5. Add same warning for services that don't require water/utility.
6. Implement requires_utilities functionality in admin.

## Architecture
- **Frontend**: React.js with Framer Motion animations
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Core Requirements (Static)
- Multi-service booking system with location restrictions
- Shop and mobile service options
- Service-level utility requirements
- Customer management with booking history
- SMS notifications via Twilio

## What's Been Implemented (Feb 17, 2026)

### Location Restriction Notification (Shop-Only Services)
- `hasLocationRestriction()` function detects shop-only or mobile-only services
- When user selects "Mobile Service" and tries to add a shop-only service, amber warning appears
- User must change service location to "In Shop" before adding the service
- Blocking warning prevents service from being added

### Utilities Requirement System
- **Backend**: Added `requires_utilities` field to ServiceCreate and ServiceUpdate models
- **Admin Panel**: Added "Requires Water/Electric" toggle in service form
- **Service Cards**: Shows green "No Utilities" badge when requires_utilities=false
- **Booking Page**: Shows green info message when selecting a service that doesn't require utilities while in mobile mode

### AM/PM Time Formatting
- TIME_SLOTS array includes AM/PM format
- `formatTime24to12()` converts 24h API times to 12h AM/PM
- `formatTime()` in BookingConfirmation ensures AM/PM display

### Conditional Shop Address on Confirmation
- Shop address only displays when `service_location === 'shop'`
- Fetches address from `/api/settings/business` endpoint

### Save Information Note
- Blue info box at bottom of confirmation page
- Encourages customers to save/print for records

## Test Services Created
1. **Paint Protection Film (Full Front)**: shop_available=true, mobile_available=false, requires_utilities=true
2. **Waterless Exterior Wash**: shop_available=true, mobile_available=true, requires_utilities=false

## API Endpoints
- `GET /api/services` - Returns services with shop_available, mobile_available, requires_utilities fields
- `POST /api/services` - Create service with all availability fields
- `PUT /api/services/{id}` - Update service including requires_utilities

## Prioritized Backlog

### P0 (Critical) - DONE
- ✅ Location restriction warning for shop-only services
- ✅ Utilities requirement warning system
- ✅ Admin toggle for requires_utilities
- ✅ AM/PM time format display
- ✅ Conditional shop address on confirmation
- ✅ Save for records note

### P1 (Important)
- Email confirmation to customers
- Multi-vehicle booking support

### P2 (Nice to Have)
- Calendar sync (Google/Apple)
- Print/PDF download for confirmation
