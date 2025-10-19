// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===================================
// Sticky Header on Scroll
// ===================================
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real implementation, you would send this to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's not just "#"
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Animate Elements on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation
const animatedElements = document.querySelectorAll('.service__card, .advocacy__card, .testimonial__card, .value__card, .certification__card, .faq__item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Phone Number Click Tracking
// ===================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Track phone clicks (integrate with analytics)
        console.log('Phone number clicked:', link.href);
    });
});

// ===================================
// Form Field Validation
// ===================================
const formInputs = document.querySelectorAll('.form__input, .form__select, .form__textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            input.style.borderColor = '#e2e8f0';
        }
    });
});

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add loading animation complete class
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Emergency/Urgent Form Handling
// ===================================
const urgentCheckbox = document.getElementById('urgent');

if (urgentCheckbox) {
    urgentCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Highlight the form or show urgent message
            const formWrapper = document.querySelector('.contact__form-wrapper');
            if (formWrapper) {
                formWrapper.style.borderLeft = '4px solid #ef4444';
            }
        } else {
            const formWrapper = document.querySelector('.contact__form-wrapper');
            if (formWrapper) {
                formWrapper.style.borderLeft = 'none';
            }
        }
    });
}

// ===================================
// Service Selection Auto-fill
// ===================================
const serviceSelect = document.getElementById('service');

if (serviceSelect) {
    // Check if there's a service parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        serviceSelect.value = serviceParam;
    }
}

// ===================================
// CTA Button Tracking
// ===================================
const ctaButtons = document.querySelectorAll('.btn--primary, .btn--secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonHref = button.getAttribute('href');
        
        // Track CTA clicks (integrate with analytics)
        console.log('CTA clicked:', {
            text: buttonText,
            href: buttonHref,
            page: window.location.pathname
        });
    });
});

// ===================================
// Testimonial Card Hover Effect
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial__card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// ===================================
// Print Current Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer__bottom p');

if (footerYear && footerYear.textContent.includes('2025')) {
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}
