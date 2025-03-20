// Get current year for copyright
document.getElementById('current-year').textContent = new Date().getFullYear();

// Get last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Static weather values (matching the displayed values in the HTML)
const temperature = 31; // °C
const windSpeed = 12;   // km/h

/**
 * Calculate wind chill using metric formula
 * @param {number} temp - Temperature in Celsius
 * @param {number} speed - Wind speed in km/h
 * @returns {number|string} Wind chill in Celsius or "N/A" if conditions not met
 */
function calculateWindChill(temp, speed) {
    // Check if conditions are met for wind chill calculation
    if (temp <= 10 && speed > 4.8) {
        // Wind chill formula for metric units
        // Source: Environment Canada
        return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
    }
    return "N/A";
}

// Calculate and display wind chill
window.addEventListener('load', () => {
    const windChillElement = document.getElementById('windchill');
    const windChill = calculateWindChill(temperature, windSpeed);
    
    if (windChill === "N/A") {
        windChillElement.textContent = windChill;
    } else {
        // Round to 1 decimal place and add °C
        windChillElement.textContent = `${Math.round(windChill * 10) / 10}°C`;
    }
}); 