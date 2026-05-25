import { defineStore } from 'pinia'

export interface Partner {
  id: number
  name: string
  description: string
  logo_url: string
  website: string
}

function getApiBase() {
  return useRuntimeConfig().public.apiBase as string
}

export const usePartnersStore = defineStore('partners', {
  state: () => ({
    items: [] as Partner[],
    loading: false,
    error: '',
  }),

  actions: {
    async fetch() {
      this.loading = true
      this.error = ''
      try {
        const res = await $fetch<{ partners: Partner[] }>(
          `${getApiBase()}/public/fardamentos/partners`,
        )
        this.items = res.partners ?? []
      } catch (e: unknown) {
        const err = e as { data?: { error?: string } }
        this.error = err.data?.error ?? 'Não foi possível carregar as empresas.'
        this.items = []
      } finally {
        this.loading = false
      }
    },
  },
})
