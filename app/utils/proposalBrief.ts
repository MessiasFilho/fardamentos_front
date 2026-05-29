export const PROPOSAL_PRODUCT_TYPES = [
  { value: 'uniformes', label: 'Uniformes' },
  { value: 'camisetas', label: 'Camisetas' },
  { value: 'calcas', label: 'Calças' },
  { value: 'bermudas', label: 'Bermudas / shorts' },
  { value: 'jalecos', label: 'Jalecos / aventais' },
  { value: 'conjuntos', label: 'Conjuntos' },
  { value: 'outro', label: 'Outro' },
] as const

export type ProposalProductType = (typeof PROPOSAL_PRODUCT_TYPES)[number]['value']

export interface ProposalForm {
  productType: ProposalProductType | ''
  description: string
  quantity: number | ''
}

export function productTypeLabel(value: string): string {
  return PROPOSAL_PRODUCT_TYPES.find((t) => t.value === value)?.label ?? value
}
