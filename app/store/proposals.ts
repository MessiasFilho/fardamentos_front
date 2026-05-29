import { defineStore } from 'pinia'
import type { ProposalForm } from '~/utils/proposalBrief'
import { productTypeLabel } from '~/utils/proposalBrief'
import { useUserStore } from '~/store/user'

export interface Proposal {
  id: number
  proposalNumber: string
  title: string
  description: string
  quantityEstimate: number
  status: string
  createdAt: string
}

function getApiBase() {
  return useRuntimeConfig().public.apiBase as string
}

function authHeaders() {
  const token = useUserStore().token
  if (!token) throw new Error('Faça login para continuar.')
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export const useProposalsStore = defineStore('proposals', {
  state: () => ({
    items: [] as Proposal[],
    loading: false,
    submitting: false,
    error: '',
  }),

  actions: {
    async fetchMine() {
      this.loading = true
      this.error = ''
      try {
        const res = await $fetch<{ proposals: Array<{
          id: number
          proposalNumber: string
          title: string
          description: string
          quantityEstimate: number
          status: string
          createdAt: string
        }> }>(`${getApiBase()}/api/fardamentos/proposals`, {
          headers: authHeaders(),
        })
        this.items = (res.proposals ?? []).map((p) => ({
          id: p.id,
          proposalNumber: p.proposalNumber,
          title: p.title,
          description: p.description,
          quantityEstimate: p.quantityEstimate,
          status: p.status,
          createdAt: p.createdAt,
        }))
      } catch (e: unknown) {
        const err = e as { data?: { error?: string } }
        this.error = err.data?.error ?? 'Não foi possível carregar suas propostas.'
        this.items = []
        throw e
      } finally {
        this.loading = false
      }
    },

    async create(payload: { form: ProposalForm }) {
      this.submitting = true
      this.error = ''
      try {
        const { form } = payload
        if (!form.productType) throw new Error('Selecione o tipo de produto.')

        return await $fetch<{
          message: string
          proposalNumber: string
          whatsapp?: { clientNotified?: boolean; warning?: string }
        }>(`${getApiBase()}/api/fardamentos/proposals`, {
          method: 'POST',
          headers: authHeaders(),
          body: {
            title: productTypeLabel(form.productType),
            description: form.description.trim(),
            quantity_estimate: form.quantity === '' ? 0 : Number(form.quantity),
          },
        })
      } catch (e: unknown) {
        const err = e as { data?: { error?: string } }
        this.error = err.data?.error ?? 'Não foi possível enviar a proposta.'
        throw e
      } finally {
        this.submitting = false
      }
    },
  },
})
