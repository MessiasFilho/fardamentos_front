<template>
  <div class="min-h-[60vh] bg-surface py-section md:py-section-lg">
    <div :class="[ui.container, 'max-w-form']">
      <MotionComponent animation="fade" :duration="0.45">
        <header class="mb-xl">
          <p :class="[ui.eyebrow, 'mb-1']">Nova solicitação</p>
          <h1 class="text-display-xl font-light text-ink">Enviar proposta</h1>
          <p class="mt-2 max-w-copy text-body-md text-ink-secondary">
            Descreva o que você precisa. Quanto mais contexto, mais rápido montamos o orçamento.
          </p>
        </header>
      </MotionComponent>

      <MotionComponent animation="slide" direction="up" :duration="0.4">
        <form :class="[ui.cardBase, 'space-y-5']" @submit.prevent="submit">
          <label class="block">
            <span :class="ui.formLabel">Título (opcional)</span>
            <input
              v-model.trim="form.title"
              type="text"
              maxlength="255"
              placeholder="Ex.: Uniformes equipe comercial 2026"
              :class="ui.formInput"
            />
          </label>

          <label class="block">
            <span :class="ui.formLabel">O que você precisa? *</span>
            <p class="mb-sm text-caption text-ink-mute">
              Modelo, tecido, cores, logo e tamanhos — tudo em um só lugar.
            </p>
            <textarea
              v-model.trim="form.description"
              rows="8"
              required
              minlength="10"
              placeholder="Ex.: 30 camisas polo azul marinho, malha PV, bordado no peito esquerdo. Tamanhos: 10 P, 12 M, 8 G…"
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

          <div class="block">
            <span :class="ui.formLabel">Arquivo da logo (PDF, opcional)</span>
            <p class="mb-sm text-caption text-ink-mute">Máx. 10 MB — vetorizado ou alta resolução.</p>
            <input
              ref="logoFileInput"
              type="file"
              accept="application/pdf,.pdf"
              class="block w-full text-body-md text-ink file:mr-md file:rounded-full file:border-0 file:bg-brand-green-soft file:px-md file:py-sm file:text-body-md file:font-medium file:text-ink hover:file:bg-brand-green/20"
              @change="onLogoFileChange"
            />
            <p v-if="logoFile" class="mt-sm text-caption text-ink-secondary">
              {{ logoFile.name }} ({{ formatFileSize(logoFile.size) }})
              <button
                type="button"
                class="ml-2 text-ink no-underline hover:text-brand-green-deep"
                @click="clearLogoFile"
              >
                Remover
              </button>
            </p>
          </div>

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
import type { ProposalForm } from '~/utils/proposalBrief'

definePageMeta({ layout: 'default', middleware: ['client-only'], banner: { hide: true } })
useHead({ title: 'Nova proposta · Fardamentos' })

const ui = useSiteUi()
const router = useRouter()
const proposalsStore = useProposalsStore()
const appAlert = useAppAlert()

const formError = ref('')
const logoFile = ref<File | null>(null)
const logoFileInput = ref<HTMLInputElement | null>(null)
const LOGO_PDF_MAX_BYTES = 10 * 1024 * 1024

const form = reactive<ProposalForm>({
  title: '',
  description: '',
  quantity: '',
})

function isPdfFile(file: File) {
  const name = file.name.toLowerCase()
  return file.type === 'application/pdf' || name.endsWith('.pdf')
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function onLogoFileChange(event: Event) {
  formError.value = ''
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    logoFile.value = null
    return
  }
  if (!isPdfFile(file)) {
    formError.value = 'Envie apenas arquivo PDF (.pdf).'
    clearLogoFile()
    return
  }
  if (file.size > LOGO_PDF_MAX_BYTES) {
    formError.value = 'O PDF deve ter no máximo 10 MB.'
    clearLogoFile()
    return
  }
  logoFile.value = file
}

function clearLogoFile() {
  logoFile.value = null
  if (logoFileInput.value) logoFileInput.value.value = ''
}

function validate(): string | null {
  const desc = form.description.trim()
  if (desc.length < 10) {
    return 'Descreva sua necessidade com pelo menos 10 caracteres.'
  }
  if (form.quantity !== '' && Number(form.quantity) < 0) {
    return 'A quantidade não pode ser negativa.'
  }
  if (logoFile.value) {
    if (!isPdfFile(logoFile.value)) return 'O arquivo da logo deve ser PDF.'
    if (logoFile.value.size > LOGO_PDF_MAX_BYTES) {
      return 'O PDF da logo deve ter no máximo 10 MB.'
    }
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
    const res = await proposalsStore.create({
      form,
      logoFile: logoFile.value,
    })
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
