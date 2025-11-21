// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all FAQ items
            faqItems.forEach(faqItem => faqItem.classList.remove('active'));
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Newsletter Modal
const newsletterModal = document.getElementById('newsletterModal');
const closeNewsletter = document.getElementById('closeNewsletter');
const newsletterForm = document.getElementById('newsletterForm');

// Show newsletter modal after 3 seconds
setTimeout(() => {
    if (newsletterModal && !localStorage.getItem('newsletterDismissed')) {
        newsletterModal.classList.add('active');
    }
}, 3000);

// Close newsletter modal
if (closeNewsletter) {
    closeNewsletter.addEventListener('click', () => {
        if (newsletterModal) {
            newsletterModal.classList.remove('active');
            localStorage.setItem('newsletterDismissed', 'true');
        }
    });
}

// Newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send the email to your backend
        alert('Thank you for subscribing!');
        if (newsletterModal) {
            newsletterModal.classList.remove('active');
            localStorage.setItem('newsletterDismissed', 'true');
        }
        newsletterForm.reset();
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Service Filter Tabs
const filterTabs = document.querySelectorAll('.filter-tab');
const serviceCards = document.querySelectorAll('.service-card');

if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter') || 'all';

            // Filter service cards
            serviceCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Blog Search
const searchInput = document.querySelector('.search-bar input');
const blogCards = document.querySelectorAll('.blog-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        blogCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const content = card.querySelector('p')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Form Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--accent-color)';
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        if (isValid) {
            // Here you would typically send the form data to your backend
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation on Scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.highlight-card, .feature-card, .testimonial-card, .pricing-card, .service-card, .blog-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Video Placeholder Click
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // Here you would typically open a video modal or embed
        alert('Video player would open here. Replace this with your actual video implementation.');
    });
}

// Cookie Notice
const cookieNotice = document.getElementById('cookieNotice');
const acceptCookies = document.getElementById('acceptCookies');

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        if (cookieNotice) {
            cookieNotice.style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        }
    });
}

// Check if cookies were already accepted
if (localStorage.getItem('cookiesAccepted') === 'true' && cookieNotice) {
    cookieNotice.style.display = 'none';
}






