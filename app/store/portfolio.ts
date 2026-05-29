import { defineStore } from 'pinia'

export interface PortfolioItem {
  id: number
  name: string
  description: string
  images: string[]
  sku: string
}

interface ApiProduct {
  id: number
  name: string
  description: string
  images?: string[]
  sku: string
}

function getApiBase() {
  return useRuntimeConfig().public.apiBase as string
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    items: [] as PortfolioItem[],
    loading: false,
    error: '',
  }),

  actions: {
    async fetch() {
      this.loading = true
      this.error = ''
      try {
        const res = await $fetch<{ products: ApiProduct[] }>(
          `${getApiBase()}/public/fardamentos/portfolio`,
          { query: { limit: '48' } },
        )
        this.items = (res.products ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description ?? '',
          images: p.images ?? [],
          sku: p.sku,
        }))
      } catch (e: unknown) {
        const err = e as { data?: { error?: string } }
        this.error = err.data?.error ?? 'Não foi possível carregar os projetos.'
        this.items = []
      } finally {
        this.loading = false
      }
    },
  },
})
