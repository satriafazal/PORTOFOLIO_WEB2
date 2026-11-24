<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'

const route = useRoute()
const projectStore = useProjectStore()
const teamStore = useTeamStore()

const isHome = computed(() => route.path === '/')

const breadcrumbs = computed(() => {
  const list = [
    { name: 'Beranda', path: '/' }
  ]

  // 1. Rute Halaman Tim (/team)
  if (route.path === '/team') {
    list.push({ name: 'Tim', path: '/team' })
  }

  // 2. Rute Profil Anggota Tim Spesifik (/team/:id)
  else if (route.name === 'MemberDetail') {
    const memberId = Number(route.params.id)
    const member = teamStore.getMemberById(memberId)
    list.push({ name: 'Tim', path: '/team' })
    if (member) {
      list.push({ name: member.name, path: `/team/${member.id}` })
    } else {
      list.push({ name: 'Profil Anggota', path: route.fullPath })
    }
  }

  // 3. Rute Showcase Proyek (/projects)
  else if (route.path === '/projects') {
    if (route.query.member) {
      const memberId = Number(route.query.member)
      const member = teamStore.getMemberById(memberId)
      list.push({ name: 'Tim', path: '/team' })
      if (member) {
        list.push({ name: member.name, path: `/team/${member.id}` })
        list.push({ name: 'Proyek', path: route.fullPath })
      } else {
        list.push({ name: 'Showcase Proyek', path: '/projects' })
      }
    } else {
      list.push({ name: 'Showcase Proyek', path: '/projects' })
    }
  }

  // 4. Rute Detail Proyek (/projects/:id)
  else if (route.name === 'ProjectDetail') {
    const currentId = Number(route.params.id)
    const proj = projectStore.currentProject || projectStore.projects.find(p => Number(p.id) === currentId)
    const projTitle = proj?.title || 'Detail Proyek'

    const from = route.query.from
    const memberId = route.query.member ? Number(route.query.member) : null

    // A. Alur dari Profil Anggota Tim (Beranda -> Tim -> [Nama Anggota] -> [Judul Proyek])
    if (from === 'team' || from === 'member' || memberId) {
      const targetMemberId = memberId || proj?.leadMemberId
      const member = targetMemberId ? teamStore.getMemberById(targetMemberId) : null
      list.push({ name: 'Tim', path: '/team' })
      if (member) {
        list.push({ name: member.name, path: `/team/${member.id}` })
      }
    }
    // B. Alur langsung dari Beranda (Beranda -> [Judul Proyek])
    else if (from === 'home') {
      // Tidak menambahkan Showcase Proyek karena pengguna langsung mengklik dari Beranda
    }
    // C. Alur dari Showcase Proyek atau Direct URL (Beranda -> Showcase Proyek -> [Judul Proyek])
    else {
      list.push({ name: 'Showcase Proyek', path: '/projects' })
    }

    list.push({ name: projTitle, path: route.fullPath })
  }

  // 5. Rute Kontak (/contact)
  else if (route.path === '/contact') {
    list.push({ name: 'Kontak', path: '/contact' })
  }

  // 6. Rute 404
  else if (route.name === 'NotFound') {
    list.push({ name: '404 Tidak Ditemukan', path: route.fullPath })
  }

  return list
})
</script>

<template>
  <!-- Sticky Breadcrumb Bar: Tepat di Bawah Navbar Fixed (top-16) dan Opaque Tanpa Garis Pembatas -->
  <div
    v-if="!isHome"
    class="sticky top-16 z-[90] py-3 px-6 select-none shadow-sm transition-colors"
    style="background-color: var(--color-bg);"
  >
    <div class="max-w-[1280px] mx-auto">
      <nav class="flex items-center gap-2 text-xs font-mono text-ink-muted overflow-x-auto whitespace-nowrap scrollbar-none" aria-label="Breadcrumb">
        
        <!-- Home Link -->
        <router-link
          to="/"
          class="flex items-center gap-1.5 hover:text-ink dark:hover:text-canvas transition-colors focus:outline-none"
          title="Kembali ke Beranda"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Beranda</span>
        </router-link>

        <template v-for="(crumb, idx) in breadcrumbs.slice(1)" :key="idx">
          <!-- Separator chevron / slash -->
          <span class="text-ink-muted/40 select-none">/</span>

          <!-- Last Item (Active Page) -->
          <span
            v-if="idx === breadcrumbs.length - 2"
            class="text-ink dark:text-canvas font-medium truncate max-w-xs sm:max-w-md"
            aria-current="page"
          >
            {{ crumb.name }}
          </span>

          <!-- Clickable Journey Segment -->
          <router-link
            v-else
            :to="crumb.path"
            class="hover:text-ink dark:hover:text-canvas transition-colors focus:outline-none underline-offset-4 hover:underline"
          >
            {{ crumb.name }}
          </router-link>
        </template>

      </nav>
    </div>
  </div>
</template>
