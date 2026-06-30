# Hotelify — Agent Guide

## Project State

Hotelify is a Hotel Management & Online Reservation System built on Laravel 12 + React.

**Backend (complete):**
- 15 database tables with migrations, models, relationships, factories, and seeders
- Sanctum auth (login, register, logout, me)
- Full REST API at `/api/v1` — 42 routes
- Service/Repository pattern with base classes
- ApiResponse trait (`{success, message, data}`)
- Modules: Auth, RoomType, Room, Facility, Guest, Reservation, Booking, Payment, Invoice, Check-In/Out, Report
- Feature tests (24 passing)

**Frontend (in development):**
- React 19 + Vite + Tailwind CSS 4 + Framer Motion + React Query + React Router
- Auth context with token management
- Reusable components (Button, Input, Card, Modal, Table, Badge, StatCard, Toast, AuthGuard)
- Public pages: Home, Room Listing, Room Detail, Facilities, About, Contact, Login, Register, Reserve
- Admin Dashboard: Overview, Rooms, Reservations, Guests, Payments, Check-In/Out, Reports, Settings
- Design system: gold `#C8A96B`, dark `#0F172A`, cream `#FAF8F5`, Playfair Display + Inter

## Stack

| Layer | Tool |
|-------|------|
| Backend | Laravel 12, PHP ^8.2, Sanctum |
| Frontend (planned) | React, Vite, Tailwind CSS 4, Framer Motion, React Query, React Router |
| Database | MySQL (`db_hotelify`) via XAMPP — PHPUnit tests use SQLite `:memory:` |
| Test | PHPUnit 11 |
| Code style | Laravel Pint (via `composer pint`) |
| Dev server | `composer dev` runs: `php artisan serve` + `queue:listen` + `pail` + `npm run dev` concurrently |

## Key Commands

```
composer setup           # Full setup: install, .env, key:generate, migrate, npm i, npm build
composer dev             # Start all dev servers concurrently
composer test            # config:clear + artisan test
php artisan test         # Run tests (PHPUnit)
npm run dev              # Vite dev server
npm run build            # Vite production build
```

## Architecture Conventions (from `.agents/task-instruction.md`)

- **API base path**: `/api/v1`
- **API response format**: `{"success": bool, "message": string, "data": ...}`
- **Business logic** must NOT live in controllers — use `app/Services/` and `app/Repositories/`
- **RBAC** roles: Guest, Receptionist, Admin, Manager, Owner
- **Models** in `app/Models/`, **Controllers** in `app/Http/Controllers/`, **Form Requests** in `app/Http/Requests/`
- **Policies** in `app/Policies/`
- Auth via **Laravel Sanctum**

## Testing

- Unit tests: `tests/Unit/`
- Feature tests: `tests/Feature/`
- Base class: `Tests\TestCase` (extends `Illuminate\Foundation\Testing\TestCase`)
- **Env**: SQLite `:memory:` by default in `phpunit.xml`
- Use `RefreshDatabase` trait for feature tests that mutate DB

## Code Style

- 4-space indent, LF line endings (`.editorconfig`)
- Laravel Pint for formatting (`vendor/bin/pint` or `composer pint`)

## Stripe Integration (2026-06-24)

### Flow
1. **Step 3 Reserve** → user clicks "Confirm & Reserve" → creates reservation with `status=pending`, sets `reservationId`
2. **Step 4** → `useEffect` triggers `POST /api/v1/stripe/create-payment-intent` with `{reservation_id}` → backend creates/retrieves Stripe PaymentIntent → returns `client_secret`
3. **Stripe Elements** (PaymentElement) rendered via `<Elements>` wrapper → user fills card → submits
4. **Frontend** calls `stripe.confirmPayment()` → on success shows confirmation screen
5. **Webhook** `POST /api/v1/stripe/webhook` (no auth) listens for:
   - `payment_intent.succeeded` → payment → `verified`, reservation → `confirmed`
   - `payment_intent.payment_failed` → payment → `failed`

### Setup Required
- Add real Stripe keys to `.env`:
  ```
  STRIPE_KEY=pk_test_...
  STRIPE_SECRET=sk_test_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  ```
- For local webhook testing: `stripe listen --forward-to localhost:8000/api/v1/stripe/webhook`
- `VITE_STRIPE_KEY` is auto-mapped from `STRIPE_KEY` in `.env`

### Files Changed/Added
- `app/Services/StripeService.php` — create PaymentIntent, handle webhook events
- `app/Http/Controllers/Api/V1/StripeController.php` — `createPaymentIntent` + `webhook` endpoints
- `routes/api.php` — added 2 routes
- `config/services.php` — added `stripe` config block
- `database/migrations/...add_stripe_fields_to_payments_table.php` — added `stripe_payment_intent_id`, `stripe_payment_method_id`
- `app/Models/Payment.php` — added new fields to `$fillable`
- `app/Services/BookingService.php` — `makeReservation` now creates `status=pending` (Stripe handles confirmation)
- `resources/js/services/stripe.js` — load Stripe instance
- `resources/js/hooks/useStripe.js` — `useCreatePaymentIntent` mutation
- `resources/js/components/StripePaymentForm.jsx` — PaymentElement + confirm flow
- `resources/js/pages/Reserve.jsx` — step 4 now uses Stripe Elements

## Email Notification (2026-06-24)

### Flow
Stripe webhook `payment_intent.succeeded` → `StripeService@handlePaymentSucceeded` → updates payment & reservation → sends `ReservationConfirmed` Mailable to guest email.

