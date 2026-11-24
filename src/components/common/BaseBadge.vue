<script setup>
defineProps({
  variant: {
    type: String,
    default: 'neutral', // 'neutral' | 'accent' | 'success' | 'outline'
  },
  clickable: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono tracking-tight rounded-full transition-colors select-none"
    :class="[
      variant === 'accent' && 'bg-ink/5 dark:bg-canvas/10 text-ink dark:text-canvas border border-ink/15 dark:border-white/20',
      variant === 'success' && 'bg-success-subtle text-success border border-success/20',
      variant === 'neutral' && 'bg-surface-subtle dark:bg-[#1E2026] text-ink-secondary dark:text-ink-muted border border-border',
      variant === 'outline' && 'border border-border text-ink-muted',
      clickable && 'cursor-pointer hover:border-ink hover:text-ink active:scale-95'
    ]"
  >
    <slot />
  </span>
</template>
