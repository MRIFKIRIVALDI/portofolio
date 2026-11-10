(() => {
    'use strict';

    // Form kontak: membuka draf Gmail atau WhatsApp.
    const CONTACT_EMAIL = 'rifki200804@gmail.com';
    const CONTACT_WA_NUMBER = '6281296876716'; // format internasional tanpa '+' atau '0'

    // Ambil isi form
    function getContactData() {
        const form = document.getElementById('contact-form');
        if (!form) return null;
        const name = form.querySelector('#contact-name').value.trim();
        const email = form.querySelector('#contact-email').value.trim();
        const message = form.querySelector('#contact-message').value.trim();
        return { form, name, email, message };
    }

    // Validasi form sebelum dikirim
    function validateContact() {
        const data = getContactData();
        if (!data) return null;

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
    document.getElementById('send-email-btn')?.addEventListener('click', () => {
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
    document.getElementById('send-wa-btn')?.addEventListener('click', () => {
        const data = validateContact();
        if (!data) return;

        const text = encodeURIComponent(`Halo, saya ${data.name} (${data.email}).\n\n${data.message}`);
        const waLink = `https://wa.me/${CONTACT_WA_NUMBER}?text=${text}`;

        window.open(waLink, '_blank', 'noopener');
        data.form.reset();
    });
})();
