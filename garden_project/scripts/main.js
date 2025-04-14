// Main JavaScript for Lagos Garden Guide

document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile Navigation Toggle with improved animation
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle menu visibility
            mainNav.classList.toggle('active');
            // Toggle menu icon animation
            menuToggle.classList.toggle('menu-open');
            // Toggle body scroll lock
            body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking on a navigation link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('menu-open');
                body.classList.remove('nav-open');
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (body.classList.contains('nav-open') && 
            !e.target.closest('#main-nav') && 
            !e.target.closest('#menu-toggle')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('menu-open');
            body.classList.remove('nav-open');
        }
    });
    
    // Handle window resize - reset mobile menu if window resized wider than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('menu-open');
            body.classList.remove('nav-open');
        }
    });
    
    // Initialize plant journal if on the indoor plants page
    if (document.getElementById('plant-journal-form')) {
        initializePlantJournal();
    }
    
    // Initialize garden space toggles if on the getting started page
    const toggleButtons = document.querySelectorAll('.toggle-details');
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const targetDetails = document.getElementById(targetId);
                
                if (targetDetails) {
                    // Use smooth slide animation for showing/hiding details
                    if (targetDetails.classList.contains('visible')) {
                        // Slide up animation
                        const height = targetDetails.scrollHeight;
                        targetDetails.style.height = `${height}px`;
                        
                        // Force a reflow
                        targetDetails.offsetHeight;
                        
                        targetDetails.style.height = '0';
                        targetDetails.style.opacity = '0';
                        button.textContent = 'Read More';
                        
                        // Remove class and cleanup after animation
                        setTimeout(() => {
                            targetDetails.classList.remove('visible');
                            targetDetails.style.display = 'none';
                            targetDetails.style.height = '';
                            targetDetails.style.opacity = '';
                        }, 300);
                    } else {
                        // Slide down animation
                        targetDetails.classList.add('visible');
                        targetDetails.style.display = 'block';
                        targetDetails.style.height = '0';
                        targetDetails.style.opacity = '0';
                        
                        // Force a reflow
                        targetDetails.offsetHeight;
                        
                        const height = targetDetails.scrollHeight;
                        targetDetails.style.height = `${height}px`;
                        targetDetails.style.opacity = '1';
                        button.textContent = 'Read Less';
                        
                        // Cleanup after animation
                        setTimeout(() => {
                            targetDetails.style.height = '';
                        }, 300);
                    }
                }
            });
        });
    }
    
    // Tool description hover functionality with fade animation
    const toolsList = document.getElementById('tools-list');
    const toolDescription = document.getElementById('tool-description');
    
    if (toolsList && toolDescription) {
        const toolItems = toolsList.querySelectorAll('li');
        let activeTimeout;
        
        toolItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                clearTimeout(activeTimeout);
                const description = item.getAttribute('data-description');
                if (description) {
                    // Fade out/in animation
                    toolDescription.style.opacity = '0';
                    setTimeout(() => {
                        toolDescription.innerHTML = `<p>${description}</p>`;
                        toolDescription.style.opacity = '1';
                    }, 200);
                }
            });
            
            // For mobile devices
            item.addEventListener('click', () => {
                clearTimeout(activeTimeout);
                const description = item.getAttribute('data-description');
                if (description) {
                    // Fade out/in animation
                    toolDescription.style.opacity = '0';
                    setTimeout(() => {
                        toolDescription.innerHTML = `<p>${description}</p>`;
                        toolDescription.style.opacity = '1';
                    }, 200);
                }
            });
        });
        
        toolsList.addEventListener('mouseleave', () => {
            clearTimeout(activeTimeout);
            // Fade out/in animation
            toolDescription.style.opacity = '0';
            activeTimeout = setTimeout(() => {
                toolDescription.innerHTML = '<p>Hover over or tap a tool to see description</p>';
                toolDescription.style.opacity = '1';
            }, 200);
        });
    }
    
    // Tab functionality for plant care tips with smooth transitions
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('active')) {
                    // Get the currently active tab pane
                    const activePane = document.querySelector('.tab-pane.active');
                    
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Get the corresponding tab pane
                    const tabId = button.getAttribute('data-tab');
                    const tabPane = document.getElementById(tabId);
                    
                    if (tabPane && activePane) {
                        // Fade out the active pane
                        activePane.style.opacity = '0';
                        
                        setTimeout(() => {
                            // Hide all panes
                            document.querySelectorAll('.tab-pane').forEach(pane => {
                                pane.classList.remove('active');
                            });
                            
                            // Show and fade in the new tab pane
                            tabPane.classList.add('active');
                            tabPane.style.opacity = '0';
                            
                            // Force a reflow
                            tabPane.offsetHeight;
                            
                            // Fade in
                            tabPane.style.opacity = '1';
                        }, 200);
                    }
                }
            });
        });
    }
    
    // Plant filtering functionality with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const plantCards = document.querySelectorAll('.plant-card');
    
    if (filterButtons.length > 0 && plantCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Skip if already active
                if (!button.classList.contains('active')) {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button with slight bounce effect
                    button.classList.add('active');
                    button.classList.add('bounce');
                    setTimeout(() => {
                        button.classList.remove('bounce');
                    }, 300);
                    
                    // Get the filter value
                    const filterValue = button.getAttribute('data-filter');
                    
                    // Show/hide plants based on filter with staggered animation
                    plantCards.forEach((card, index) => {
                        // Determine if this card should be visible
                        let shouldBeVisible = false;
                        if (filterValue === 'all') {
                            shouldBeVisible = true;
                        } else {
                            const categories = card.getAttribute('data-categories');
                            if (categories && categories.includes(filterValue)) {
                                shouldBeVisible = true;
                            }
                        }
                        
                        // Apply staggered animation
                        setTimeout(() => {
                            if (shouldBeVisible) {
                                // Show card with fade in
                                card.style.opacity = '0';
                                card.style.display = 'block';
                                card.style.transform = 'translateY(20px)';
                                
                                // Force a reflow
                                card.offsetHeight;
                                
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            } else {
                                // Hide card with fade out
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(20px)';
                                
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }, index * 50); // Stagger the animations
                    });
                }
            });
        });
    }
    
    // Load local supply stores data on the getting started page
    const supplyStoresSection = document.getElementById('supply-stores');
    if (supplyStoresSection) {
        loadSupplyStores();
    }
    
    // Handle newsletter subscription with improved feedback
    const newsletterForm = document.getElementById('newsletter-form');
    const subscriptionMessage = document.getElementById('subscription-message');
    
    if (newsletterForm && subscriptionMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            if (nameInput && emailInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                
                if (name && email) {
                    // Show loading state
                    let originalButtonText = newsletterForm.querySelector('button[type="submit"]').textContent;
                    newsletterForm.querySelector('button[type="submit"]').innerHTML = '<span class="spinner"></span> Subscribing...';
                    newsletterForm.querySelector('button[type="submit"]').disabled = true;
                    
                    // Simulate server request with setTimeout
                    setTimeout(() => {
                        // Store subscription in localStorage
                        const subscriptions = getSubscriptions();
                        
                        // Check if email already exists
                        const existingIndex = subscriptions.findIndex(sub => sub.email === email);
                        
                        if (existingIndex === -1) {
                            // Add new subscription
                            const newSubscription = {
                                name,
                                email,
                                date: new Date().toISOString()
                            };
                            
                            subscriptions.push(newSubscription);
                            saveSubscriptions(subscriptions);
                            
                            // Show success message with animation
                            subscriptionMessage.style.opacity = '0';
                            subscriptionMessage.style.transform = 'translateY(10px)';
                            subscriptionMessage.style.color = '#2ecc71';
                            
                            setTimeout(() => {
                                subscriptionMessage.textContent = `Thank you, ${name}! You have been subscribed to our newsletter.`;
                                subscriptionMessage.style.opacity = '1';
                                subscriptionMessage.style.transform = 'translateY(0)';
                            }, 200);
                            
                            // Reset form
                            newsletterForm.reset();
                        } else {
                            // Email already exists
                            subscriptionMessage.style.opacity = '0';
                            subscriptionMessage.style.transform = 'translateY(10px)';
                            subscriptionMessage.style.color = '#f39c12';
                            
                            setTimeout(() => {
                                subscriptionMessage.textContent = 'This email is already subscribed to our newsletter.';
                                subscriptionMessage.style.opacity = '1';
                                subscriptionMessage.style.transform = 'translateY(0)';
                            }, 200);
                        }
                        
                        // Restore button state
                        newsletterForm.querySelector('button[type="submit"]').textContent = originalButtonText;
                        newsletterForm.querySelector('button[type="submit"]').disabled = false;
                    }, 1000); // Simulate network delay
                } else {
                    // Missing fields
                    subscriptionMessage.style.opacity = '0';
                    subscriptionMessage.style.color = '#e74c3c';
                    
                    setTimeout(() => {
                        subscriptionMessage.textContent = 'Please fill in all required fields.';
                        subscriptionMessage.style.opacity = '1';
                    }, 200);
                }
            }
        });
    }
    
    // Handle search functionality with improved feedback
    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');
    
    if (searchBox && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Add animation to search box focus
        searchBox.addEventListener('focus', () => {
            searchBox.parentElement.classList.add('focused');
        });
        
        searchBox.addEventListener('blur', () => {
            searchBox.parentElement.classList.remove('focused');
        });
    }
    
    // Add scroll-based animations for sections
    animateOnScroll();
    window.addEventListener('scroll', throttle(animateOnScroll, 200));
    
    // Initialize lazy loading manually if needed
    checkLazyImages();
    window.addEventListener('scroll', throttle(checkLazyImages, 200));
    
    // Initially set active link based on scroll position
    highlightActiveLink();
    
    // Add animation delay to stagger the sections appearing
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Throttle function to limit execution frequency
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Function to animate elements as they scroll into view
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.timeline-item, .card, .care-item, .store-card, .feature-card, .plant-card, .project-card');
    
    animatedElements.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition) {
            item.classList.add('visible');
        }
    });
}

