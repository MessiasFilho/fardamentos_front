<template>
  <div class="min-h-[60vh] bg-canvas-soft py-12 md:py-16">
    <div :class="[ui.container, 'max-w-form']">
      <MotionComponent animation="fade" :duration="0.45">
        <header class="mb-xl">
          <p :class="[ui.eyebrow, 'mb-1']">Nova solicitação</p>
          <h1 class="text-display-xl font-light text-ink">Enviar proposta</h1>
          <p class="mt-2 max-w-copy text-body-md text-ink-secondary">
            Preencha em etapas — quanto mais detalhe, mais preciso será o orçamento.
          </p>
        </header>
      </MotionComponent>

      <!-- Progresso -->
      <nav class="mb-xl" aria-label="Etapas do formulário">
        <ol class="flex flex-col gap-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-md">
          <li
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex items-center gap-sm"
          >
            <span
              class="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-normal transition-colors"
              :class="
                currentStep > index
                  ? 'bg-primary text-on-primary'
                  : currentStep === index
                    ? 'bg-primary-bg-subdued text-primary-deep ring-2 ring-primary/30'
                    : 'border border-hairline bg-canvas text-ink-mute'
              "
            >
              {{ index + 1 }}
            </span>
            <span
              class="text-body-md"
              :class="currentStep === index ? 'font-normal text-ink' : 'text-ink-mute'"
            >
              {{ step.label }}
            </span>
          </li>
        </ol>
        <div class="mt-md h-1 overflow-hidden rounded-full bg-hairline">
          <div
            class="h-full rounded-full bg-primary transition-all duration-300"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
      </nav>

      <MotionComponent
        :key="currentStep"
        animation="slide"
        direction="up"
        :duration="0.4"
      >
        <div :class="[ui.cardFeature, 'space-y-5']">
          <div>
            <h2 class="text-heading-md font-light text-ink">{{ activeStep.title }}</h2>
            <p class="mt-2 text-body-md text-ink-secondary">{{ activeStep.hint }}</p>
          </div>

          <!-- Etapa 1: Modelo -->
          <div v-show="currentStep === 0" class="space-y-4">
            <label class="block">
              <span :class="ui.formLabel">Título do pedido (opcional)</span>
              <input
                v-model.trim="form.title"
                type="text"
                maxlength="255"
                placeholder="Ex.: Uniformes equipe comercial 2026"
                :class="ui.formInput"
              />
            </label>

            <fieldset class="m-0 border-0 p-0">
              <legend :class="ui.formLabel">Qual modelo de peça? *</legend>
              <div class="mt-sm grid gap-sm sm:grid-cols-2">
                <label
                  v-for="opt in modelOptions"
                  :key="opt.value"
                  :class="[
                    ui.radioPillBase,
                    'w-full justify-center text-center',
                    form.modelType === opt.value ? ui.radioPillActive : ui.radioPillIdle,
                  ]"
                >
                  <input v-model="form.modelType" type="radio" :value="opt.value" class="sr-only" />
                  {{ opt.label }}
                </label>
              </div>
            </fieldset>

            <label v-if="form.modelType === 'outro'" class="block">
              <span :class="ui.formLabel">Descreva o modelo *</span>
              <input
                v-model.trim="form.modelCustom"
                type="text"
                placeholder="Ex.: Colete multifuncional com bolsos"
                :class="ui.formInput"
              />
            </label>
          </div>

          <!-- Etapa 2: Quantidade -->
          <div v-show="currentStep === 1" class="space-y-4">
            <label class="block">
              <span :class="ui.formLabel">Quantidade estimada de peças *</span>
              <p class="mb-sm text-caption text-ink-mute">
                Informe o total aproximado. Pode ser por tamanhos (P/M/G) na observação final.
              </p>
              <input
                v-model.number="form.quantity"
                type="number"
                min="1"
                step="1"
                placeholder="Ex.: 30"
                :class="[ui.formInput, 'max-w-50 tabular-nums']"
              />
            </label>

            <label class="block">
              <span :class="ui.formLabel">Prazo desejado (opcional)</span>
              <input
                v-model.trim="form.deadline"
                type="text"
                placeholder="Ex.: Entrega até 15/08/2026"
                :class="ui.formInput"
              />
            </label>
          </div>

          <!-- Etapa 3: Tecido -->
          <div v-show="currentStep === 2" class="space-y-4">
            <fieldset class="m-0 border-0 p-0">
              <legend :class="ui.formLabel">Tipo de tecido *</legend>
              <p class="mb-sm text-caption text-ink-mute">
                Escolha o mais próximo do que imagina. Nossa equipe pode sugerir alternativas no orçamento.
              </p>
              <div class="mt-sm grid gap-sm sm:grid-cols-2">
                <label
                  v-for="opt in fabricOptions"
                  :key="opt.value"
                  :class="[
                    ui.radioPillBase,
                    'w-full justify-center text-center',
                    form.fabricType === opt.value ? ui.radioPillActive : ui.radioPillIdle,
                  ]"
                >
                  <input v-model="form.fabricType" type="radio" :value="opt.value" class="sr-only" />
                  {{ opt.label }}
                </label>
              </div>
            </fieldset>

            <label v-if="form.fabricType === 'outro'" class="block">
              <span :class="ui.formLabel">Qual tecido? *</span>
              <input
                v-model.trim="form.fabricCustom"
                type="text"
                placeholder="Ex.: Tecido antimicrobial para área hospitalar"
                :class="ui.formInput"
              />
            </label>

            <label class="block">
              <span :class="ui.formLabel">Cores e combinações</span>
              <textarea
                v-model.trim="form.colors"
                rows="3"
                placeholder="Ex.: Camisa azul marinho, detalhes em branco, botões pretos…"
                :class="ui.formTextarea"
              />
            </label>
          </div>

          <!-- Etapa 4: Logo -->
          <div v-show="currentStep === 3" class="space-y-4">
            <fieldset class="m-0 border-0 p-0">
              <legend :class="ui.formLabel">Incluir logo ou marca na peça? *</legend>
              <div class="mt-sm flex flex-wrap gap-sm">
                <label
                  :class="[
                    ui.radioPillBase,
                    form.hasLogo === true ? ui.radioPillActive : ui.radioPillIdle,
                  ]"
                >
                  <input v-model="form.hasLogo" type="radio" :value="true" class="sr-only" />
                  Sim, com personalização
                </label>
                <label
                  :class="[
                    ui.radioPillBase,
                    form.hasLogo === false ? ui.radioPillActive : ui.radioPillIdle,
                  ]"
                >
                  <input v-model="form.hasLogo" type="radio" :value="false" class="sr-only" />
                  Não preciso de logo
                </label>
              </div>
            </fieldset>

            <template v-if="form.hasLogo === true">
              <fieldset class="m-0 border-0 p-0">
                <legend :class="ui.formLabel">Como aplicar a marca? *</legend>
                <div class="mt-sm grid gap-sm sm:grid-cols-2">
                  <label
                    v-for="opt in logoOptions"
                    :key="opt.value"
                    :class="[
                      ui.radioPillBase,
                      'w-full justify-center text-center',
                      form.logoType === opt.value ? ui.radioPillActive : ui.radioPillIdle,
                    ]"
                  >
                    <input v-model="form.logoType" type="radio" :value="opt.value" class="sr-only" />
                    {{ opt.label }}
                  </label>
                </div>
              </fieldset>

              <label class="block">
                <span :class="ui.formLabel">Detalhes da marca *</span>
                <textarea
                  v-model.trim="form.logoDetails"
                  rows="4"
                  placeholder="Local (peito, manga, costas), tamanho aproximado, cores da marca…"
                  :class="ui.formTextarea"
                />
              </label>

              <div class="block">
                <span :class="ui.formLabel">Arquivo da logo (PDF) *</span>
                <p class="mb-sm text-caption text-ink-mute">
                  Envie o logotipo da empresa em PDF (máx. 10 MB). Preferencialmente vetorizado ou alta resolução.
                </p>
                <input
                  ref="logoFileInput"
                  type="file"
                  accept="application/pdf,.pdf"
                  class="block w-full text-body-md text-ink file:mr-md file:rounded-full file:border-0 file:bg-primary-bg-subdued file:px-md file:py-sm file:text-body-md file:font-normal file:text-primary-deep hover:file:bg-primary/15"
                  @change="onLogoFileChange"
                />
                <p v-if="logoFile" class="mt-sm text-caption text-ink-secondary">
                  Arquivo selecionado: <span class="font-normal text-ink">{{ logoFile.name }}</span>
                  ({{ formatFileSize(logoFile.size) }})
                </p>
                <button
                  v-if="logoFile"
                  type="button"
                  class="mt-sm text-caption text-primary no-underline hover:text-primary-deep"
                  @click="clearLogoFile"
                >
                  Remover arquivo
                </button>
              </div>
            </template>
          </div>

          <!-- Etapa 5: Revisão -->
          <div v-show="currentStep === 4" class="space-y-4">
            <dl class="divide-y divide-hairline rounded-lg border border-hairline bg-canvas-soft">
              <div
                v-for="row in reviewRows"
                :key="row.label"
                class="grid gap-1 px-md py-md sm:grid-cols-[9rem_1fr]"
              >
                <dt class="text-caption font-normal text-ink-mute">{{ row.label }}</dt>
                <dd class="text-body-md text-ink">{{ row.value }}</dd>
              </div>
            </dl>

            <label class="block">
              <span :class="ui.formLabel">Observações finais (opcional)</span>
              <textarea
                v-model.trim="form.extraNotes"
                rows="4"
                placeholder="Tamanhos por colaborador, referência de modelo anterior, necessidade de amostra…"
                :class="ui.formTextarea"
              />
            </label>
          </div>

          <p v-if="stepError" :class="ui.alertError" role="alert">{{ stepError }}</p>
          <p v-if="proposalsStore.error" :class="ui.alertError" role="alert">
            {{ proposalsStore.error }}
          </p>
          <div class="flex flex-wrap gap-3 border-t border-hairline pt-md">
            <button
              v-if="currentStep > 0"
              type="button"
              :class="ui.btnSecondary"
              :disabled="proposalsStore.submitting"
              @click="prevStep"
            >
              Voltar
            </button>
            <button
              v-if="currentStep < steps.length - 1"
              type="button"
              :class="ui.btnPrimary"
              @click="nextStep"
            >
              Continuar
            </button>
            <button
              v-else
              type="button"
              :class="[ui.btnPrimary, 'disabled:pointer-events-none disabled:opacity-50']"
              :disabled="proposalsStore.submitting"
              @click="submit"
            >
              {{ proposalsStore.submitting ? 'Enviando…' : 'Enviar proposta' }}
            </button>
            <NuxtLink to="/propostas" :class="[ui.btnSecondary, 'text-sm']">
              Cancelar
            </NuxtLink>
          </div>
        </div>
      </MotionComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useProposalsStore } from '~/store/proposals'
