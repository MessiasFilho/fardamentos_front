import { defineStore } from 'pinia'
import type { ProposalForm } from '~/utils/proposalBrief'
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
  return { Authorization: `Bearer ${token}` }
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

    async create(payload: {
      form: ProposalForm
      logoFile?: File | null
    }) {
      this.submitting = true
      this.error = ''
      try {
        const token = useUserStore().token
        if (!token) throw new Error('Faça login para continuar.')

        const { form, logoFile } = payload
        const description = form.description.trim()
        const body = new FormData()
        const title = form.title.trim()
        if (title) body.append('title', title)
        body.append('description', description)
        body.append(
          'quantity_estimate',
          String(form.quantity === '' ? 0 : form.quantity),
        )
        if (logoFile) body.append('logo_file', logoFile, logoFile.name)

        return await $fetch<{
          message: string
          proposalNumber: string
          logoFileUrl?: string
          whatsapp?: { clientNotified?: boolean; warning?: string }
        }>(`${getApiBase()}/api/fardamentos/proposals`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body,
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
