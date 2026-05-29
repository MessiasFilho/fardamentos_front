<template>
  <section class="relative overflow-hidden bg-canvas py-huge md:py-[88px]" :aria-labelledby="titleId">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(110%_90%_at_0%_0%,rgb(249_107_238/0.22),transparent_44%),radial-gradient(95%_80%_at_70%_0%,rgb(83_58_253/0.26),transparent_48%),radial-gradient(60%_60%_at_100%_0%,rgb(234_34_97/0.18),transparent_55%),linear-gradient(180deg,rgb(245_233_212/0.9),rgb(255_255_255/0.85)_55%,transparent)]"
    />

    <div class="relative z-10 mx-auto w-full max-w-[1200px] px-lg md:px-xl">
      <p
        v-if="eyebrow"
        class="inline-flex rounded-full bg-primary-bg-subdued px-sm py-1 text-micro-cap text-primary-deep"
      >
        {{ eyebrow }}
      </p>

      <h1 :id="titleId" class="mt-md max-w-[16ch] text-display-xxl font-light text-ink">
        {{ title }}
      </h1>

      <p class="mt-lg max-w-copy text-body-lg text-ink-secondary">
        {{ description }}
      </p>

      <div class="mt-xl flex flex-wrap items-center gap-3">
        <NuxtLink
          :to="primaryTo"
          class="inline-flex items-center justify-center rounded-full bg-primary px-lg py-sm text-button-md text-on-primary no-underline transition-colors hover:bg-primary-press"
        >
          {{ primaryLabel }}
        </NuxtLink>
        <NuxtLink
          v-if="secondaryLabel && secondaryTo"
          :to="secondaryTo"
          class="inline-flex items-center justify-center rounded-full border border-primary bg-canvas px-lg py-sm text-button-md text-primary no-underline transition-colors hover:bg-primary-bg-subdued"
        >
          {{ secondaryLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    primaryLabel?: string
    primaryTo?: string
    secondaryLabel?: string
    secondaryTo?: string
    eyebrow?: string
  }>(),
  {
    title: 'Orcamento de fardamentos sob medida',
    description: 'Descreva sua necessidade, receba proposta comercial clara e acompanhe cada etapa online.',
    primaryLabel: 'Solicitar orcamento',
    primaryTo: '/register',
    secondaryLabel: '',
    secondaryTo: '',
    eyebrow: 'Fardamentos sob medida',
  },
)

const titleId = computed(() => {
  const safeTitle = (props.title ?? 'hero').toLowerCase()
  const slug = safeTitle.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `banner-title-${slug || 'hero'}`
})
</script>