// Function to check and load lazy images
function checkLazyImages() {
    const lazyImages = document.querySelectorAll('.lazy-image:not(.loaded)');
    
    lazyImages.forEach(image => {
        const imageTop = image.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (imageTop < windowHeight * 1.2) {
            // Load the image
            if (image.dataset.src) {
                image.src = image.dataset.src;
                image.addEventListener('load', () => {
                    image.classList.add('loaded');
                });
            }
        }
    });
}

// Function to initialize plant journal
function initializePlantJournal() {
    const plantJournalForm = document.getElementById('plant-journal-form');
    const plantList = document.getElementById('plant-list');
    const noPlantMessage = document.getElementById('no-plants-message');
    
    // Load existing plants from localStorage
    const plants = getPlants();
    
    // Update the plant list display
    updatePlantList(plants, plantList, noPlantMessage);
    
    // Handle form submission
    plantJournalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const plantName = document.getElementById('plant-name').value.trim();
        const plantType = document.getElementById('plant-type').value;
        const purchaseDate = document.getElementById('purchase-date').value;
        const wateringFrequency = parseInt(document.getElementById('watering-frequency').value, 10);
        const plantNotes = document.getElementById('plant-notes').value.trim();
        
        // Validate form
        if (!plantName) {
            showFormError('plant-name', 'Please enter a name for your plant.');
            return;
        }
        
        // Create plant object
        const newPlant = {
            id: Date.now(), // Use timestamp as unique ID
            name: plantName,
            type: plantType,
            purchaseDate: purchaseDate,
            wateringFrequency: wateringFrequency,
            notes: plantNotes,
            lastWatered: new Date().toISOString() // Set today as last watered date
        };
        
        // Add to plants array
        plants.push(newPlant);
        
        // Save to localStorage
        savePlants(plants);
        
        // Show success message
        const formSuccess = document.createElement('div');
        formSuccess.className = 'form-success';
        formSuccess.textContent = `${plantName} has been added to your plant journal!`;
        plantJournalForm.appendChild(formSuccess);
        
        setTimeout(() => {
            formSuccess.style.opacity = '0';
            setTimeout(() => {
                formSuccess.remove();
            }, 300);
        }, 3000);
        
        // Update the display with animation
        updatePlantList(plants, plantList, noPlantMessage, true);
        
        // Reset form with animation
        plantJournalForm.classList.add('submitted');
        setTimeout(() => {
            plantJournalForm.reset();
            plantJournalForm.classList.remove('submitted');
        }, 300);
    });
}

