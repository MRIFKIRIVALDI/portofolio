// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Smooth scrolling for navigation links
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

// Animated profession text
const professions = ["Graphic Designer", "Web Developer", "Network Engineer", "IoT Engineer"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function animateProfession() {
    const professionElement = document.getElementById('profession');
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
const welcomeText = "WELCOME TO MY PORTOFOLIO";
let welcomeCharIndex = 0;

function animateWelcome() {
    const welcomeElement = document.querySelector('#home h1:first-of-type');
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

// Form submission with EmailJS
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Initialize EmailJS with your public key
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    const formData = {
        from_name: e.target.querySelector('input[type="text"]').value,
        from_email: e.target.querySelector('input[type="email"]').value,
        message: e.target.querySelector('textarea').value,
        to_email: 'rifki200804@gmail.com' // Your email address
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Replace with your service and template IDs
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        }, (error) => {
            console.log('FAILED...', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(3, 5, 24, 0.95)';
    } else {
        nav.style.background = 'rgba(3, 5, 24, 0.9)';
    }
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Add floating animation to skill icons
document.querySelectorAll('.bg-\\[\\#05072B\\] > div:first-child').forEach((icon, index) => {
    icon.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slide-up {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce-in {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }

    @keyframes slide-left-full {
        0% { transform: translateX(0%); }
        100% { transform: translateX(100%); }
    }

    @keyframes slide-right-full {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
    }

    .animate-fade-in {
        animation: fade-in 1s ease-out;
    }

    .animate-slide-up {
        animation: slide-up 1s ease-out;
    }

    .animate-bounce-in {
        animation: bounce-in 1s ease-out;
    }

    .slide-left-full {
        animation: slide-left-full 10s linear infinite;
    }

    .slide-right-full {
        animation: slide-right-full 10s linear infinite;
    }
`;
document.head.appendChild(style);

// Add particle effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'fixed w-2 h-2 bg-cyan-400 rounded-full opacity-60 pointer-events-none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = `float-up ${Math.random() * 5 + 5}s linear infinite`;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// Add float-up animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-up {
        to { transform: translateY(-100vh); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);

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
document.querySelectorAll('button, a[href="#"]').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Three.js 3D Robot Model
let scene, camera, renderer, robotModel, mixer;

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(450, 450); // Updated to match container size
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Append renderer to container
    const container = document.getElementById('robot-container');
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // GLTF Loader
    const gltfLoader = new THREE.GLTFLoader();

    gltfLoader.load(
        'https://play.rosebud.ai/assets/Animated Robot2.glb?XU65',
        function(gltf) {
            robotModel = gltf.scene;
            robotModel.scale.set(1.0, 1.0, 1.0);
            robotModel.position.set(0, -0.5, 0);

            robotModel.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(robotModel);

            // Animation mixer if animations exist
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(robotModel);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error('An error happened', error);
        }
    );

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (mixer) {
            mixer.update(0.016); // Assuming 60fps
        }

        // Rotate the model slowly
        if (robotModel) {
            robotModel.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize Three.js when page loads
window.addEventListener('load', initThreeJS);

// Modal functionality for certificates
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');

    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('certificate-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Modal functionality for projects
function openProjectModal(imageSrc, title) {
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('project-modal-image');
    const modalTitle = document.getElementById('project-modal-title');

    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close project modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Carousel functionality for project images
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-rotate every 3 seconds
        setInterval(nextSlide, 3000);

        // Show first slide initially
        showSlide(0);
    });
}

// Initialize carousels when page loads
window.addEventListener('load', initCarousels);

// Show all certificates
document.getElementById('show-all-btn').addEventListener('click', () => {
    const grid = document.getElementById('certificate-grid');
    const additionalCertificates = [
        { img: 'images/sertifikat/5.jpg', title: 'ICITACS', desc: 'International Conference On Information Technology And Advanced Computer Sciance' },
        { img: 'images/sertifikat/4.jpg', title: 'Sentimeter', desc: 'AI-Powered Cyber Defense : Revolutionizing Security In The Age Of Artificial Intellegence' },
        { img: 'images/sertifikat/8.jpg', title: 'Sismatik', desc: 'AI In Information Systems: Enhancing Efficence And Innovation' }
    ];

    additionalCertificates.forEach((cert, index) => {
        const certDiv = document.createElement('div');
        certDiv.className = 'bg-[#05072B] p-6 rounded-2xl border border-blue-700/20 hover:scale-110 transition-all hover:shadow-lg hover:shadow-cyan-400/20 animate-slide-in-left';
        certDiv.setAttribute('data-aos', 'zoom-in');
        certDiv.setAttribute('data-aos-delay', (600 + index * 100).toString());
        certDiv.innerHTML = `
            <img src="${cert.img}" alt="${cert.title}" class="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform cursor-pointer" onclick="openModal('${cert.img}', '${cert.title}', '${cert.desc}')">
            <h3 class="text-xl font-bold mb-2">${cert.title}</h3>
            <p class="text-gray-400 text-sm">${cert.desc}</p>
        `;
        grid.appendChild(certDiv);
    });

    // Hide the button after showing all
    document.getElementById('show-all-btn').style.display = 'none';
});
