<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import BaseButton from '@/components/common/BaseButton.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import StateLoading from '@/components/common/StateLoading.vue'
import StateError from '@/components/common/StateError.vue'

const router = useRouter()
const projectStore = useProjectStore()

const onSimulateErrorChanged = () => {
  projectStore.fetchFeaturedProjects()
}

onMounted(() => {
  projectStore.fetchFeaturedProjects()
  if (typeof window !== 'undefined') {
    window.addEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

const handleQuickSearch = (e) => {
  const query = e.target.searchQuery.value
  if (query) {
    projectStore.setSearchQuery(query)
    router.push({ path: '/projects' })
  } else {
    router.push({ path: '/projects' })
  }
}
</script>

<template>
  <div class="space-y-24 sm:space-y-32 pb-24">
    
    <!-- 1. Hero Section (Minimalist White SaaS + Flipped Video & White Gradient Overlay) -->
    <section class="relative pt-32 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
      
      <!-- Video Invertido scaleY(-1) com Gradient Overlay Branco -->
      <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <video
          autoplay
          loop
          muted
          playsinline
          class="w-full h-full video-flipped-hero opacity-25 dark:opacity-15"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
        >
          <!-- Abstract nature clouds / light slow motion video -->
          <source src="https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4" type="video/mp4" />
        </video>
        <!-- Exact Gradient Overlay: Transparent at 26.4% to White at 66.9% -->
        <div class="absolute inset-0 gradient-overlay-white"></div>
      </div>

      <div class="max-w-[1280px] mx-auto px-6 text-center">
        
        <!-- Editorial Micro Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-subtle dark:bg-[#1E2026] border border-border text-[11px] font-mono text-ink-secondary dark:text-ink-muted mb-8 shadow-subtle">
          <span class="w-1.5 h-1.5 rounded-full bg-ink dark:bg-canvas"></span>
          <span>UI Lanjut &bull; Tim Portofolio Kelompok</span>
        </div>

        <!-- Headline: Geist Medium tracking -0.04em with Instrument Serif italic -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-sans font-medium tracking-tightest text-ink dark:text-canvas leading-[1.08] max-w-4xl mx-auto mb-6">
          Membangun produk digital yang <span class="font-serif italic font-normal text-[1.12em] tracking-normal text-ink dark:text-canvas">terstruktur</span>, terukur, dan bermakna.
        </h1>

        <!-- Subtitle / Deskripsi -->
        <p class="text-base sm:text-lg text-ink-muted dark:text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-normal">
          Koleksi karya dan studi kasus pengembangan web serta perancangan antarmuka digital dari Kelompok 2. Berfokus pada interaksi intuitif, estetika fungsional, dan arsitektur yang terstruktur.
        </p>

        <!-- Input Quick Search Pill 40px Rounded dengan Tombol Multi-Layer -->
        <form
          @submit.prevent="handleQuickSearch"
          class="max-w-xl mx-auto flex items-center p-1.5 rounded-full bg-neutral dark:bg-[#1A1C22] border border-border shadow-input mb-4"
        >
          <div class="pl-4 text-ink-muted">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            name="searchQuery"
            type="text"
            placeholder="Ketik topik proyek atau teknologi..."
            class="w-full px-3.5 py-2 text-xs sm:text-sm bg-transparent text-ink dark:text-canvas placeholder-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            class="btn-multi-layer px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer"
          >
            Telusuri Proyek
          </button>
        </form>

      </div>
    </section>

    <!-- 2. Highlight Proyek Unggulan (Featured Projects) -->
    <section class="max-w-[1280px] mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-2">
        <div>
          <div class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">
            Karya Terpilih
          </div>
          <h2 class="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-ink dark:text-canvas">
            Highlight Proyek Unggulan
          </h2>
        </div>

        <router-link
          to="/projects"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-ink dark:text-canvas hover:underline mt-2 md:mt-0"
        >
          <span>Lihat Semua Proyek &rarr;</span>
        </router-link>
      </div>

      <!-- Error State -->
      <StateError
        v-if="projectStore.featuredError"
        title="Gagal Memuat Highlight Proyek"
        :message="projectStore.featuredError"
        @retry="projectStore.fetchFeaturedProjects"
      />

      <!-- Loading State Skeleton -->
      <StateLoading v-else-if="projectStore.featuredLoading" :count="3" />

      <!-- Grid 3 Highlight Card -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projectStore.featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

    </section>

    <!-- 4. Team Teaser Minimalist Banner -->
    <section class="max-w-[1280px] mx-auto px-6">
      <div class="rounded-card border border-border bg-surface-subtle dark:bg-[#181A20] p-8 sm:p-14 text-center shadow-card relative overflow-hidden">
        <div class="max-w-xl mx-auto space-y-4">
          <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
            Kolaborasi Tim
          </div>
          <h3 class="text-2xl sm:text-3xl font-sans font-medium text-ink dark:text-canvas tracking-tight">
            Enam Pengembang dengan <span class="font-serif italic font-normal text-[1.1em]">Keahlian Khusus</span>
          </h3>
          <p class="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
            Setiap anggota memegang tanggung jawab teknis spesifik mulai dari Project Lead, Frontend Architecture, UI/UX Design System, Cloud Backend, Mobile QA, hingga Integrasi AI.
          </p>
          <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
            <BaseButton to="/team" size="md" variant="primary">
              Buka Profil Tim (6 Orang)
            </BaseButton>
            <BaseButton to="/contact" size="md" variant="secondary">
              Hubungi Kontak
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
