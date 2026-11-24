<script setup>
defineProps({
  count: {
    type: Number,
    default: 6
  },
  type: {
    type: String,
    default: 'card' // 'card' | 'detail' | 'list'
  }
})
</script>

<template>
  <div v-if="type === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="i in count"
      :key="i"
      class="bg-surface dark:bg-[#181A20] border border-border rounded-card overflow-hidden shadow-card p-0 animate-pulse"
    >
      <!-- Image shimmer -->
      <div class="w-full h-48 animate-shimmer"></div>
      
      <div class="p-6 space-y-3.5">
        <div class="h-3.5 bg-border rounded-full w-1/4 animate-shimmer"></div>
        <div class="h-5 bg-border rounded-full w-4/5 animate-shimmer"></div>
        <div class="space-y-2 pt-1">
          <div class="h-3 bg-border rounded-full w-full animate-shimmer"></div>
          <div class="h-3 bg-border rounded-full w-2/3 animate-shimmer"></div>
        </div>
        <div class="flex gap-2 pt-3">
          <div class="h-5 w-14 bg-border rounded-full animate-shimmer"></div>
          <div class="h-5 w-16 bg-border rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="type === 'detail'" class="max-w-4xl mx-auto space-y-6 animate-pulse">
    <div class="h-4 bg-border rounded-full w-1/5 animate-shimmer"></div>
    <div class="h-10 bg-border rounded-full w-3/4 animate-shimmer"></div>
    <div class="w-full h-80 bg-border rounded-card animate-shimmer"></div>
    <div class="space-y-3 pt-3">
      <div class="h-4 bg-border rounded-full w-full animate-shimmer"></div>
      <div class="h-4 bg-border rounded-full w-5/6 animate-shimmer"></div>
      <div class="h-4 bg-border rounded-full w-4/6 animate-shimmer"></div>
    </div>
  </div>
</template>
