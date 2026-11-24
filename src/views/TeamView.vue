<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useTeamStore } from '@/stores/team'
import { useProjectStore } from '@/stores/projects'
import MemberCard from '@/components/team/MemberCard.vue'
import StateLoading from '@/components/common/StateLoading.vue'
import StateError from '@/components/common/StateError.vue'

const teamStore = useTeamStore()
const projectStore = useProjectStore()

const onSimulateErrorChanged = () => {
  teamStore.fetchMembers()
  projectStore.fetchProjects()
}

onMounted(() => {
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
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-16 space-y-12">
    
    <!-- Editorial Header Section -->
    <div class="max-w-3xl space-y-3 pb-4">
      <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
        Profil Tim &bull; 6 Spesialis
      </div>
      <h1 class="text-3xl sm:text-5xl font-sans font-medium tracking-tightest text-ink dark:text-canvas">
        Anggota Kelompok <span class="font-serif italic font-normal text-[1.1em]">Pengembang</span>
      </h1>
      <p class="text-sm text-ink-muted leading-relaxed font-sans max-w-xl">
        Setiap anggota tim bertanggung jawab atas proyek mandiri dan berkontribusi lintas fungsi dalam integrasi arsitektur sistem.
      </p>
    </div>

    <!-- Error State -->
    <StateError
      v-if="teamStore.error"
      :message="teamStore.error"
      @retry="teamStore.fetchMembers"
    />

    <!-- Loading State Skeleton -->
    <div v-else-if="teamStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="i in 6"
        :key="i"
        class="bg-surface dark:bg-[#181A20] border border-border rounded-card p-7 animate-pulse space-y-4"
      >
        <div class="w-16 h-16 rounded-full bg-border animate-shimmer"></div>
        <div class="h-5 bg-border rounded-full w-1/2 animate-shimmer"></div>
        <div class="h-3.5 bg-border rounded-full w-1/3 animate-shimmer"></div>
        <div class="h-12 bg-border rounded-xl w-full animate-shimmer"></div>
      </div>
    </div>

    <!-- Grid ProfileCard 6 Anggota -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MemberCard
        v-for="member in teamStore.members"
        :key="member.id"
        :member="member"
      />
    </div>

    <!-- Team Governance / Rubrik 20% Kinerja Tim -->
    <div class="rounded-card bg-surface-subtle dark:bg-[#181A20] border border-border p-8 sm:p-10">
      <div class="max-w-2xl space-y-3">
        <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
          Dokumentasi Kerja Kelompok
        </div>
        <h3 class="font-sans font-semibold text-lg sm:text-xl text-ink dark:text-canvas tracking-tight">
          Manajemen Tugas Berbasis Kanban (Jira &bull; GitHub Projects)
        </h3>
        <p class="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
          Seluruh siklus pengembangan dikelola dengan pembagian peran yang transparan: penugasan PIC (Person In Charge) per modul antarmuka, verifikasi pull request, dan pengujian fungsi berkala untuk memastikan standar ketercapaian 100% pada rubrik evaluasi.
        </p>
      </div>
    </div>

  </div>
</template>
