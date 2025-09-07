// Store the selected elements that we are goin to use
const navbutton = document.querySelector('#hum-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});