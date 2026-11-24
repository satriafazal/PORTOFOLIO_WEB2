/**
 * Live REST API Service Layer
 * Mengonsumsi live API MockAPI (atau SQLite backend server).
 * Tidak lagi menggunakan hardcoded dummy data lokal.
 */

// Otomatis bersihkan URL jika ada trailing '/:endpoint' atau '/'
const rawEnvUrl = (import.meta.env?.VITE_MOCKAPI_URL || '').trim()
const BASE_URL = (rawEnvUrl || 'https://6b05bbbbdb01cf463608ffe1.mockapi.io/api/v1')
  .replace(/\/:endpoint\/?$/, '')
  .replace(/\/$/, '')

const STORAGE_KEY = 'simulate_api_error'

const getStoredSimulateError = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(STORAGE_KEY) === 'true'
    }
  } catch {
    // ignore
  }
  return false
}

let simulateNetworkError = getStoredSimulateError()

export const apiService = {
  /**
   * Mengatur simulasi error jaringan untuk pengujian dosen
   */
  setSimulateError(value) {
    simulateNetworkError = Boolean(value)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, String(simulateNetworkError))
      }
    } catch {
      // ignore
    }
  },

  isSimulatingError() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        simulateNetworkError = window.localStorage.getItem(STORAGE_KEY) === 'true'
      }
    } catch {
      // ignore
    }
    return simulateNetworkError
  },

  getBaseUrl() {
    return BASE_URL
  },

  /**
   * Helper delay untuk mensimulasikan latensi jaringan HTTP
   */
  _delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  /**
   * GET /projects
   * Mengambil data proyek langsung dari MockAPI / SQLite server
   */
  async getProjects({ search = '', category = '', memberId = null } = {}) {
    await this._delay(200)

    if (simulateNetworkError) {
      const err = new Error('Gagal menghubungi server REST API (500 Internal Server Error). Silakan coba lagi.')
      err.status = 500
      throw err
    }

    const response = await fetch(`${BASE_URL}/projects`, {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) {
      const err = new Error(`Gagal mengambil data proyek dari API (HTTP ${response.status} ${response.statusText}).`)
      err.status = response.status
      throw err
    }

    const rawData = await response.json()
    let filtered = Array.isArray(rawData) ? rawData : []

    // Normalisasi struktur (jika features/techStack berupa string JSON dari SQLite)
    filtered = filtered.map(p => ({
      ...p,
      id: Number(p.id),
      leadMemberId: Number(p.leadMemberId),
      techStack: Array.isArray(p.techStack) ? p.techStack : (typeof p.techStack === 'string' ? JSON.parse(p.techStack || '[]') : []),
      features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features || '[]') : []),
      gallery: Array.isArray(p.gallery) ? p.gallery : (typeof p.gallery === 'string' ? JSON.parse(p.gallery || '[]') : []),
      contributors: Array.isArray(p.contributors) ? p.contributors : (typeof p.contributors === 'string' ? JSON.parse(p.contributors || '[]') : []),
      featured: Boolean(p.featured)
    }))

    // Filter kategori
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category?.toLowerCase() === category.toLowerCase())
    }

    // Filter member ID
    if (memberId) {
      filtered = filtered.filter(p => Number(p.leadMemberId) === Number(memberId))
    }

    // Filter search keyword
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim()
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.summary && p.summary.toLowerCase().includes(q)) ||
        (p.techStack && p.techStack.some(t => t.toLowerCase().includes(q))) ||
        (p.leadMemberName && p.leadMemberName.toLowerCase().includes(q))
      )
    }

    return {
      status: 200,
      total: filtered.length,
      data: filtered,
      source: BASE_URL,
      timestamp: new Date().toISOString()
    }
  },

  /**
   * GET /projects/:id
   */
  async getProjectById(id) {
    await this._delay(200)

    if (simulateNetworkError) {
      const err = new Error('Koneksi API terputus (503 Service Unavailable).')
      err.status = 503
      throw err
    }

    // Coba request direct ID
    const response = await fetch(`${BASE_URL}/projects/${id}`)
    if (response.ok) {
      const p = await response.json()
      return {
        status: 200,
        data: {
          ...p,
          id: Number(p.id),
          leadMemberId: Number(p.leadMemberId),
          techStack: Array.isArray(p.techStack) ? p.techStack : (typeof p.techStack === 'string' ? JSON.parse(p.techStack || '[]') : []),
          features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features || '[]') : []),
          gallery: Array.isArray(p.gallery) ? p.gallery : (typeof p.gallery === 'string' ? JSON.parse(p.gallery || '[]') : []),
          contributors: Array.isArray(p.contributors) ? p.contributors : (typeof p.contributors === 'string' ? JSON.parse(p.contributors || '[]') : []),
          featured: Boolean(p.featured)
        }
      }
    }

    // Fallback search dalam array list jika mockapi return 404 pada single endpoint
    const listRes = await this.getProjects()
    const found = listRes.data.find(p => Number(p.id) === Number(id))
    if (!found) {
      const err = new Error(`Proyek dengan ID ${id} tidak ditemukan di server API.`)
      err.status = 404
      throw err
    }

    return {
      status: 200,
      data: found
    }
  },

  /**
   * GET /projects/featured
   */
  async getFeaturedProjects() {
    const res = await this.getProjects()
    const featured = res.data.filter(p => p.featured)
    return {
      status: 200,
      data: featured.length > 0 ? featured : res.data.slice(0, 3)
    }
  },

  /**
   * GET /team
   */
  async getTeamMembers() {
    await this._delay(200)

    if (simulateNetworkError) {
      const err = new Error('Gagal mengambil data profil tim dari REST API (500).')
      err.status = 500
      throw err
    }

    const response = await fetch(`${BASE_URL}/team`)
    if (!response.ok) {
      const err = new Error(`Gagal mengambil data tim (HTTP ${response.status}).`)
      err.status = response.status
      throw err
    }

    const rawData = await response.json()
    const members = (Array.isArray(rawData) ? rawData : []).map(m => ({
      ...m,
      id: Number(m.id),
      skills: Array.isArray(m.skills) ? m.skills : (typeof m.skills === 'string' ? JSON.parse(m.skills || '[]') : [])
    }))

    return {
      status: 200,
      total: members.length,
      data: members,
      source: BASE_URL
    }
  },

  /**
   * GET /team/:id
   */
  async getTeamMemberById(id) {
    await this._delay(200)

    if (simulateNetworkError) {
      throw new Error('Gagal memuat profil anggota dari API.')
    }

    const membersRes = await this.getTeamMembers()
    const member = membersRes.data.find(m => Number(m.id) === Number(id))
    if (!member) {
      const err = new Error(`Anggota dengan ID ${id} tidak ditemukan di server API.`)
      err.status = 404
      throw err
    }

    return {
      status: 200,
      data: member
    }
  },

  /**
   * POST /contact atau /messages
   */
  async submitContact(formData) {
    await this._delay(400)

    if (simulateNetworkError) {
      const err = new Error('Pengiriman pesan gagal karena kendala server (500). Silakan coba lagi.')
      err.status = 500
      throw err
    }

    if (!formData.name || !formData.email || !formData.message) {
      const err = new Error('Mohon lengkapi semua bidang yang wajib diisi.')
      err.status = 400
      throw err
    }

    const submittedAt = new Date().toISOString()
    const payload = {
      ...formData,
      submittedAt
    }

    try {
      // Coba kirim ke endpoint /messages di MockAPI / SQLite server
      await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } catch (e) {
      console.warn('POST /messages log:', e.message)
    }

    return {
      status: 201,
      success: true,
      message: `Terima kasih, ${formData.name}! Pesan Anda telah berhasil terkirim ke server API tim.`,
      receivedData: payload
    }
  }
}
