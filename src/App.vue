<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
    <!-- Navbar Fixed (Height h-16) -->
    <AppNavbar />

    <!-- Offset fixed navbar: pt-16 -->
    <div class="pt-16 flex-grow flex flex-col">
      <!-- Global Breadcrumb bar on all non-home pages -->
      <AppBreadcrumb />

      <!-- Main Page Content without collapsing layout shifts -->
      <main class="flex-grow">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
