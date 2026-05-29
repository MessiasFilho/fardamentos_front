<template>
  <section
    class="relative overflow-hidden py-section-lg md:py-hero"
    :class="ui.heroSky"
    :aria-labelledby="titleId"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-[85%] bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgb(0_212_164/0.12),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_10%,rgb(55_114_207/0.08),transparent_50%)]"
    />

    <div :class="[ui.container, 'relative z-10']">
      <p v-if="eyebrow" :class="[ui.pillSoft, 'mb-md']">
        {{ eyebrow }}
      </p>

      <h1 :id="titleId" class="max-w-[18ch] text-hero-display text-ink">
        {{ title }}
      </h1>

      <p class="mt-lg max-w-copy text-subtitle text-charcoal">
        {{ description }}
      </p>

      <div class="mt-xl flex flex-wrap items-center gap-3">
        <NuxtLink :to="primaryTo" :class="accentPrimary ? ui.btnAccent : ui.btnPrimary">
          {{ primaryLabel }}
        </NuxtLink>
        <NuxtLink
          v-if="secondaryLabel && secondaryTo"
          :to="secondaryTo"
          :class="ui.btnSecondary"
        >
          {{ secondaryLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const ui = useSiteUi()

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    primaryLabel?: string
    primaryTo?: string
    secondaryLabel?: string
    secondaryTo?: string
    eyebrow?: string
    /** Hero marketing CTA em mint (DESIGN: button-accent-green) */
    accentPrimary?: boolean
  }>(),
  {
    title: 'Orçamento de fardamentos sob medida',
    description:
      'Descreva sua necessidade, receba proposta comercial clara e acompanhe cada etapa online.',
    primaryLabel: 'Solicitar orçamento',
    primaryTo: '/register',
    secondaryLabel: '',
    secondaryTo: '',
    eyebrow: 'Fardamentos sob medida',
    accentPrimary: true,
  },
)

const titleId = computed(() => {
  const safeTitle = (props.title ?? 'hero').toLowerCase()
  const slug = safeTitle.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `banner-title-${slug || 'hero'}`
})
</script>
