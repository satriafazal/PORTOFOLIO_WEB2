<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-canvas dark:bg-[#121316] border-t border-border pt-16 pb-12 transition-colors">
    <div class="max-w-[1280px] mx-auto px-6">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border">
        
        <!-- Left: Editorial Identity -->
        <div class="md:col-span-6 space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-ink dark:bg-canvas"></span>
            <span class="font-sans font-bold text-sm tracking-tight text-ink dark:text-canvas uppercase">
              KELOMPOK 2
            </span>
            <span class="text-xs text-ink-muted font-mono">/ Portfolio UI Lanjut</span>
          </div>
          <p class="text-sm text-ink-muted dark:text-ink-muted max-w-md leading-relaxed font-sans">
            Portofolio kolaboratif 6 mahasiswa pengembang web dengan pendekatan desain Swiss International Style: hierarki tipografi tegas, ruang negatif bernapas, dan fungsionalitas murni tanpa ornamen berlebih.
          </p>
        </div>

        <!-- Middle: Nav Links -->
        <div class="md:col-span-3 space-y-3">
          <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
            Index
          </div>
          <ul class="space-y-2 text-sm text-ink-secondary dark:text-ink-muted">
            <li>
              <router-link to="/" class="hover:text-ink dark:hover:text-canvas transition">Overview</router-link>
            </li>
            <li>
              <router-link to="/team" class="hover:text-ink dark:hover:text-canvas transition">Tim (6 Anggota)</router-link>
            </li>
            <li>
              <router-link to="/projects" class="hover:text-ink dark:hover:text-canvas transition">Showcase (18 Proyek)</router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-ink dark:hover:text-canvas transition">Kontak &amp; Kolaborasi</router-link>
            </li>
          </ul>
        </div>

        <!-- Right: Technical Specs -->
        <div class="md:col-span-3 space-y-3">
          <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
            Teknologi
          </div>
          <ul class="space-y-1.5 text-xs text-ink-muted font-mono">
            <li>Vue.js 3 &bull; Composition API</li>
            <li>Tailwind CSS</li>
            <li>Pinia State Management</li>
            <li>Vite Tooling</li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4 font-mono">
        <div>
          &copy; {{ currentYear }} KELOMPOK 2. Dibuat untuk Mata Kuliah UI Lanjut.
        </div>
        <div class="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-ink dark:hover:text-canvas transition">GitHub</a>
          <span>/</span>
          <a href="mailto:kelompok2@ui-lanjut.dev" class="hover:text-ink dark:hover:text-canvas transition">Email</a>
        </div>
      </div>

    </div>
  </footer>
</template>
