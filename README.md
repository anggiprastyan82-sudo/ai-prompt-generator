# MAINku AI Office

Dashboard virtual office untuk bisnis top up game **MAINku.com**. Proyek ini menggunakan data dummy dan fokus pada UI responsif bergaya gaming/futuristic.

## Struktur proyek

```text
app/
  globals.css     # Tema visual, layout, dan responsivitas
  layout.tsx      # Layout utama dan metadata aplikasi
  page.tsx        # Dashboard, navigasi halaman, data dummy agent
package.json      # Dependensi dan perintah pengembangan
tailwind.config.ts # Konfigurasi Tailwind CSS
```

## Menjalankan secara lokal

1. Pastikan Node.js 18.17 atau lebih baru sudah terpasang.
2. Pasang dependensi: `npm install`
3. Mulai server pengembangan: `npm run dev`
4. Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deploy ke Vercel

1. Upload repository ini ke GitHub.
2. Buka [Vercel](https://vercel.com/new) dan pilih **Add New Project**.
3. Impor repository GitHub tersebut.
4. Vercel akan mendeteksi Next.js secara otomatis. Biarkan build command `npm run build`.
5. Klik **Deploy**.

Tidak ada database, integrasi AI, maupun Google Sheets pada versi awal ini. Seluruh status agent dan aktivitas merupakan data dummy di `app/page.tsx`.
