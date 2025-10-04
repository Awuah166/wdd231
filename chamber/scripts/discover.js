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

import { places } from '../data/places.js';
console.log(places);

// Function to create and insert place cards into the DOM
const showHere = document.querySelector('#places-container');

// Loop through the array of json objects and create cards
function displayPlaces(places) {
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <h2>${place.name}</h2>
            <img src="${place.image_url}" alt="Image of ${place.name}" loading="lazy">
            <div class="place-card-content">
                <p class="description">${place.description}</p>
                <p class="address">${place.address}</p>
            </div>
            <a href="#" class="learn-more">Learn More</a>
        `;
        showHere.appendChild(card);
    });
}

// Visit tracking functionality using localStorage
function trackVisit() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.id = 'visit-message';
    messageElement.style.cssText = `
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 1rem;
        margin: 2rem auto;
        max-width: 800px;
        text-align: center;
        font-size: 1.1rem;
        color: #2c5530;
    `;

    let message = '';

    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < 24 * 60 * 60 * 1000) {
            // Less than a day
            message = "Back so soon! Awesome!";
        } else {
            // More than a day
            if (daysDifference === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysDifference} days ago.`;
            }
        }
    }

    messageElement.textContent = message;

    // Insert message before places container
    const main = document.querySelector('main');
    const placesContainer = document.querySelector('#places-container');
    main.insertBefore(messageElement, placesContainer);

    // Store current visit date
    localStorage.setItem('lastVisit', now.toISOString());
}

// Call the function to display places
displayPlaces(places);

// Track visit when page loads
document.addEventListener('DOMContentLoaded', trackVisit);