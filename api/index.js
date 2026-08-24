const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const setupDatabase = require('./setup');
const seedDatabase = require('./seed');

const app = express();

app.use(cors());
app.use(express.json());

// Setup endpoints
app.get('/api/setup', setupDatabase);
app.get('/api/seed', seedDatabase);

// --- Generic GET endpoint ---
const getTable = async (table, res) => {
    try {
        const { rows } = await db.query(`SELECT * FROM ${table}`);
        res.json(rows);
    } catch (err) {
        console.error(`Error fetching ${table}`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Users
app.get('/api/users', (req, res) => getTable('users', res));
app.post('/api/users', async (req, res) => {
    const u = req.body;
    try {
        await db.query(`
            INSERT INTO users (id, name, phone, email, role, village, block, district, state)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                phone = EXCLUDED.phone,
                email = EXCLUDED.email,
                role = EXCLUDED.role,
                village = EXCLUDED.village,
                block = EXCLUDED.block,
                district = EXCLUDED.district,
                state = EXCLUDED.state
        `, [u.id, u.name, u.phone, u.email, u.role, u.village, u.block, u.district, u.state]);
        res.status(201).json(u);
    } catch (err) {
        console.error('Error saving user', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Equipment
app.get('/api/equipment', (req, res) => getTable('equipment', res));
app.post('/api/equipment', async (req, res) => {
    const eq = req.body;
    try {
        await db.query(`
            INSERT INTO equipment (id, name, category, brand, model, year, condition, priceHourly, priceDaily, location, district, state, ownerId, owner, operator, delivery, verified, available, rating, reviews, description, lat, lng)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name, category = EXCLUDED.category, brand = EXCLUDED.brand, model = EXCLUDED.model, year = EXCLUDED.year, condition = EXCLUDED.condition, priceHourly = EXCLUDED.priceHourly, priceDaily = EXCLUDED.priceDaily, location = EXCLUDED.location, district = EXCLUDED.district, state = EXCLUDED.state, ownerId = EXCLUDED.ownerId, owner = EXCLUDED.owner, operator = EXCLUDED.operator, delivery = EXCLUDED.delivery, verified = EXCLUDED.verified, available = EXCLUDED.available, rating = EXCLUDED.rating, reviews = EXCLUDED.reviews, description = EXCLUDED.description, lat = EXCLUDED.lat, lng = EXCLUDED.lng
        `, [eq.id, eq.name, eq.category, eq.brand, eq.model, eq.year, eq.condition, eq.priceHourly, eq.priceDaily, eq.location, eq.district, eq.state, eq.ownerId, eq.owner, eq.operator, eq.delivery, eq.verified, eq.available, eq.rating, eq.reviews, eq.description, eq.lat, eq.lng]);
        res.status(201).json(eq);
    } catch (err) {
        console.error('Error saving equipment', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Bookings
app.get('/api/bookings', (req, res) => getTable('bookings', res));
app.post('/api/bookings', async (req, res) => {
    const b = req.body;
    try {
        await db.query(`
            INSERT INTO bookings (id, equipmentId, farmerId, ownerId, date, time, duration, service, equipmentCost, operatorCost, deliveryCost, serviceFee, total, payment, status, createdAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            ON CONFLICT (id) DO UPDATE SET
                status = EXCLUDED.status
        `, [b.id, b.equipmentId, b.farmerId, b.ownerId, b.date, b.time, b.duration, b.service, b.equipmentCost, b.operatorCost, b.deliveryCost, b.serviceFee, b.total, b.payment, b.status, b.createdAt]);
        res.status(201).json(b);
    } catch (err) {
        console.error('Error saving booking', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Reviews
app.get('/api/reviews', (req, res) => getTable('reviews', res));
app.post('/api/reviews', async (req, res) => {
    const r = req.body;
    try {
        await db.query(`
            INSERT INTO reviews (id, bookingId, equipmentId, farmerId, rating, comment, date)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING
        `, [r.id, r.bookingId, r.equipmentId, r.farmerId, r.rating, r.comment, r.date]);
        res.status(201).json(r);
    } catch (err) {
        console.error('Error saving review', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Notifications
app.get('/api/notifications', (req, res) => getTable('notifications', res));
app.post('/api/notifications', async (req, res) => {
    const n = req.body;
    try {
        await db.query(`
            INSERT INTO notifications (id, userId, type, text, read, date)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET read = EXCLUDED.read
        `, [n.id, n.userId, n.type, n.text, n.read, n.date]);
        res.status(201).json(n);
    } catch (err) {
        console.error('Error saving notification', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Complaints
app.get('/api/complaints', (req, res) => getTable('complaints', res));
app.post('/api/complaints', async (req, res) => {
    const c = req.body;
    try {
        await db.query(`
            INSERT INTO complaints (id, userId, category, description, status, date)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status
        `, [c.id, c.userId, c.category, c.description, c.status, c.date]);
        res.status(201).json(c);
    } catch (err) {
        console.error('Error saving complaint', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Saathi
app.get('/api/saathi', (req, res) => getTable('saathi', res));
app.post('/api/saathi', async (req, res) => {
    const s = req.body;
    try {
        await db.query(`
            INSERT INTO saathi (id, name, phone, village, status)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status
        `, [s.id, s.name, s.phone, s.village, s.status]);
        res.status(201).json(s);
    } catch (err) {
        console.error('Error saving saathi', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- Bulk Sync Endpoints ---
app.post('/api/sync/users', async (req, res) => {
    try {
        for (const u of req.body) {
            await db.query(`INSERT INTO users (id, name, phone, email, role, village, block, district, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, phone = EXCLUDED.phone, email = EXCLUDED.email, role = EXCLUDED.role, village = EXCLUDED.village, block = EXCLUDED.block, district = EXCLUDED.district, state = EXCLUDED.state`, [u.id, u.name, u.phone, u.email, u.role, u.village, u.block, u.district, u.state]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/equipment', async (req, res) => {
    try {
        for (const eq of req.body) {
            await db.query(`INSERT INTO equipment (id, name, category, brand, model, year, condition, priceHourly, priceDaily, location, district, state, ownerId, owner, operator, delivery, verified, available, rating, reviews, description, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, brand = EXCLUDED.brand, model = EXCLUDED.model, year = EXCLUDED.year, condition = EXCLUDED.condition, priceHourly = EXCLUDED.priceHourly, priceDaily = EXCLUDED.priceDaily, location = EXCLUDED.location, district = EXCLUDED.district, state = EXCLUDED.state, ownerId = EXCLUDED.ownerId, owner = EXCLUDED.owner, operator = EXCLUDED.operator, delivery = EXCLUDED.delivery, verified = EXCLUDED.verified, available = EXCLUDED.available, rating = EXCLUDED.rating, reviews = EXCLUDED.reviews, description = EXCLUDED.description, lat = EXCLUDED.lat, lng = EXCLUDED.lng`, [eq.id, eq.name, eq.category, eq.brand, eq.model, eq.year, eq.condition, eq.priceHourly, eq.priceDaily, eq.location, eq.district, eq.state, eq.ownerId, eq.owner, eq.operator, eq.delivery, eq.verified, eq.available, eq.rating, eq.reviews, eq.description, eq.lat, eq.lng]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/bookings', async (req, res) => {
    try {
        for (const b of req.body) {
            await db.query(`INSERT INTO bookings (id, equipmentId, farmerId, ownerId, date, time, duration, service, equipmentCost, operatorCost, deliveryCost, serviceFee, total, payment, status, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status`, [b.id, b.equipmentId, b.farmerId, b.ownerId, b.date, b.time, b.duration, b.service, b.equipmentCost, b.operatorCost, b.deliveryCost, b.serviceFee, b.total, b.payment, b.status, b.createdAt]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/reviews', async (req, res) => {
    try {
        for (const r of req.body) {
            await db.query(`INSERT INTO reviews (id, bookingId, equipmentId, farmerId, rating, comment, date) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`, [r.id, r.bookingId, r.equipmentId, r.farmerId, r.rating, r.comment, r.date]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/notifications', async (req, res) => {
    try {
        for (const n of req.body) {
            await db.query(`INSERT INTO notifications (id, userId, type, text, read, date) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET read = EXCLUDED.read`, [n.id, n.userId, n.type, n.text, n.read, n.date]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/complaints', async (req, res) => {
    try {
        for (const c of req.body) {
            await db.query(`INSERT INTO complaints (id, userId, category, description, status, date) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status`, [c.id, c.userId, c.category, c.description, c.status, c.date]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/sync/saathi', async (req, res) => {
    try {
        for (const s of req.body) {
            await db.query(`INSERT INTO saathi (id, name, phone, village, status) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status`, [s.id, s.name, s.phone, s.village, s.status]);
        }
        res.status(200).json({ success: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});


module.exports = app;
