<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamStore } from '@/stores/team'
import { useProjectStore } from '@/stores/projects'
import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import StateLoading from '@/components/common/StateLoading.vue'
import StateError from '@/components/common/StateError.vue'

const route = useRoute()
const teamStore = useTeamStore()
const projectStore = useProjectStore()

const refetchData = () => {
  teamStore.fetchMembers()
  projectStore.fetchProjects()
}

onMounted(() => {
  refetchData()
  if (typeof window !== 'undefined') {
    window.addEventListener('simulate-error-changed', refetchData)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('simulate-error-changed', refetchData)
  }
})

const member = computed(() => {
  const id = Number(route.params.id)
  return teamStore.getMemberById(id)
})

const memberProjects = computed(() => {
  if (!member.value) return []
  return projectStore.projects.filter(p => Number(p.leadMemberId) === Number(member.value.id))
})
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-10 space-y-12">

    <!-- Error State -->
    <StateError
      v-if="teamStore.error"
      title="Gagal Memuat Profil Anggota"
      :message="teamStore.error"
      @retry="refetchData"
    />

    <!-- Loading State Skeleton -->
    <StateLoading
      v-else-if="teamStore.loading"
      type="detail"
    />

    <!-- Member Profile View -->
    <div v-else-if="member" class="space-y-12">
    
    <!-- Member Header Profile Box -->
    <div class="bg-surface-subtle dark:bg-[#181A20] rounded-card border border-border/40 p-8 sm:p-12 shadow-card">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-8">
        
        <!-- Large Avatar -->
        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-border shadow-subtle flex-shrink-0 bg-surface-muted">
          <img
            :src="member.avatar"
            :alt="member.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Info -->
        <div class="space-y-3 flex-grow">
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xs font-mono text-ink-muted uppercase">Anggota #0{{ member.id }}</span>
            <span class="text-xs font-mono text-ink-muted">&bull;</span>
            <span class="text-xs font-mono text-ink-secondary dark:text-ink-muted">{{ member.role }}</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-ink dark:text-canvas">
            {{ member.name }}
          </h1>

          <p class="text-sm text-ink-muted max-w-2xl leading-relaxed font-sans">
            {{ member.bio }}
          </p>

          <!-- Skills -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            <BaseBadge
              v-for="skill in member.skills"
              :key="skill"
              variant="neutral"
            >
              {{ skill }}
            </BaseBadge>
          </div>
        </div>

        <!-- Action / Contacts -->
        <div class="flex flex-col gap-2.5 w-full md:w-auto flex-shrink-0 font-mono text-xs">
          <a
            :href="`mailto:${member.email}`"
            class="px-5 py-2.5 rounded-full bg-ink text-canvas dark:bg-canvas dark:text-ink text-center font-medium hover:opacity-90 transition"
          >
            Kirim Email
          </a>
          <a
            :href="member.github"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2 rounded-full border border-border text-ink dark:text-canvas text-center hover:border-ink/40 transition"
          >
            GitHub Profil &rarr;
          </a>
          <a
            :href="member.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2 rounded-full border border-border text-ink dark:text-canvas text-center hover:border-ink/40 transition"
          >
            LinkedIn &rarr;
          </a>
        </div>

      </div>

      <!-- Contribution Banner -->
      <div class="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
        <div class="font-sans text-ink dark:text-canvas">
          <strong class="font-medium text-ink-muted font-mono uppercase text-[11px] block sm:inline mr-2">Fokus Tugas:</strong>
          {{ member.contribution }}
        </div>
        <div class="font-mono text-ink-muted whitespace-nowrap">
          [ Koleksi {{ memberProjects.length }} Proyek Terverifikasi ]
        </div>
      </div>
    </div>

    <!-- Dynamic Projects Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
            Karya Utama
          </div>
          <h2 class="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-ink dark:text-canvas">
            {{ memberProjects.length }} Proyek Dikerjakan oleh <span class="font-serif italic font-normal text-[1.1em]">{{ member.name }}</span>
          </h2>
        </div>
        <router-link
          to="/team"
          class="text-xs font-mono text-ink-muted hover:text-ink dark:hover:text-canvas transition"
        >
          &larr; Lihat Semua Anggota
        </router-link>
      </div>

      <div v-if="memberProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in memberProjects"
          :key="project.id"
          :project="project"
        />
      </div>
      <div v-else class="p-8 rounded-card border border-border text-center text-sm font-mono text-ink-muted">
        Belum ada proyek yang ditampilkan untuk anggota ini.
      </div>
    </div>
  </div>

  <!-- Member Not Found -->
  <div v-else class="py-20 text-center space-y-4">
    <div class="font-mono text-xs text-ink-muted">[ 404 &bull; Anggota Tidak Ditemukan ]</div>
    <h1 class="text-2xl font-sans font-medium text-ink dark:text-canvas">
      Data anggota tidak tersedia.
    </h1>
    <BaseButton to="/team" variant="primary" size="sm">
      Kembali ke Halaman Tim
    </BaseButton>
  </div>

</div>
</template>
