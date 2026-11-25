# Portfolio Web - Kelompok 2 (UI Lanjut)

Repository resmi pengembangan website portofolio interaktif tim **Kelompok 2** untuk mata kuliah **Pengembangan Antarmuka Web Lanjut (UI Lanjut)**.

---

## 👥 Tim Pengembang (Kelompok 2)

| No | Nama Anggota | Peran Utama | Tanggung Jawab Teknis |
|:---:|:---|:---|:---|
| 1 | **Satria Fadhil** | Team Lead & Fullstack Architect | Arsitektur SPA, Hero section, Form kontak, Pitch deck |
| 2 | **Nadia Putri** | UI/UX Designer & Frontend | Design system Figma, Halaman tim, Copywriting portofolio |
| 3 | **Ahmad Farhan** | Frontend Lead & State Engineer | Atomic UI library, Pinia store, Sticky breadcrumbs |
| 4 | **Bima Pratama** | Backend & DevOps Engineer | Skema database SQLite, API lifecycle, Deployment Vercel |
| 5 | **Siti Aisyah** | Data Architect & Frontend | MockAPI cloud dataset, Katalog proyek & modal showcase |
| 6 | **Rizky Ramadhan** | QA Lead & Usability Auditor | Automated testing (Vitest), Evaluasi 10 Heuristik Nielsen |

---

## 🎯 Manajemen Proyek & Sprint Board

Pengembangan proyek ini dikelola menggunakan **GitHub Projects (Kanban Board)** dengan metodologi **Agile 3 Sprints**:

🔗 **[Akses GitHub Project Board (Kanban & Sprints)](https://github.com/users/satriafazal/projects/2)**

### 🚀 Roadmap 3 Sprint

- **Sprint 1: Core Foundation & Data Architecture**
  - Inisialisasi arsitektur SPA Vue 3 + Vite.
  - Perancangan Design System Minimalist White di Figma.
  - Pembuatan komponen reusable (BaseButton, Card, Badge).
  - Skema database SQLite & Integrasi Cloud MockAPI (18 proyek & 6 profil anggota).
  - Setup Vitest automated test suite & test matrix.

- **Sprint 2: Core Features & State Reactivity**
  - Implementasi Hero Section video high-contrast mask.
  - Arsitektur Pinia store untuk multi-category filter dan real-time search.
  - Showcase halaman profil anggota tim dengan counter kontribusi proyek dinamis.
  - Showcase galeri 18 studi kasus proyek dengan modal detail interaktif.
  - Penanganan status jaringan: Skeleton loading, error banner, retry button.
  - Implementasi sticky breadcrumb bar dinamis berbasis riwayat alur klik.

- **Sprint 3: QA, Deployment & Pitch Deck**
  - Eksekusi 12 pengujian unit otomatis Vitest (100% pass rate).
  - Evaluasi 10 Usability Heuristics Nielsen & simulasi recovery HTTP 500.
  - Pembuatan form kontak dengan validasi inline realtime.
  - Refinement copywriting profesional bebas kesan klise AI.
  - Setup continuous deployment di Vercel dengan SPA rewrites.
  - Penyusunan dokumen struktur 8 slide pitch deck presentasi tim.

---

## 🛠️ Tech Stack Utama

- **Framework:** Vue 3 (Composition API & `<script setup>`)
- **State Management:** Pinia
- **Styling & Design System:** Tailwind CSS
- **Testing:** Vitest + Vue Test Utils + JSDOM
- **Mock Data & REST API:** MockAPI.io Cloud Server + Axios Client
- **Deployment Platform:** Vercel

---

## 📦 Panduan Menjalankan Proyek

```bash
# Clone repository
git clone git@github.com:satriafazal/PORTOFOLIO_WEB2.git

# Checkout cabang pengembangan
git checkout backup-final-code

# Install dependencies
npm install

# Jalankan local development server
npm run dev

# Jalankan pengujian unit otomatis
npm run test
```
