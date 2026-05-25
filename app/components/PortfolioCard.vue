<template>
  <MotionComponent animation="slide" direction="up" :duration="0.5" :delay="0.05 * (index % 6)">
    <article
      class="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-canvas shadow-1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-2"
    >
      <div class="relative aspect-4/3 overflow-hidden bg-canvas-soft">
        <img
          v-if="item.images[0]"
          :src="item.images[0]"
          :alt="item.name"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div
          v-else
          class="flex size-full items-center justify-center text-caption text-ink-mute"
        >
          Sem foto
        </div>
      </div>
      <div class="flex flex-1 flex-col border-t border-hairline p-xl">
        <p
          class="mb-2 w-fit rounded-full bg-primary-bg-subdued px-sm py-xs text-micro-cap font-normal uppercase tracking-wide text-primary-deep"
        >
          {{ item.sku }}
        </p>
        <h3 class="text-display-md font-light leading-snug text-ink">{{ item.name }}</h3>
        <p class="mt-2 line-clamp-3 flex-1 text-body-md text-ink-secondary">
          {{ item.description || 'Trabalho realizado pela nossa equipe.' }}
        </p>
      </div>
    </article>
  </MotionComponent>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '~/store/portfolio'

withDefaults(
  defineProps<{ item: PortfolioItem; index?: number }>(),
  { index: 0 },
)
</script>
