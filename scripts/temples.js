// document.addEventListener('DOMContentLoaded', () => {
//     const lastModified = document.getElementById('lastModified');
//     lastModified.textContent = document.lastModified;

//     const navToggle = document.createElement('button');
//     navToggle.innerHTML = '&#9776;';
//     navToggle.classList.add('nav-toggle');
//     document.querySelector('header').insertBefore(navToggle, document.querySelector('nav'));

//     navToggle.addEventListener('click', () => {
//         document.querySelector('nav ul').classList.toggle('open');
//     });
// });


// const today = new Date();

// document.getElementById("currentyear").textContent = today.getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = document.lastModified;

    const navToggle = document.createElement('button');
    navToggle.innerHTML = '&#9776;'; // Hamburger menu
    navToggle.classList.add('nav-toggle');
    document.querySelector('header').insertBefore(navToggle, document.querySelector('nav'));

    navToggle.addEventListener('click', () => {
        const navUL = document.querySelector('nav ul');
        navUL.classList.toggle('open');

        if (navUL.classList.contains('open')) {
            navToggle.innerHTML = '&#10006;'; // Close (X) symbol
        } else {
            navToggle.innerHTML = '&#9776;'; // Hamburger menu
        }
    });
});

const today = new Date();
document.getElementById("currentyear").textContent = today.getFullYear();
