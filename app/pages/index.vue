<template>
  <div>
    <section class="border-y border-hairline-soft bg-surface py-section md:py-section-lg" aria-labelledby="benefits-title">
      <div :class="ui.container">
        <h2 id="benefits-title" class="sr-only">Por que solicitar orçamento conosco</h2>
        <ul class="grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(b, i) in benefits" :key="b.title" class="list-none">
            <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.05 * i">
              <article :class="[ui.cardBase, 'h-full transition-shadow hover:shadow-[var(--shadow-card)]']">
                <span
                  class="mb-md inline-flex size-10 items-center justify-center rounded-full bg-brand-green-soft text-brand-green-deep"
                  aria-hidden="true"
                >
                  <component :is="b.icon" class="size-5" stroke-width="1.75" />
                </span>
                <h3 class="text-heading-md font-semibold text-ink">{{ b.title }}</h3>
                <p class="mt-2 text-body-md text-charcoal">{{ b.text }}</p>
              </article>
            </MotionComponent>
          </li>
        </ul>
      </div>
    </section>

    <section id="projetos" class="scroll-mt-24 bg-canvas py-section md:py-section-lg">
      <div :class="ui.container">
        <div class="mb-xxl flex w-full flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div class="min-w-0 max-w-section">
            <p :class="[ui.eyebrow, 'mb-3']">Principais projetos</p>
            <h2 class="text-display-xl font-semibold text-ink">Fardamentos que trabalhamos</h2>
            <p class="mt-3 max-w-copy text-body-lg text-charcoal">
              Conheça os tipos de uniforme e peças sob medida que atendemos — da modelagem ao acabamento com a identidade da sua equipe.
            </p>
          </div>
          <p
            v-if="!portfolio.loading"
            class="shrink-0 rounded-full bg-brand-green-soft px-md py-sm text-body-tabular tabular-nums text-ink"
          >
            {{ portfolio.items.length }}
            {{ portfolio.items.length === 1 ? 'tipo de projeto' : 'tipos de projeto' }}
          </p>
        </div>

        <p v-if="portfolio.error" :class="[ui.alertError, 'mb-md']" role="alert">{{ portfolio.error }}</p>
        <div v-if="portfolio.loading" class="py-16 text-center text-steel">Carregando projetos…</div>
        <div
          v-else-if="portfolio.items.length === 0"
          :class="[ui.cardHelp, 'mx-auto max-w-card py-16 text-center']"
        >
          <p class="text-display-md font-semibold text-ink">Catálogo em atualização</p>
          <p class="mt-2 text-charcoal">
            Novos tipos de projeto serão publicados em breve. Enquanto isso, envie sua proposta — atendemos demandas personalizadas.
          </p>
          <NuxtLink :to="proposalEntryTo" :class="[ui.btnAccent, 'mt-6 inline-flex']">
            Solicitar orçamento
          </NuxtLink>
        </div>
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PortfolioCard
            v-for="(item, idx) in portfolio.items"
            :key="item.id"
            :item="item"
            :index="idx"
          />
        </div>

        <div
          v-if="!portfolio.loading && portfolio.items.length > 0"
          :class="[ui.cardHelp, 'mt-xxl md:flex md:items-center md:justify-between md:text-left']"
        >
          <div class="max-w-section">
            <p class="text-heading-md font-semibold text-ink">Precisa de um desses projetos?</p>
            <p class="mt-1 text-body-md text-charcoal">
              Envie sua proposta com quantidade e detalhes — montamos o orçamento para o seu caso.
            </p>
          </div>
          <NuxtLink :to="proposalEntryTo" :class="[ui.btnAccent, 'mt-5 inline-flex shrink-0 md:mt-0']">
            Solicitar orçamento
          </NuxtLink>
        </div>
      </div>
    </section>

    <section
      class="relative overflow-hidden bg-canvas-dark py-section-lg text-on-dark"
      aria-labelledby="cta-title"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,rgb(0_212_164/0.2),transparent_50%)]"
      />
      <div class="relative z-10 mx-auto max-w-copy px-lg text-center md:px-xl">
        <MotionComponent animation="fade" :duration="0.55">
          <p class="mx-auto mb-4 w-fit rounded-full bg-white/10 px-sm py-xs text-micro-cap text-on-dark">
            Próximo passo
          </p>
          <h2 id="cta-title" class="text-display-xl font-semibold">Monte sua proposta agora</h2>
          <p class="mt-4 text-subtitle text-on-dark-muted">
            Conte o que sua equipe precisa em poucos minutos. Nossa equipe analisa e retorna com o orçamento.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <NuxtLink :to="registerTo" :class="ui.btnOnDark">
              {{ showAsClient ? 'Nova proposta' : 'Criar conta e enviar' }}
            </NuxtLink>
            <NuxtLink v-if="showAsGuest" to="/login" :class="ui.btnSecondaryOnDark">
              Já tenho conta
            </NuxtLink>
          </div>
        </MotionComponent>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ClipboardList, LineChart, Ruler, ShieldCheck } from '@lucide/vue'
import { usePortfolioStore } from '~/store/portfolio'

definePageMeta({ layout: 'default' })
useHead({
  title: 'Orçamento de fardamentos · Santiago Camisaria',
  meta: [
    {
      name: 'description',
      content:
        'Solicite orçamento de fardamentos sob medida. Envie proposta online, acompanhe status e receba retorno da equipe Santiago Camisaria.',
    },
  ],
})

const ui = useSiteUi()
const portfolio = usePortfolioStore()
const { showAsClient, showAsGuest } = useClientAuthUi()

const benefits = [
  {
    title: 'Proposta digital',
    text: 'Briefing estruturado em um único fluxo, sem troca de mensagens soltas.',
    icon: ClipboardList,
  },
  {
    title: 'Custo transparente',
    text: 'Orçamento com base em modelo, tecido e quantidade — clareza antes de produzir.',
    icon: LineChart,
  },
  {
    title: 'Sob medida',
    text: 'Modelagem, tecido e acabamento alinhados à identidade da sua equipe.',
    icon: Ruler,
  },
  {
    title: 'Acompanhamento',
    text: 'Status visível da proposta do envio até a etapa de produção.',
    icon: ShieldCheck,
  },
]

const proposalEntryTo = computed(() =>
  showAsClient.value ? '/propostas/nova' : '/login?redirect=/propostas/nova',
)
const registerTo = computed(() => (showAsClient.value ? '/propostas/nova' : '/register'))

onMounted(() => {
  portfolio.fetch()
})
</script>
