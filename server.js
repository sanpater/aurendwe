const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Path to our local JSON database file
const DB_FILE = path.join(__dirname, 'database.json');

// Helper to safely extract default demo data from data.js
function getDemoData() {
    try {
        const dataPath = path.join(__dirname, 'js/data.js');
        const dataContent = fs.readFileSync(dataPath, 'utf8');
        const fn = new Function('window', dataContent + '; return window.KS_DATA;');
        return fn({});
    } catch (e) {
        console.error("Failed to load demo data:", e);
        return { users: [], equipment: [], bookings: [], reviews: [], notifications: [], complaints: [], saathi: [] };
    }
}

// Ensure database.json exists with demo data
if (!fs.existsSync(DB_FILE)) {
    const defaultData = getDemoData();
    // Ensure all required arrays exist
    const db = {
        users: defaultData.users || [],
        equipment: defaultData.equipment || [],
        bookings: defaultData.bookings || [],
        reviews: defaultData.reviews || [],
        notifications: [],
        complaints: [],
        saathi: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    console.log("Initialized database.json with demo data.");
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the root directory
app.use(express.static(__dirname));

// Read DB helper
function readDB() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return { users: [], equipment: [], bookings: [], reviews: [], notifications: [], complaints: [], saathi: [] };
    }
}

// Write DB helper
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Generic GET endpoint
app.get('/api/:collection', (req, res) => {
    const collection = req.params.collection;
    const db = readDB();
    if (db[collection]) {
        res.json(db[collection]);
    } else {
        res.status(404).json({ error: 'Collection not found' });
    }
});

// Generic Bulk Sync POST endpoint (Replaces the array with the new one from frontend)
app.post('/api/sync/:collection', (req, res) => {
    const collection = req.params.collection;
    const items = req.body;

    if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Expected array' });
    }

    const db = readDB();
    // Create collection if it doesn't exist
    if (!db[collection]) {
        db[collection] = [];
    }

    // For local JSON, the easiest way to sync is just to replace the collection
    // since the frontend holds the full state and pushes it on save.
    db[collection] = items;

    writeDB(db);
    res.json({ success: true });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
