export function resolveApiBase(mod: string): string {
  const fromEnv = process.env.NUXT_PUBLIC_API_BASE?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (mod === 'prod') return 'https://api.santiagocamisaria.com.br'
  return 'http://localhost:4041'
}
