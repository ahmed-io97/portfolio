// =====================
// NAVIGATION & SMOOTH SCROLL
// =====================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksArray = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
navLinksArray.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================

const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =====================
// SCROLL ANIMATIONS (IntersectionObserver)
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and project cards
sections.forEach(section => observer.observe(section));
document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

// =====================
// COPY TO CLIPBOARD
// =====================

const copyBtn = document.getElementById('copyBtn');
const emailText = document.getElementById('emailText');

if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        const email = copyBtn.getAttribute('data-email');

        try {
            await navigator.clipboard.writeText(email);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';

            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
}

// =====================
// CUSTOM CURSOR DOT
// =====================

const cursorDot = document.getElementById('cursorDot');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = (mouseX - 4) + 'px';
    cursorDot.style.top = (mouseY - 4) + 'px';
    cursorDot.style.opacity = '0.7';
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '0.7';
});

// Show cursor on hover over interactive elements
document.addEventListener('mouseenter', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        cursorDot.style.opacity = '0.4';
    }
}, true);

// =====================
// INITIALIZE ON LOAD
// =====================

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
});
