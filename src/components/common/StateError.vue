<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: {
    type: String,
    default: 'Gagal Memuat Data'
  },
  message: {
    type: String,
    default: 'Terjadi gangguan saat memuat data dari server. Silakan coba kembali beberapa saat lagi.'
  },
  showRetry: {
    type: Boolean,
    default: true
  }
})

defineEmits(['retry'])
</script>

<template>
  <div class="rounded-card border border-border bg-surface dark:bg-[#181A20] p-8 text-center max-w-lg mx-auto my-8 shadow-card">
    <div class="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4 font-mono text-xs font-bold border border-red-200 dark:border-red-900/40">
      500
    </div>
    
    <h3 class="text-base font-sans font-semibold text-ink dark:text-canvas mb-1.5">
      {{ title }}
    </h3>
    <p class="text-xs sm:text-sm text-ink-muted mb-6 leading-relaxed">
      {{ message }}
    </p>

    <div v-if="showRetry" class="flex justify-center">
      <BaseButton variant="primary" size="sm" @click="$emit('retry')">
        Ulangi Permintaan
      </BaseButton>
    </div>
  </div>
</template>
