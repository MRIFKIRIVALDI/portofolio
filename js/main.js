(() => {
    'use strict';

    // Navigasi, teks pembuka, dan efek visual halaman.

    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(this.hash.slice(1));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated profession text
    const professions = ["Graphic Designer", "Web Developer", "Network Engineer", "IoT Engineer"];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function animateProfession() {
        const professionElement = document.getElementById('profession');
        if (!professionElement) return;
        const currentProfession = professions[professionIndex];

        if (!isDeleting) {
            professionElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentProfession.length) {
                isDeleting = true;
                setTimeout(animateProfession, 2000); // Pause before deleting
            } else {
                setTimeout(animateProfession, 100);
            }
        } else {
            professionElement.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                setTimeout(animateProfession, 500); // Pause before typing next
            } else {
                setTimeout(animateProfession, 50);
            }
        }
    }

    // Animated welcome text
    const welcomeText = "WELCOME TO MY PORTFOLIO";
    let welcomeCharIndex = 0;

    function animateWelcome() {
        const welcomeElement = document.getElementById('welcome-title');
        if (!welcomeElement) return;
        if (welcomeCharIndex < welcomeText.length) {
            welcomeElement.textContent = welcomeText.substring(0, welcomeCharIndex + 1);
            welcomeCharIndex++;
            setTimeout(animateWelcome, 100);
        } else {
            // Start profession animation after welcome text is typed
            setTimeout(animateProfession, 500);
        }
    }

    // Start animations after page load
    window.addEventListener('load', () => {
        setTimeout(animateWelcome, 1000);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(3, 5, 24, 0.95)';
        } else {
            nav.style.background = 'rgba(3, 5, 24, 0.9)';
        }
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Add floating animation to skill icons
    document.querySelectorAll('.skill-icon').forEach((icon, index) => {
        icon.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
    });

    // Add particle effect to hero section (dibatasi jumlahnya agar tidak membebani performa)
    const MAX_PARTICLES = 15;

    function createParticle() {
        const existing = document.querySelectorAll('.particle-effect');
        if (existing.length >= MAX_PARTICLES) return;

        const particle = document.createElement('div');
        particle.className = 'particle-effect fixed w-2 h-2 bg-cyan-400 rounded-full opacity-60 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animation = `float-up ${Math.random() * 5 + 5}s linear infinite`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Create particles periodically (lebih hemat: 3 detik)
    setInterval(createParticle, 3000);

    // Add interactive hover effects for project cards
    document.querySelectorAll('[data-aos="flip-left"]').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotateY(0deg)';
            card.style.boxShadow = 'none';
        });
    });

    // Add click effect for buttons
    document.querySelectorAll('button, a.bg-cyan-500, a.border-cyan-400').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
})();
