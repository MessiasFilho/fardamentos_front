<template>
  <div v-if="!canAnimate" class="block w-full" :class="$attrs.class">
    <slot />
  </div>
  <motion.div
    v-else
    :initial="initialState"
    :animate="animateState"
    :transition="transitionConfig"
    :while-hover="hoverConfig"
    :while-tap="tapConfig"
    class="block w-full"
    :class="$attrs.class"
  >
    <slot />
  </motion.div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import type { Easing, VariantType } from 'motion-v'
import type { MotionComponentProps } from '~/types/motion'

type Props = MotionComponentProps

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade',
  direction: 'up',
  duration: 0.5,
  delay: 0,
  easing: 'easeInOut',
  distance: 50,
  scale: 1.05,
  rotate: 0,
  hover: false,
  tap: false,
  loop: false,
})

/** motion-v exige elemento no DOM; no SSR renderizamos div estático até o mount. */
const canAnimate = ref(false)
onMounted(() => {
  canAnimate.value = true
})

const slideOffsets = {
  up: { y: props.distance },
  down: { y: -props.distance },
  left: { x: props.distance },
  right: { x: -props.distance },
  in: { scale: 0.8 },
  out: { scale: 1.2 },
} as const

const flipOffsets = {
  up: { rotateX: 90 },
  down: { rotateX: -90 },
  left: { rotateY: 90 },
  right: { rotateY: -90 },
} as const

const initialState = computed((): VariantType => {
  if (props.initial) return props.initial

  switch (props.animation) {
    case 'fade':
      return { opacity: 0 }
    case 'slide':
      return { opacity: 0, ...slideOffsets[props.direction ?? 'up'] }
    case 'scale':
      return { scale: 0 }
    case 'rotate':
      return { rotate: 0 }
    case 'bounce':
      return { y: 0 }
    case 'flip':
      return flipOffsets[props.direction as keyof typeof flipOffsets] ?? { rotateX: 90 }
    default:
      return { opacity: 0 }
  }
})

const animateState = computed((): VariantType => {
  if (props.animate) return props.animate

  switch (props.animation) {
    case 'fade':
      return { opacity: 1 }
    case 'slide':
      return { opacity: 1, x: 0, y: 0, scale: 1 }
    case 'scale':
      return { scale: props.scale }
    case 'rotate':
      return { rotate: props.rotate }
    case 'bounce':
      return { y: [-10, 0, -5, 0] }
    case 'flip':
      return { rotateX: 0, rotateY: 0 }
    default:
      return { opacity: 1 }
  }
})

const transitionConfig = computed(() => {
  const baseConfig = {
    duration: props.duration,
    delay: props.delay,
    ease: props.easing as Easing,
  }

  if (props.loop) {
    return {
      ...baseConfig,
      repeat: typeof props.loop === 'number' ? props.loop : Infinity,
      repeatType: 'loop' as const,
    }
  }

  return baseConfig
})

const hoverConfig = computed((): VariantType | undefined => {
  if (!props.hover) return undefined

  switch (props.animation) {
    case 'scale':
      return { scale: props.scale + 0.1 }
    case 'rotate':
      return { rotate: props.rotate + 10 }
    default:
      return { scale: 1.05 }
  }
})

const tapConfig = computed((): VariantType | undefined => {
  if (!props.tap) return undefined

  switch (props.animation) {
    case 'scale':
      return { scale: props.scale - 0.1 }
    case 'bounce':
      return { y: 5 }
    default:
      return { scale: 0.95 }
  }
})
</script>
