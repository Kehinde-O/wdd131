// Lazy Loading Implementation

document.addEventListener('DOMContentLoaded', () => {
    // Get all images with lazy-image class
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        // Use Intersection Observer for modern browsers
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    // Replace src with data-src
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        
                        // Add a load event listener
                        lazyImage.addEventListener('load', () => {
                            lazyImage.classList.add('loaded');
                        });
                        
                        // Stop observing once loaded
                        lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });
        
        // Observe each lazy image
        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers
        let lazyImageTimeout;
        
        // Function to load visible images
        const loadVisibleImages = () => {
            lazyImageTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                lazyImages.forEach(lazyImage => {
                    if (lazyImage.offsetTop < window.innerHeight + scrollTop) {
                        if (lazyImage.dataset.src) {
                            lazyImage.src = lazyImage.dataset.src;
                            
                            // Add a load event listener
                            lazyImage.addEventListener('load', () => {
                                lazyImage.classList.add('loaded');
                            });
                        }
                    }
                });
                
                // If all images have been loaded, stop checking
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', loadVisibleImages);
                    window.removeEventListener('resize', loadVisibleImages);
                    window.removeEventListener('orientationChange', loadVisibleImages);
                }
            }, 20);
        };
        
        // Add event listeners
        document.addEventListener('scroll', loadVisibleImages);
        window.addEventListener('resize', loadVisibleImages);
        window.addEventListener('orientationChange', loadVisibleImages);
        
        // Initial load
        loadVisibleImages();
    }
}); 