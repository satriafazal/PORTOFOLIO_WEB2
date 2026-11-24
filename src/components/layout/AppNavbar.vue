<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiService } from '@/services/api'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)
const isSimulatingError = ref(apiService.isSimulatingError())

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleErrorSimulation = () => {
  isSimulatingError.value = !isSimulatingError.value
  apiService.setSimulateError(isSimulatingError.value)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('simulate-error-changed', { detail: isSimulatingError.value }))
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
  isSimulatingError.value = apiService.isSimulatingError()
})

const navLinks = [
  { name: 'Overview', path: '/' },
  { name: 'Tim Kami', path: '/team' },
  { name: 'Showcase Proyek', path: '/projects' },
  { name: 'Kontak', path: '/contact' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] h-16 select-none"
    style="background-color: var(--color-bg);"
  >
    <div class="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
      
      <!-- Brand Logo / Typographic Wordmark: KELOMPOK 2 -->
      <router-link
        to="/"
        class="flex items-center gap-3 group select-none focus:outline-none"
        @click="closeMobileMenu"
      >
        <div class="w-8 h-8 rounded-full bg-ink dark:bg-canvas text-canvas dark:text-ink flex items-center justify-center font-bold text-xs tracking-wider font-mono">
          K2
        </div>
        <div class="flex items-baseline gap-2">
          <span class="font-sans font-bold text-base tracking-tight text-ink dark:text-canvas">
            KELOMPOK 2
          </span>
          <span class="text-[10px] font-mono text-ink-muted uppercase tracking-wider hidden sm:inline">
            / UI LANJUT
          </span>
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1 bg-surface-subtle dark:bg-[#1A1C21] p-1 rounded-full">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none"
          :class="[
            isActive(link.path)
              ? 'bg-white dark:bg-[#252830] text-ink dark:text-canvas font-semibold shadow-subtle'
              : 'text-ink-secondary dark:text-ink-muted hover:text-ink dark:hover:text-canvas'
          ]"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Right Action Items -->
      <div class="hidden md:flex items-center gap-3">
        <!-- API Test Simulation (Tanpa outline putih) -->
        <button
          type="button"
          @click="toggleErrorSimulation"
          class="px-3 py-1 text-[11px] font-mono rounded-full bg-surface-subtle dark:bg-[#1A1C21] text-ink-muted hover:text-ink dark:hover:text-canvas transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
          :class="isSimulatingError && 'bg-red-500/10 text-red-600 dark:text-red-400 font-semibold'"
          title="Simulasi kegagalan MockAPI (status 500) untuk menguji penanganan error"
        >
          <span class="w-2 h-2 rounded-full" :class="isSimulatingError ? 'bg-red-500' : 'bg-emerald-500'"></span>
          MockAPI: {{ isSimulatingError ? '500 Error' : '200 OK' }}
        </button>

        <!-- Dark/Light Mode -->
        <button
          type="button"
          @click="toggleDarkMode"
          class="p-2 rounded-full text-ink-muted hover:text-ink dark:hover:text-canvas bg-surface-subtle dark:bg-[#1A1C21] transition-colors cursor-pointer focus:outline-none"
          aria-label="Toggle Theme"
        >
          <svg v-if="!isDarkMode" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <!-- CTA Button -->
        <BaseButton to="/contact" size="sm" variant="primary">
          Hubungi Kami
        </BaseButton>
      </div>

      <!-- Mobile Button -->
      <div class="flex items-center gap-2 md:hidden">
        <button
          type="button"
          @click="toggleMobileMenu"
          class="p-2 rounded-lg text-ink dark:text-canvas bg-surface-subtle dark:bg-[#1A1C21] focus:outline-none"
          aria-label="Menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white dark:bg-[#121316] px-6 py-5 space-y-3 shadow-xl"
    >
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="block py-2 text-sm font-medium focus:outline-none"
        :class="[
          isActive(link.path)
            ? 'text-ink dark:text-canvas font-semibold'
            : 'text-ink-secondary dark:text-ink-muted'
        ]"
        @click="closeMobileMenu"
      >
        {{ link.name }}
      </router-link>

      <div class="pt-4 flex flex-col gap-2">
        <button
          type="button"
          @click="toggleErrorSimulation"
          class="py-2 px-3 text-xs rounded-full bg-surface-subtle dark:bg-[#1A1C21] text-center font-mono focus:outline-none"
          :class="isSimulatingError ? 'text-red-500 font-semibold' : 'text-ink-muted'"
        >
          MockAPI Test: {{ isSimulatingError ? '500 Error' : '200 Normal' }}
        </button>
        <BaseButton to="/contact" variant="primary" class="w-full" @click="closeMobileMenu">
          Hubungi Kami
        </BaseButton>
      </div>
    </div>
  </header>
</template>
