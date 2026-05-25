/** Apenas dígitos (máx. opcional). */
export function onlyDigits(value: string, max?: number): string {
  const digits = value.replace(/\D/g, '')
  return max != null ? digits.slice(0, max) : digits
}

/** Máscara telefone BR: (11) 99999-9999 ou (11) 9999-9999 */
export function maskPhone(value: string): string {
  const d = onlyDigits(value, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Máscara CNPJ: 99.999.999/9999-99 */
export function maskCnpj(value: string): string {
  const d = onlyDigits(value, 14)
  if (d.length === 0) return ''
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

export function isValidPhoneMasked(value: string): boolean {
  const len = onlyDigits(value).length
  return len === 10 || len === 11
}

export function isValidCnpjMasked(value: string): boolean {
  return onlyDigits(value).length === 14
}