### Email Content
- Logo "Hotelify", thank-you message, booking code (highlighted), check-in/check-out dates, room info, total paid
- "View My Reservations" button → `/my-reservations`

### Files Added
- `app/Mail/ReservationConfirmed.php` — Mailable with `Reservation` data
- `resources/views/emails/reservation-confirmed.blade.php` — HTML email template (Hotelify branding)

### Files Changed
- `app/Services/StripeService.php` — `Mail::to($guest->email)->send(...)` after confirmed
- `.env` — `MAIL_MAILER=smtp`, Gmail config placeholder

### Setup SMTP
Replace `.env` placeholders with real credentials:
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_ADDRESS="noreply@hotelify.com"
```
For Gmail, generate App Password at https://myaccount.google.com/apppasswords

## Notable Quirks

- **DB is MySQL via XAMPP**: `.env` uses `DB_CONNECTION=mysql`, database `db_hotelify`. XAMPP MySQL must be running (`C:\xampp\mysql\bin\mysqld.exe`). PHPUnit tests still use SQLite `:memory:` (configured in `phpunit.xml`).
- Session & queue both default to `database` driver — requires `session` and `jobs` tables (migrations exist)
- `.agents/` dir is gitignored — contains product requirements but not executable config
- No Docker setup yet (Sail is available as dev dependency)
- No CI/CD or deployment config yet
- **Windows case-sensitive file quirk**: On Windows NTFS (case-insensitive), `app.jsx` and `App.jsx` are the SAME file. The Vite entry point is named `main.jsx` (not `app.jsx`) specifically to avoid collision with a component file named `App.jsx`. If you rename these files, ensure you never have two filenames differing only in case on the same directory.
- **Vite entry point**: `resources/js/main.jsx` (not `app.jsx`). Configured in `vite.config.js` and `resources/views/app.blade.php`.

## Recent Changes (2026-06-24)

### Database: MySQL via XAMPP
- `.env` changed to `DB_CONNECTION=mysql`, database `db_hotelify`, user `root`
- Run `C:\xampp\mysql\bin\mysqld.exe` before using the app
- Tests still use SQLite `:memory:` via `phpunit.xml`

### New Backend Endpoint
- `POST /api/v1/bookings/reserve` (auth:sanctum) — creates/finds guest + creates reservation in one call

### New Frontend Components
- `components/Toast.jsx` — popup notification with Framer Motion, auto-dismiss, 3 types (error/success/warning)
- `components/AuthGuard.jsx` — redirects unauthenticated users to `/login?redirect=...`

### New Pages
- `pages/Reserve.jsx` — 4-step booking form (Room & Date → Guest Info → Confirmation → Payment), requires auth
- `pages/Register.jsx` — updated with phone + address fields

### Updated Pages
- `pages/Login.jsx` — now shows Toast popup on error instead of inline text; redirects admin/staff to `/admin`, guest to `/`; supports `?redirect=` param
- `components/Navbar.jsx` — auth-aware: shows user menu + Dashboard link for staff, Reserve link added to navLinks
- `layouts/AdminLayout.jsx` — SVG icons instead of emoji, Settings link added, active link highlighting
- `routes/index.jsx` — added `/reserve`, `/my-reservations`, `/profile`, `/forgot-password`, `/admin/room-types`, `/admin/facilities` routes

## Major Feature Update (2026-06-25)

### Backend Architecture Improvements
| Feature | Detail |
|---------|--------|
| **Auth Middleware** | Sanctum auth + role-based middleware (`CheckRole`) — most endpoints now protected |
| **Pagination** | All index endpoints support `?per_page=`, `?page=`, `?search=`, `?sort=`, `?sort_dir=` params |
| **Search/Filter** | Searchable fields: rooms (room_number), guests (full_name, email, phone), reservations (booking_code), room types (name, description), facilities (name), payments (method, status) |
| **Profile API** | `POST /auth/update-profile`, `POST /auth/update-password` |
| **Contact API** | `POST /contact` — stores messages from contact form |
| **Notifications API** | `GET /notifications`, `POST /notifications/{id}/read` |
| **Export CSV** | `GET /reservations/export/csv`, `GET /guests/export/csv` |
| **Facility CRUD** | Facility management now has full create/update/delete endpoints |

### New Frontend Pages
| Page | Route | Description |
|------|-------|-------------|
| **Forgot Password** | `/forgot-password` | Email form with success state |
| **My Reservations** | `/my-reservations` | Auth-guarded list of user's bookings with status badges |
| **Profile** | `/profile` | Edit name/phone/address + change password |
| **Admin: Room Types** | `/admin/room-types` | Full CRUD with modal forms |
| **Admin: Facilities** | `/admin/facilities` | Full CRUD with modal forms |

### Enhanced Admin Pages
| Page | Improvements |
|------|-------------|
| **Overview** | StatCards + Recent Activity table + Room Status colored grid + Quick Actions buttons |
| **Rooms** | Full CRUD modal (create/edit/delete with room_type dropdown), search |
| **Reservations** | View detail modal, status update buttons, cancel, search by code, filter by status |
| **Guests** | Edit modal, delete, search by name/email/phone |
| **Check-In/Out** | Search by booking code or guest email, selectable reservation list |
| **Reports** | Bar chart visualization for booking statuses, date range filter for revenue |
| **Contact** | Now integrated with backend — sends to database and shows Toast |

### Test & Build
- `php artisan test` — 35 passing
- `npm run build` — 583 modules, 0 errors
