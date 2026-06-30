<div align="center">
  <h1>Hotelify</h1>
  <p><strong>Hotel Management & Online Reservation System</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel" alt="Laravel 12">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19">
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4">
    <img src="https://img.shields.io/badge/PHP-^8.2-777BB4?style=flat-square&logo=php" alt="PHP ^8.2">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License">
  </p>
</div>

## Overview

**Hotelify** is a full-featured hotel management and online reservation system built with **Laravel 12** as the backend API and **React 19** as the frontend SPA. It provides a complete solution for managing hotel operations, from online bookings to check-in/check-out, payment processing, and reporting.

## Features

### Public
- Room listing with detailed views and gallery
- Facility showcase
- About & Contact pages
- Online reservation (4-step booking flow)
- Stripe payment integration

### Authenticated Users
- Profile management (update name, phone, address, password)
- View personal reservation history
- Make and pay for reservations

### Admin / Staff
- **Dashboard Overview** — stats, recent activity, room status grid
- **Room Management** — CRUD with room type assignment, images, facilities
- **Room Type Management** — pricing, capacity, description
- **Facility Management** — hotel amenities
- **Reservation Management** — view, update status, cancel, search/filter
- **Guest Management** — view, edit, delete, search, export CSV
- **Payment Management** — list, verify, track payments
- **Check-In / Check-Out** — search by booking code or guest email
- **Reports** — revenue, occupancy, booking statistics (bar chart visualization)
- **Settings** — hotel name, address, phone
- **Notifications** — in-app notification system
- **Export CSV** — reservations and guests

### Technical
- RESTful API at `/api/v1` (42+ endpoints)
- Sanctum token-based authentication
- Role-Based Access Control (Guest, Receptionist, Admin, Manager, Owner)
- Service/Repository pattern (thin controllers)
- Stripe PaymentIntent + Webhook integration
- Email notifications for confirmed reservations
- Pagination, search, sort, and filter on all index endpoints
- 15 database tables with full relationships
- 35+ PHPUnit feature tests

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Laravel 12, PHP ^8.2 |
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 |
| **State Management** | React Query (@tanstack/react-query) |
| **Routing** | React Router v7 |
| **Animation** | Framer Motion |
| **Database** | MySQL (development), SQLite :memory: (testing) |
| **Authentication** | Laravel Sanctum |
| **Payments** | Stripe (PaymentIntent + Webhook) |
| **HTTP Client** | Axios |
| **Testing** | PHPUnit 11 |
| **Code Style** | Laravel Pint |

## Requirements

- PHP ^8.2
- Composer
- Node.js & NPM
- MySQL (via XAMPP or standalone)
- Stripe account (for payment features)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hotelify.git
cd hotelify
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install JavaScript dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure `.env`

Open `.env` and adjust the following:

**Database** — MySQL via XAMPP (`C:\xampp\mysql\bin\mysqld.exe` must be running):
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_hotelify
DB_USERNAME=root
DB_PASSWORD=
```

**Stripe** (optional — required for payments):
```
STRIPE_KEY=pk_test_xxxxxxxx
STRIPE_SECRET=sk_test_xxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
```

**Mail** (optional — required for email notifications):
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_ADDRESS="noreply@hotelify.com"
```

> For Gmail, generate an App Password at https://myaccount.google.com/apppasswords

### 6. Create database

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS db_hotelify"
```

### 7. Run migrations & seeders

```bash
php artisan migrate --seed
```

This creates the database tables and seeds:
- **4 users** with password `password`:
  - `admin@hotelify.test` (Admin)
  - `receptionist@hotelify.test` (Receptionist)
  - `manager@hotelify.test` (Manager)
  - `owner@hotelify.test` (Owner)
- **5 room types**: Deluxe, Superior, Suite, Standard, Presidential Suite
- **9 facilities**: Swimming Pool, Restaurant, Gym, Spa, WiFi, Parking, Room Service, Bar, Conference Room
- **1 default setting** record

### 8. Build frontend assets

```bash
npm run build
```

### 9. (Optional) Full automated setup

```bash
composer setup
```

This runs steps 2, 3, 4, 7, and 8 in sequence.

## Development

Start all development servers with a single command:

```bash
composer dev
```

This runs concurrently:
- `php artisan serve` — Laravel dev server (http://localhost:8000)
- `queue:listen` — Queue worker for jobs
- `pail` — Laravel Pail log viewer
- `npm run dev` — Vite dev server with HMR

Or start them individually:

```bash
php artisan serve              # Backend API
npm run dev                    # Frontend dev server
php artisan queue:listen       # Queue worker (for mail, etc.)
```

### Stripe Webhook (local testing)

```bash
stripe listen --forward-to localhost:8000/api/v1/stripe/webhook
```

## Testing

```bash
composer test
# or
php artisan test
```

Tests use SQLite `:memory:` database (configured in `phpunit.xml`) and the `RefreshDatabase` trait — no external database required.

## Project Structure

```
app/
├── Http/
│   ├── Controllers/Api/V1/     # 11 API controllers
│   ├── Middleware/              # CheckRole middleware
│   └── Requests/               # Form request validation
├── Mail/                        # ReservationConfirmed Mailable
├── Models/                      # 16 Eloquent models
├── Repositories/                # 7 repositories (BaseRepository pattern)
├── Services/                    # 11 service classes (business logic)
└── Traits/                      # ApiResponse trait

