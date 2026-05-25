<template>
  <form class="w-full space-y-4" @submit.prevent="submit">
    <MotionComponent animation="fade" :duration="0.4">
      <div class="space-y-4">
        <label class="block">
          <span :class="ui.formLabel">E-mail</span>
          <input
            v-model.trim="email"
            type="email"
            required
            autocomplete="email"
            placeholder="seu@email.com"
            :class="ui.formInput"
          />
        </label>
        <label class="block">
          <span :class="ui.formLabel">Senha</span>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            autocomplete="current-password"
            placeholder="Mínimo 6 caracteres"
            :class="ui.formInput"
          />
        </label>
      </div>
    </MotionComponent>

    <p v-if="userStore.error" :class="ui.alertError" role="alert">{{ userStore.error }}</p>

    <MotionComponent animation="fade" :duration="0.4" :delay="0.1">
      <button
        type="submit"
        :class="[ui.btnPrimary, 'w-full disabled:pointer-events-none disabled:opacity-50']"
        :disabled="userStore.loading"
      >
        {{ userStore.loading ? 'Entrando…' : 'Entrar' }}
      </button>
    </MotionComponent>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/store/user'

const props = defineProps<{
  redirectTo?: string
}>()

const emit = defineEmits<{
  success: []
}>()

const ui = useSiteUi()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

async function submit() {
  try {
    await userStore.login(email.value, password.value)
    emit('success')
    const redirect =
      props.redirectTo ??
      (typeof route.query.redirect === 'string' ? route.query.redirect : '/propostas')
    await router.push(redirect)
  } catch {
    /* erro em userStore */
  }
}
</script>
