export interface ProposalBriefForm {
  title: string
  modelType: string
  modelCustom: string
  quantity: number | ''
  fabricType: string
  fabricCustom: string
  colors: string
  hasLogo: boolean | null
  logoType: string
  logoDetails: string
  deadline: string
  extraNotes: string
}

const MODEL_LABELS: Record<string, string> = {
  camisa: 'Camisa / camiseta',
  polo: 'Polo',
  calca: 'Calça / bermuda',
  jaleco: 'Jaleco / avental',
  conjunto: 'Conjunto completo',
  outro: 'Outro modelo',
}

const FABRIC_LABELS: Record<string, string> = {
  algodao: 'Algodão',
  poliester: 'Poliéster / dry-fit',
  malha: 'Malha (PV, PP, etc.)',
  brim: 'Brim / sarja',
  moletom: 'Moletom / fleece',
  outro: 'Outro tecido',
}

const LOGO_LABELS: Record<string, string> = {
  bordado: 'Bordado',
  silk: 'Silk / serigrafia',
  transfer: 'Transfer / DTF',
  patch: 'Patch / etiqueta',
  outro: 'Outro tipo',
}

export function modelLabel(value: string, custom: string) {
  if (value === 'outro') return custom.trim() || 'Modelo personalizado'
  return MODEL_LABELS[value] ?? value
}

export function fabricLabel(value: string, custom: string) {
  if (value === 'outro') return custom.trim() || 'Tecido personalizado'
  return FABRIC_LABELS[value] ?? value
}

export function logoTypeLabel(value: string) {
  return LOGO_LABELS[value] ?? value
}

export function buildProposalTitle(form: ProposalBriefForm): string | undefined {
  const t = form.title.trim()
  if (t) return t
  const model = modelLabel(form.modelType, form.modelCustom)
  const qty = form.quantity === '' ? '' : ` · ${form.quantity} peças`
  return `${model}${qty}`.trim()
}

export function buildProposalDescription(
  form: ProposalBriefForm,
  logoFileName?: string,
): string {
  const lines: string[] = ['—— Detalhes do pedido ——', '']

  lines.push(`Modelo: ${modelLabel(form.modelType, form.modelCustom)}`)
  if (form.modelType === 'outro' && form.modelCustom.trim()) {
    lines.push(`Especificação do modelo: ${form.modelCustom.trim()}`)
  }
  lines.push('')

  if (form.quantity !== '') {
    lines.push(`Quantidade estimada: ${form.quantity} peça(s)`)
    lines.push('')
  }

  lines.push(`Tecido: ${fabricLabel(form.fabricType, form.fabricCustom)}`)
  if (form.fabricType === 'outro' && form.fabricCustom.trim()) {
    lines.push(`Detalhe do tecido: ${form.fabricCustom.trim()}`)
  }
  if (form.colors.trim()) {
    lines.push(`Cores / combinações: ${form.colors.trim()}`)
  }
  lines.push('')

  if (form.hasLogo === true) {
    lines.push('Inclusão de logo / marca: Sim')
    if (form.logoType) {
      lines.push(`Tipo de aplicação: ${logoTypeLabel(form.logoType)}`)
    }
    if (form.logoDetails.trim()) {
      lines.push(`Detalhes da marca: ${form.logoDetails.trim()}`)
    }
    if (logoFileName?.trim()) {
      lines.push(`Arquivo da logo enviado: ${logoFileName.trim()} (PDF)`)
    }
  } else if (form.hasLogo === false) {
    lines.push('Inclusão de logo / marca: Não')
  }
  lines.push('')

  if (form.deadline.trim()) {
    lines.push(`Prazo desejado: ${form.deadline.trim()}`)
    lines.push('')
  }

  if (form.extraNotes.trim()) {
    lines.push('Observações adicionais:')
    lines.push(form.extraNotes.trim())
  }

  return lines.join('\n').trim()
}

export { MODEL_LABELS, FABRIC_LABELS, LOGO_LABELS }
