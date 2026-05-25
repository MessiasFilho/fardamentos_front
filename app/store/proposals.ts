import { defineStore } from 'pinia'
import type { ProposalBriefForm } from '~/utils/proposalBrief'
import { buildProposalTitle } from '~/utils/proposalBrief'
import { useUserStore } from '~/store/user'

export interface Proposal {
  id: number
  proposalNumber: string
  title: string
  description: string
  quantityEstimate: number
  modelType?: string
  fabricType?: string
  hasLogo?: boolean
  logoFileUrl?: string
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
      form: ProposalBriefForm
      logoFile?: File | null
    }) {
      this.submitting = true
      this.error = ''
      try {
        const token = useUserStore().token
        if (!token) throw new Error('Faça login para continuar.')

        const title = buildProposalTitle(payload.form)
        const body = new FormData()
        if (title?.trim()) body.append('title', title.trim())
        body.append('quantity_estimate', String(payload.form.quantity === '' ? 0 : payload.form.quantity))
        body.append('model_type', payload.form.modelType)
        if (payload.form.modelCustom.trim()) body.append('model_custom', payload.form.modelCustom.trim())
        body.append('fabric_type', payload.form.fabricType)
        if (payload.form.fabricCustom.trim()) body.append('fabric_custom', payload.form.fabricCustom.trim())
        if (payload.form.colors.trim()) body.append('colors', payload.form.colors.trim())
        if (payload.form.hasLogo !== null) body.append('has_logo', payload.form.hasLogo ? 'true' : 'false')
        if (payload.form.hasLogo === true) {
          body.append('logo_type', payload.form.logoType)
          body.append('logo_details', payload.form.logoDetails.trim())
        }
        if (payload.form.deadline.trim()) body.append('deadline', payload.form.deadline.trim())
        if (payload.form.extraNotes.trim()) body.append('extra_notes', payload.form.extraNotes.trim())
        if (payload.logoFile) body.append('logo_file', payload.logoFile, payload.logoFile.name)

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
