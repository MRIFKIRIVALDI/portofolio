# Portfolio M. Rifki Rivaldi

Website statis menggunakan HTML, CSS, dan JavaScript. Tidak memerlukan
`npm install` atau proses build. Library dimuat melalui CDN.

## Struktur

```text
index.html             Isi halaman dan urutan pemuatan script
css/
  styles.css           Tampilan dan animasi CSS
js/
  main.js              Navigasi, teks pembuka, dan efek visual
  contact.js           Validasi form dan draf Gmail/WhatsApp
  gallery.js           Modal, carousel, dan tambahan sertifikat
  robot.js             Model dan animasi robot 3D
  export-ppt.js         Ekspor portofolio ke PowerPoint
images/                Foto, logo, proyek, dan sertifikat
portofolio.code-workspace  Pengaturan workspace VS Code
```

## Menjalankan

Buka folder dengan VS Code lalu gunakan **Live Server** pada `index.html`.
Alternatif jika Python tersedia:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Buka `http://127.0.0.1:8000`. Internet diperlukan untuk library CDN,
font, dan model robot yang masih berada di server eksternal.

## Menggunakan robot di website lain

1. Salin `js/robot.js` ke website tujuan.
2. Pasang blok ini sebelum `</body>` (sesuaikan lokasi `robot.js`):

```html
<div id="robot-container"
     style="width: min(450px, 80vw); height: min(450px, 80vw);"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
<script src="js/robot.js"></script>
```

Urutan script harus dipertahankan. Jangan menambahkan `async` karena loader
dan robot membutuhkan Three.js yang sudah dimuat. Gunakan hanya satu elemen
dengan ID `robot-container`. Tailwind dan AOS tidak diperlukan untuk robot.

Ubah `MODEL_URL` di `robot.js` untuk mengganti model, `ROTATION_SPEED` untuk
kecepatan putaran, atau `camera.position` untuk jarak pandang.

## Hasil pembersihan

- Paket npm beserta `node_modules`, `package.json`, dan `package-lock.json`
  tidak dipakai oleh halaman statis ini, sehingga dihapus.
- Folder `zain-portofolio` hanya memuat konfigurasi Tailwind/PostCSS yang
  tidak dijalankan oleh proyek ini, sehingga dihapus.
- `html2canvas`, CSS `.pwr-capture`, dan animasi `slide-left-full` dihapus
  karena tidak memiliki pemanggil.
- Font Awesome kit yang mengembalikan HTTP 403 dihapus; ikon footer memakai
  gambar logo lokal yang sudah digunakan pada bagian lain halaman.
- Kode `script.js` dipisahkan menurut fitur di folder `js/`; stylesheet
  dipindahkan ke `css/` dan semua referensi HTML diperbarui.
- Foto asli `images/IMG_20250525_170936_641.jpg` tetap disimpan sebagai aset
  sumber meskipun halaman saat ini menggunakan foto tanpa latar.

Fungsi modal dan ekspor tersedia di `window` karena masih dipanggil oleh
atribut `onclick` di HTML. Variabel internal setiap file dibatasi pada
scope masing-masing agar tidak berbenturan.
