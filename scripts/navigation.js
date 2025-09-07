// Store the selected elements that we are goin to use
const navbutton = document.querySelector('#hum-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle the show class off and on, only on small screens
navbutton.addEventListener('click', () => {
    if (window.innerWidth < 608) { // 38rem = 608px
        navbutton.classList.toggle('show');
        navlinks.classList.toggle('show');
    }
});