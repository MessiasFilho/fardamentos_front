import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(() => {
  useUserStore().initFromStorage()
})
