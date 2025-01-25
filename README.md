# EDUMAP+: Sistem Penilaian Kelayakan Sekolah Berbasis AI dengan Data Spasial

<div align="center">
  <img src="public/logo.png" alt="EDUMAP+ Logo" width="200"/>
  <p><strong>Solusi Cerdas untuk Pemetaan dan Evaluasi Kelayakan Sekolah</strong></p>
  
  [![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
</div>

## 📚 Deskripsi

EDUMAP+ adalah sistem inovatif yang menggabungkan kecerdasan buatan (AI) dengan data spasial untuk menilai dan memantau kelayakan sekolah secara komprehensif. Sistem ini dirancang untuk membantu pemangku kepentingan pendidikan dalam:

- 🎯 Mengidentifikasi sekolah yang membutuhkan perbaikan atau renovasi
- 📊 Menganalisis distribusi kualitas pendidikan secara spasial
- 🤖 Memberikan rekomendasi berbasis AI untuk pengembangan fasilitas sekolah
- 📈 Memantau progress perbaikan infrastruktur pendidikan

## ✨ Fitur Utama

### 1. EduView 🗺️
- Visualisasi interaktif data sekolah dalam bentuk peta
- Filter multi-kriteria untuk analisis spasial
- Informasi detail sekolah dengan indikator kelayakan
- Laporan kondisi real-time dan historis

### 2. EduSmart 🤖
- Analisis prediktif berbasis AI untuk kelayakan sekolah
- Sistem scoring otomatis berdasarkan multiple kriteria
- Rekomendasi prioritas perbaikan
- Prediksi kebutuhan maintenance

### 3. EduTrack 📊
- Monitoring progress perbaikan sekolah
- Dashboard analitik untuk pengambilan keputusan
- Sistem pelaporan otomatis
- Tracking anggaran dan implementasi

## 🛠️ Teknologi

### Frontend
- React.js dengan TypeScript
- Tailwind CSS untuk styling
- Radix UI untuk komponen aksesibel
- Pigeon Maps untuk visualisasi peta

### Backend
- Node.js dengan Express
- PostgreSQL dengan PostGIS
- TensorFlow untuk model AI
- Redis untuk caching

### Tools & Infrastructure
- Docker untuk kontainerisasi
- GitHub Actions untuk CI/CD
- Jest untuk testing
- ESLint & Prettier untuk code quality

## 🚀 Cara Penggunaan

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git

### Instalasi

1. Clone repository
\`\`\`bash
git clone https://github.com/yourusername/edumap-plus.git
cd edumap-plus
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# atau
yarn install
\`\`\`

3. Setup environment variables
\`\`\`bash
cp .env.example .env
# Edit .env sesuai konfigurasi lokal
\`\`\`

4. Jalankan aplikasi
\`\`\`bash
npm run dev
# atau
yarn dev
\`\`\`

Aplikasi akan berjalan di http://localhost:3000

## 💡 Contoh Penggunaan

### EduView

1. Buka halaman utama
2. Gunakan filter di sidebar untuk menyaring sekolah:
   - Berdasarkan jenjang pendidikan
   - Berdasarkan kondisi bangunan
   - Berdasarkan skor kelayakan
3. Klik marker sekolah untuk melihat detail informasi
4. Gunakan kontrol peta untuk navigasi dan zoom

### EduSmart

1. Pilih sekolah yang ingin dianalisis
2. Sistem akan menampilkan:
   - Skor kelayakan otomatis
   - Rekomendasi perbaikan
   - Prediksi kebutuhan maintenance
3. Export hasil analisis dalam format PDF atau Excel

## 📊 Dashboard Analytics

EDUMAP+ menyediakan dashboard analytics yang komprehensif untuk:
- Monitoring kondisi sekolah real-time
- Analisis tren dan pola
- Pelaporan otomatis
- Visualisasi data statistik

## 🤝 Kontribusi

Kami sangat menghargai kontribusi dari komunitas. Untuk berkontribusi:

1. Fork repository
2. Buat branch baru (\`git checkout -b feature/AmazingFeature\`)
3. Commit perubahan (\`git commit -m 'Add some AmazingFeature'\`)
4. Push ke branch (\`git push origin feature/AmazingFeature\`)
5. Buat Pull Request

## 📝 Lisensi

Distributed under the MIT License. See \`LICENSE\` for more information.

## 📧 Kontak

Project Link: [https://github.com/yourusername/edumap-plus](https://github.com/yourusername/edumap-plus)

## 🙏 Acknowledgments

- OpenStreetMap untuk data peta
- Kementerian Pendidikan untuk data sekolah
- Semua kontributor yang telah membantu pengembangan EDUMAP+

## 🚀 Deployment

Aplikasi ini di-deploy menggunakan Netlify. Anda dapat mengakses versi live di: [EDUMAP+ Live Demo](https://edumapplus.netlify.app)

### Deploy Your Own

Untuk mendeploy aplikasi ini ke Netlify:

1. Fork repository ini
2. Sign up/Login ke [Netlify](https://www.netlify.com/)
3. Install Netlify CLI:
\`\`\`bash
npm install -g netlify-cli
\`\`\`

4. Login ke Netlify via CLI:
\`\`\`bash
netlify login
\`\`\`

5. Inisialisasi dan deploy:
\`\`\`bash
netlify init
npm run build
netlify deploy --prod
\`\`\`

---

<div align="center">
  <p>Made with ❤️ for better education</p>
</div> 