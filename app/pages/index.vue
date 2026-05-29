<template>
  <div>
    <BannerComponents />
    <!-- 1. Hero — proposta de valor + CTA principal -->
    <section class="border-y border-hairline bg-canvas-soft py-xl md:py-xxl" aria-labelledby="benefits-title">
      <div :class="ui.container">
        <h2 id="benefits-title" class="sr-only">Por que solicitar orçamento conosco</h2>
        <ul class="grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(b, i) in benefits" :key="b.title" class="list-none">
            <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.05 * i">
              <article class="h-full rounded-lg border border-hairline bg-canvas p-xl shadow-1">
                <span
                  class="mb-md inline-flex size-10 items-center justify-center rounded-full bg-primary-bg-subdued text-primary-deep"
                  aria-hidden="true"
                >
                  <component :is="b.icon" class="size-5" stroke-width="1.75" />
                </span>
                <h3 class="text-heading-md font-light">{{ b.title }}</h3>
                <p class="mt-2 text-body-md text-ink-secondary">{{ b.text }}</p>
              </article>
            </MotionComponent>
          </li>
        </ul>
      </div>
    </section>

    <!-- 3. Como funciona -->
    <section id="como-funciona" class="scroll-mt-24 bg-canvas py-huge">
      <div :class="ui.container">
        <div class="mx-auto max-w-section text-center md:text-left">
          <p :class="[ui.eyebrow, 'mb-3']">Processo</p>
          <h2 class="text-display-xl font-light">Como funciona</h2>
          <p class="mt-3 max-w-copy text-body-lg text-ink-secondary md:mx-0 mx-auto">
            Três passos para transformar sua necessidade em proposta comercial, sem ligações repetidas ou troca de planilhas.
          </p>
        </div>

        <ol class="relative mt-xxl grid gap-lg md:grid-cols-3">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="relative list-none"
          >
            <MotionComponent animation="slide" direction="up" :duration="0.5" :delay="0.08 + i * 0.1">
              <article
                class="relative z-1 h-full rounded-lg border border-hairline bg-canvas p-xl transition-[box-shadow,border-color] hover:border-primary-soft hover:shadow-1"
              >
                <span
                  class="mb-md inline-flex size-9 items-center justify-center rounded-full bg-primary text-caption font-normal text-on-primary"
                  aria-hidden="true"
                >
                  {{ i + 1 }}
                </span>
                <h3 class="text-heading-md font-light">{{ step.title }}</h3>
                <p class="mt-2 text-body-md text-ink-secondary">{{ step.text }}</p>
              </article>
            </MotionComponent>
            <div
              v-if="i < steps.length - 1"
              class="absolute top-12 -right-3 z-0 hidden h-px w-6 bg-primary/30 md:block lg:-right-4 lg:w-8"
              aria-hidden="true"
            />
          </li>
        </ol>

        <div class="mt-xxl text-center">
          <NuxtLink :to="proposalEntryTo" :class="ui.btnPrimary">
            Começar minha proposta
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. Referências — prova social (trabalhos reais) -->
    <section id="trabalhos" class="scroll-mt-24 bg-canvas-soft py-16 md:py-24">
      <div :class="ui.container">
        <div class="mb-xxl flex w-full flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div class="min-w-0 max-w-section">
            <p :class="[ui.eyebrow, 'mb-3']">Referências</p>
            <h2 class="text-display-xl font-light">Projetos que já entregamos</h2>
            <p class="mt-3 max-w-copy text-body-lg text-ink-secondary">
              Veja exemplos reais de fardamentos produzidos sob medida — qualidade de acabamento, modelagem e identidade visual.
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

        <p v-if="portfolio.error" class="text-sm text-ruby" role="alert">{{ portfolio.error }}</p>
        <div v-if="portfolio.loading" class="py-16 text-center text-ink-mute">Carregando referências…</div>
        <div
          v-else-if="portfolio.items.length === 0"
          :class="[ui.cardFeature, 'mx-auto max-w-card py-16 text-center']"
        >
          <p class="text-display-md font-light">Referências em atualização</p>
          <p class="mt-2 text-ink-mute">Enquanto isso, envie sua proposta — montamos o orçamento com base na sua necessidade.</p>
          <NuxtLink :to="proposalEntryTo" :class="[ui.btnPrimary, 'mt-6 inline-flex']">
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
          class="mt-xxl rounded-xl border border-hairline bg-canvas p-xl text-center shadow-1 md:flex md:items-center md:justify-between md:text-left"
        >
          <div class="max-w-section">
            <p class="text-heading-md font-light">Quer um orçamento no mesmo padrão?</p>
            <p class="mt-1 text-body-md text-ink-secondary">
              Descreva modelo, tecido e quantidade — retornamos com proposta detalhada.
            </p>
          </div>
          <NuxtLink :to="proposalEntryTo" :class="[ui.btnPrimary, 'mt-5 inline-flex shrink-0 md:mt-0']">
            Solicitar orçamento
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Empresas — confiança -->
    <section id="empresas" class="scroll-mt-24 border-y border-hairline bg-canvas-cream py-16 md:py-24">
      <div :class="ui.container">
        <div class="mb-xxl flex w-full flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div class="min-w-0 max-w-section">
            <p :class="[ui.eyebrow, 'mb-3']">Confiança</p>
            <h2 class="text-display-xl font-light">Empresas que confiam em nós</h2>
            <p class="mt-3 max-w-copy text-body-lg text-ink-secondary">
              Organizações que já vestiram equipes com a Santiago Camisaria.
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

        <p v-if="partners.error" class="text-sm text-ruby" role="alert">{{ partners.error }}</p>
        <div v-if="partners.loading" class="py-12 text-center text-ink-mute">Carregando empresas…</div>
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
            :delay="0.04 * (idx % 8)"
          >
            <article
              class="h-full rounded-lg border border-hairline bg-canvas p-xxl text-center shadow-1 transition-shadow hover:shadow-2"
            >
              <div
                class="mx-auto mb-4 flex size-20 items-center justify-center overflow-hidden rounded-xl bg-canvas-soft ring-1 ring-hairline"
              >
                <img
                  v-if="p.logo_url"
                  :src="p.logo_url"
                  :alt="p.name"
                  class="size-full object-contain p-2"
                  loading="lazy"
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

    <!-- 6. FAQ — objeções comuns -->
    <section id="faq" class="scroll-mt-24 bg-canvas py-huge">
      <div :class="ui.container">
        <div class="mx-auto max-w-section">
          <p :class="[ui.eyebrow, 'mb-3']">Dúvidas frequentes</p>
          <h2 class="text-display-xl font-light">Perguntas antes de enviar</h2>
          <p class="mt-3 text-body-lg text-ink-secondary">
            Respostas objetivas para você decidir com segurança.
          </p>
        </div>

        <dl class="mx-auto mt-xxl max-w-section space-y-3">
          <div
            v-for="(item, i) in faqItems"
            :key="item.q"
            class="rounded-lg border border-hairline bg-canvas-soft"
          >
            <dt>
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-xl py-lg text-left"
                :aria-expanded="openFaq === i"
                @click="openFaq = openFaq === i ? -1 : i"
              >
                <span class="text-heading-md font-light">{{ item.q }}</span>
                <span class="shrink-0 text-primary tabular-nums" aria-hidden="true">
                  {{ openFaq === i ? '−' : '+' }}
                </span>
              </button>
            </dt>
            <dd
              v-show="openFaq === i"
              class="border-t border-hairline px-xl pb-lg pt-0 text-body-md text-ink-secondary"
            >
              <p class="pt-md">{{ item.a }}</p>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- 7. CTA final -->
    <section class="relative overflow-hidden bg-brand-dark-900 py-huge text-on-primary" aria-labelledby="cta-title">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(83_58_253/0.45),transparent_50%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(234_34_97/0.25),transparent_50%)]"
      />
      <div class="relative z-10 mx-auto max-w-copy px-lg text-center md:px-xl">
        <MotionComponent animation="fade" :duration="0.55">
          <p :class="[ui.pillSoft, 'mx-auto mb-4 w-fit bg-white/90! text-primary-deep!']">
            Próximo passo
          </p>
          <h2 id="cta-title" class="text-display-xl font-light">Monte sua proposta agora</h2>
          <p class="mt-4 text-body-lg text-on-primary/85">
            Informe modelo, tecido, cores e quantidade. Nossa equipe analisa e retorna com orçamento alinhado ao seu prazo.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <NuxtLink :to="registerTo" :class="ui.btnPrimary">
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
import { usePartnersStore } from '~/store/partners'
import BannerComponents from '~/components/BannerComponents.vue'
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
const partners = usePartnersStore()
const { showAsClient, showAsGuest } = useClientAuthUi()

