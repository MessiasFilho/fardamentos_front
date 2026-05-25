import { defineStore } from 'pinia'

export type UserRole = 'admin' | 'user' | 'client'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface RegisterClient {
  name: string
  email: string
  phone: string
  password: string
  person_type: 'pf' | 'pj'
  cnpj?: string
  segment?: string
}

interface JwtPayload {
  user_id: number
  user_type: UserRole
  name: string
  email: string
  role: UserRole
  exp: number
}

const TOKEN_STORAGE_KEY = 'fard.auth.token'

function getApiBase() {
  return useRuntimeConfig().public.apiBase as string
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    return JSON.parse(atob(padded)) as JwtPayload
  } catch {
    return null
  }
}

function isExpired(payload: JwtPayload | null) {
  if (!payload) return true
  return payload.exp * 1000 <= Date.now()
}

function userFromPayload(payload: JwtPayload): AuthUser {
  const role = (payload.role ?? payload.user_type) as UserRole
  return {
    id: Number(payload.user_id),
    name: payload.name ?? '',
    email: payload.email ?? '',
    role,
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    user: null as AuthUser | null,
    loading: false,
    error: '' as string,
  }),

  getters: {
    isAuthenticated: (s) => !!s.token && !!s.user,
    isClient: (s) => s.user?.role === 'client',
  },

  actions: {
    initFromStorage() {
      if (import.meta.server) return
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
      if (!stored) return
      const payload = decodeJwt(stored)
      if (!payload || isExpired(payload)) {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        return
      }
      this.token = stored
      this.user = userFromPayload(payload)
    },

    setToken(token: string) {
      const payload = decodeJwt(token)
      if (!payload || isExpired(payload)) throw new Error('Token inválido ou expirado.')
      this.token = token
      this.user = userFromPayload(payload)
      if (import.meta.client) localStorage.setItem(TOKEN_STORAGE_KEY, token)
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await $fetch<{ access_token: string }>(`${getApiBase()}/public/login`, {
          method: 'POST',
          body: { email, password },
        })
        this.setToken(res.access_token)
        if (!this.isClient) {
          this.logout()
          throw new Error('Use uma conta de cliente cadastrada.')
        }
      } catch (e: unknown) {
        this.error = extractError(e, 'Falha ao entrar.')
        throw e
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterClient) {
      this.loading = true
      this.error = ''
      try {
        await $fetch(`${getApiBase()}/public/register`, {
          method: 'POST',
          body: payload,
        })
        await this.login(payload.email, payload.password)
      } catch (e: unknown) {
        this.error = extractError(e, 'Falha ao cadastrar.')
        throw e
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = ''
      if (import.meta.client) localStorage.removeItem(TOKEN_STORAGE_KEY)
    },
  },
})

function extractError(err: unknown, fallback: string) {
  const e = err as { data?: { error?: string; details?: string }; message?: string }
  return e.data?.details || e.data?.error || e.message || fallback
}
