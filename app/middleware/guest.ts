import { useUserStore } from '~/store/user'

/** Redireciona clientes já autenticados para fora de login/cadastro. */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const userStore = useUserStore()
  userStore.initFromStorage()

  if (userStore.isClient) {
    const redirect =
      typeof to.query.redirect === 'string' && to.query.redirect.startsWith('/')
        ? to.query.redirect
        : '/propostas'
    return navigateTo(redirect)
  }
})
