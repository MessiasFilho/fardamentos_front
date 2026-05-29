<template>
  <div class="bg-surface py-section md:py-section-lg">
    <div :class="ui.container">
      <ul class="grid gap-lg sm:grid-cols-2 lg:grid-cols-3" role="list">
        <li v-for="(service, i) in services" :key="service.title" class="list-none">
          <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.05 * (i % 6)">
            <article :class="[ui.cardBase, 'h-full transition-shadow hover:shadow-[var(--shadow-card)]']">
              <span
                class="mb-md inline-flex size-11 items-center justify-center rounded-full bg-brand-green-soft text-brand-green-deep"
                aria-hidden="true"
              >
                <component :is="service.icon" class="size-5" stroke-width="1.75" />
              </span>
              <p v-if="service.kicker" class="mb-1 text-caption text-steel">
                {{ service.kicker }}
              </p>
              <h2 class="text-heading-md font-semibold text-ink">{{ service.title }}</h2>
              <p class="mt-2 text-body-md text-charcoal">{{ service.text }}</p>
            </article>
          </MotionComponent>
        </li>
      </ul>

      <div :class="[ui.cardHelp, 'mt-xxl md:flex md:items-center md:justify-between md:text-left']">
        <div class="max-w-section">
          <p class="text-heading-md font-semibold text-ink">Quer orçamento com um desses serviços?</p>
          <p class="mt-1 text-body-md text-charcoal">
            Descreva a peça e a personalização desejada — montamos a proposta para o seu volume.
          </p>
        </div>
        <NuxtLink :to="proposalEntryTo" :class="[ui.btnAccent, 'mt-5 inline-flex shrink-0 md:mt-0']">
          Solicitar orçamento
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Image, Layers, PenTool, ScanLine, Shirt } from '@lucide/vue'

definePageMeta({
  layout: 'default',
  banner: {
    eyebrow: 'Serviços',
    title: 'Personalização e produção',
    description:
      'Bordado digital, criação de arte, serigrafia, sublimação e DTF — tudo para uniformes e camisetas com a identidade da sua marca.',
    secondaryLabel: 'Ver projetos',
    secondaryTo: '/#projetos',
    accentPrimary: true,
  },
})

useHead({
  title: 'Serviços · Fardamentos',
  meta: [
    {
      name: 'description',
      content:
        'Bordado digital, criação de arte, serigrafia, sublimação e DTF para fardamentos e uniformes. Atacado e varejo.',
    },
  ],
})

const ui = useSiteUi()
const { showAsClient } = useClientAuthUi()

interface ServiceItem {
  kicker?: string
  title: string
  text: string
  icon: Component
}

const services: ServiceItem[] = [
  {
    kicker: 'Máquina de bordado digital Asasul',
    title: 'Bordado digital',
    text: 'Bordamos peças no formato atacado e varejo.',
    icon: ScanLine,
  },
  {
    title: 'Criação e arte',
    text: 'Criamos o layout da sua camiseta ou do seu uniforme — basta entendermos a sua ideia.',
    icon: PenTool,
  },
  {
    title: 'Serigrafia',
    text: 'Aplicamos as cores a partir de telas, uma para cada cor.',
    icon: Layers,
  },
  {
    title: 'Sublimação',
    text: 'Usamos a tecnologia com o objetivo de fundir a tinta ao tecido, de modo que a camiseta fique perfeitamente estampada.',
    icon: Shirt,
  },
  {
    title: 'DTF',
    text: 'A personalização em DTF é perfeita para imagens detalhadas, com muitas cores, efeitos de sombreamento e degradês, já que reproduz a arte com alta fidelidade.',
    icon: Image,
  },
]

const proposalEntryTo = computed(() =>
  showAsClient.value ? '/propostas/nova' : '/login?redirect=/propostas/nova',
)
</script>
