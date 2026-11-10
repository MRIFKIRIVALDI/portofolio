(() => {
    'use strict';

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

    window.exportToPowerPoint = exportToPowerPoint;
})();