import {
  fabricLabel,
  logoTypeLabel,
  modelLabel,
  type ProposalBriefForm,
} from '~/utils/proposalBrief'

definePageMeta({ layout: 'default', middleware: ['client-only'] })
useHead({ title: 'Nova proposta · Fardamentos' })

const ui = useSiteUi()
const router = useRouter()
const proposalsStore = useProposalsStore()

const steps = [
  {
    id: 'model',
    label: 'Modelo',
    title: 'Modelo da peça',
    hint: 'Indique o tipo de uniforme ou fardamento que sua equipe precisa.',
  },
  {
    id: 'quantity',
    label: 'Quantidade',
    title: 'Quantidade e prazo',
    hint: 'Estimativa de volume ajuda a calcular custo e prazo de produção.',
  },
  {
    id: 'fabric',
    label: 'Tecido',
    title: 'Tecido e cores',
    hint: 'Preferências de material e paleta de cores para o orçamento.',
  },
  {
    id: 'logo',
    label: 'Marca',
    title: 'Logo e personalização',
    hint: 'Bordado, silk ou transfer — descreva como a marca deve aparecer nas peças.',
  },
  {
    id: 'review',
    label: 'Revisão',
    title: 'Revisar e enviar',
    hint: 'Confira os dados antes de enviar. Você receberá o número da proposta por aqui.',
  },
] as const

