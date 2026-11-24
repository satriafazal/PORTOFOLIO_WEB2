<script setup>
import BaseBadge from '@/components/common/BaseBadge.vue'

defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    default: 'All'
  }
})

defineEmits(['select'])
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
    <button
      v-for="cat in categories"
      :key="cat"
      type="button"
      class="px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer border select-none"
      :class="[
        activeCategory.toLowerCase() === cat.toLowerCase()
          ? 'bg-ink text-canvas dark:bg-canvas dark:text-ink border-ink dark:border-canvas shadow-subtle'
          : 'bg-surface-subtle dark:bg-[#181A20] text-ink-secondary dark:text-ink-muted hover:text-ink dark:hover:text-canvas border-border hover:border-ink/20'
      ]"
      @click="$emit('select', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>
