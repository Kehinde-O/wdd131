document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = document.lastModified;

    const navToggle = document.createElement('button');
    navToggle.innerHTML = '&#9776;';
    navToggle.classList.add('nav-toggle');
    document.querySelector('header').insertBefore(navToggle, document.querySelector('nav'));

    navToggle.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('open');
    });
});


const today = new Date();

document.getElementById("currentyear").textContent = today.getFullYear();