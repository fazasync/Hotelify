<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservation Confirmed</title>
    <style>
        body { margin: 0; padding: 0; background-color: #FAF8F5; font-family: 'Inter', Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
        .card { background: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
        .logo { text-align: center; font-size: 28px; font-weight: 700; color: #C8A96B; font-family: Georgia, serif; margin-bottom: 8px; }
        .divider { height: 1px; background: #E2E8F0; margin: 24px 0; }
        .code { font-size: 24px; font-weight: 700; color: #C8A96B; letter-spacing: 2px; text-align: center; padding: 16px; background: #FAF8F5; border-radius: 12px; margin: 16px 0; }
        .detail { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .detail-label { color: #64748B; }
        .detail-value { color: #1E293B; font-weight: 500; }
        .btn { display: inline-block; padding: 12px 32px; background: #C8A96B; color: #ffffff; text-decoration: none; border-radius: 14px; font-weight: 600; font-size: 14px; }
        .footer { text-align: center; color: #94A3B8; font-size: 12px; margin-top: 24px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">Hotelify</div>

            <h1 style="text-align:center; color:#0F172A; font-size:22px; margin-top:20px;">Payment Successful!</h1>
            <p style="text-align:center; color:#64748B; font-size:15px; line-height:1.6;">
                Thank you for your reservation at <strong style="color:#1E293B;">Hotelify</strong>.<br>
                We're excited to welcome you. Your booking has been confirmed and your payment is successful.
            </p>

            <div class="divider"></div>

            <p style="text-align:center; color:#64748B; font-size:13px; margin:0;">Booking Code</p>
            <div class="code">{{ $reservation->booking_code }}</div>

            <div class="divider"></div>

            <div class="detail">
                <span class="detail-label">Guest Name</span>
                <span class="detail-value">{{ $reservation->guest?->full_name }}</span>
            </div>
            <div class="detail">
                <span class="detail-label">Check In</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($reservation->check_in)->format('d M Y') }}</span>
            </div>
            <div class="detail">
                <span class="detail-label">Check Out</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($reservation->check_out)->format('d M Y') }}</span>
            </div>
            <div class="detail">
                <span class="detail-label">Room</span>
                <span class="detail-value">{{ $reservation->room?->room_type?->name ?? 'Room' }} - {{ $reservation->room?->room_number ?? 'N/A' }}</span>
            </div>
            <div class="detail">
                <span class="detail-label">Total Paid</span>
                <span class="detail-value" style="color:#C8A96B; font-weight:700;">Rp {{ number_format($reservation->total_price, 0, ',', '.') }}</span>
            </div>

            <div class="divider"></div>

            <div style="text-align:center; margin-top:20px;">
                <a href="{{ url('/my-reservations') }}" class="btn">View My Reservations</a>
            </div>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Hotelify. All rights reserved.</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
