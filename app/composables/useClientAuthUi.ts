import { useUserStore } from '~/store/user'

/**
 * Evita mismatch de hidratação: no SSR o usuário ainda não foi lido do localStorage.
 * Só após mount exibimos links de cliente autenticado.
 */
export function useClientAuthUi() {
  const userStore = useUserStore()
  const uiReady = ref(false)

  const showAsClient = computed(() => uiReady.value && userStore.isClient)
  const showAsGuest = computed(() => !uiReady.value || !userStore.isClient)

  onMounted(() => {
    userStore.initFromStorage()
    uiReady.value = true
  })

  return { uiReady, showAsClient, showAsGuest, userStore }
}
