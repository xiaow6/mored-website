// ===========================
// Header scroll effect
// ===========================
const header = document.getElementById('header');

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateHeader, { passive: true });

// ===========================
// Active nav link on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ===========================
// Mobile navigation
// ===========================
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Mobile solutions dropdown toggle
const mobileSolutionsToggle = document.getElementById('mobile-solutions-toggle');
const mobileSubmenu = document.getElementById('mobile-submenu');

if (mobileSolutionsToggle && mobileSubmenu) {
    mobileSolutionsToggle.addEventListener('click', () => {
        mobileSolutionsToggle.classList.toggle('active');
        mobileSubmenu.classList.toggle('active');
    });

    // Close mobile nav when clicking submenu links
    mobileSubmenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===========================
// Scroll fade-in animations
// ===========================
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations within the same parent
            const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
            let delay = 0;
            siblings.forEach((sibling, i) => {
                if (sibling === entry.target) {
                    delay = i * 100;
                }
            });

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===========================
// Smooth scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// Contact form (front-end only)
// ===========================
const contactForm = document.getElementById('contact-form');

if (contactForm) contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('#name').value;
    const email = this.querySelector('#email').value;
    const subject = this.querySelector('#subject').value || 'Website Inquiry';
    const message = this.querySelector('#message').value;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:x@mored.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Opening Email...';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        this.reset();
    }, 3000);
});

// ===========================
// Gallery filter (News page)
// ===========================
const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = '';
                } else {
                    const categories = item.getAttribute('data-category') || '';
                    if (categories.includes(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}