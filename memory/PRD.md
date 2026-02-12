# Supreme Detail Studio - Admin Dashboard & Booking System PRD

## Original Problem Statement
Build an admin dashboard with booking appointment page logic that allows:
- Add services and subcategories for interior/exterior details
- Toggle in-shop/mobile service location
- Select available times and closed days/holidays
- Complete booking page showing booking details on completion
- Admin to see bookings and mark as in_progress/complete/incomplete
- UI consistent with existing site styling

### Latest Feature Request (Feb 12, 2026):
- Add customer management to admin dashboard
- Customer matching by both email AND phone
- Auto-create customer when any new booking is created
- Full customer view with booking stats (total spent, total visits, last visit), notes/tags
- Link all bookings for each customer together
- Add/edit customer details, search by name/email/phone
- Import/export customers via CSV

## User Choices
- Simple admin login (username/password)
- Business hours: 9am-6pm (customizable per day)
- Closed days selectable
- Appointment duration set per service
- Services: Interior Detail (Deluxe/Supreme), prices vary by vehicle size
- Guest booking only (no user signup)
- Customer matching: by email AND phone (stricter)
- Auto-create customer on booking creation

## Architecture

### Backend (FastAPI + MongoDB)
- **Authentication**: JWT-based admin login
- **Services API**: CRUD for services with categories, vehicle pricing, duration
- **Schedule API**: Business hours per day, closed dates management
- **Bookings API**: Create/Read/Update booking status, auto-customer creation
- **Customers API**: CRUD, search, import/export CSV, booking history
- **Availability API**: Real-time slot availability

### Frontend (React)
- **Admin Dashboard**: Stats, recent bookings, quick actions
- **Services Management**: Add/Edit/Delete with pricing tiers
- **Schedule Management**: Business hours, closed dates
- **Bookings Management**: Table view, status updates
- **Customers Management**: Table view, search, add/edit, view details with booking history, import/export CSV
- **Public Booking Page**: Multi-step form with API integration
- **Booking Confirmation**: Details display after submission

## What's Been Implemented

### Backend (Feb 12, 2026)
- [x] Admin authentication (login/verify)
- [x] Services CRUD with vehicle pricing
- [x] Schedule management (business hours, closed dates)
- [x] Bookings CRUD with status management
- [x] Availability checking
- [x] Dashboard stats API
- [x] **Customer Management APIs**:
  - Customer CRUD (create, read, update, delete)
  - Customer search by name/email/phone
  - Auto-customer creation on booking
  - Customer booking history retrieval
  - CSV export/import functionality
  - Total spent tracking (updated when booking marked complete)

### Frontend (Feb 12, 2026)
- [x] Admin login page
- [x] Admin dashboard with stats
- [x] Services management page with modal
- [x] Schedule management page
- [x] Bookings management with detail modal
- [x] Booking page with backend integration
- [x] Booking confirmation page
- [x] **Customers Management Page**:
  - Customer list table with search
  - Add/Edit customer modal with tags & notes
  - View customer details modal with stats & booking history
  - Import/Export CSV functionality
  - Delete customer

### Admin Credentials
- Username: admin
- Password: supremeadmin123

## Testing Status
- Backend: 100% functional
- Frontend: 95% functional (minor UI selector issue in close button, has workaround)

## Next Action Items / Prioritized Backlog

### P0 (High Priority)
- [ ] Add sample services via admin (Deluxe Interior, Supreme Interior, etc.)
- [ ] Test full booking flow end-to-end with customer linking

### P1 (Medium Priority)
- [ ] Email notifications for bookings (SendGrid integration)
- [ ] Admin password change functionality
- [ ] Booking calendar view in admin dashboard
- [ ] Export bookings to CSV
- [ ] Customer merge functionality (for duplicate customers)

### P2 (Lower Priority)
- [ ] SMS notifications (Twilio integration)
- [ ] Revenue reporting dashboard
- [ ] Multi-admin support with roles
- [ ] Customer loyalty program integration

## Technical Notes
- Backend runs on FastAPI with Motor (async MongoDB driver)
- Frontend uses React with inline styles matching existing site
- JWT token expires in 24 hours
- All backend routes prefixed with /api
- Services support shop_available and mobile_available toggles
- Vehicle pricing: sedan (base), SUV 2-row (+$50), SUV 3-row (+$100)
- Customer matching: requires BOTH email AND phone to match for linking
- Customer total_spent is updated when booking status changes to/from "complete"
