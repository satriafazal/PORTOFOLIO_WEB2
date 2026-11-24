import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TeamView from '@/views/TeamView.vue'
import MemberDetailView from '@/views/MemberDetailView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Beranda — KELOMPOK 2' }
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView,
    meta: { title: 'Profil Tim — KELOMPOK 2' }
  },
  {
    path: '/team/:id',
    name: 'MemberDetail',
    component: MemberDetailView,
    meta: { title: 'Profil Anggota — KELOMPOK 2' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { title: 'Showcase Proyek — KELOMPOK 2' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetailView,
    meta: { title: 'Detail Proyek — KELOMPOK 2' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    meta: { title: 'Kontak Tim — KELOMPOK 2' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'Halaman Tidak Ditemukan — KELOMPOK 2' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
