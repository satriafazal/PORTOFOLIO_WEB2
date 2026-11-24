<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <div class="min-h-[70dvh] flex items-center justify-center px-6 py-20 text-center">
    <div class="max-w-md space-y-5">
      <div class="font-mono text-xs text-ink-muted uppercase tracking-widest">
        [ 404 &bull; Not Found ]
      </div>

      <h1 class="text-3xl sm:text-4xl font-sans font-medium tracking-tightest text-ink dark:text-canvas">
        Halaman Tidak Ditemukan
      </h1>

      <p class="text-sm text-ink-muted leading-relaxed font-sans">
        Alamat URL yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>

      <div class="pt-3">
        <BaseButton to="/" variant="primary" size="md">
          Kembali ke Overview
        </BaseButton>
      </div>
    </div>
  </div>
</template>
