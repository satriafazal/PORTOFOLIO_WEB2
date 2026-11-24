<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'
import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StateLoading from '@/components/common/StateLoading.vue'
import StateError from '@/components/common/StateError.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const teamStore = useTeamStore()

const activeImageIndex = ref(0)

const getMemberId = (name) => {
  const m = teamStore.members.find(t => t.name.toLowerCase() === name.toLowerCase())
  return m ? m.id : null
}

const fetchDetail = () => {
  activeImageIndex.value = 0
  projectStore.fetchProjectById(route.params.id)
}

const onSimulateErrorChanged = () => {
  fetchDetail()
}

onMounted(() => {
  teamStore.fetchMembers()
  fetchDetail()
  if (typeof window !== 'undefined') {
    window.addEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

watch(() => route.params.id, () => {
  fetchDetail()
})

const project = computed(() => projectStore.currentProject)

const activeImage = computed(() => {
  if (!project.value) return ''
  if (project.value.gallery && project.value.gallery.length > 0) {
    return project.value.gallery[activeImageIndex.value] || project.value.thumbnail
  }
  return project.value.thumbnail
})

const backTarget = computed(() => {
  const from = route.query.from
  const memberId = route.query.member || project.value?.leadMemberId

  if (from === 'team' || from === 'member' || route.query.member) {
    const m = memberId ? teamStore.getMemberById(memberId) : null
    return {
      path: m ? `/team/${m.id}` : '/team',
      label: m ? `Kembali ke Profil ${m.name}` : 'Kembali ke Tim'
    }
  }

  if (from === 'home') {
    return {
      path: '/',
      label: 'Kembali ke Beranda'
    }
  }

  return {
    path: '/projects',
    label: 'Kembali ke Showcase Proyek'
  }
})
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-12 space-y-8">
    
    <!-- Error State -->
    <StateError
      v-if="projectStore.detailError"
      title="Proyek Tidak Ditemukan"
      :message="projectStore.detailError"
      @retry="fetchDetail"
    />

    <!-- Loading Skeleton -->
    <StateLoading
      v-else-if="projectStore.detailLoading || !project"
      type="detail"
    />

    <!-- Detail View -->
    <div v-else class="space-y-8">
      
      <!-- Top Back Link -->
      <div>
        <router-link
          :to="backTarget.path"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink dark:hover:text-canvas transition focus:outline-none"
        >
          <span>&larr; {{ backTarget.label }}</span>
        </router-link>
      </div>

      <!-- 2. Header Section -->
      <div class="space-y-4 pb-4">
        <div class="flex flex-wrap items-center gap-3">
          <BaseBadge variant="neutral">
            {{ project.category }}
          </BaseBadge>
          <span class="text-xs font-mono text-ink-muted">
            Status: <span class="text-success font-medium">{{ project.status }}</span>
          </span>
          <span class="text-xs font-mono text-ink-muted">
            ID: #0{{ project.id }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-sans font-medium tracking-tightest text-ink dark:text-canvas max-w-4xl leading-tight">
          {{ project.title }}
        </h1>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          <router-link
            :to="`/team/${project.leadMemberId}`"
            class="flex items-center gap-3 group focus:outline-none"
            title="Buka Profil Anggota"
          >
            <div class="w-9 h-9 rounded-full bg-surface-subtle dark:bg-[#20232A] border border-border flex items-center justify-center font-mono text-xs font-semibold text-ink dark:text-canvas group-hover:scale-105 transition-transform">
              {{ project.leadMemberName.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <div class="text-[11px] font-mono text-ink-muted">Penanggung Jawab</div>
              <div class="text-sm font-sans font-medium text-ink dark:text-canvas group-hover:underline">{{ project.leadMemberName }}</div>
            </div>
          </router-link>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2.5">
            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 text-xs font-mono rounded-full border border-border text-ink dark:text-canvas hover:border-ink/40 transition"
            >
              GitHub Repo
            </a>
            <a
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-multi-layer px-5 py-2 text-xs font-mono rounded-full"
            >
              Live Demo &rarr;
            </a>
          </div>
        </div>
      </div>

      <!-- 3. Documentation Visual Preview -->
      <div class="space-y-4">
        <div class="w-full aspect-[16/9] md:aspect-[21/9] rounded-card overflow-hidden bg-surface-muted dark:bg-[#181A20] border border-border shadow-card">
          <img
            :src="activeImage"
            :alt="project.title"
            class="w-full h-full object-cover transition-opacity duration-200"
          />
        </div>

        <!-- Thumbnails -->
        <div v-if="project.gallery && project.gallery.length > 1" class="flex gap-3 overflow-x-auto pb-1">
          <button
            v-for="(img, idx) in project.gallery"
            :key="idx"
            type="button"
            class="w-24 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all"
            :class="activeImageIndex === idx ? 'border-ink dark:border-canvas scale-102' : 'border-transparent opacity-50 hover:opacity-100'"
            @click="activeImageIndex = idx"
          >
            <img :src="img" alt="Thumbnail" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- 4. Content Grid (Asymmetric Editorial Layout) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        
        <!-- Main Column (Col 8) -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Latar Belakang -->
          <div class="space-y-3">
            <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
              01 / Konteks &amp; Masalah
            </div>
            <h2 class="text-xl sm:text-2xl font-sans font-semibold text-ink dark:text-canvas tracking-tight">
              Latar Belakang Proyek
            </h2>
            <p class="text-sm sm:text-base text-ink-muted dark:text-ink-muted leading-relaxed font-sans pt-1">
              {{ project.description }}
            </p>
          </div>

          <!-- Fitur Utama -->
          <div class="space-y-4">
            <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
              02 / Fungsionalitas
            </div>
            <h2 class="text-xl sm:text-2xl font-sans font-semibold text-ink dark:text-canvas tracking-tight">
              Spesifikasi Fitur
            </h2>
            <div class="space-y-2 pt-1">
              <div
                v-for="(feat, idx) in project.features"
                :key="idx"
                class="flex items-start gap-3 p-3.5 rounded-xl bg-surface-subtle dark:bg-[#181A20] border border-border text-xs sm:text-sm text-ink dark:text-canvas font-sans"
              >
                <span class="font-mono text-xs text-ink-muted mt-0.5">0{{ idx + 1 }}</span>
                <span>{{ feat }}</span>
              </div>
            </div>
          </div>

          <!-- Kontribusi Anggota -->
          <div class="space-y-4">
            <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
              03 / Pembagian Peran
            </div>
            <h2 class="text-xl sm:text-2xl font-sans font-semibold text-ink dark:text-canvas tracking-tight">
              Kontribusi Anggota Tim
            </h2>
            <div class="space-y-2 pt-1">
              <div
                v-for="(contributor, idx) in project.contributors"
                :key="idx"
                class="flex items-center justify-between p-3.5 rounded-xl bg-surface dark:bg-[#181A20] border border-border/40"
              >
                <div class="flex items-center gap-3">
                  <span class="w-2 h-2 rounded-full bg-ink dark:bg-canvas"></span>
                  <component
                    :is="getMemberId(contributor.name) ? 'router-link' : 'span'"
                    :to="getMemberId(contributor.name) ? `/team/${getMemberId(contributor.name)}` : undefined"
                    class="text-sm font-sans font-medium text-ink dark:text-canvas"
                    :class="getMemberId(contributor.name) && 'hover:underline focus:outline-none cursor-pointer'"
                  >
                    {{ contributor.name }}
                  </component>
                </div>
                <span class="text-xs font-mono text-ink-muted">
                  {{ contributor.role }}
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Sidebar (Col 4) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Tech Stack -->
          <div class="bg-surface-subtle dark:bg-[#181A20] rounded-card border border-border p-6 space-y-3 shadow-card">
            <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
              Tech Stack
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <BaseBadge
                v-for="tech in project.techStack"
                :key="tech"
                variant="neutral"
              >
                {{ tech }}
              </BaseBadge>
            </div>
          </div>

          <!-- Back Nav -->
          <div class="rounded-card border border-border p-6 text-center space-y-3">
            <div class="text-xs font-mono text-ink-muted">Navigasi Kembali</div>
            <BaseButton :to="backTarget.path" variant="secondary" size="sm" class="w-full">
              {{ backTarget.label }}
            </BaseButton>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>
