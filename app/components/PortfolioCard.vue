<template>
  <MotionComponent animation="slide" direction="up" :duration="0.5" :delay="0.05 * (index % 6)">
    <article
      class="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-canvas shadow-[var(--shadow-subtle)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
    >
      <div class="relative aspect-4/3 overflow-hidden bg-surface">
        <img
          v-if="item.images[0]"
          :src="item.images[0]"
          :alt="item.name"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div v-else class="flex size-full items-center justify-center text-caption text-stone">
          Sem foto
        </div>
      </div>
      <div class="flex flex-1 flex-col border-t border-hairline p-xl">
        <p :class="[ui.pillSoft, 'mb-2 w-fit']">
          Sob medida
        </p>
        <h3 class="text-display-md font-semibold leading-snug text-ink">
          {{ item.name }}
        </h3>
        <p class="mt-2 line-clamp-3 flex-1 text-body-md text-charcoal">
          {{ item.description || 'Projeto disponível para orçamento personalizado.' }}
        </p>
      </div>
    </article>
  </MotionComponent>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '~/store/portfolio'

const ui = useSiteUi()

withDefaults(
  defineProps<{ item: PortfolioItem; index?: number }>(),
  { index: 0 },
)
</script>