// Function to show form error
function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error';
    errorMessage.textContent = message;
    
    // Remove any existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling to input
    input.classList.add('error');
    
    // Add error message after input
    input.parentElement.appendChild(errorMessage);
    
    // Focus the input
    input.focus();
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        input.classList.remove('error');
        setTimeout(() => {
            errorMessage.remove();
        }, 300);
    }, 3000);
}

// Function to update plant list display
function updatePlantList(plants, plantList, noPlantMessage, animate = false) {
    // Clear current list
    plantList.innerHTML = '';
    
    if (plants.length === 0) {
        // Show "no plants" message if list is empty
        if (noPlantMessage) {
            noPlantMessage.style.display = 'block';
        }
    } else {
        // Hide "no plants" message
        if (noPlantMessage) {
            noPlantMessage.style.display = 'none';
        }
        
        // Add each plant to the list
        plants.forEach((plant, index) => {
            const plantEntry = document.createElement('div');
            plantEntry.className = 'plant-entry';
            
            if (animate) {
                plantEntry.style.opacity = '0';
                plantEntry.style.transform = 'translateY(20px)';
            }
            
            // Calculate next watering date
            const lastWatered = new Date(plant.lastWatered);
            const nextWatering = new Date(lastWatered);
            nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequency);
            
            // Format dates
            const lastWateredFormatted = formatDate(lastWatered);
            const nextWateringFormatted = formatDate(nextWatering);
            
            // Determine if plant needs watering soon (within 2 days)
            const today = new Date();
            const daysUntilWatering = Math.ceil((nextWatering - today) / (1000 * 60 * 60 * 24));
            const wateringSoonClass = daysUntilWatering <= 2 ? 'watering-soon' : '';
            
            // Create entry HTML using template literals
            plantEntry.innerHTML = `
                <h4>${plant.name} <button class="delete-plant" data-id="${plant.id}" aria-label="Delete ${plant.name}">×</button></h4>
                <p><strong>Type:</strong> ${plant.type}</p>
                ${plant.purchaseDate ? `<p><strong>Purchased:</strong> ${formatDate(new Date(plant.purchaseDate))}</p>` : ''}
                ${plant.notes ? `<p><strong>Notes:</strong> ${plant.notes}</p>` : ''}
                <div class="watering-info ${wateringSoonClass}">
                    <p><strong>Last watered:</strong> ${lastWateredFormatted}</p>
                    <p class="next-watering"><strong>Water next:</strong> ${nextWateringFormatted}</p>
                    <button class="water-now-btn" data-id="${plant.id}">Water Now</button>
                </div>
            `;
            
            plantList.appendChild(plantEntry);
            
            // Animate entry if needed
            if (animate) {
                setTimeout(() => {
                    plantEntry.style.opacity = '1';
                    plantEntry.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-plant');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plantId = parseInt(button.getAttribute('data-id'), 10);
                deletePlant(plantId, plants, plantList, noPlantMessage);
            });
        });
        
        // Add event listeners for water now buttons
        const waterButtons = document.querySelectorAll('.water-now-btn');
        waterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plantId = parseInt(button.getAttribute('data-id'), 10);
                waterPlant(plantId, plants, plantList, noPlantMessage);
            });
        });
    }
}

