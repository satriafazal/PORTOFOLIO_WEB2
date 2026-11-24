<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'
import SearchBar from '@/components/common/SearchBar.vue'
import ProjectFilter from '@/components/project/ProjectFilter.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import StateLoading from '@/components/common/StateLoading.vue'
import StateError from '@/components/common/StateError.vue'
import StateEmpty from '@/components/common/StateEmpty.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const teamStore = useTeamStore()

const syncFromQuery = () => {
  if (route.query.member) {
    projectStore.setSelectedMemberId(Number(route.query.member))
  } else {
    projectStore.setSelectedMemberId(null)
  }
}

const onSimulateErrorChanged = () => {
  projectStore.fetchProjects()
}

onMounted(() => {
  syncFromQuery()
  teamStore.fetchMembers()
  projectStore.fetchProjects()
  if (typeof window !== 'undefined') {
    window.addEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('simulate-error-changed', onSimulateErrorChanged)
  }
})

watch(() => route.query.member, () => {
  syncFromQuery()
})

const getSelectedMemberName = () => {
  if (!projectStore.selectedMemberId) return null
  const m = teamStore.getMemberById(projectStore.selectedMemberId)
  return m ? m.name : null
}

const clearMemberFilter = () => {
  projectStore.setSelectedMemberId(null)
  router.push({ path: '/projects' })
}
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-16 space-y-10">
    
    <!-- Editorial Header Section -->
    <div class="max-w-3xl space-y-3 pb-4">
      <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
        Katalog Portofolio
      </div>
      <h1 class="text-3xl sm:text-5xl font-sans font-medium tracking-tightest text-ink dark:text-canvas">
        Daftar Proyek <span class="font-serif italic font-normal text-[1.1em]">Tim</span>
      </h1>
      <p class="text-sm text-ink-muted leading-relaxed font-sans max-w-xl">
        Koleksi proyek mandiri dan kolaboratif dari anggota kelompok kami, mencakup pengembangan aplikasi web, perancangan antarmuka seluler, hingga solusi sistem digital.
      </p>
    </div>

    <!-- Active Member Filter Tag (Jika diarahkan dari profil anggota) -->
    <div
      v-if="projectStore.selectedMemberId"
      class="bg-surface-subtle dark:bg-[#181A20] border border-border rounded-full py-2 px-5 flex items-center justify-between text-xs font-mono"
    >
      <div class="flex items-center gap-2">
        <span class="text-ink-muted">Filter Kontributor:</span>
        <span class="font-semibold text-ink dark:text-canvas underline">{{ getSelectedMemberName() }}</span>
        <span class="text-ink-muted">({{ projectStore.filteredProjects.length }} Proyek)</span>
      </div>
      <button
        type="button"
        class="text-ink dark:text-canvas hover:underline font-medium cursor-pointer"
        @click="clearMemberFilter"
      >
        Tampilkan Semua &times;
      </button>
    </div>

    <!-- Search & Filter Controls (Editorial Minimalist Bar) -->
    <div class="space-y-4">
      <div class="max-w-md">
        <SearchBar
          :model-value="projectStore.searchQuery"
          placeholder="Cari judul proyek atau kata kunci..."
          @update:model-value="projectStore.setSearchQuery"
          @clear="projectStore.setSearchQuery('')"
        />
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <ProjectFilter
          :categories="projectStore.categories"
          :active-category="projectStore.selectedCategory"
          @select="projectStore.setSelectedCategory"
        />

        <div class="text-xs font-mono text-ink-muted whitespace-nowrap self-end sm:self-auto">
          [ {{ projectStore.filteredProjects.length }} / {{ projectStore.totalProjectsCount }} Proyek ]
        </div>
      </div>
    </div>

    <!-- Error State -->
    <StateError
      v-if="projectStore.error"
      :message="projectStore.error"
      @retry="projectStore.fetchProjects"
    />

    <!-- Loading State Skeleton -->
    <StateLoading
      v-else-if="projectStore.loading"
      :count="6"
    />

    <!-- Empty State -->
    <StateEmpty
      v-else-if="projectStore.isEmpty"
      title="Tidak Ada Proyek yang Cocok"
      description="Tidak ditemukan proyek yang cocok dengan kata kunci pencarian. Coba atur kembali pilihan kategori ke 'All'."
      action-text="Reset Pencarian"
      @action="projectStore.resetFilters(); clearMemberFilter()"
    />

    <!-- Projects Grid (18 Items, 3 Kolom) -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ProjectCard
        v-for="project in projectStore.filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>

  </div>
</template>
