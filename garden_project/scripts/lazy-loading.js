// Lazy Loading Implementation

document.addEventListener('DOMContentLoaded', () => {
    // Check for any images that might need lazy loading but don't have it applied
    const addNativeLazyLoading = () => {
        // Select all images that are likely below the fold (not in header/hero sections)
        const potentialLazyImages = document.querySelectorAll('img:not([loading])');
        
        potentialLazyImages.forEach(img => {
            // Check if image is likely below the fold
            const rect = img.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // If image is below the viewport, add native lazy loading
            if (rect.top > viewportHeight) {
                img.setAttribute('loading', 'lazy');
                console.log(`Added native lazy loading to image: ${img.alt || img.src}`);
            }
        });
    };
    
    // Run initially
    addNativeLazyLoading();
    
    // Get all images with lazy-image class for custom implementation
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