document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = document.lastModified;
});


const today = new Date();
document.getElementById("currentyear").textContent = today.getFullYear();

// Get the current year for the copyright
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Get the last modified date
document.getElementById("lastModified").textContent = document.lastModified;

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = menuToggle.querySelector('i');
    const headerTitle = document.querySelector('header h1');
    const header = document.querySelector('header');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
        header.classList.toggle('menu-open');
        
        // Toggle header title visibility
        if (window.innerWidth < 640) { // Only hide title on mobile
            headerTitle.classList.toggle('hide');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
            headerTitle.classList.remove('hide');
            header.classList.remove('menu-open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 640) {
            headerTitle.classList.remove('hide');
            header.classList.remove('menu-open');
        } else if (navMenu.classList.contains('open')) {
            headerTitle.classList.add('hide');
            header.classList.add('menu-open');
        }
    });
});