resources/js/
├── components/                  # 23 reusable React components
├── contexts/                    # AuthContext
├── hooks/                       # 9 custom hooks (React Query)
├── layouts/                     # Main, Guest, Admin layouts
├── pages/                       # 13 pages + 10 admin pages
├── routes/                      # React Router configuration
└── services/                    # Axios instance & Stripe loader

database/
├── factories/                   # 13 model factories
├── migrations/                  # 22 migration files
└── seeders/                     # DatabaseSeeder

tests/
├── Feature/Api/                 # 9 feature test files
└── Unit/                        # Unit tests
```

## API Endpoints

Base path: `/api/v1`

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | — | Login |
| POST | `/auth/register` | — | Register |
| POST | `/auth/logout` | Sanctum | Logout |
| GET | `/auth/me` | Sanctum | Current user |
| POST | `/auth/update-profile` | Sanctum | Update profile |
| POST | `/auth/update-password` | Sanctum | Change password |

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/room-types` | List room types |
| GET | `/room-types/{id}` | Room type detail |
| GET | `/rooms` | List rooms |
| GET | `/rooms/{id}` | Room detail |
| GET | `/facilities` | List facilities |
| GET | `/facilities/{id}` | Facility detail |
| POST | `/contact` | Submit contact form |
| POST | `/bookings/check-availability` | Check room availability |
| POST | `/bookings` | Create booking |

### Authenticated
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings/reserve` | Full reservation |
| GET | `/my-reservations` | User's reservations |
| POST | `/stripe/create-payment-intent` | Create PaymentIntent |

### Admin / Staff (role-gated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST/PUT/DELETE | `/room-types` | Manage room types |
| POST/PUT/DELETE | `/rooms` | Manage rooms |
| GET/POST/PUT/DELETE | `/guests` | Manage guests |
| GET/PUT/DELETE | `/reservations` | Manage reservations |
| GET | `/reservations/export/csv` | Export CSV |
| GET | `/guests/export/csv` | Export CSV |
| POST/PUT/DELETE | `/facilities` | Manage facilities |
| GET/POST | `/payments` | Manage payments |
| POST | `/payments/{id}/verify` | Verify payment |
| POST | `/checkin` | Check in |
| POST | `/checkout` | Check out |
| GET | `/reports/revenue` | Revenue report |
| GET | `/reports/occupancy` | Occupancy report |
| GET | `/reports/bookings` | Bookings report |
| GET | `/reports/guests` | Guests report |
| GET | `/notifications` | List notifications |
| POST | `/notifications/{id}/read` | Mark as read |

### Webhook
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/stripe/webhook` | Stripe webhook (no auth) |

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | Staff accounts (role: guest/receptionist/admin/manager/owner) |
| `room_types` | Room categories with base pricing and capacity |
| `rooms` | Individual rooms with status (available/occupied/maintenance) |
| `room_images` | Room photo gallery |
| `facilities` | Hotel amenities |
| `room_facilities` | Room-to-facility pivot |
| `guests` | Guest profiles |
| `reservations` | Booking records (status: pending/confirmed/checked_in/checked_out/cancelled) |
| `payments` | Payment records with Stripe integration |
| `invoices` | Invoice per reservation |
| `check_ins` | Check-in records |
| `check_outs` | Check-out records |
| `contacts` | Contact form submissions |
| `notifications` | In-app user notifications |
| `reports` | Generated report records |
| `settings` | Hotel configuration |

## Design System

| Token | Value |
|-------|-------|
| Gold (Primary) | `#C8A96B` |
| Dark (Background) | `#0F172A` |
| Cream (Light) | `#FAF8F5` |
| Soft Gray | `#F1F5F9` |
| Text Primary | `#1E293B` |
| Text Secondary | `#64748B` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Display Font | Playfair Display (serif) |
| Body Font | Inter (sans-serif) |

## Code Style

This project follows Laravel Pint formatting rules:

```bash
composer pint
```

Configuration: 4-space indent, LF line endings (`.editorconfig`).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Run tests before submitting:

```bash
composer test
```

## License

Hotelify is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
