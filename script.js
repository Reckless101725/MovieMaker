document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    animateResourceBars();
    setInterval(animateResourceBars, 5000);
    updateTemperature();
    setInterval(updateTemperature, 10000);
    createNetworkChart();
    initCommandConsole();
    typeNotificationInput();
    addInteractiveElements();
    updateNetworkStats();
    setInterval(updateNetworkStats, 3000);
    setTimeout(addNewNotification, 8000);
});

function updateDateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    document.getElementById('digital-time').textContent = timeString;
    document.getElementById('digital-date').textContent = dateString;
    document.getElementById('current-time').textContent = `${dateString} ${timeString} UTC`;
}

function animateResourceBars() {
    const cpuUsage = Math.floor(Math.random() * 50) + 40;
    document.getElementById('cpu-bar').style.width = `${cpuUsage}%`;
    document.getElementById('cpu-value').textContent = `${cpuUsage}%`;
    const ramUsage = Math.floor(Math.random() * 40) + 30;
    document.getElementById('ram-bar').style.width = `${ramUsage}%`;
    document.getElementById('ram-value').textContent = `
