<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Cari proyek, teknologi, atau anggota tim...'
  }
})

defineEmits(['update:modelValue', 'clear'])
</script>

<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-muted">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full pl-11 pr-10 py-3 text-sm bg-neutral dark:bg-[#181A20] text-ink dark:text-canvas placeholder-ink-muted/70 rounded-full border border-border shadow-input focus:outline-none focus:border-ink/40 dark:focus:border-white/40 focus:ring-1 focus:ring-ink/20 transition"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <button
      v-if="modelValue"
      type="button"
      class="absolute inset-y-0 right-0 pr-4 flex items-center text-ink-muted hover:text-ink dark:hover:text-canvas transition cursor-pointer"
      title="Bersihkan"
      @click="$emit('update:modelValue', ''); $emit('clear')"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
