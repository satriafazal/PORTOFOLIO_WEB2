<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseBadge from '@/components/common/BaseBadge.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const detailTarget = computed(() => {
  const query = {}
  if (route.name === 'MemberDetail' || route.path.startsWith('/team/')) {
    query.from = 'team'
    query.member = route.params.id || props.project.leadMemberId
  } else if (route.query.member) {
    query.from = 'team'
    query.member = route.query.member
  } else if (route.path === '/') {
    query.from = 'home'
  } else {
    query.from = 'projects'
  }
  return { path: `/projects/${props.project.id}`, query }
})
</script>

<template>
  <div class="group bg-surface dark:bg-[#181A20] rounded-card border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-ink/20 dark:hover:border-white/20 transition-all duration-200 flex flex-col h-full">
    
    <!-- Thumbnail 16:9 Clean Frame (Clickable) -->
    <router-link
      :to="detailTarget"
      class="relative w-full aspect-video overflow-hidden bg-surface-muted dark:bg-[#20232A] block focus:outline-none cursor-pointer"
      :title="`Buka detail ${project.title}`"
    >
      <img
        :src="project.thumbnail"
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
      />
      <!-- Category Badge Top Right -->
      <div class="absolute top-3.5 right-3.5">
        <BaseBadge variant="neutral" class="backdrop-blur-md bg-canvas/90 dark:bg-black/80 font-mono text-[10px]">
          {{ project.category }}
        </BaseBadge>
      </div>
      <!-- Featured label if any -->
      <div v-if="project.featured" class="absolute top-3.5 left-3.5">
        <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-ink text-canvas dark:bg-canvas dark:text-ink">
          Featured
        </span>
      </div>
    </router-link>

    <!-- Content Card -->
    <div class="p-6 flex flex-col flex-grow">
      
      <!-- Metadata / Creator -->
      <div class="flex items-center justify-between text-xs text-ink-muted font-mono mb-2">
        <span>Lead: {{ project.leadMemberName }}</span>
        <span>#0{{ project.id }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-sans font-semibold text-base text-ink dark:text-canvas group-hover:text-ink-secondary dark:group-hover:text-white transition-colors line-clamp-1 mb-2">
        <router-link :to="detailTarget" class="focus:outline-none">
          {{ project.title }}
        </router-link>
      </h3>

      <!-- Summary 2 baris -->
      <p class="text-xs sm:text-sm text-ink-muted line-clamp-2 mb-5 leading-relaxed flex-grow font-sans">
        {{ project.summary }}
      </p>

      <!-- Tech Stack Badges -->
      <div class="flex flex-wrap gap-1.5 pt-3">
        <BaseBadge
          v-for="tech in project.techStack.slice(0, 3)"
          :key="tech"
          variant="neutral"
        >
          {{ tech }}
        </BaseBadge>
        <span
          v-if="project.techStack.length > 3"
          class="text-[10px] font-mono text-ink-muted self-center pl-1"
        >
          +{{ project.techStack.length - 3 }}
        </span>
      </div>

      <!-- Action Link -->
      <div class="mt-4 pt-3 flex items-center justify-between text-xs font-medium border-t border-border/30">
        <router-link
          :to="detailTarget"
          class="inline-flex items-center gap-1.5 text-ink dark:text-canvas hover:underline focus:outline-none"
        >
          <span>Detail Dokumentasi</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>

        <span class="text-[11px] font-mono text-ink-muted">
          {{ project.status }}
        </span>
      </div>

    </div>

  </div>
</template>
