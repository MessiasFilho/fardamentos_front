import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const userStore = useUserStore()
  userStore.initFromStorage()
  if (!userStore.isAuthenticated || !userStore.isClient) {
    return navigateTo('/login')
  }
})
