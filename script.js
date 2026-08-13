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
const welcomeText = "WELCOME TO MY PORTFOLIO";
let welcomeCharIndex = 0;

function animateWelcome() {
    const welcomeElement = document.getElementById('welcome-title');
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

// ===== Kontak: Kirim via Email (mailto) & WhatsApp (wa.me) =====
const CONTACT_EMAIL = 'rifki200804@gmail.com';
const CONTACT_WA_NUMBER = '6281296876716'; // format internasional tanpa '+' atau '0'

// Ambil isi form
function getContactData() {
    const form = document.getElementById('contact-form');
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();
    return { form, name, email, message };
}

// Validasi form sebelum dikirim
function validateContact() {
    const data = getContactData();

    if (!data.name || !data.message) {
        alert('Mohon isi Name dan Message terlebih dahulu.');
        return null;
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        alert('Mohon isi Email dengan format yang benar. Contoh: nama@email.com');
        return null;
    }

    return data;
}

// Kirim via Email → membuka Gmail (kompos baru) dengan isi pesan yang sudah terisi
document.getElementById('send-email-btn').addEventListener('click', () => {
    const data = validateContact();
    if (!data) return;

    const subject = encodeURIComponent(`Pesan dari ${data.name} (${data.email})`);
    const body = encodeURIComponent(`${data.message}\n\nDikirim dari halaman portfolio M. Rifki Rivaldi.`);
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;

    // Buka Gmail langsung di tab baru
    window.open(gmailComposeUrl, '_blank', 'noopener');
    data.form.reset();
});

// Kirim via WhatsApp → membuka aplikasi/WhatsApp Web dengan pesan yang sudah terisi
document.getElementById('send-wa-btn').addEventListener('click', () => {
    const data = validateContact();
    if (!data) return;

    const text = encodeURIComponent(`Halo, saya ${data.name} (${data.email}).\n\n${data.message}`);
    const waLink = `https://wa.me/${CONTACT_WA_NUMBER}?text=${text}`;

    window.open(waLink, '_blank', 'noopener');
    data.form.reset();
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
    mobileMenu.classList.toggle('flex');
});

// Add floating animation to skill icons
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    icon.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
});

