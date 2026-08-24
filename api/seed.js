const db = require('./db');
const fs = require('fs');
const path = require('path');

async function seedDatabase(req, res) {
  try {
    const dataPath = path.join(__dirname, '../js/data.js');
    let dataContent = fs.readFileSync(dataPath, 'utf8');

    // Parse JS object from file in memory to avoid read-only FS errors on Vercel
    let KS_DATA;
    // Replace const definition and use eval to extract object
    const objectString = dataContent.replace('const KS_DATA = ', '').replace(/;$/, '');
    try {
        KS_DATA = eval(`(${objectString})`);
    } catch (e) {
        throw new Error('Failed to parse data.js: ' + e.message);
    }

    // Seed Users
    if (KS_DATA.users) {
        for (const user of KS_DATA.users) {
            await db.query(`
                INSERT INTO users (id, name, phone, email, role, village, block, district, state)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (id) DO NOTHING
            `, [user.id, user.name, user.phone, user.email, user.role, user.village, user.block, user.district, user.state]);
        }
    }

    // Seed Equipment
    if (KS_DATA.equipment) {
        for (const eq of KS_DATA.equipment) {
            await db.query(`
                INSERT INTO equipment (id, name, category, brand, model, year, condition, priceHourly, priceDaily, location, district, state, ownerId, owner, operator, delivery, verified, available, rating, reviews, description, lat, lng)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
                ON CONFLICT (id) DO NOTHING
            `, [eq.id, eq.name, eq.category, eq.brand, eq.model, eq.year, eq.condition, eq.priceHourly, eq.priceDaily, eq.location, eq.district, eq.state, eq.ownerId, eq.owner, eq.operator, eq.delivery, eq.verified, eq.available, eq.rating, eq.reviews, eq.description, eq.lat, eq.lng]);
        }
    }

    // Seed Bookings
    if (KS_DATA.bookings) {
        for (const booking of KS_DATA.bookings) {
            await db.query(`
                INSERT INTO bookings (id, equipmentId, farmerId, ownerId, date, time, duration, service, equipmentCost, operatorCost, deliveryCost, serviceFee, total, payment, status, createdAt)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                ON CONFLICT (id) DO NOTHING
            `, [booking.id, booking.equipmentId, booking.farmerId, booking.ownerId, booking.date, booking.time, booking.duration, booking.service, booking.equipmentCost, booking.operatorCost, booking.deliveryCost, booking.serviceFee, booking.total, booking.payment, booking.status, booking.createdAt]);
        }
    }

    // Seed Reviews
    if (KS_DATA.reviews) {
        for (const review of KS_DATA.reviews) {
            await db.query(`
                INSERT INTO reviews (id, bookingId, equipmentId, farmerId, rating, comment, date)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (id) DO NOTHING
            `, [review.id, review.bookingId, review.equipmentId, review.farmerId, review.rating, review.comment, review.date]);
        }
    }

    if (res) {
        res.status(200).json({ message: 'Database seeded successfully' });
    } else {
        console.log('Database seeded successfully');
    }
  } catch (err) {
    console.error('Error seeding database', err);
    if (res) {
        res.status(500).json({ error: 'Database seeding failed', details: err.message });
    }
  }
}

module.exports = seedDatabase;