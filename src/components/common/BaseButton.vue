<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
    validator: (s) => ['sm', 'md', 'lg'].includes(s)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: null
  },
  type: {
    type: String,
    default: 'button'
  }
})

defineEmits(['click'])

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2 text-xs font-medium rounded-full gap-2'
    case 'lg':
      return 'px-7 py-3.5 text-sm font-semibold rounded-full gap-2.5'
    case 'md':
    default:
      return 'px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full gap-2'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-surface-muted dark:bg-[#252830] text-ink dark:text-canvas hover:bg-border/40 active:translate-y-px border border-border'
    case 'outline':
      return 'border border-ink/20 dark:border-white/20 text-ink dark:text-canvas hover:bg-black/5 dark:hover:bg-white/5 active:translate-y-px'
    case 'ghost':
      return 'text-ink-secondary dark:text-ink-muted hover:text-ink dark:hover:text-canvas hover:bg-black/5 dark:hover:bg-white/5 active:translate-y-px'
    case 'danger':
      return 'bg-red-700 text-white hover:bg-red-800 active:translate-y-px'
    case 'primary':
    default:
      return 'btn-multi-layer'
  }
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="!to ? type : undefined"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none transition-all duration-150"
    :class="[sizeClasses, variantClasses]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
    <slot />
  </component>
</template>
