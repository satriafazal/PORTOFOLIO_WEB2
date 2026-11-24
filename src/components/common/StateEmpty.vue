<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: {
    type: String,
    default: 'Hasil Pencarian Kosong'
  },
  description: {
    type: String,
    default: 'Tidak ada proyek yang sesuai dengan kriteria kata kunci atau kategori yang Anda pilih.'
  },
  actionText: {
    type: String,
    default: 'Reset Filter'
  },
  showAction: {
    type: Boolean,
    default: true
  }
})

defineEmits(['action'])
</script>

<template>
  <div class="rounded-card border border-dashed border-border bg-surface-subtle dark:bg-[#181A20]/50 p-12 text-center max-w-md mx-auto my-10">
    <div class="text-xs font-mono text-ink-muted uppercase tracking-widest mb-3">
      [ Null Data ]
    </div>

    <h3 class="text-base font-sans font-semibold text-ink dark:text-canvas mb-2">
      {{ title }}
    </h3>
    <p class="text-xs sm:text-sm text-ink-muted mb-6 leading-relaxed">
      {{ description }}
    </p>

    <div v-if="showAction" class="flex justify-center">
      <BaseButton variant="secondary" size="sm" @click="$emit('action')">
        {{ actionText }}
      </BaseButton>
    </div>
  </div>
</template>
