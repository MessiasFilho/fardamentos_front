<template>
  <div class="min-h-[60vh] bg-canvas-soft py-12 md:py-16">
    <div :class="ui.container">
      <MotionComponent animation="fade" :duration="0.45">
        <div class="mb-xxl flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <div class="min-w-0">
            <p :class="[ui.eyebrow, 'mb-1']">Minha conta</p>
            <h1 class="text-display-xl font-light text-ink">Minhas propostas</h1>
            <p v-if="userStore.user" class="mt-2 text-body-md text-ink-secondary">
              Olá, {{ userStore.user.name }}
            </p>
          </div>
          <NuxtLink
            to="/propostas/nova"
            :class="[ui.btnPrimary, 'shrink-0']"
          >
            Nova proposta
          </NuxtLink>
        </div>
      </MotionComponent>

      <p v-if="proposalsStore.error" :class="[ui.alertError, 'mb-md']" role="alert">
        {{ proposalsStore.error }}
      </p>

      <div v-if="proposalsStore.loading" class="py-16 text-center text-ink-mute">
        Carregando…
      </div>

      <MotionComponent
        v-else-if="proposalsStore.items.length === 0"
        animation="slide"
        direction="up"
        :duration="0.45"
      >
        <div :class="[ui.cardFeature, 'mx-auto max-w-card py-16 text-center']">
          <p class="text-body-lg text-ink-secondary">Você ainda não enviou propostas.</p>
          <NuxtLink
            to="/propostas/nova"
            :class="[ui.btnPrimary, 'mt-6 inline-flex']"
          >
            Enviar primeira proposta
          </NuxtLink>
        </div>
      </MotionComponent>

      <ul v-else class="space-y-4">
        <li
          v-for="(p, idx) in proposalsStore.items"
          :key="p.id"
          class="list-none"
        >
          <MotionComponent
            animation="slide"
            direction="up"
            :duration="0.45"
            :delay="0.05 * (idx % 10)"
          >
            <article
              :class="[
                ui.cardFeature,
                'transition-[box-shadow,border-color] hover:border-primary-soft hover:shadow-2',
              ]"
            >
              <div class="flex flex-wrap items-start justify-between gap-md">
                <div class="min-w-0 flex-1">
                  <p :class="ui.pillSoft">{{ p.proposalNumber }}</p>
                  <h2 class="mt-2 text-display-md font-light text-ink">
                    {{ p.title || 'Proposta de fardamento' }}
                  </h2>
                  <p class="mt-2 line-clamp-2 text-body-md text-ink-secondary">
                    {{ p.description }}
                  </p>
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
                  ·
                  <span class="tabular-nums text-body-tabular text-ink-secondary">
                    ~{{ p.quantityEstimate }} peças
                  </span>
                </template>
              </p>
            </article>
          </MotionComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProposalsStore } from '~/store/proposals'
import { useUserStore } from '~/store/user'

definePageMeta({ layout: 'default', middleware: ['client-only'] })
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

function statusLabel(s: string) {
  return STATUS_LABELS[s] ?? s
}

function statusBadgeClass(s: string) {
  switch (s) {
    case 'received':
      return 'bg-canvas-cream text-lemon'
    case 'quoted':
      return 'bg-primary-bg-subdued text-primary-deep'
    case 'in_production':
      return 'bg-canvas-soft text-ink-secondary'
    case 'delivered':
      return 'bg-primary-bg-subdued text-primary-deep'
    case 'cancelled':
      return 'bg-canvas-soft text-ink-mute'
    default:
      return 'bg-primary-bg-subdued text-primary-deep'
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
