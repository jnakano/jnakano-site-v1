// Main JavaScript file for client-side interactions
console.log('Site loaded successfully'); 

// Dark theme blog functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark theme blog loaded successfully');
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Scroll animations
    initScrollAnimations();
    
    // Mobile spotlight effects (fade in/out on scroll)
    initMobileSpotlightEffects();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Performance optimization: throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(handleScroll);
    });
});

// Mobile menu toggle
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
            }
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animateElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile spotlight effects (fade in/out on scroll)
function initMobileSpotlightEffects() {
    // Only apply on touch devices
    if (!('ontouchstart' in window)) return;
    
    const spotlightElements = document.querySelectorAll('.spotlight-effect, .spotlight-effect-subtle, .card-dark');
    
    if (!spotlightElements.length) return;
    
    const observerOptions = {
        threshold: [0, 0.5, 1],
        rootMargin: '0px 0px -100px 0px'
    };
    
    const spotlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                // Element is in view
                if (entry.intersectionRatio > 0.5) {
                    element.classList.add('mobile-fade-element', 'fade-in');
                    element.classList.remove('fade-out');
                }
            } else {
                // Element is out of view
                element.classList.add('mobile-fade-element', 'fade-out');
                element.classList.remove('fade-in');
            }
        });
    }, observerOptions);
    
    spotlightElements.forEach(element => {
        spotlightObserver.observe(element);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Account for sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle scroll events (throttled)
function handleScroll() {
    // Add scroll-based effects here if needed
    // This function runs on every scroll frame
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add loading states for dynamic content
function showLoadingState(element) {
    if (element) {
        element.classList.add('loading-shimmer');
    }
}

function hideLoadingState(element) {
    if (element) {
        element.classList.remove('loading-shimmer');
    }
}

// Export functions for potential use in other scripts
window.BlogTheme = {
    showLoadingState,
    hideLoadingState,
    debounce,
    throttle
}; 