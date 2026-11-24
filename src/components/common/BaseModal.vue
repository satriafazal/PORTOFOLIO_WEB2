<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: 'max-w-md'
  }
})

const emit = defineEmits(['close'])

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/40 dark:bg-black/60 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full rounded-card bg-canvas dark:bg-[#1A1C21] p-6 sm:p-7 shadow-card border border-border"
          :class="maxWidth"
        >
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-3 border-b border-border">
            <h3 class="text-base font-sans font-semibold text-ink dark:text-canvas">
              {{ title }}
            </h3>
            <button
              type="button"
              class="p-1 rounded-full text-ink-muted hover:text-ink dark:hover:text-canvas transition cursor-pointer"
              aria-label="Tutup"
              @click="emit('close')"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body Modal -->
          <div class="py-4 text-ink dark:text-canvas text-sm">
            <slot />
          </div>

          <!-- Footer Modal -->
          <div v-if="$slots.footer" class="pt-3 border-t border-border flex justify-end gap-2.5">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
