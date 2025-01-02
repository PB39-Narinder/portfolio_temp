// Main functionality and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loader first
    initLoader();
    
    // Initialize other components after a delay
    setTimeout(() => {
        initCursor();
        initScrollAnimations();
        initTypingEffects();
        projectFilters.init();
        updateSystemStats();
        initNavigation();
    }, 3000); // Wait for loader to complete
});

// Cursor trail effect
function initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let cursorTimeout;
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';

        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            cursor.style.opacity = '0';
        }, 1000);
    });
}

// Scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add specific animations based on section
                if (entry.target.classList.contains('cyber-projects')) {
                    animateProjectCards();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Typing effect for terminal-like texts
function initTypingEffects() {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 50);
            }
        }
        
        typeChar();
    });
}

// Update system stats in footer
function updateSystemStats() {
    const uptimeElement = document.querySelector('.stat-value:not(.online)');
    let uptime = 0;
    
    setInterval(() => {
        uptime++;
        uptimeElement.textContent = `${uptime} DAYS`;
    }, 86400000); // Update every 24 hours
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this at the beginning of main.js
function initLoader() {
    const loader = document.querySelector('.cyber-loader');
    const progressFill = loader.querySelector('.progress-fill');
    const percentage = loader.querySelector('.percentage');
    const details = loader.querySelectorAll('.detail-item');
    const statusText = loader.querySelector('.status-text');
    const matrixText = loader.querySelector('.matrix-text');
    let progress = 0;

    // Matrix rain effect
    function createMatrixRain() {
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        let text = '';
        for (let i = 0; i < 100; i++) {
            text += chars[Math.floor(Math.random() * chars.length)];
        }
        matrixText.textContent = text;
    }

    // Update matrix every 100ms
    const matrixInterval = setInterval(createMatrixRain, 100);

    // Loading simulation
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        percentage.textContent = `${Math.floor(progress)}%`;
        
        // Show details progressively
        const detailIndex = Math.floor((progress / 100) * details.length);
        details.forEach((detail, index) => {
            if (index <= detailIndex) {
                detail.style.opacity = '1';
                detail.style.transform = 'translateX(0)';
            }
        });

        // Update status text
        if (progress < 30) {
            statusText.textContent = 'LOADING_SYSTEM';
        } else if (progress < 60) {
            statusText.textContent = 'INITIALIZING_MODULES';
        } else if (progress < 90) {
            statusText.textContent = 'CONNECTING_TO_PUNJAB_SERVERS';
        } else {
            statusText.textContent = 'SYSTEM_READY';
        }

        if (progress === 100) {
            clearInterval(interval);
            clearInterval(matrixInterval);
            setTimeout(() => {
                document.body.classList.add('loading-complete');
            }, 500);
        }
    }, 200);

    // Add Punjab-specific loading message
    const punjabDetail = loader.querySelector('.punjab-detail');
    if (punjabDetail) {
        setTimeout(() => {
            punjabDetail.style.transform = 'scale(1.05)';
            setTimeout(() => {
                punjabDetail.style.transform = 'scale(1)';
            }, 200);
        }, 1500);
    }

    // Update status messages to include Punjab reference
    const statusMessages = [
        'LOADING_SYSTEM',
        'INITIALIZING_MODULES',
        'CONNECTING_TO_PUNJAB_SERVERS',
        'SYSTEM_READY'
    ];
}

// Add this to your main.js
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add active state to current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add this function for project card animations
function animateProjectCards() {
    const cards = document.querySelectorAll('.cyber-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200); // Stagger the animations
    });
} 