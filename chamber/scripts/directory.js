// Fetch the directory data from the JSON file
const url = 'data/members.json';
const cards = document.querySelector('#cards');
const gridIcon = document.getElementById('grid-icon');
const listIcon = document.getElementById('list-icon');

// Current view state: 'grid' or 'list'
let currentView = 'grid';

// Async function to fetch and display member data
async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    // Clear existing
    cards.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        const logo = document.createElement('img');
        logo.classList.add('member-logo');
        logo.setAttribute('src', member.logo);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');

        const companyName = document.createElement('h2');
        companyName.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const membershipLevel = document.createElement('p');
        membershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;

        const description = document.createElement('p');
        description.textContent = member.description;

        const website = document.createElement('a');
        website.textContent = member.website;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        // Append elements to card
        card.appendChild(logo);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    })

    // Apply current view class to cards container
    updateViewClass();
}

function updateViewClass() {
    if (currentView === 'grid') {
        cards.classList.remove('list');
        cards.classList.add('grid');
    } else {
        cards.classList.remove('grid');
        cards.classList.add('list');
    }
}

// Event listeners for toggle icons
gridIcon.addEventListener('click', () => {
    currentView = 'grid';
    updateViewClass();
    gridIcon.classList.add('active');
    listIcon.classList.remove('active');
});

listIcon.addEventListener('click', () => {
    currentView = 'list';
    updateViewClass();
    listIcon.classList.add('active');
    gridIcon.classList.remove('active');
});

// Initial load
getMemberData();

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


