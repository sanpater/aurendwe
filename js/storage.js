const DB = {
    users: "ks_users",
    equipment: "ks_equipment",
    bookings: "ks_bookings",
    reviews: "ks_reviews",
    notifications: "ks_notifications",
    complaints: "ks_complaints",
    saathi: "ks_saathi",
    language: "ks_language",
    currentUser: "ks_current_user"
};

// State to hold data synchronously for the app
window.appState = {
    users: [],
    equipment: [],
    bookings: [],
    reviews: [],
    notifications: [],
    complaints: [],
    saathi: []
};

// API Base URL (empty string means it uses the same origin as the frontend)
const API_URL = '/api';

// Fetch initial data from server
async function fetchAllData() {
    try {
        const endpoints = ['users', 'equipment', 'bookings', 'reviews', 'notifications', 'complaints', 'saathi'];
        const promises = endpoints.map(ep => fetch(`${API_URL}/${ep}`).then(res => {
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return res.json();
        }));
        const results = await Promise.all(promises);

        // Ensure that the response is actually an array, otherwise throw to fallback
        if (!Array.isArray(results[0])) throw new Error('Invalid API response format');

        window.appState.users = results[0] || [];
        window.appState.equipment = results[1] || [];
        window.appState.bookings = results[2] || [];
        window.appState.reviews = results[3] || [];
        window.appState.notifications = results[4] || [];
        window.appState.complaints = results[5] || [];
        window.appState.saathi = results[6] || [];

        console.log("Data loaded from server", window.appState);
    } catch (e) {
        console.error("Failed to load data from server, falling back to local demo data.", e);
        // Fallback to local data if server fails
        seed();
    }
}

// Background sync function
async function syncToServer(endpoint, data) {
    try {
        await fetch(`${API_URL}/sync/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.error(`Failed to sync ${endpoint} to server`, e);
    }
}

// Seed local fallback
function seed() {
    if (!window.appState.users.length) window.appState.users = KS_DATA.users;
    if (!window.appState.equipment.length) window.appState.equipment = KS_DATA.equipment;
    if (!window.appState.bookings.length) window.appState.bookings = KS_DATA.bookings;
    if (!window.appState.reviews.length) window.appState.reviews = KS_DATA.reviews;
}

function get(k, f = []) {
    try { return JSON.parse(localStorage.getItem(k)) ?? f } catch { return f }
}
function put(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
    return v;
}

function getUsers() { return window.appState.users; }
function saveUsers(v) { window.appState.users = v; syncToServer('users', v); return v; }

function getEquipment() { return window.appState.equipment; }
function saveEquipment(v) { window.appState.equipment = v; syncToServer('equipment', v); return v; }

function getBookings() { return window.appState.bookings; }
function saveBookings(v) { window.appState.bookings = v; syncToServer('bookings', v); return v; }

function getReviews() { return window.appState.reviews; }
function saveReviews(v) { window.appState.reviews = v; syncToServer('reviews', v); return v; }

function getNotifications() { return window.appState.notifications; }
function saveNotifications(v) { window.appState.notifications = v; syncToServer('notifications', v); return v; }

function getComplaints() { return window.appState.complaints; }
function saveComplaints(v) { window.appState.complaints = v; syncToServer('complaints', v); return v; }

function getSaathi() { return window.appState.saathi; }
function saveSaathi(v) { window.appState.saathi = v; syncToServer('saathi', v); return v; }

function getCurrentUser() { return get(DB.currentUser, null); }
function setCurrentUser(v) { return put(DB.currentUser, v); }

function logout() {
    localStorage.removeItem(DB.currentUser);
    location.href = "index.html";
}
