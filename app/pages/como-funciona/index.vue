<template>
  <div class="min-h-[60vh] bg-canvas py-section md:py-section-lg">
    <div :class="ui.container">
      <ol class="relative grid gap-lg md:grid-cols-3">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="relative list-none"
        >
          <MotionComponent animation="slide" direction="up" :duration="0.5" :delay="0.08 + i * 0.1">
            <article
              :class="[
                ui.cardBase,
                'relative z-1 h-full transition-shadow hover:shadow-[var(--shadow-card)]',
              ]"
            >
              <span
                class="mb-md inline-flex size-9 items-center justify-center rounded-full bg-primary text-caption font-medium text-on-primary"
                aria-hidden="true"
              >
                {{ i + 1 }}
              </span>
              <h2 class="text-heading-md font-semibold text-ink">{{ step.title }}</h2>
              <p class="mt-2 text-body-md text-charcoal">{{ step.text }}</p>
            </article>
          </MotionComponent>
          <div
            v-if="i < steps.length - 1"
            class="absolute top-12 -right-3 z-0 hidden h-px w-6 bg-brand-green/40 md:block lg:-right-4 lg:w-8"
            aria-hidden="true"
          />
        </li>
      </ol>

      <section id="duvidas" class="scroll-mt-24 mt-section border-t border-hairline-soft pt-section">
        <div class="mx-auto max-w-section">
          <p :class="[ui.eyebrow, 'mb-3']">Dúvidas frequentes</p>
          <h2 class="text-display-xl font-semibold text-ink">Perguntas antes de enviar</h2>
          <p class="mt-3 text-body-lg text-charcoal">
            Respostas objetivas para você decidir com segurança.
          </p>
        </div>

        <dl class="mx-auto mt-xxl max-w-section space-y-3">
          <div
            v-for="(item, i) in faqItems"
            :key="item.q"
            class="rounded-lg border border-hairline-soft bg-surface-soft"
          >
            <dt>
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-xl py-lg text-left"
                :aria-expanded="openFaq === i"
                @click="openFaq = openFaq === i ? -1 : i"
              >
                <span class="text-heading-md font-semibold text-ink">{{ item.q }}</span>
                <span class="shrink-0 text-brand-green-deep tabular-nums" aria-hidden="true">
                  {{ openFaq === i ? '−' : '+' }}
                </span>
              </button>
            </dt>
            <dd
              v-show="openFaq === i"
              class="border-t border-hairline-soft px-xl pb-lg pt-0 text-body-md text-charcoal"
            >
              <p class="pt-md">{{ item.a }}</p>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  banner: {
    eyebrow: 'Processo',
    title: 'Como funciona',
    description:
      'Três passos para transformar sua necessidade em proposta comercial, sem ligações repetidas ou troca de planilhas.',
    secondaryLabel: 'Ver projetos',
    secondaryTo: '/#projetos',
    accentPrimary: true,
  },
})
useHead({
  title: 'Como funciona · Fardamentos',
  meta: [
    {
      name: 'description',
      content:
        'Entenda o fluxo de orçamento de fardamentos, tire dúvidas e envie sua proposta online com a Santiago Camisaria.',
    },
  ],
})

const ui = useSiteUi()

const openFaq = ref(0)

const steps = [
  {
    title: 'Crie sua conta',
    text: 'Cadastro rápido como pessoa física ou jurídica, com dados de contato para retorno.',
  },
  {
    title: 'Descreva a demanda',
    text: 'Descreva modelo, tecido, cores e quantidade no formulário.',
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
</script>
