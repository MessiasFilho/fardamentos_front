<template>
  <div class="min-h-[60vh] bg-surface py-section md:py-section-lg">
    <div :class="ui.container">
      <div class="mb-xxl flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div class="min-w-0">
          <p :class="[ui.eyebrow, 'mb-1']">Minha conta</p>
          <h1 class="text-display-xl font-semibold text-ink">Minhas propostas</h1>
          <p v-if="userStore.user" class="mt-2 text-body-md text-charcoal">
            Olá, {{ userStore.user.name }}
          </p>
        </div>
        <NuxtLink to="/propostas/nova" :class="[ui.btnPrimary, 'shrink-0']">
          Nova proposta
        </NuxtLink>
      </div>

      <p v-if="proposalsStore.error" :class="[ui.alertError, 'mb-md']" role="alert">
        {{ proposalsStore.error }}
      </p>

      <div v-if="proposalsStore.loading" class="py-16 text-center text-ink-mute">
        Carregando…
      </div>

      <div
        v-else-if="proposalsStore.items.length === 0"
        :class="[ui.cardHelp, 'mx-auto max-w-card py-16 text-center']"
      >
        <p class="text-body-lg text-ink-secondary">Você ainda não enviou propostas.</p>
        <NuxtLink to="/propostas/nova" :class="[ui.btnPrimary, 'mt-6 inline-flex']">
          Enviar primeira proposta
        </NuxtLink>
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="p in proposalsStore.items"
          :key="p.id"
          class="list-none"
        >
          <article :class="ui.cardBase">
            <div class="flex flex-wrap items-start justify-between gap-md">
              <div class="min-w-0 flex-1">
                <p :class="ui.pillSoft">{{ p.proposalNumber }}</p>
                <h2 class="mt-2 text-display-md font-semibold text-ink">
                  {{ displayTitle(p) }}
                </h2>
              </div>
              <span
                class="shrink-0 rounded-full px-sm py-xs text-micro-cap font-normal uppercase tracking-wide"
                :class="statusBadgeClass(p.status)"
              >
                {{ statusLabel(p.status) }}
              </span>
            </div>
            <p class="mt-md text-caption text-ink-mute">
              {{ formatDate(p.createdAt) }}
              <template v-if="p.quantityEstimate > 0">
                · ~{{ p.quantityEstimate }} peças
              </template>
            </p>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProposalsStore, type Proposal } from '~/store/proposals'
import { useUserStore } from '~/store/user'

definePageMeta({ layout: 'default', middleware: ['client-only'], banner: { hide: true } })
useHead({ title: 'Minhas propostas · Fardamentos' })

const ui = useSiteUi()
const proposalsStore = useProposalsStore()
const userStore = useUserStore()

const STATUS_LABELS: Record<string, string> = {
  received: 'Recebida',
  quoted: 'Orçamento enviado',
  in_production: 'Em produção',
  delivered: 'Entregue',
  cancelled: 'Cancelada',
}

function displayTitle(p: Proposal) {
  return p.title?.trim() || 'Proposta de fardamento'
}

function statusLabel(s: string) {
  return STATUS_LABELS[s] ?? s
}

function statusBadgeClass(s: string) {
  switch (s) {
    case 'received':
      return 'bg-surface text-steel'
    case 'quoted':
      return 'bg-brand-green-soft text-ink'
    case 'in_production':
      return 'bg-surface text-charcoal'
    case 'delivered':
      return 'bg-brand-green-soft text-brand-green-deep'
    case 'cancelled':
      return 'bg-surface text-stone'
    default:
      return 'bg-brand-green-soft text-ink'
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

onMounted(() => {
  userStore.initFromStorage()
  proposalsStore.fetchMine().catch(() => {})
})
</script>
