import { defineStore } from 'pinia'
import { apiService } from '@/services/api'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    featuredProjects: [],
    currentProject: null,
    loading: false,
    featuredLoading: false,
    detailLoading: false,
    error: null,
    featuredError: null,
    detailError: null,
    searchQuery: '',
    selectedCategory: 'All',
    selectedMemberId: null,
    categories: ['All', 'Web Application', 'Mobile App', 'UI/UX Design', 'AI & Data', 'Cloud & IoT']
  }),

  getters: {
    /**
     * Filter proyek reaktif berdasarkan query pencarian dan kategori
     */
    filteredProjects: (state) => {
      let result = state.projects

      if (state.selectedCategory && state.selectedCategory !== 'All') {
        result = result.filter(
          p => p.category.toLowerCase() === state.selectedCategory.toLowerCase()
        )
      }

      if (state.selectedMemberId) {
        result = result.filter(
          p => p.leadMemberId === Number(state.selectedMemberId)
        )
      }

      if (state.searchQuery && state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase().trim()
        result = result.filter(
          p =>
            p.title.toLowerCase().includes(q) ||
            p.summary.toLowerCase().includes(q) ||
            p.leadMemberName.toLowerCase().includes(q) ||
            p.techStack.some(t => t.toLowerCase().includes(q))
        )
      }

      return result
    },

    isEmpty: (state) => {
      return !state.loading && state.filteredProjects.length === 0
    },

    totalProjectsCount: (state) => state.projects.length
  },

  actions: {
    /**
     * Mengambil seluruh proyek dari MockAPI
     */
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        const res = await apiService.getProjects()
        this.projects = res.data
      } catch (err) {
        this.error = err.message || 'Gagal memuat daftar proyek dari server.'
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil proyek pilihan untuk Home Page
     */
    async fetchFeaturedProjects() {
      this.featuredLoading = true
      this.featuredError = null
      try {
        const res = await apiService.getFeaturedProjects()
        this.featuredProjects = res.data
      } catch (err) {
        this.featuredError = err.message || 'Gagal memuat highlight proyek pilihan.'
        console.error('Error fetching featured projects:', err)
      } finally {
        this.featuredLoading = false
      }
    },

    /**
     * Mengambil detail proyek berdasarkan ID
     */
    async fetchProjectById(id) {
      this.detailLoading = true
      this.detailError = null
      this.currentProject = null
      try {
        const res = await apiService.getProjectById(id)
        this.currentProject = res.data
      } catch (err) {
        this.detailError = err.message || 'Gagal mengambil detail proyek.'
      } finally {
        this.detailLoading = false
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    setSelectedMemberId(memberId) {
      this.selectedMemberId = memberId ? Number(memberId) : null
    },

    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'All'
      this.selectedMemberId = null
    }
  }
})
