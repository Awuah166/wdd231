// Home page JavaScript functionality

// Mobile hamburger toggle (simple in-flow menu)
const humBtn = document.getElementById('hum-btn');
const nav = document.getElementById('nav-bar');

if (humBtn && nav) {
    humBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        humBtn.textContent = isOpen ? '✕' : '☰';
        humBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

// Insert current year and last modified timestamp
function populateTimestamps() {
    const yearEl = document.getElementById('currentYear');
    const lastModEl = document.getElementById('lastModified');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (lastModEl) {
        // Format last modified in a short readable form
        const raw = document.lastModified;
        if (raw) {
            const d = new Date(raw);
            if (!isNaN(d)) {
                lastModEl.textContent = `: ${d.toLocaleString()}`;
            } else {
                lastModEl.textContent = `: ${raw}`;
            }
        } else {
            lastModEl.textContent = '';
        }
    }
}

// Run after initial DOM population
document.addEventListener('DOMContentLoaded', populateTimestamps);

// Fetch and display spotlight members from the members JSON file
const url = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

// Fetch member data and display spotlight members
async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } const data = await response.json();
        displaySpotlight(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displaySpotlight = (members) => {
    // Filter members with "Gold" or "Silver" membership level
    const spotlightMembers = members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    // Function to randomly shuffle an array
    function shuffleArray(array) {
        const shuffled = [...array]; // Create a copy to avoid modifying original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Randomly shuffle the spotlight members and select up to 3
    const shuffledMembers = shuffleArray(spotlightMembers);
    const selectedMembers = shuffledMembers.slice(0, 3);

    // Clear existing content
    spotlightContainer.innerHTML = '';
    // Create and append spotlight member elements
    selectedMembers.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        // Header section with company name and tagline
        const headerSection = document.createElement('div');
        headerSection.classList.add('card-header');

        const companyName = document.createElement('h2');
        companyName.textContent = member.name;

        const tagline = document.createElement('p');
        tagline.classList.add('tagline');
        tagline.textContent = member.description || "Your trusted business partner";

        headerSection.appendChild(companyName);
        headerSection.appendChild(tagline);

        // Content section with logo and details side by side
        const contentSection = document.createElement('div');
        contentSection.classList.add('card-content');

        const logo = document.createElement('img');
        logo.classList.add('spotlight-logo');
        logo.setAttribute('src', member.logo);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');

        const detailsSection = document.createElement('div');
        detailsSection.classList.add('card-details');

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const website = document.createElement('a');
        website.textContent = member.website;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        const membershipLevel = document.createElement('p');
        membershipLevel.classList.add('membership-level');
        membershipLevel.textContent = `${member.membershipLevel} Member`;

        // Append details to details section
        detailsSection.appendChild(address);
        detailsSection.appendChild(phone);
        detailsSection.appendChild(website);
        detailsSection.appendChild(membershipLevel);

        // Append logo and details to content section
        contentSection.appendChild(logo);
        contentSection.appendChild(detailsSection);

        // Append header and content to card
        card.appendChild(headerSection);
        card.appendChild(contentSection);
        spotlightContainer.appendChild(card);
    });
}
// Initial fetch of member data
getMemberData();

const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-description');

const weatherUrl = '//api.openweathermap.org/data/2.5/weather?lat=5.56658&lon=-0.33373&appid=f8aedfdc26164592120bf3bc97cc78d1&units=imperial';
const forecastUrl = '//api.openweathermap.org/data/2.5/forecast?lat=5.56658&lon=-0.33373&appid=f8aedfdc26164592120bf3bc97cc78d1&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log('Forecast data:', data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Forecast fetch error:', error);
    }
}

apiFetch();
fetchForecast();

function displayWeather(data) {
    console.log('Weather data:', data);

    // Current temperature and description
    const currentTemp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    // High and Low temperatures
    const highTemp = Math.round(data.main.temp_max);
    const lowTemp = Math.round(data.main.temp_min);

    // Humidity
    const humidity = data.main.humidity;

    // Sunrise and Sunset (convert from Unix timestamp to readable time)
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    // Update weather icon and description
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute('alt', description);

    // Update weather description with all details - structured for side-by-side layout
    weatherDesc.innerHTML = `
        <div class="weather-content">
            <div class="current-temp">${currentTemp}°F</div>
            <div class="weather-desc">${description}</div>
            <div class="weather-details">
                <div class="temp-range">High: ${highTemp}°F </div>
                <div class="temp-range">Low: ${lowTemp}°F</div>
                <div class="humidity">Humidity: ${humidity}%</div>
                <div class="sun-times">Sunrise: ${sunrise} </div>
                <div class="sun-times">Sunset: ${sunset}</div>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    console.log('Processing forecast data:', data);

    // Get today's date to determine which days to show
    const today = new Date();
    const todayStr = today.toDateString();

    // Find Sunday and Monday relative to today
    const daysToAdd = [0, 1, 2]; // Today, tomorrow, day after tomorrow
    const targetDays = daysToAdd.map(days => {
        const date = new Date(today);
        date.setDate(today.getDate() + days);
        return date;
    });

    // Get day names
    const dayNames = targetDays.map(date => {
        if (date.toDateString() === todayStr) {
            return 'Today';
        }
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    });

    // Process forecast data - get one forecast per day (around noon)
    const dailyForecasts = [];
    const processedDates = new Set();

    for (const forecast of data.list) {
        const forecastDate = new Date(forecast.dt * 1000);
        const dateStr = forecastDate.toDateString();

        // Get forecasts around noon (12:00) for each day
        const hour = forecastDate.getHours();
        if ((hour >= 11 && hour <= 13) && !processedDates.has(dateStr)) {
            dailyForecasts.push({
                date: forecastDate,
                temp: Math.round(forecast.main.temp),
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon
            });
            processedDates.add(dateStr);

            if (dailyForecasts.length >= 3) break;
        }
    }

    // Update the HTML elements with day names normal weight and temperature bold
    for (let i = 0; i < 3 && i < dailyForecasts.length; i++) {
        const dayElement = document.getElementById(`day${i + 1}`);
        const tempElement = document.getElementById(`temp${i + 1}`);

        if (dayElement && tempElement) {
            const forecast = dailyForecasts[i];
            // Display day name with normal weight and temperature with bold
            dayElement.innerHTML = `${dayNames[i]}: <span class="temp-bold">${forecast.temp}°F</span>`;
            tempElement.textContent = ''; // Clear the temperature element since it's now in dayElement
        }
    }
}
