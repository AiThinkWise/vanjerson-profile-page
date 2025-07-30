// Van Jerson Profile Page - Theme Management
class VanJersonThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('vanjersonThemeToggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    getStoredTheme() {
        return localStorage.getItem('vanjerson-theme');
    }
    
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('vanjerson-theme', theme);
        
        // Update toggle button state
        this.updateToggleButton(theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add smooth transition effect
        this.addTransitionEffect();
    }
    
    updateToggleButton(theme) {
        const lightIcon = this.themeToggle.querySelector('.vanjerson-light-icon');
        const darkIcon = this.themeToggle.querySelector('.vanjerson-dark-icon');
        
        if (theme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }
    
    addTransitionEffect() {
        // Add a temporary class for enhanced transition
        document.body.classList.add('vanjerson-theme-transitioning');
        
        setTimeout(() => {
            document.body.classList.remove('vanjerson-theme-transitioning');
        }, 300);
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Van Jerson Profile Page - Smooth Scrolling
class VanJersonSmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to all internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Van Jerson Profile Page - Intersection Observer for Animations
class VanJersonAnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vanjerson-fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.vanjerson-skill-category, .vanjerson-contact-section');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Van Jerson Profile Page - Performance Optimizations
class VanJersonPerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('vanjerson-lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
}

// Van Jerson Profile Page - Accessibility Enhancements
class VanJersonAccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add skip link for keyboard navigation
        this.addSkipLink();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Add ARIA labels and roles
        this.addAriaAttributes();
    }
    
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'vanjerson-skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--vanjerson-primary-color);
            color: var(--vanjerson-text-inverse);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    enhanceKeyboardNavigation() {
        // Add keyboard navigation for social links
        const socialLinks = document.querySelectorAll('.vanjerson-social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }
    
    addAriaAttributes() {
        // Add main content landmark
        const mainContent = document.querySelector('.vanjerson-main-container');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }
        
        // Add navigation landmark for social links
        const socialLinksContainer = document.querySelector('.vanjerson-social-links');
        if (socialLinksContainer) {
            socialLinksContainer.setAttribute('role', 'navigation');
            socialLinksContainer.setAttribute('aria-label', 'Social media links');
        }
    }
}

// Van Jerson Profile Page - Error Handling
class VanJersonErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle image loading errors
        this.handleImageErrors();
        
        // Handle JavaScript errors
        this.handleJSErrors();
    }
    
    handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', () => {
                // Replace with a placeholder or hide the image
                img.style.display = 'none';
                console.warn('Image failed to load:', img.src);
            });
        });
    }
    
    handleJSErrors() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // You could send this to an error tracking service
        });
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme management
    new VanJersonThemeManager();
    
    // Initialize smooth scrolling
    new VanJersonSmoothScroller();
    
    // Initialize animations
    new VanJersonAnimationManager();
    
    // Initialize performance optimizations
    new VanJersonPerformanceManager();
    
    // Initialize accessibility enhancements
    new VanJersonAccessibilityManager();
    
    // Initialize error handling
    new VanJersonErrorHandler();
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('vanjerson-loaded');
    });
});

// Export classes for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VanJersonThemeManager,
        VanJersonSmoothScroller,
        VanJersonAnimationManager,
        VanJersonPerformanceManager,
        VanJersonAccessibilityManager,
        VanJersonErrorHandler
    };
} 