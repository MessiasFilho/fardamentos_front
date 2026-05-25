export type AppAlertVariant = 'success' | 'info' | 'warning' | 'error'

export interface AppAlertOptions {
  title: string
  message: string
  variant?: AppAlertVariant
  confirmLabel?: string
  /** Chamado ao confirmar; se retornar false, o alerta permanece aberto */
  onConfirm?: () => void | boolean | Promise<void | boolean>
}

interface AppAlertState extends Required<Pick<AppAlertOptions, 'title' | 'message'>> {
  variant: AppAlertVariant
  confirmLabel: string
  onConfirm?: AppAlertOptions['onConfirm']
}

export function useAppAlert() {
  const open = useState('app-alert-open', () => false)
  const state = useState<AppAlertState | null>('app-alert-state', () => null)

  function show(options: AppAlertOptions) {
    state.value = {
      title: options.title,
      message: options.message,
      variant: options.variant ?? 'info',
      confirmLabel: options.confirmLabel ?? 'Entendi',
      onConfirm: options.onConfirm,
    }
    open.value = true
  }

  function close() {
    open.value = false
  }

  return { open, state, show, close }
}
