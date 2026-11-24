# KELOMPOK 2 — Team Portfolio Website
> **Tugas Besar Mata Kuliah UI Lanjut**  
> Website portofolio tim modern berbasis **Vue.js 3** yang memadukan arsitektur komponen modular, *state management* dengan Pinia, integrasi layanan REST API ganda (Live MockAPI + Local SQLite Server), evaluasi 10 Heuristik Desain, dan pengujian unit otomatis (*unit testing*).

---

## 📋 Daftar Isi
1. [Bukti Minimum & Kriteria Penilaian](#-1-bukti-minimum--kriteria-penilaian)
2. [Identitas Tim & Distribusi 18 Proyek (6 Anggota x 3 Proyek)](#-2-identitas-tim--distribusi-18-proyek)
3. [Arsitektur Komponen (Component Architecture)](#-3-arsitektur-komponen-component-architecture)
4. [User Flow & State Management](#-4-user-flow--state-management)
5. [Integrasi API: Live MockAPI & SQLite Server](#-5-integrasi-api-live-mockapi--sqlite-server)
6. [Design System & 10 Heuristik Desain](#-6-design-system--10-heuristik-desain)
7. [Unit Testing & Hasil Pengujian Otomatis](#-7-unit-testing--hasil-pengujian-otomatis)
8. [Panduan Menjalankan Proyek](#-8-panduan-menjalankan-proyek)
9. [Struktur Pitch Deck Presentasi (8 Slide Lengkap)](#-9-struktur-pitch-deck-presentasi-8-slide)
10. [Dokumentasi Manajemen Tugas (Jira / Trello / GitHub Projects)](#-10-dokumentasi-manajemen-tugas)

---

## 🎯 1. Bukti Minimum & Kriteria Penilaian

Berdasarkan rubrik penilaian mata kuliah UI Lanjut:

| Komponen Penilaian | Bobot | Bukti yang Disediakan dalam Proyek |
|---|:---:|---|
| **Implementasi UI dan Integrasi** | **50%** | • Vue 3 Composition API (`<script setup>`)<br>• 100% data live dari MockAPI & SQLite (tanpa hardcoded dummy array)<br>• Sticky breadcrumb dengan pencatatan alur klik pengguna<br>• Penanganan 3 status HTTP: Loading Skeleton, Error Banner + Retry, Empty State |
| **Testing dan Prinsip Desain Interaksi** | **10%** | • 12 Unit Tests lolos 100% menggunakan Vitest & Vue Test Utils<br>• Penerapan 10 Heuristik Nielsen (Visibility of status, user control, error prevention, dll.) |
| **Oral Presentation / Pitch Deck** | **20%** | • Struktur 8 slide lengkap siap pakai untuk presentasi oral dan demonstrasi langsung |
| **Kinerja Tim dan Manajemen Proyek** | **20%** | • Distribusi peran 6 anggota dengan PIC terdefinisi<br>• Struktur Kanban Board (Backlog, In Progress, Review, Done) |

---

## 👥 2. Identitas Tim & Distribusi 18 Proyek

Setiap anggota mengampu tanggung jawab peran teknis dan menghasilkan **3 studi kasus proyek lengkap**:

| No | Nama Anggota | Peran / PIC | 3 Proyek yang Dikembangkan |
|:--:|:---|:---|:---|
| 1 | **Satria Fadhil** | Project Lead & Fullstack Engineer | 1. **EduTrack LMS** (Web Application)<br>2. **AgriSmart IoT** (IoT & Hardware UI)<br>3. **Medico Telehealth** (Web Application) |
| 2 | **Ahmad Farhan** | Frontend Architect & UI Engineer | 4. **FinFlow Budget Tracker** (Web Application)<br>5. **UrbanMove Transit** (Web Application)<br>6. **EventHub Ticketing** (Web Application) |
| 3 | **Nadia Putri** | UI/UX Designer & Design System Lead | 7. **KopiKita App UI Kit** (UI/UX Design System)<br>8. **MindEase Companion** (UI/UX Design System)<br>9. **EcoSort Waste App** (Mobile Application) |
| 4 | **Bima Pratama** | Backend & Cloud Infrastructure Engineer | 10. **CloudVault Storage** (Cloud Dashboard)<br>11. **GeoSpatial Fleet API** (Cloud Dashboard)<br>12. **SecureAuth Gateway** (Web Application) |
| 5 | **Rizky Ramadhan** | Mobile Developer & QA Specialist | 13. **FitPulse Workout** (Mobile Application)<br>14. **QuickDine QR POS** (Mobile Application)<br>15. **SkillBridge Mentorship** (Web Application) |
| 6 | **Siti Aisyah** | Data & AI Integration Specialist | 16. **SentimentLens NLP** (AI & Data Science)<br>17. **CropYield AI Predictor** (AI & Data Science)<br>18. **ChatDoc Healthcare Bot** (AI & Data Science) |

---

## 🏗️ 3. Arsitektur Komponen (Component Architecture)

Struktur komponen dibuat modular, terisolasi, dan mudah digunakan kembali (*reusable*):

```
src/
├── components/
│   ├── common/               # Komponen Fondasi (Reusable UI)
│   │   ├── BaseButton.vue    # Tombol multi-layer, variant primary/secondary, loading spinner
│   │   ├── BaseBadge.vue     # Kapsul kategori proyek dan skill tags
│   │   ├── BaseModal.vue     # Dialog modal interaktif dengan Teleport dan trap keyboard Escape
│   │   ├── SearchBar.vue     # Input pencarian reaktif dengan debounce & clear button
│   │   ├── StateLoading.vue  # Skeleton shimmer loader untuk card dan halaman detail
│   │   ├── StateError.vue    # Banner pesan kegagalan API dengan tombol "Coba Lagi"
│   │   └── StateEmpty.vue    # Visual state ramah saat hasil filter/pencarian nihil
│   ├── layout/               # Komponen Tata Letak Global
│   │   ├── AppNavbar.vue     # Topbar sticky/fixed h-16, toggle tema gelap, switch simulasi API error
│   │   ├── AppBreadcrumb.vue # Navigasi hirarkis sticky tepat di bawah topbar (top-16)
│   │   └── AppFooter.vue     # Penutup halaman dengan tautan repositori & copyright
│   ├── project/              # Komponen Spesifik Proyek
│   │   ├── ProjectCard.vue   # Kartu proyek dengan thumbnail 16:9, badge, dan elevasi halus
│   │   └── ProjectFilter.vue # Tombol chip filter kategori yang terhubung ke Pinia store
│   └── team/                 # Komponen Spesifik Anggota
│       └── MemberCard.vue    # Kartu profil anggota tim, avatar bulat, bio, peran, dan tautan 3 proyek
├── views/                    # Tampilan Halaman (Route Views)
│   ├── HomeView.vue          # Hero video terbalik scaleY(-1), pilar kerja, highlight 3 proyek
│   ├── TeamView.vue          # Grid 6 profil anggota kelompok
│   ├── MemberDetailView.vue  # Profil mendalam per anggota (/team/:id) beserta 3 proyek miliknya
│   ├── ProjectsView.vue      # Katalog 18 proyek lengkap dengan pencarian & filter kategori
│   ├── ProjectDetailView.vue # Detail studi kasus proyek (/projects/:id), galeri gambar, & kontributor
│   ├── ContactView.vue       # Form kontak inline validation & tautan sosial
│   └── NotFoundView.vue      # Penanganan rute tak dikenal (404 Error State)
```

---

## 🔄 4. User Flow & State Management

### A. Alur Pengguna (User Flow)
1. **Alur Eksplorasi Proyek:**  
   `Home` &rarr; Klik "Showcase Proyek" &rarr; `ProjectsView` (Cari / Filter Kategori) &rarr; Klik Kartu &rarr; `ProjectDetailView` (Studi Kasus, Galeri, Kontributor).
2. **Alur Profil Anggota Tim:**  
   `Home` &rarr; Klik "Tim Kami" &rarr; `TeamView` (6 Anggota) &rarr; Klik Nama Anggota &rarr; `MemberDetailView` (`/team/:id`) &rarr; Klik Proyek Anggota &rarr; `ProjectDetailView` (Breadcrumb dinamis: `Beranda / Tim / [Nama Anggota] / [Judul Proyek]`).
3. **Alur Kontak:**  
   Navbar &rarr; Klik "Kontak" &rarr; `ContactView` &rarr; Isi Form (Inline Validation) &rarr; Kirim (Feedback Notifikasi).

### B. Arsitektur State Management (Pinia)
* **`useProjectStore` (`src/stores/projects.js`):**
  * `projects`: Array 18 data proyek tersinkronisasi langsung dari REST API.
  * `searchQuery` & `selectedCategory`: Reaktif mengontrol penyaringan data secara real-time.
  * `filteredProjects` (Getter): Menghitung data yang cocok secara instan tanpa re-fetching.
  * `isEmpty` (Getter): Memicu komponen `StateEmpty` jika pencarian tidak menemukan hasil.
  * `fetchProjects()`, `fetchProjectById()`, `fetchFeaturedProjects()`.
* **`useTeamStore` (`src/stores/team.js`):**
  * `members`: Array 6 data mahasiswa kontributor.
  * `currentMember`: Detail anggota aktif untuk rute `/team/:id`.
  * `getMemberById(id)`: Getter cepat untuk penyajian breadcrumb dan profil.

---

## 🌐 5. Integrasi API: Live MockAPI & SQLite Server

Aplikasi mengimplementasikan **arsitektur REST API ganda**. Tidak ada array dummy hardcoded di sisi front-end (`src/`):

### Mode 1: Live Cloud MockAPI (Default)
Tersambung langsung ke server cloud MockAPI milik pengguna:
```env
VITE_MOCKAPI_URL=https://6b05bbbbdb01cf463608ffe1.mockapi.io/api/v1
```

### Mode 2: Local SQLite REST API Server
Disediakan server native Node.js 22 (`server/api-server.js`) yang membaca database lokal `database.sqlite` di port `3001`:
```bash
# Menjalankan server SQLite lokal
npm run server
```
Untuk mengalihkan Vite ke server SQLite lokal, ubah `.env`:
```env
VITE_MOCKAPI_URL=http://localhost:3001/api
```

### Dokumentasi Endpoint REST API:

| Method | Endpoint | Keterangan | Respon |
|---|---|---|:---:|
| `GET` | `/projects` | Mengambil seluruh 18 proyek | `200 OK` (Array) |
| `GET` | `/projects/:id` | Mengambil detail 1 proyek spesifik | `200 OK` / `404 Not Found` |
| `GET` | `/team` | Mengambil data 6 anggota kelompok | `200 OK` (Array) |
| `GET` | `/team/:id` | Mengambil data 1 anggota tim | `200 OK` / `404 Not Found` |
| `POST`| `/contact` | Mengirim pesan formulir kontak | `201 Created` |

### Pengujian Respon API Langsung (Dosen / Penguji):
Pada pojok kanan atas Navbar, tersedia tombol:
* **`MockAPI: 200 OK`** (Warna Hijau): Menjalankan pemanggilan data normal.
* **`MockAPI: 500 Error`** (Warna Merah): Menyimulasikan kegagalan server jaringan seketika, mendemonstrasikan tampilan **Error State Banner** dan fungsionalitas tombol **"Coba Lagi" (Retry)** tanpa perlu mematikan internet.

---

## 🎨 6. Design System & 10 Heuristik Desain

Desain mengadopsi standar **Minimalist White / Swiss Editorial Design** dengan tipografi presisi:
* **Display Font:** Geist Sans (700 Bold / Medium) dipadukan dengan aksen *Instrument Serif italic*.
* **Hero Section:** Video abstrak alam yang dibalik vertikal (`scaleY(-1)`) dengan *white gradient overlay* (transparan pada 26.4% hingga putih pekat pada 66.9%).
* **Tombol Multi-Layer:** Radius kapsul 40px dengan bayangan dalam halus (*inner shadow*).

### Penerapan 10 Heuristik Evaluasi Nielsen:
1. **Visibility of System Status:** Indikator koneksi API di topbar, shimmer skeleton loader saat memuat data, dan counter jumlah hasil pencarian.
2. **Match Between System and Real World:** Terminologi familiar ("Showcase Proyek", "Kerangka Kerja", "Kontributor", "Profil Anggota").
3. **User Control and Freedom:** Tombol kembali (*Back button*), breadcrumb sticky yang dapat diklik ke segmen rute mana pun, tombol reset filter.
4. **Consistency and Standards:** Warna primer `#1A1A1A` / aksen `#9A1B3A`, grid 12 kolom konsisten di desktop dan kolaps 1 kolom di mobile.
5. **Error Prevention:** Validasi form kontak real-time sebelum tombol submit aktif; pencegahan query tak valid.
6. **Recognition Rather Than Recall:** Breadcrumb sticky selalu terlihat saat di-scroll, label input form selalu tampak di atas field.
7. **Flexibility and Efficiency of Use:** Fitur pencarian cepat langsung di hero banner serta tombol chip filter kategori instan.
8. **Aesthetic and Minimalist Design:** Tata letak bersih, penggunaan *whitespace* luas, tanpa ornamen berlebihan atau emoji dekoratif yang mengganggu.
9. **Help Users Recognize, Diagnose, and Recover from Errors:** Banner error memuat pesan jelas ("Gagal memuat data proyek") dengan aksi langsung tombol "Coba Lagi".
10. **Help and Documentation:** Halaman FAQ/Kontak dan README teknis komprehensif.

---

## 🧪 7. Unit Testing & Hasil Pengujian Otomatis

Pengujian unit dilakukan dengan framework resmi **Vitest** dan **@vue/test-utils**:

```bash
npm run test:unit
```

### Hasil Eksekusi Test Suite:
```
 ✓ src/__tests__/SearchBar.spec.js (3 tests)
   ✓ renders with correct placeholder
   ✓ emits update:modelValue on text input
   ✓ clears search query when clear button is clicked

 ✓ src/__tests__/BaseButton.spec.js (4 tests)
   ✓ renders default button with slot content
   ✓ emits click event when clicked
   ✓ displays loading spinner when loading prop is true
   ✓ disables button when disabled prop is true

 ✓ src/__tests__/projectStore.spec.js (5 tests)
   ✓ initializes with default values
   ✓ fetches projects from mock API successfully
   ✓ filters projects by category correctly
   ✓ filters projects by search keyword
   ✓ computes isEmpty correctly when no matches found

Test Files  3 passed (3)
Tests       12 passed (12) [100% Pass Rate]
```

---

## 🚀 8. Panduan Menjalankan Proyek

### Prasyarat:
* Node.js versi 18 atau 22+
* npm versi 9+

### Langkah-langkah:
```bash
# 1. Pindah ke direktori proyek
cd "PROTOTYPE UI WEB LANJUT"

# 2. Instal dependensi (jika belum)
npm install

# 3. Menjalankan Frontend Development Server (Port 5173)
npm run dev

# 4. (Opsional) Menjalankan Backend SQLite REST API Server (Port 3001)
npm run server

# 5. Menjalankan Unit Tests (Vitest)
npm run test:unit

# 6. Membangun bundle produksi
npm run build
```

---

## 📑 9. Struktur Pitch Deck Presentasi (8 Slide)

Gunakan struktur 8 slide berikut saat sesi presentasi oral dan demonstrasi:

* **Slide 1: Project Overview & Identitas Tim**  
  * Profil KELOMPOK 2 (6 mahasiswa, 18 proyek).
  * Visi: Membangun portofolio tim berbasis arsitektur Vue 3 yang terstruktur, terukur, dan berstandar industri.
* **Slide 2: User Problem & Solusi**  
  * *Problem:* Portofolio mahasiswa sering kali terisolasi, menggunakan hardcoded data statis, dan minim pembuktian state management.
  * *Solusi:* Platform web responsif dengan integrasi live REST API, filtering Pinia dinamis, dan evaluasi 10 Heuristik Desain.
* **Slide 3: UI Design & Prinsip Desain**  
  * Penerapan Swiss Minimalist Design, tipografi Geist + Instrument Serif.
  * Demonstrasi 10 Heuristik Desain Nielsen (Visibility status, error prevention, feedback).
* **Slide 4: Component Architecture**  
  * Penjelasan hierarki komponen reusable: `BaseButton`, `ProjectCard`, `BaseModal`, `SearchBar`, `AppBreadcrumb`.
  * Props validation dan custom event emission.
* **Slide 5: User Flow & State Management**  
  * Diagram alur navigasi dari Home &rarr; Showcase &rarr; Detail &rarr; Tim &rarr; Profil Anggota.
  * Implementasi Pinia Store (`projects.js` dan `team.js`).
* **Slide 6: API Integration & Data Handling**  
  * Bukti integrasi MockAPI dan server lokal SQLite.
  * Live demo penanganan 3 status wajib: Loading skeleton, Error simulation (500) + Retry button, dan Empty state.
* **Slide 7: Testing & Verifikasi Kualitas**  
  * Laporan 12 unit test cases lulus 100% pada Vitest.
  * Pengujian komponen UI dan kalkulasi store.
* **Slide 8: Tim & Manajemen Tugas**  
  * Struktur pembagian kerja 6 anggota kelompok.
  * Bukti alur kerja tim menggunakan Kanban board.

---

## 📌 10. Dokumentasi Manajemen Tugas

Alur kolaborasi tim dibagi dalam board Kanban dengan distribusi PIC:

| ID Tugas | Judul Tugas | PIC | Status |
|---|---|---|:---:|
| **TSK-01** | Inisialisasi arsitektur proyek Vue 3, Vite, Tailwind, dan routing | Satria Fadhil | `DONE` |
| **TSK-02** | Desain token warna, tipografi Geist, dan layout responsif | Ahmad Farhan | `DONE` |
| **TSK-03** | Pembuatan Design System, komponen `BaseButton`, `BaseModal`, `SearchBar` | Nadia Putri | `DONE` |
| **TSK-04** | Inisialisasi database `database.sqlite` & REST API server backend | Bima Pratama | `DONE` |
| **TSK-05** | Penyusunan test suite Vitest (12 skenario pengujian unit) | Rizky Ramadhan | `DONE` |
| **TSK-06** | Integrasi Cloud MockAPI (18 proyek & 6 anggota tim) | Siti Aisyah | `DONE` |
| **TSK-07** | Perbaikan navbar sticky breadcrumbs & pencegahan layout flicker | Ahmad Farhan | `DONE` |
| **TSK-08** | Finalisasi dokumentasi pitch deck dan laporan teknis | Satria Fadhil | `DONE` |

---
**KELOMPOK 2 — UI LANJUT**  
*Membangun produk digital yang terstruktur, terukur, dan bermakna.*
