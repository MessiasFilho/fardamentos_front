import type { VariantType } from 'motion-v'

export interface MotionComponentProps {
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'flip'
  direction?: 'up' | 'down' | 'left' | 'right' | 'in' | 'out'
  duration?: number
  delay?: number
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'easeInOut' | string
  distance?: number
  scale?: number
  rotate?: number
  hover?: boolean
  tap?: boolean
  loop?: boolean | number
  initial?: VariantType
  animate?: VariantType
}

export type AnimationType = NonNullable<MotionComponentProps['animation']>
export type DirectionType = NonNullable<MotionComponentProps['direction']>