// Function to delete a plant
function deletePlant(id, plants, plantList, noPlantMessage) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this plant?')) {
        // Find the plant entry element
        const plantEntry = document.querySelector(`.plant-entry:has(button[data-id="${id}"])`);
        
        // Animate removal
        if (plantEntry) {
            plantEntry.style.opacity = '0';
            plantEntry.style.transform = 'translateY(20px)';
            plantEntry.style.height = `${plantEntry.offsetHeight}px`;
            
            setTimeout(() => {
                plantEntry.style.height = '0';
                plantEntry.style.margin = '0';
                plantEntry.style.padding = '0';
                
                setTimeout(() => {
                    // Find the index of the plant with the given id
                    const index = plants.findIndex(plant => plant.id === id);
                    
                    if (index !== -1) {
                        // Remove the plant from the array
                        plants.splice(index, 1);
                        
                        // Save the updated array to localStorage
                        savePlants(plants);
                        
                        // Update the display
                        updatePlantList(plants, plantList, noPlantMessage);
                    }
                }, 300);
            }, 300);
        }
    }
}

// Function to update watering date
function waterPlant(id, plants, plantList, noPlantMessage) {
    // Find the plant with the given id
    const plant = plants.find(p => p.id === id);
    
    if (plant) {
        // Get button for visual feedback
        const button = document.querySelector(`.water-now-btn[data-id="${id}"]`);
        
        if (button) {
            // Show watering animation
            button.innerHTML = '<span class="watering-animation"></span> Watering...';
            button.disabled = true;
            
            setTimeout(() => {
                // Update last watered date to today
                plant.lastWatered = new Date().toISOString();
                
                // Save the updated array to localStorage
                savePlants(plants);
                
                // Update the display
                updatePlantList(plants, plantList, noPlantMessage);
            }, 1000);
        }
    }
}

// Helper function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Local storage functions for plants
function getPlants() {
    const plantsJSON = localStorage.getItem('lagosGardenPlants');
    return plantsJSON ? JSON.parse(plantsJSON) : [];
}