const openFaq = ref(0)

const statusSteps = ['Recebida', 'Em análise', 'Orçada', 'Produção']

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

const steps = [
  {
    title: 'Crie sua conta',
    text: 'Cadastro rápido como pessoa física ou jurídica, com dados de contato para retorno.',
  },
  {
    title: 'Descreva a demanda',
    text: 'Informe modelo, tecido, cores, quantidade e prazo desejado no formulário guiado.',
  },
  {
    title: 'Receba o orçamento',
    text: 'Acompanhe o status online e receba a proposta comercial da nossa equipe.',
  },
]

const faqItems = [
  {
    q: 'Preciso saber o tecido exato antes de enviar?',
    a: 'Não. Você pode descrever a necessidade e referências. Nossa equipe orienta opções compatíveis com uso, conforto e orçamento.',
  },
  {
    q: 'Qual o prazo para retorno do orçamento?',
    a: 'Em geral respondemos em até 2 dias úteis após o envio completo da proposta, conforme complexidade e volume.',
  },
  {
    q: 'Atendem empresas e pessoa física?',
    a: 'Sim. O cadastro aceita CPF ou CNPJ, ideal para equipes corporativas e demandas individuais maiores.',
  },
  {
    q: 'Como acompanho minha solicitação?',
    a: 'Após login, acesse «Minhas propostas» para ver status e histórico de cada envio.',
  },
]

const proposalEntryTo = computed(() =>
  showAsClient.value ? '/propostas/nova' : '/login?redirect=/propostas/nova',
)
const registerTo = computed(() => (showAsClient.value ? '/propostas/nova' : '/register'))

const portfolioCount = computed(() => (portfolio.loading ? '—' : String(portfolio.items.length)))
const partnersCount = computed(() => (partners.loading ? '—' : String(partners.items.length)))

const heroStats = computed(() => [
  { value: partnersCount.value, label: 'Empresas atendidas' },
  { value: portfolioCount.value, label: 'Projetos de referência' },
  { value: '100%', label: 'Sob medida' },
])

onMounted(() => {
  portfolio.fetch()
  partners.fetch()
})
</script>
