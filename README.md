# KRISHI SANJHA — Complete Browser MVP

**Share Machines. Grow Together.**

This is a beginner-friendly static MVP built with HTML5, CSS3, Vanilla JavaScript and LocalStorage.

## 1. Run it

### Option A — VS Code Live Server
1. Install VS Code.
2. Open the `krishi-sanjha` folder.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

### Option B — Python
Open a terminal inside the project folder:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 2. Demo accounts

- Farmer: `9000000001`
- Owner: `9000000002`
- Institution: `9000000003`
- Admin: `9000000004`

Use the one-click buttons on Login.

## 3. Main demo flow

Farmer login → Find Equipment → Tractor details → Book → Demo Payment → Farmer Dashboard → Owner login → Owner Bookings → Accept → On the Way → Started → Completed → Farmer sees status → Admin statistics update.

Because all roles use the same browser LocalStorage, refresh/navigation keeps the demo state.

## 4. DEMO FUNCTIONALITY

The following are browser-only demo features:
- Authentication
- Database
- Payments
- Notifications
- Booking state
- Reviews
- Complaints
- Village Saathi requests

No real money is charged and no real authentication is performed.

## 5. Production integration

### Supabase
Replace LocalStorage functions in `js/storage.js` with:
- Supabase Auth
- PostgreSQL tables
- Row Level Security
- Supabase Storage

Keep the same function names so page code needs minimal changes.

### Razorpay
Never put a Razorpay secret key in frontend code.
Production flow:
1. Create Razorpay account.
2. Backend creates payment order.
3. Frontend opens checkout.
4. Backend verifies signature/payment.
5. Store payment result.

### WhatsApp / Calling
Replace:
- `CONFIG.supportPhone`
- `CONFIG.whatsappNumber`

in `js/app.js`.

For production, use WhatsApp Business API, an IVR provider such as Exotel/Twilio, and server-side credentials.

## 6. Project structure

The project contains separate HTML pages, CSS files, JavaScript modules, JSON demo data and SVG branding.

External CDNs used by the MVP:
- Leaflet + OpenStreetMap tiles
- Chart.js
- No React/Next/Supabase required.

## 7. Reset demo data

Open browser DevTools → Application → Local Storage → delete keys beginning with `ks_` → refresh.

## 8. Security

This is not production authentication. Do not store real passwords, API secrets or payment secrets in the browser.
