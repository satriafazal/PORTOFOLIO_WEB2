import { defineStore } from 'pinia'
import { apiService } from '@/services/api'

export const useTeamStore = defineStore('team', {
  state: () => ({
    members: [],
    currentMember: null,
    loading: false,
    detailLoading: false,
    error: null
  }),

  getters: {
    getMemberById: (state) => (id) => {
      return state.members.find(m => Number(m.id) === Number(id))
    },
    totalMembers: (state) => state.members.length
  },

  actions: {
    async fetchMembers() {
      if (this.members.length > 0) return
      this.loading = true
      this.error = null
      try {
        const res = await apiService.getTeamMembers()
        this.members = res.data || []
      } catch (err) {
        this.error = err.message || 'Gagal memuat profil anggota tim dari API.'
      } finally {
        this.loading = false
      }
    },

    async fetchMemberById(id) {
      this.detailLoading = true
      this.currentMember = null
      try {
        // Cek dulu dari cache members
        const cached = this.getMemberById(id)
        if (cached) {
          this.currentMember = cached
        } else {
          const res = await apiService.getTeamMemberById(id)
          this.currentMember = res.data
        }
      } catch (err) {
        console.error('Error fetching member:', err)
      } finally {
        this.detailLoading = false
      }
    }
  }
})
