const db = require('./db');

async function setupDatabase(req, res) {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20) UNIQUE,
        email VARCHAR(100),
        role VARCHAR(20),
        village VARCHAR(100),
        block VARCHAR(100),
        district VARCHAR(100),
        state VARCHAR(100)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS equipment (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(50),
        brand VARCHAR(50),
        model VARCHAR(50),
        year INTEGER,
        condition VARCHAR(50),
        priceHourly INTEGER,
        priceDaily INTEGER,
        location VARCHAR(100),
        district VARCHAR(100),
        state VARCHAR(100),
        ownerId VARCHAR(50),
        owner VARCHAR(100),
        operator BOOLEAN,
        delivery BOOLEAN,
        verified BOOLEAN,
        available BOOLEAN,
        rating FLOAT,
        reviews INTEGER,
        description TEXT,
        lat FLOAT,
        lng FLOAT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(50) PRIMARY KEY,
        equipmentId VARCHAR(50),
        farmerId VARCHAR(50),
        ownerId VARCHAR(50),
        date VARCHAR(20),
        time VARCHAR(20),
        duration INTEGER,
        service VARCHAR(50),
        equipmentCost INTEGER,
        operatorCost INTEGER,
        deliveryCost INTEGER,
        serviceFee INTEGER,
        total INTEGER,
        payment VARCHAR(50),
        status VARCHAR(50),
        createdAt BIGINT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(50) PRIMARY KEY,
        bookingId VARCHAR(50),
        equipmentId VARCHAR(50),
        farmerId VARCHAR(50),
        rating INTEGER,
        comment TEXT,
        date BIGINT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        type VARCHAR(50),
        text TEXT,
        read BOOLEAN,
        date BIGINT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        category VARCHAR(50),
        description TEXT,
        status VARCHAR(50),
        date BIGINT
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS saathi (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20),
        village VARCHAR(100),
        status VARCHAR(50)
      );
    `);

    if (res) {
        res.status(200).json({ message: 'Database setup successfully' });
    } else {
        console.log('Database setup successfully');
    }
  } catch (err) {
    console.error('Error setting up database', err);
    if (res) {
        res.status(500).json({ error: 'Database setup failed' });
    }
  }
}

module.exports = setupDatabase;
