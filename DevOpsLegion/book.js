const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle menu saat hamburger diklik
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu saat link diklik
document.querySelectorAll('.navbar-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu saat klik di luar navbar
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevent menu close saat klik di dalam menu
navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});