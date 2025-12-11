// ====================================
// SCROLL ANIMATIONS
// ====================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.casino-card, .stat-card, .feature-box, .content-card, .team-card, .value-card, .faq-card, .info-card-contact');

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Mobile menu toggle (if needed in future)
    handleMobileMenu();

    // Add scroll effect to navbar
    handleNavbarScroll();

    // Animate numbers in stats section
    animateStats();
});

// ====================================
// CONTACT FORM HANDLER
// ====================================

function handleFormSubmit(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitButton = e.target.querySelector('button[type="submit"]');

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24-48 hours.';

        // Reset form
        e.target.reset();

        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);

    // For real implementation, use fetch:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        e.target.reset();
    })
    .catch(error => {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
    */
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ====================================
// MOBILE MENU HANDLER
// ====================================

function handleMobileMenu() {
    // Add a hamburger menu for mobile if needed
    const navMenu = document.querySelector('.nav-menu');

    // Check if we need to add mobile menu functionality
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    if (mediaQuery.matches && navMenu) {
        // Mobile menu functionality can be added here if needed
    }
}

// ====================================
// ANIMATE STATS NUMBERS
// ====================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Handle different stat formats
            const text = element.textContent;
            if (text.includes('+')) {
                element.textContent = Math.floor(progress * parseInt(end)) + '+';
            } else if (text.includes('%')) {
                element.textContent = Math.floor(progress * parseInt(end)) + '%';
            } else if (text.includes('£')) {
                element.textContent = '£' + Math.floor(progress * parseInt(end.replace('£', '').replace('s', ''))) + 's';
            } else if (text.includes('/')) {
                element.textContent = Math.floor(progress * parseInt(end)) + '/7';
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    animateValue(stat, 0, finalValue, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ====================================
// CARD HOVER EFFECTS
// ====================================

// Add extra interactivity to casino cards
document.addEventListener('DOMContentLoaded', () => {
    const casinoCards = document.querySelectorAll('.casino-card');

    casinoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ====================================
// BUTTON RIPPLE EFFECT
// ====================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');

    const rippleElement = button.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }

    button.appendChild(ripple);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// ====================================
// LAZY LOADING OPTIMIZATION
// ====================================

// Add intersection observer for better performance
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Load content here if needed
                lazyObserver.unobserve(element);
            }
        });
    });

    lazyElements.forEach(el => lazyObserver.observe(el));
}

// ====================================
// PERFORMANCE OPTIMIZATIONS
// ====================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ====================================
// ACCESSIBILITY IMPROVEMENTS
// ====================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Focus trap for modals (if implemented)
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// ====================================
// CONSOLE INFO
// ====================================

console.log('%c🎰 NewCasino.UK ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #667eea; font-size: 12px;');
