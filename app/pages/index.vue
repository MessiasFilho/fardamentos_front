<template>
  <div>
    <!-- 1. Hero — mesh + proposta de valor + CTA único (DESIGN: um pill primário por faixa) -->
    <section
      class="relative overflow-hidden bg-canvas pb-[clamp(3rem,8vw,5rem)] pt-[clamp(4rem,10vw,7rem)]"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0" :class="ui.meshHero" />

      <div
        :class="[
          ui.container,
          'relative z-10 grid grid-cols-1 items-center gap-xxl lg:grid-cols-2 lg:gap-huge',
        ]"
      >
        <div class="w-full min-w-0 max-w-section">
            <p :class="[ui.pillSoft, 'mb-4 w-fit']">Uniformes profissionais</p>

            <h1
              id="hero-title"
              class="text-display-xxl font-light text-ink max-md:text-[2.25rem] max-md:tracking-[-0.02em]"
            >
              Fardamentos para equipes que exigem
              <span class="inline bg-linear-to-r from-primary via-magenta to-lemon bg-clip-text text-transparent">
                presença
              </span>
            </h1>

            <p class="mt-6 max-w-copy text-body-lg leading-normal text-ink-secondary">
              Veja trabalhos reais, conheça empresas atendidas e envie sua proposta de orçamento em poucos minutos — com acompanhamento online.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink
                :to="showAsClient ? '/propostas/nova' : '/login?redirect=/propostas/nova'"
                :class="ui.btnPrimary"
              >
                {{ showAsClient ? 'Nova proposta' : 'Enviar proposta' }}
              </NuxtLink>
              <a href="#portfolio" :class="ui.btnSecondary">Ver portfólio</a>
            </div>

            <ul class="mt-xl flex flex-wrap gap-md" aria-label="Indicadores">
              <li
                v-for="(stat, i) in heroStats"
                :key="stat.label"
                class="min-w-34 flex-1 rounded-lg border border-hairline bg-canvas px-lg py-md shadow-1"
              >
                <MotionComponent animation="fade" :delay="0.15 + i * 0.08" :duration="0.45">
                  <div class="w-full">
                    <p class="text-display-md font-light tabular-nums text-ink">{{ stat.value }}</p>
                    <p class="mt-xs text-caption text-ink-mute">{{ stat.label }}</p>
                  </div>
                </MotionComponent>
              </li>
            </ul>
        </div>

        <!-- Mockup produto (desktop) — prova visual, não decoração -->
        <MotionComponent animation="fade" :duration="0.7" :delay="0.2" class="relative hidden min-w-0 lg:block">
          <div class="relative min-h-[360px]">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute size-[200px] -top-5 right-[20%] rounded-full bg-primary/35 blur-3xl"
            />
            <div
              aria-hidden="true"
              class="pointer-events-none absolute bottom-[10%] left-[5%] size-40 rounded-full bg-ruby/20 blur-3xl"
            />
            <div
              class="absolute bottom-0 left-0 z-1 w-[min(48%,12rem)] min-w-40 rounded-lg border border-black/5 bg-canvas-cream p-lg shadow-2"
            >
              <p :class="[ui.eyebrow, 'mb-1']">Especialidade</p>
              <p class="text-body-md">Tecido, modelagem e bordado</p>
            </div>
            <div
              class="absolute inset-[8%_5%_12%_10%] z-2 flex flex-col justify-end rounded-lg border border-hairline bg-canvas p-lg shadow-2"
            >
              <p :class="[ui.pillSoft, 'mb-2 w-fit']">Proposta online</p>
              <p class="text-heading-md font-light">Do briefing ao orçamento em um só lugar.</p>
            </div>
            <div
              class="absolute top-0 right-0 z-3 w-[min(55%,13.5rem)] min-w-44 rounded-lg bg-brand-dark-900 p-md text-on-primary shadow-2"
            >
              <p class="mb-1 text-caption text-white/70">Status</p>
              <p class="text-body-md">Recebida · Orçada · Produção</p>
            </div>
          </div>
        </MotionComponent>
      </div>
    </section>

    <!-- 2. Como funciona — redução de fricção (3 passos) -->
    <section id="como-funciona" class="scroll-mt-24 border-y border-hairline bg-canvas py-huge">
      <div :class="ui.container">
        <MotionComponent animation="slide" direction="up" :duration="0.5">
          <div class="w-full max-w-section">
            <p :class="[ui.eyebrow, 'mb-3']">Processo</p>
            <h2 class="text-display-xl font-light">Como funciona</h2>
            <p class="mt-3 max-w-copy text-body-lg text-ink-secondary">
              Simples para você, organizado para nossa equipe produzir com precisão.
            </p>
          </div>
        </MotionComponent>

        <ol class="mt-xxl grid gap-lg md:grid-cols-3">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="list-none"
          >
            <MotionComponent animation="slide" direction="up" :duration="0.5" :delay="0.1 + i * 0.1">
              <article
                class="h-full rounded-lg border border-hairline bg-canvas-soft p-xl transition-[box-shadow,border-color] hover:border-primary-soft hover:shadow-1"
              >
                <span
                  class="mb-md inline-flex size-8 items-center justify-center rounded-full bg-primary text-caption font-normal text-on-primary"
                  aria-hidden="true"
                >
                  {{ i + 1 }}
                </span>
                <h3 class="text-heading-md font-light">{{ step.title }}</h3>
                <p class="mt-2 text-body-md text-ink-secondary">{{ step.text }}</p>
              </article>
            </MotionComponent>
          </li>
        </ol>
      </div>
    </section>

    <!-- 3. Portfólio — prova social (trabalhos reais) -->
    <section id="portfolio" class="scroll-mt-24 bg-canvas-soft py-16 md:py-24">
      <div :class="ui.container">
        <MotionComponent animation="fade" :duration="0.5">
          <div class="mb-xxl flex w-full flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
            <div class="min-w-0 max-w-section">
              <p :class="[ui.eyebrow, 'mb-3']">Portfólio</p>
              <h2 class="text-display-xl font-light">Trabalhos que realizamos</h2>
              <p class="mt-3 max-w-copy text-body-lg text-ink-secondary">
                Fardamentos confeccionados sob medida — acabamento visível em cada peça.
              </p>
            </div>
            <p
              v-if="!portfolio.loading"
              class="shrink-0 rounded-full bg-primary-bg-subdued px-md py-sm text-body-tabular tabular-nums text-primary-deep"
            >
              {{ portfolio.items.length }}
              {{ portfolio.items.length === 1 ? 'projeto' : 'projetos' }}
            </p>
          </div>
        </MotionComponent>

        <p v-if="portfolio.error" class="text-sm text-ruby" role="alert">{{ portfolio.error }}</p>
        <div v-if="portfolio.loading" class="py-16 text-center text-ink-mute">Carregando portfólio…</div>
        <div
          v-else-if="portfolio.items.length === 0"
          :class="[ui.cardFeature, 'mx-auto max-w-card py-16 text-center']"
        >
          <p class="text-display-md font-light">Em breve</p>
          <p class="mt-2 text-ink-mute">Novos trabalhos serão publicados aqui.</p>
        </div>
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PortfolioCard
            v-for="(item, idx) in portfolio.items"
            :key="item.id"
            :item="item"
            :index="idx"
          />
        </div>
      </div>
    </section>

    <!-- 4. Empresas — confiança -->
    <section id="empresas" class="scroll-mt-24 border-y border-black/5 bg-canvas-cream py-16 md:py-24">
      <div :class="ui.container">
        <MotionComponent animation="fade" :duration="0.5">
          <div class="mb-xxl flex w-full flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
            <div class="min-w-0 max-w-section">
              <p :class="[ui.eyebrow, 'mb-3']">Confiança</p>
              <h2 class="text-display-xl font-light">Empresas que já atendemos</h2>
              <p class="mt-3 max-w-copy text-body-lg text-ink-secondary">
                Parceiros que confiam na Santiago Camisaria para vestir suas equipes.
              </p>
            </div>
            <p
              v-if="!partners.loading"
              class="shrink-0 rounded-full bg-primary-bg-subdued px-md py-sm text-body-tabular tabular-nums text-primary-deep"
            >
              {{ partners.items.length }}
              {{ partners.items.length === 1 ? 'parceira' : 'parceiras' }}
            </p>
          </div>
        </MotionComponent>

        <p v-if="partners.error" class="text-sm text-ruby" role="alert">{{ partners.error }}</p>
        <div v-if="partners.loading" class="py-12 text-ink-mute">Carregando…</div>
        <div
          v-else-if="partners.items.length === 0"
          :class="[ui.cardFeature, 'mx-auto max-w-card bg-canvas/60 py-12 text-center']"
        >
          <p class="text-ink-mute">Lista de parceiros em atualização.</p>
        </div>
        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MotionComponent
            v-for="(p, idx) in partners.items"
            :key="p.id"
            animation="slide"
            direction="up"
            :duration="0.45"
            :delay="0.05 * (idx % 8)"
          >
            <article
              class="rounded-lg border border-hairline bg-canvas p-xxl text-center shadow-1 transition-shadow hover:shadow-2"
            >
              <div
                class="mx-auto mb-4 flex size-20 items-center justify-center overflow-hidden rounded-xl bg-canvas-soft ring-1 ring-hairline"
              >
                <img
                  v-if="p.logo_url"
                  :src="p.logo_url"
                  :alt="p.name"
                  class="size-full object-contain p-2"
                />
                <span v-else class="text-2xl font-light text-primary-deep">{{ p.name.charAt(0) }}</span>
              </div>
              <h3 class="text-heading-md font-light">{{ p.name }}</h3>
              <p v-if="p.description" class="mt-2 line-clamp-3 text-caption text-ink-mute">
                {{ p.description }}
              </p>
              <a
                v-if="p.website"
                :href="p.website"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-block text-sm text-primary no-underline hover:text-primary-deep"
              >
                Visitar site →
              </a>
            </article>
          </MotionComponent>
        </div>
      </div>
    </section>

    <!-- 5. CTA final — conversão -->
    <section class="relative overflow-hidden bg-brand-dark-900 py-huge text-on-primary" aria-labelledby="cta-title">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(83_58_253/0.45),transparent_50%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(234_34_97/0.25),transparent_50%)]"
      />
      <div class="relative z-10 mx-auto max-w-copy px-lg text-center md:px-xl">
        <MotionComponent animation="fade" :duration="0.6">
          <p :class="[ui.pillSoft, 'mx-auto mb-4 w-fit bg-white/90! text-primary-deep!']">
            Orçamento sem compromisso
          </p>
          <h2 id="cta-title" class="text-display-xl font-light">Pronto para vestir sua equipe?</h2>
          <p class="mt-4 text-body-lg text-on-primary/85">
            Cadastre-se, descreva tecido e quantidade. Retornamos com a proposta o mais rápido possível.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <NuxtLink
              :to="showAsClient ? '/propostas/nova' : '/register'"
              :class="ui.btnPrimary"
            >
              {{ showAsClient ? 'Nova proposta' : 'Criar conta gratuita' }}
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
import { usePortfolioStore } from '~/store/portfolio'
import { usePartnersStore } from '~/store/partners'
definePageMeta({ layout: 'default' })
useHead({ title: 'Fardamentos · Santiago Camisaria' })

const ui = useSiteUi()
const portfolio = usePortfolioStore()
const partners = usePartnersStore()
const { showAsClient, showAsGuest } = useClientAuthUi()

const steps = [
  { title: 'Crie sua conta', text: 'Cadastro rápido como PF ou PJ, com seus dados de contato.' },
  { title: 'Envie a proposta', text: 'Descreva peças, tecidos, quantidades e prazos.' },
  { title: 'Receba o retorno', text: 'Acompanhe o status e receba o orçamento da nossa equipe.' },
]

const portfolioCount = computed(() => (portfolio.loading ? '—' : String(portfolio.items.length)))
const partnersCount = computed(() => (partners.loading ? '—' : String(partners.items.length)))

const heroStats = computed(() => [
  { value: portfolioCount.value, label: 'Trabalhos no portfólio' },
  { value: partnersCount.value, label: 'Empresas atendidas' },
  { value: '100%', label: 'Sob medida' },
])

onMounted(() => {
  portfolio.fetch()
  partners.fetch()
})
</script>
