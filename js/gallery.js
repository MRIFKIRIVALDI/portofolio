(() => {
    'use strict';

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
            if (!slides.length) return;
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
    document.getElementById('show-all-btn')?.addEventListener('click', () => {
        const grid = document.getElementById('certificate-grid');
        if (!grid) return;
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

    // Dipakai oleh atribut onclick pada kartu dan tombol modal.
    Object.assign(window, { openModal, closeModal, openProjectModal, closeProjectModal });
})();
