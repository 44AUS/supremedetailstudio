# Supreme Detail Studio - PRD

## Original Problem Statement
When a customer is booking on the booking page if a service is only available for in shop it should notify them and make them change their selection before proceeding. Also next to all times put AM or PM, and on the customer confirmation page it should show the shop address only if they chose in shop and also let them know to save the information for their records.

## Architecture
- **Frontend**: React.js with Framer Motion animations
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## User Personas
1. **Customers**: Book detailing services, view confirmations
2. **Admin**: Manage bookings, services, customers, schedule

## Core Requirements (Static)
- Multi-service booking system
- Shop and mobile service options
- Customer management with booking history
- SMS notifications via Twilio
- Google Reviews integration

## What's Been Implemented (Feb 17, 2026)

### Location Restriction Notification
- Added `hasLocationRestriction()` function to detect shop-only or mobile-only services
- When user selects "Mobile Service" and tries to add a shop-only service, warning message appears
- User must change service location to "In Shop" before adding the service
- Warning can be dismissed with "Got it" button

### AM/PM Time Formatting
- TIME_SLOTS array already includes AM/PM format (9:00 AM, 10:00 AM, etc.)
- `formatTime24to12()` function converts 24h API times to 12h AM/PM
- `formatTime()` function in BookingConfirmation ensures AM/PM display

### Shop Address on Confirmation (Conditional)
- Shop address section only displays when `service_location === 'shop'`
- Fetches address from `/api/settings/business` endpoint
- Shows with MapPin icon in styled box

### Save Information Note
- Added blue info box at bottom of confirmation page
- Text: "Save This Information: We recommend saving or printing this page for your records. You can also take a screenshot for easy reference."

## Prioritized Backlog

### P0 (Critical) - DONE
- ✅ Location restriction warning for shop-only services
- ✅ AM/PM time format display
- ✅ Conditional shop address on confirmation
- ✅ Save for records note

### P1 (Important)
- Email confirmation to customers
- Multi-vehicle booking support
- Service image gallery

### P2 (Nice to Have)
- Calendar sync (Google/Apple)
- Customer account portal
- Online payment integration

## Next Tasks
- Test the location restriction with actual shop-only services in the database
- Add email confirmation functionality
- Consider adding print/PDF download option for confirmation page