const modelOptions = [
  { value: 'camisa', label: 'Camisa / camiseta' },
  { value: 'polo', label: 'Polo' },
  { value: 'calca', label: 'Calça / bermuda' },
  { value: 'jaleco', label: 'Jaleco / avental' },
  { value: 'conjunto', label: 'Conjunto completo' },
  { value: 'outro', label: 'Outro modelo' },
]

const fabricOptions = [
  { value: 'algodao', label: 'Algodão' },
  { value: 'poliester', label: 'Poliéster / dry-fit' },
  { value: 'malha', label: 'Malha (PV, PP)' },
  { value: 'brim', label: 'Brim / sarja' },
  { value: 'moletom', label: 'Moletom / fleece' },
  { value: 'outro', label: 'Outro tecido' },
]

const logoOptions = [
  { value: 'bordado', label: 'Bordado' },
  { value: 'silk', label: 'Silk / serigrafia' },
  { value: 'transfer', label: 'Transfer / DTF' },
  { value: 'patch', label: 'Patch / etiqueta' },
  { value: 'outro', label: 'Outro' },
]

const currentStep = ref(0)
const stepError = ref('')
const appAlert = useAppAlert()
const logoFile = ref<File | null>(null)
const logoFileInput = ref<HTMLInputElement | null>(null)

const LOGO_PDF_MAX_BYTES = 10 * 1024 * 1024

