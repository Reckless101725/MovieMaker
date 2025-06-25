document.addEventListener('DOMContentLoaded', function () {
    const leftBar = document.querySelector('.left-bar');
    const rightBar = document.querySelector('.right-bar');

    function flashRed(bar) {
        const barFill = bar.querySelector('.bar-fill');
        barFill.classList.add('flash-red');
        setTimeout(() => {
            barFill.classList.remove('flash-red');
        }, 300);
    }

    leftBar.addEventListener('click', () => flashRed(leftBar));
    rightBar.addEventListener('click', () => flashRed(rightBar));

    // === Randomize Stats ===
    const coreTempElem = document.querySelector('.status-item:nth-child(1) .status-value');
    const powerOutputElem = document.querySelector('.status-item:nth-child(2) .status-value');
    const efficiencyElem = document.querySelector('.status-item:nth-child(3) .status-value');

    function getRandomFloat(min, max, decimals) {
        return (Math.random() * (max - min) + min).toFixed(decimals);
    }

    function updateStats() {
        coreTempElem.textContent = `${getRandomFloat(2.0, 3.5, 1)}°K`;
        powerOutputElem.textContent = `${getRandomFloat(2.5, 4.0, 1)} TW`;
        efficiencyElem.textContent = `${getRandomFloat(95, 99.9, 1)}%`;
    }

    setInterval(updateStats, 1500); // Update every 1.5s

    // === Uptime Counter ===
    const uptimeElem = document.querySelector('.status-item:nth-child(4) .status-value');
    const originalText = uptimeElem.textContent;
    let baseDays = parseInt(originalText.split('d')[0]);
    let baseHours = parseInt(originalText.split('d')[1].split('h')[0]);
    let seconds = 0;

    const uptimeInterval = setInterval(() => {
        seconds++;

        let totalSeconds = baseDays * 86400 + baseHours * 3600 + seconds;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds % 86400) / 3600);
        uptimeElem.textContent = `${days}d ${hours}h`;

        if (seconds >= 60) clearInterval(uptimeInterval); // Stop after 1 minute
    }, 1000);
});