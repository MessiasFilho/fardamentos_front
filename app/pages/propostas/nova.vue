<template>
  <div class="min-h-[60vh] bg-surface py-section md:py-section-lg">
    <div :class="[ui.container, 'max-w-form']">
      <MotionComponent animation="fade" :duration="0.45">
        <header class="mb-xl">
          <p :class="[ui.eyebrow, 'mb-1']">Nova solicitação</p>
          <h1 class="text-display-xl font-light text-ink">Enviar proposta</h1>
          <p class="mt-2 max-w-copy text-body-md text-ink-secondary">
            Escolha o tipo de produto e, se quiser, acrescente detalhes para montarmos o orçamento.
          </p>
        </header>
      </MotionComponent>

      <MotionComponent animation="slide" direction="up" :duration="0.4">
        <form :class="[ui.cardBase, 'space-y-5']" @submit.prevent="submit">
          <label class="block">
            <span :class="ui.formLabel">Tipo de produto *</span>
            <select v-model="form.productType" required :class="ui.formInput">
              <option value="" disabled>Selecione…</option>
              <option v-for="opt in PROPOSAL_PRODUCT_TYPES" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </label>

          <label class="block">
            <span :class="ui.formLabel">O que você precisa? (opcional)</span>
            <p class="mb-sm text-caption text-ink-mute">
              Cores, tamanhos, logo, tecido ou outras observações — só se quiser detalhar.
            </p>
            <textarea
              v-model.trim="form.description"
              rows="6"
              minlength="10"
              placeholder="Ex.: 30 peças azul marinho, bordado no peito, tamanhos P ao GG…"
              :class="ui.formTextarea"
            />
          </label>

          <label class="block max-w-50">
            <span :class="ui.formLabel">Quantidade estimada</span>
            <input
              v-model.number="form.quantity"
              type="number"
              min="0"
              step="1"
              placeholder="Ex.: 30"
              :class="[ui.formInput, 'tabular-nums']"
            />
          </label>

          <p v-if="formError" :class="ui.alertError" role="alert">{{ formError }}</p>
          <p v-if="proposalsStore.error" :class="ui.alertError" role="alert">
            {{ proposalsStore.error }}
          </p>

          <div class="flex flex-wrap gap-3 border-t border-hairline pt-md">
            <button
              type="submit"
              :class="[ui.btnAccent, 'disabled:pointer-events-none disabled:opacity-50']"
              :disabled="proposalsStore.submitting"
            >
              {{ proposalsStore.submitting ? 'Enviando…' : 'Enviar proposta' }}
            </button>
            <NuxtLink to="/propostas" :class="ui.btnSecondary">
              Cancelar
            </NuxtLink>
          </div>
        </form>
      </MotionComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useProposalsStore } from '~/store/proposals'
import { PROPOSAL_PRODUCT_TYPES, type ProposalForm } from '~/utils/proposalBrief'

definePageMeta({ layout: 'default', middleware: ['client-only'], banner: { hide: true } })
useHead({ title: 'Nova proposta · Fardamentos' })

const ui = useSiteUi()
const router = useRouter()
const proposalsStore = useProposalsStore()
const appAlert = useAppAlert()

const formError = ref('')

const form = reactive<ProposalForm>({
  productType: '',
  description: '',
  quantity: '',
})

function validate(): string | null {
  if (!form.productType) {
    return 'Selecione o tipo de produto.'
  }
  const desc = form.description.trim()
  if (desc.length > 0 && desc.length < 10) {
    return 'Se usar o campo de detalhes, escreva pelo menos 10 caracteres.'
  }
  if (form.quantity !== '' && Number(form.quantity) < 0) {
    return 'A quantidade não pode ser negativa.'
  }
  return null
}

async function submit() {
  formError.value = ''
  proposalsStore.error = ''
  const err = validate()
  if (err) {
    formError.value = err
    return
  }

  try {
    const res = await proposalsStore.create({ form })
    appAlert.show({
      title: 'Proposta enviada',
      message:
        res.message ||
        'Recebemos sua solicitação. Nossa equipe entrará em contato o mais breve possível.',
      variant: 'success',
      confirmLabel: 'Ver minhas propostas',
      onConfirm: () => {
        router.push('/propostas')
      },
    })
  } catch {
    /* erro em store */
  }
}
</script>