const form = reactive<ProposalBriefForm>({
  title: '',
  modelType: '',
  modelCustom: '',
  quantity: '',
  fabricType: '',
  fabricCustom: '',
  colors: '',
  hasLogo: null,
  logoType: '',
  logoDetails: '',
  deadline: '',
  extraNotes: '',
})

const activeStep = computed(() => steps[currentStep.value]!)
const progressPercent = computed(() => ((currentStep.value + 1) / steps.length) * 100)

const reviewRows = computed(() => {
  const rows: { label: string; value: string }[] = [
    {
      label: 'Modelo',
      value: modelLabel(form.modelType, form.modelCustom),
    },
    {
      label: 'Quantidade',
      value: form.quantity === '' ? '—' : `${form.quantity} peça(s)`,
    },
    {
      label: 'Tecido',
      value: fabricLabel(form.fabricType, form.fabricCustom),
    },
    {
      label: 'Cores',
      value: form.colors.trim() || 'Não informado',
    },
    {
      label: 'Logo / marca',
      value:
        form.hasLogo === true
          ? `Sim — ${logoTypeLabel(form.logoType)}${logoFile.value ? ` · PDF: ${logoFile.value.name}` : ''}`
          : form.hasLogo === false
            ? 'Não'
            : '—',
    },
    {
      label: 'Prazo',
      value: form.deadline.trim() || 'Não informado',
    },
  ]
  if (form.title.trim()) {
    rows.unshift({ label: 'Título', value: form.title.trim() })
  }
  return rows
})

function validateStep(step: number): string | null {
  switch (step) {
    case 0:
      if (!form.modelType) return 'Selecione o modelo da peça.'
      if (form.modelType === 'outro' && form.modelCustom.trim().length < 3) {
        return 'Descreva o modelo com pelo menos 3 caracteres.'
      }
      return null
    case 1:
      if (form.quantity === '' || Number(form.quantity) < 1) {
        return 'Informe a quantidade estimada (mínimo 1 peça).'
      }
      return null
    case 2:
      if (!form.fabricType) return 'Selecione o tipo de tecido.'
      if (form.fabricType === 'outro' && form.fabricCustom.trim().length < 3) {
        return 'Descreva o tecido desejado.'
      }
      return null
    case 3:
      if (form.hasLogo === null) return 'Informe se deseja incluir logo ou marca.'
      if (form.hasLogo === true) {
        if (!form.logoType) return 'Selecione como a marca será aplicada.'
        if (form.logoDetails.trim().length < 5) {
          return 'Descreva local e detalhes da marca (mínimo 5 caracteres).'
        }
        if (!logoFile.value) return 'Envie o arquivo da logo em PDF.'
        if (!isPdfFile(logoFile.value)) return 'O arquivo da logo deve ser PDF.'
        if (logoFile.value.size > LOGO_PDF_MAX_BYTES) {
          return 'O PDF da logo deve ter no máximo 10 MB.'
        }
      }
      return null
    default:
      return null
  }
}

function nextStep() {
  stepError.value = ''
  proposalsStore.error = ''
  const err = validateStep(currentStep.value)
  if (err) {
    stepError.value = err
    return
  }
  if (currentStep.value < steps.length - 1) currentStep.value += 1
}

function prevStep() {
  stepError.value = ''
  proposalsStore.error = ''
  if (currentStep.value > 0) currentStep.value -= 1
}

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
  stepError.value = ''
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    logoFile.value = null
    return
  }
  if (!isPdfFile(file)) {
    stepError.value = 'Envie apenas arquivo PDF (.pdf).'
    clearLogoFile()
    return
  }
  if (file.size > LOGO_PDF_MAX_BYTES) {
    stepError.value = 'O PDF deve ter no máximo 10 MB.'
    clearLogoFile()
    return
  }
  logoFile.value = file
}

function clearLogoFile() {
  logoFile.value = null
  if (logoFileInput.value) logoFileInput.value.value = ''
}

watch(
  () => form.hasLogo,
  (hasLogo) => {
    if (hasLogo !== true) {
      clearLogoFile()
      form.logoType = ''
      form.logoDetails = ''
    }
  },
)

async function submit() {
  stepError.value = ''
  for (let i = 0; i < steps.length - 1; i++) {
    const err = validateStep(i)
    if (err) {
      stepError.value = err
      currentStep.value = i
      return
    }
  }

  try {
    const res = await proposalsStore.create({
      form,
      logoFile: form.hasLogo === true ? logoFile.value : null,
    })
    appAlert.show({
      title: 'Proposta enviada',
      message:
        res.message ||
        'Recebemos sua solicitação. Nossa equipe entrará em contato o mais breve possível para fechar os detalhes com você.',
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
