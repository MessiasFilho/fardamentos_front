<template>
  <div class="w-full" :class="wide ? 'max-w-form' : 'max-w-card'">
    <header class="mb-xl">
      <p :class="ui.eyebrow">{{ eyebrow }}</p>
      <h1 class="mt-2 text-display-lg font-light text-ink">{{ title }}</h1>
      <p v-if="subtitle" class="mt-2 max-w-copy text-body-lg text-ink-secondary">
        {{ subtitle }}
      </p>
    </header>

    <div class="rounded-lg border border-hairline bg-canvas p-xl shadow-1 md:p-xxl">
      <slot />
    </div>

    <p v-if="$slots.footer" class="mt-lg text-center text-caption text-ink-mute">
      <slot name="footer" />
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
  wide?: boolean
}>()

const ui = useSiteUi()
</script>
