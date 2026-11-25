import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/projects'
import { apiService } from '@/services/api'

describe('useProjectStore Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    apiService.setSimulateError(false)
  })

  it('initializes with default values', () => {
    const store = useProjectStore()
    expect(store.projects).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.searchQuery).toBe('')
    expect(store.selectedCategory).toBe('All')
  })

  it('fetches projects from mock API successfully', async () => {
    const store = useProjectStore()
    await store.fetchProjects()

    expect(store.projects.length).toBe(18)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('filters projects by category correctly', async () => {
    const store = useProjectStore()
    await store.fetchProjects()

    store.setSelectedCategory('Web Application')
    const webApps = store.filteredProjects
    expect(webApps.length).toBeGreaterThan(0)
    webApps.forEach(p => {
      expect(p.category).toBe('Web Application')
    })
  })

  it('filters projects by search keyword', async () => {
    const store = useProjectStore()
    await store.fetchProjects()

    store.setSearchQuery('WattCare')
    const results = store.filteredProjects
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].title).toContain('WattCare')
  })

  it('computes isEmpty correctly when no matches found', async () => {
    const store = useProjectStore()
    await store.fetchProjects()

    store.setSearchQuery('NonExistentKeywordXYZ123')
    expect(store.filteredProjects.length).toBe(0)
    expect(store.isEmpty).toBe(true)
  })
})
