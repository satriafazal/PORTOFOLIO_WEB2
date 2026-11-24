<script setup>
import { computed } from 'vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import { useProjectStore } from '@/stores/projects'

const props = defineProps({
  member: {
    type: Object,
    required: true
  }
})

defineEmits(['viewProjects'])

const projectStore = useProjectStore()

const projectCount = computed(() => {
  return projectStore.projects.filter(p => Number(p.leadMemberId) === Number(props.member.id)).length
})
</script>

<template>
  <div class="bg-surface dark:bg-[#181A20] rounded-card border border-border/40 p-6 sm:p-7 shadow-card hover:shadow-card-hover hover:border-ink/20 dark:hover:border-white/20 transition-all duration-200 flex flex-col h-full text-left">
    
    <!-- Top: Avatar & Index ID -->
    <div class="flex items-start justify-between mb-5">
      <router-link
        :to="`/team/${member.id}`"
        class="w-16 h-16 rounded-full overflow-hidden border border-border shadow-subtle bg-surface-muted block focus:outline-none group/avatar cursor-pointer"
        title="Buka Profil Anggota"
      >
        <img
          :src="member.avatar"
          :alt="member.name"
          class="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform"
        />
      </router-link>
      <span class="text-xs font-mono text-ink-muted uppercase">
        #0{{ member.id }}
      </span>
    </div>

    <!-- Name & Role -->
    <h3 class="font-sans font-semibold text-lg text-ink dark:text-canvas mb-1">
      <router-link
        :to="`/team/${member.id}`"
        class="hover:underline focus:outline-none"
      >
        {{ member.name }}
      </router-link>
    </h3>
    <p class="text-xs font-mono text-ink-secondary dark:text-ink-muted mb-3">
      {{ member.role }}
    </p>

    <!-- Bio -->
    <p class="text-xs text-ink-muted line-clamp-3 leading-relaxed mb-5 flex-grow font-sans">
      {{ member.bio }}
    </p>

    <!-- Skills Badges -->
    <div class="flex flex-wrap gap-1.5 mb-5">
      <BaseBadge
        v-for="skill in member.skills.slice(0, 4)"
        :key="skill"
        variant="neutral"
      >
        {{ skill }}
      </BaseBadge>
      <span v-if="member.skills.length > 4" class="text-[10px] font-mono text-ink-muted self-center">
        +{{ member.skills.length - 4 }}
      </span>
    </div>

    <!-- Role / Responsibility -->
    <div class="p-3 rounded-xl bg-surface-subtle dark:bg-[#20232A] border border-border/40 text-xs mb-5">
      <div class="text-[10px] font-mono uppercase text-ink-muted mb-1">Fokus Kontribusi:</div>
      <div class="text-ink dark:text-canvas leading-snug font-sans">
        {{ member.contribution }}
      </div>
    </div>

    <!-- Action Link & Social Links -->
    <div class="pt-4 border-t border-border/20 flex items-center justify-between">
      <router-link
        :to="`/team/${member.id}`"
        class="text-xs font-medium text-ink dark:text-canvas hover:underline inline-flex items-center gap-1.5 focus:outline-none font-sans"
      >
        <span>Lihat Profil &amp; {{ projectCount > 0 ? `${projectCount} ` : '' }}Proyek</span>
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>

      <div class="flex items-center gap-3 text-ink-muted text-xs font-mono">
        <a :href="member.github" target="_blank" rel="noopener noreferrer" class="hover:text-ink dark:hover:text-canvas transition focus:outline-none">GH</a>
        <span>/</span>
        <a :href="member.linkedin" target="_blank" rel="noopener noreferrer" class="hover:text-ink dark:hover:text-canvas transition focus:outline-none">LI</a>
      </div>
    </div>

  </div>
</template>