function savePlants(plants) {
    localStorage.setItem('lagosGardenPlants', JSON.stringify(plants));
}

// Local storage functions for newsletter subscriptions
function getSubscriptions() {
    const subscriptionsJSON = localStorage.getItem('lagosGardenSubscriptions');
    return subscriptionsJSON ? JSON.parse(subscriptionsJSON) : [];
}

function saveSubscriptions(subscriptions) {
    localStorage.setItem('lagosGardenSubscriptions', JSON.stringify(subscriptions));
}

// Function to load and display local supply stores
function loadSupplyStores() {
    const supplyStores = document.getElementById('supply-stores');
    
    // Sample data for gardening supply stores in Lagos
    const stores = [
        {
            name: 'Green Thumbs Garden Center',
            location: 'Lekki Phase 1, Lagos',
            contact: '+234 802 123 4567',
            specialty: 'Full range of gardening supplies and plants'
        },
        {
            name: 'Lagos Plant Nursery',
            location: 'Victoria Island, Lagos',
            contact: '+234 803 765 4321',
            specialty: 'Wide variety of ornamental and edible plants'
        },
        {
            name: 'Urban Gardener Nigeria',
            location: 'Ikeja, Lagos',
            contact: '+234 805 555 7890',
            specialty: 'Container gardening supplies and seeds'
        },
        {
            name: 'Agric Solutions Ltd',
            location: 'Surulere, Lagos',
            contact: '+234 807 654 3210',
            specialty: 'Soil, fertilizers, and pest control products'
        }
    ];
    
    // Clear loading message
    supplyStores.innerHTML = '<div class="loading-animation"></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        supplyStores.innerHTML = '';
        
        // Add store information with staggered animation
        stores.forEach((store, index) => {
            const storeCard = document.createElement('div');
            storeCard.className = 'store-card';
            storeCard.style.opacity = '0';
            storeCard.style.transform = 'translateY(20px)';
            
            storeCard.innerHTML = `
                <h3>${store.name}</h3>
                <p>${store.specialty}</p>
                <div class="store-contact">
                    <p><strong>Location:</strong> ${store.location}</p>
                    <p><strong>Contact:</strong> ${store.contact}</p>
                </div>
            `;
            
            supplyStores.appendChild(storeCard);
            
            // Staggered animation
            setTimeout(() => {
                storeCard.style.opacity = '1';
                storeCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 1000);
}

// Function to handle search
function performSearch() {
    const searchBox = document.getElementById('search-box');
    const query = searchBox.value.trim().toLowerCase();
    
    if (query) {
        // Add search animation
        searchBox.classList.add('searching');
        
        setTimeout(() => {
            // Store the search query in localStorage
            const searches = getSearches();
            searches.push({
                query,
                date: new Date().toISOString()
            });
            
            // Keep only the last 10 searches
            if (searches.length > 10) {
                searches.shift();
            }
            
            saveSearches(searches);
            
            // Redirect to the search page if it exists, or just alert for now
            searchBox.classList.remove('searching');
            alert(`Searching for: "${query}"\n\nThis feature would normally redirect to search results.`);
        }, 800);
    }
}

// Local storage functions for search history
function getSearches() {
    const searchesJSON = localStorage.getItem('lagosGardenSearches');
    return searchesJSON ? JSON.parse(searchesJSON) : [];
}

function saveSearches(searches) {
    localStorage.setItem('lagosGardenSearches', JSON.stringify(searches));
}

// Intersection Observer for scroll animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Active link highlighting
const highlightActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Scroll event listener for active link highlighting
window.addEventListener('scroll', highlightActiveLink);

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.querySelector('.form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        
        if (type) {
            formMessage.classList.add(`${type}-message`);
        }
    }
}

// Search form functionality
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-box');
        
        if (!searchInput.value.trim()) {
            // Add shake animation to search box if empty
            searchInput.classList.add('shake');
            setTimeout(() => {
                searchInput.classList.remove('shake');
            }, 500);
            return;
        }
        
        // Here would be the actual search functionality
        // For now just redirect to a fake search results page
        window.location.href = `search-results.html?q=${encodeURIComponent(searchInput.value)}`;
    });
}

// Add keyframe animation for shake effect
if (!document.querySelector('#shake-animation')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'shake-animation';
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Card hover effect enhancement
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = 'var(--shadow-xl)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Back to top button
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '&uarr;';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
            z-index: 90;
        }
        
        #back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        #back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
};

createBackToTopButton(); 