// Catatan: Animasi kustom (float, fade-in, slide-up, bounce-in, marquee, dll.)
// didefinisikan di styles.css agar konsisten satu sumber.

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

        // Resize handler agar renderer 3D responsif terhadap ukuran container
    function resizeRenderer() {
        const width = container.clientWidth || 450;
        const height = container.clientHeight || 450;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    // Animation loop (menggunakan THREE.Clock agar konsisten di semua device)
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);

        const delta = Math.min(clock.getDelta(), 0.1); // batasi agar tidak melompat

        if (mixer) {
            mixer.update(delta);
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

// Tutup modal (sertifikat & project) saat klik di luar area modal
document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('certificate-modal')) {
        closeModal();
    }
    if (e.target === document.getElementById('project-modal')) {
        closeProjectModal();
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

        // Auto-rotate setiap 3 detik, hanya berjalan saat carousel terlihat di layar
                let intervalId = null;

                function startAutoRotate() {
                    if (intervalId) return;
                    intervalId = setInterval(nextSlide, 3000);
                }

                function stopAutoRotate() {
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                }

                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                startAutoRotate();
                            } else {
                                stopAutoRotate();
                            }
                        });
                    }, { threshold: 0.3 });
                    observer.observe(carousel);
                } else {
                    startAutoRotate();
                }

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
        { img: 'images/sertifikat/5.jpg', title: 'ICITACS', desc: 'International Conference on Information Technology and Advanced Computer Science' },
        { img: 'images/sertifikat/8.jpg', title: 'Sentimeter', desc: 'AI-Powered Cyber Defense: Revolutionizing Security in the Age of Artificial Intelligence' },
        { img: 'images/sertifikat/3.jpg', title: 'Sismatik', desc: 'AI in Information Systems: Enhancing Efficiency and Innovation' }
    ];

    additionalCertificates.forEach((cert) => {
        const certDiv = document.createElement('div');
        certDiv.className = 'bg-[#05072B] p-6 rounded-2xl border border-blue-700/20 hover:scale-110 transition-all hover:shadow-lg hover:shadow-cyan-400/20 animate-slide-in-up';
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

// ===== Ekspor Portfolio ke PowerPoint (semua page kecuali Contact) =====
function exportToPowerPoint() {
    // Pastikan library sudah dimuat
    if (typeof PptxGenJS === 'undefined') {
        alert('Library pembuat PowerPoint belum dimuat. Periksa koneksi internet, lalu muat ulang halaman.');
        return;
    }

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
    pptx.layout = 'WIDE';
    pptx.author = 'M. Rifki Rivaldi';
    pptx.title = 'Portfolio M. Rifki Rivaldi';

    const bgDark = '05072B';
    const bgCard = '030518';
    const cyan = '00FFFF';
    const cyanLight = '67E8F9';
    const white = 'FFFFFF';
    const gray = '9CA3AF';
    const accent = '7C3AED'; // ungu (selaras tombol Export)

    // Helper: slide dengan judul + subjudul
    function addTitle(slide, title, sub) {
        slide.addText(title, { x: 0.6, y: 0.4, w: 12.1, h: 1.0, fontSize: 34, bold: true, color: cyan, align: 'left' });
        if (sub) {
            slide.addText(sub, { x: 0.6, y: 1.35, w: 12.1, h: 0.6, fontSize: 15, color: gray, align: 'left' });
        }
        // garis aksen
        slide.addShape('rect', { x: 0.65, y: 1.95, w: 2.4, h: 0.06, fill: { color: accent } });
    }

    // ===== SLIDE 1: HOME =====
    let slide = pptx.addSlide();
    slide.background = { color: bgDark };
    slide.addText('Portfolio', { x: 0.5, y: 1.3, w: 12.33, h: 0.6, fontSize: 16, color: gray, align: 'center' });
    slide.addText('M. RIFKI RIVALDI', { x: 0.5, y: 2.4, w: 12.33, h: 1.2, fontSize: 50, bold: true, color: cyan, align: 'center' });
    slide.addText('Graphic Designer  •  Web Developer  •  Network Engineer  •  IoT Engineer', {
        x: 0.5, y: 3.7, w: 12.33, h: 0.8, fontSize: 20, color: white, align: 'center'
    });
    slide.addText('"Whoever strives shall succeed."', {
        x: 0.5, y: 4.7, w: 12.33, h: 0.6, fontSize: 16, italic: true, color: gray, align: 'center'
    });

    // ===== SLIDE 2: ABOUT =====
    slide = pptx.addSlide();
    slide.background = { color: bgDark };
    addTitle(slide, 'About Me', 'Teknik Informatika — Universitas Nusa Putra');
    slide.addText(
        'Profesional di bidang Teknologi Informasi, Web Development, administrasi e-commerce, dan pengelolaan data. ' +
        'Berpengalaman dalam pengembangan berbagai website, pengelolaan serta monitoring data operasional, dan pemanfaatan teknologi digital untuk mendukung proses bisnis. ' +
        'Memiliki kemampuan dalam HTML, CSS, JavaScript, pengelolaan database, Google Spreadsheet, serta berbagai tools dan platform digital. ' +
        'Terbiasa melakukan analisis data, troubleshooting, dokumentasi, dan pengembangan solusi berbasis teknologi dengan ketelitian tinggi. ' +
        'Mampu bekerja secara mandiri maupun dalam tim serta memiliki kemampuan adaptasi dan problem solving yang baik.',
        { x: 0.6, y: 2.4, w: 11.4, h: 3.6, fontSize: 17, color: white, lineSpacingMultiple: 1.35, valign: 'top' }
    );

    // ===== SLIDE 3: SKILLS =====
    slide = pptx.addSlide();
    slide.background = { color: bgDark };
    addTitle(slide, 'Skills');
    const skills = [
        ['🎨 Graphic Design', 'CorelDraw, Photoshop, Figma'],
        ['🌐 Network Engineering', 'Cisco, Routing, Security'],
        ['💻 Web Development', 'HTML, CSS, JavaScript, React'],
        ['🤖 IoT Engineer', 'Arduino, ESP 32, Sensors'],
        ['🎯 UI/UX Design', 'Figma, Adobe XD, Sketch'],
        ['📱 Mobile Apps', 'Flutter, React Native']
    ];
    let sy = 1.7;
    skills.forEach((s) => {
        slide.addShape('rect', { x: 0.6, y: sy, w: 12.1, h: 0.78, fill: { color: bgCard }, line: { color: '1E3A8A' } });
        slide.addText(s[0], { x: 0.95, y: sy + 0.05, w: 5.2, h: 0.68, fontSize: 18, bold: true, color: cyanLight, valign: 'middle' });
        slide.addText(s[1], { x: 6.3, y: sy + 0.05, w: 6.1, h: 0.68, fontSize: 16, color: gray, valign: 'middle' });
        sy += 1.0;
    });

    // ===== SLIDE 4: PROJECTS =====
    const projects = [
        ['Feed IG KKN Desa Cikadu', 'kknfeed1.jpg', 'Feed Instagram selama satu bulan untuk KKN Desa Cikadu (CorelDraw & Canva).'],
        ['Go Pesantren', 'goss.png', 'Website rekomendasi pesantren terbaik di Indonesia (HTML, CSS, Python, API Gemini).'],
        ['Portfolio Website', 'portoss.png', 'Website portofolio pribadi dengan animasi 3D interaktif (HTML, CSS, JavaScript, Three.js).'],
        ['Harris Electronic', 'harriselectronic.png', 'Website company profile Harris Electronic.'],
        ['Sistem Parkir Otomatis', 'parkir.png', 'Sistem Parkir Otomatis berbasis IoT dengan integrasi Sensor Ultrasonik & RFID.'],
        ['AppSheet Packing Record', 'packingrecord1.jpeg', 'Aplikasi packing record berbasis AppSheet untuk pencatatan data packing digital.']
    ];
    projects.forEach((p, idx) => {
        slide = pptx.addSlide();
        slide.background = { color: bgDark };
        try {
            slide.addImage({ path: 'images/project/' + p[1], x: 0.6, y: 1.6, w: 5.8, h: 4.2 });
        } catch (e) { /* abaikan gambar jika gagal dimuat */ }
        slide.addText('Proyek ' + (idx + 1), { x: 6.8, y: 1.6, w: 5.9, h: 0.6, fontSize: 15, color: gray });
        slide.addText(p[0], { x: 6.8, y: 2.1, w: 5.9, h: 1.1, fontSize: 30, bold: true, color: cyan, valign: 'top' });
        slide.addText(p[2], { x: 6.8, y: 3.4, w: 5.9, h: 2.0, fontSize: 16, color: white, valign: 'top' });
    });

    // ===== SLIDE 5: CERTIFICATES =====
    slide = pptx.addSlide();
    slide.background = { color: bgDark };
    addTitle(slide, 'Certificates');
    const certs = [
        'Python — Information Technology Specialist',
        'VSGA — Perekayasa Perangkat Internet of Things (DTS 2025)',
        'Oracle Academy — Database Foundations',
        'AWS Academy — Cloud Foundations',
        'Workshop Teknik Informatika — Keamanan Jaringan & Proteksi Terhadap Serangan Cyber',
        'Workshop Teknik Elektro — AIoT & Integrasi Neural Network pada Mikrokontroler'
    ];
    let cy = 1.7;
    certs.forEach((c) => {
        slide.addShape('rect', { x: 0.6, y: cy, w: 12.1, h: 0.78, fill: { color: bgCard }, line: { color: '1E3A8A' } });
        slide.addText('•  ' + c, { x: 0.95, y: cy + 0.05, w: 11.4, h: 0.68, fontSize: 16, color: white, valign: 'middle' });
        cy += 1.0;
    });

    // Simpan file PowerPoint
    pptx.writeFile({ fileName: 'Portfolio_M_Rifki_Rivaldi.pptx' });
}
