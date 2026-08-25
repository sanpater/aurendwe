window.CONFIG = { supportPhone: "919000000000", whatsappNumber: "919000000000" };
document.addEventListener("DOMContentLoaded", async () => {
    await fetchAllData();
    const initFns = [
        "initNavigation", "applyLanguage", "initAuth", "initNotifications",
        "initMarketplace", "initEquipmentDetails", "initBooking",
        "initFarmerDashboard", "initOwnerDashboard", "initOwnerBookings",
        "initEquipmentForm", "initAdmin", "initSaathi", "initSupport",
        "initVoiceSearch", "initMap"
    ];
    initFns.forEach(fnName => {
        if (typeof window[fnName] === "function") {
            try { window[fnName](); } catch (e) { console.error(`Error in ${fnName}:`, e); }
        }
    });
    const s = document.getElementById("home-stats");
    if (s) {
        s.innerHTML = [["20+", "Equipment"], ["15+", "Farmers"], ["10+", "Owners"], ["50+", "Demo Bookings"]]
            .map(x => `<div class="stat"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");
    }
});