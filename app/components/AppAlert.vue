<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && state"
        class="fixed inset-0 z-100 flex items-center justify-center p-lg"
        role="presentation"
        @keydown.escape="onClose"
      >
        <button
          type="button"
          class="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          aria-label="Fechar"
          @click="onClose"
        />

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          appear
        >
          <div
            v-if="open && state"
            ref="dialogRef"
            role="alertdialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="messageId"
            class="relative z-10 w-full max-w-card rounded-lg border border-hairline bg-canvas p-xl shadow-2"
            @click.stop
          >
            <div class="flex gap-md">
              <span
                class="inline-flex size-11 shrink-0 items-center justify-center rounded-full"
                :class="variantIconWrap"
                aria-hidden="true"
              >
                <component :is="variantIcon" class="size-5" />
              </span>

              <div class="min-w-0 flex-1">
                <p :id="titleId" class="text-heading-md font-light text-ink">
                  {{ state.title }}
                </p>
                <p :id="messageId" class="mt-2 text-body-md text-ink-secondary">
                  {{ state.message }}
                </p>
              </div>
            </div>

            <div class="mt-xl flex flex-wrap justify-end gap-sm">
              <button
                ref="confirmRef"
                type="button"
                :class="ui.btnPrimary"
                @click="onConfirm"
              >
                {{ state.confirmLabel }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { AppAlertVariant } from '~/composables/useAppAlert'

const ui = useSiteUi()
const { open, state, close } = useAppAlert()

const titleId = 'app-alert-title'
const messageId = 'app-alert-message'

const dialogRef = ref<HTMLElement | null>(null)
const confirmRef = ref<HTMLButtonElement | null>(null)

const variantStyles: Record<
  AppAlertVariant,
  { wrap: string; icon: ReturnType<typeof defineComponent> }
> = {
  success: {
    wrap: 'bg-primary-bg-subdued text-primary-deep',
    icon: defineComponent({
      render: () =>
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M5 13l4 4L19 7' }),
        ),
    }),
  },
  info: {
    wrap: 'bg-canvas-soft text-primary',
    icon: defineComponent({
      render: () =>
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z' }),
        ),
    }),
  },
  warning: {
    wrap: 'bg-lemon/15 text-lemon',
    icon: defineComponent({
      render: () =>
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' }),
        ),
    }),
  },
  error: {
    wrap: 'bg-ruby/10 text-ruby',
    icon: defineComponent({
      render: () =>
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 18L18 6M6 6l12 12' }),
        ),
    }),
  },
}

const variantIconWrap = computed(() => variantStyles[state.value?.variant ?? 'info'].wrap)
const variantIcon = computed(() => variantStyles[state.value?.variant ?? 'info'].icon)

function onClose() {
  close()
}

async function onConfirm() {
  const handler = state.value?.onConfirm
  if (handler) {
    const keepOpen = await handler()
    if (keepOpen === false) return
  }
  close()
}

watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    nextTick(() => confirmRef.value?.focus())
  }
})

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>
