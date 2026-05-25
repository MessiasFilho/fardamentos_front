<template>
  <form class="w-full space-y-6" @submit.prevent="submit">
    <!-- Tipo de cadastro -->
    <MotionComponent animation="fade" :duration="0.4" :delay="0">
      <fieldset class="m-0 border-0 p-0">
        <legend :class="ui.formSectionTitle">Tipo de cadastro</legend>
        <div class="flex flex-wrap gap-sm">
          <label
            :class="[
              ui.radioPillBase,
              form.personType === 'pf' ? ui.radioPillActive : ui.radioPillIdle,
            ]"
          >
            <input v-model="form.personType" type="radio" value="pf" class="sr-only" />
            Pessoa física
          </label>
          <label
            :class="[
              ui.radioPillBase,
              form.personType === 'pj' ? ui.radioPillActive : ui.radioPillIdle,
            ]"
          >
            <input v-model="form.personType" type="radio" value="pj" class="sr-only" />
            Pessoa jurídica
          </label>
        </div>
      </fieldset>
    </MotionComponent>

    <!-- Dados -->
    <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.05">
      <div>
        <p :class="ui.formSectionTitle">Dados</p>
        <div class="space-y-4">
          <label class="block">
            <span :class="ui.formLabel">
              {{ form.personType === 'pj' ? 'Razão social' : 'Nome completo' }}
            </span>
            <input
              v-model.trim="form.name"
              type="text"
              required
              minlength="3"
              :autocomplete="form.personType === 'pj' ? 'organization' : 'name'"
              :class="ui.formInput"
            />
          </label>

          <label v-if="form.personType === 'pj'" class="block">
            <span :class="ui.formLabel">CNPJ</span>
            <input
              :value="form.cnpj"
              type="text"
              inputmode="numeric"
              required
              autocomplete="off"
              placeholder="00.000.000/0000-00"
              maxlength="18"
              :class="[ui.formInput, 'tabular-nums']"
              @input="onCnpjInput"
            />
          </label>
        </div>
      </div>
    </MotionComponent>

    <!-- Contato -->
    <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.1">
      <div>
        <p :class="ui.formSectionTitle">Contato</p>
        <div class="space-y-4">
          <label class="block">
            <span :class="ui.formLabel">E-mail</span>
            <input
              v-model.trim="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="seu@email.com"
              :class="ui.formInput"
            />
          </label>

          <label class="block">
            <span :class="ui.formLabel">Telefone / WhatsApp</span>
            <input
              :value="form.phone"
              type="tel"
              inputmode="numeric"
              required
              autocomplete="tel"
              placeholder="(00) 00000-0000"
              maxlength="15"
              :class="[ui.formInput, 'tabular-nums']"
              @input="onPhoneInput"
            />
          </label>
        </div>
      </div>
    </MotionComponent>

    <!-- Senha -->
    <MotionComponent animation="slide" direction="up" :duration="0.45" :delay="0.15">
      <div>
        <p :class="ui.formSectionTitle">Senha</p>
        <div class="space-y-4">
          <label class="block">
            <span :class="ui.formLabel">Senha</span>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="Mínimo 6 caracteres"
              :class="ui.formInput"
            />
          </label>

          <label class="block">
            <span :class="ui.formLabel">Confirmar senha</span>
            <input
              v-model="form.passwordConfirm"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="Repita a senha"
              :class="ui.formInput"
            />
          </label>
        </div>
      </div>
    </MotionComponent>

    <p v-if="localError" :class="ui.alertError" role="alert">{{ localError }}</p>
    <p v-if="userStore.error" :class="ui.alertError" role="alert">{{ userStore.error }}</p>

    <MotionComponent animation="fade" :duration="0.4" :delay="0.2">
      <div class="pt-2">
        <button
          type="submit"
          :class="[ui.btnPrimary, 'w-full disabled:pointer-events-none disabled:opacity-50']"
          :disabled="userStore.loading"
        >
          {{ userStore.loading ? 'Cadastrando…' : 'Criar conta' }}
        </button>
        <p class="mt-4 text-center text-caption text-ink-mute">
          Ao criar a conta, você poderá enviar propostas de orçamento pelo site.
        </p>
      </div>
    </MotionComponent>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useUserStore } from '~/store/user'
import { isValidCnpjMasked, isValidPhoneMasked, maskCnpj, maskPhone, onlyDigits } from '~/utils/masks'

const props = withDefaults(
  defineProps<{
    redirectTo?: string
  }>(),
  {
    redirectTo: '/propostas/nova',
  },
)

const emit = defineEmits<{
  success: []
}>()

const ui = useSiteUi()
const router = useRouter()
const userStore = useUserStore()
const localError = ref('')

const form = reactive({
  personType: 'pf' as 'pf' | 'pj',
  name: '',
  cnpj: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
})

watch(
  () => form.personType,
  (type) => {
    if (type === 'pf') form.cnpj = ''
    localError.value = ''
  },
)

function onPhoneInput(e: Event) {
  const el = e.target as HTMLInputElement
  form.phone = maskPhone(el.value)
}

function onCnpjInput(e: Event) {
  const el = e.target as HTMLInputElement
  form.cnpj = maskCnpj(el.value)
}

async function submit() {
  localError.value = ''
  if (!isValidPhoneMasked(form.phone)) {
    localError.value = 'Informe um telefone válido com DDD.'
    return
  }
  if (form.personType === 'pj' && !isValidCnpjMasked(form.cnpj)) {
    localError.value = 'Informe um CNPJ válido com 14 dígitos.'
    return
  }
  if (form.password !== form.passwordConfirm) {
    localError.value = 'As senhas não coincidem.'
    return
  }

  try {
    await userStore.register({
      name: form.name,
      email: form.email,
      phone: onlyDigits(form.phone),
      password: form.password,
      person_type: form.personType,
      cnpj: form.personType === 'pj' ? onlyDigits(form.cnpj) : '',
      segment: 'fardamentos',
    })
    emit('success')
    await router.push(props.redirectTo)
  } catch {
    /* erro em userStore */
  }
}
</script>
