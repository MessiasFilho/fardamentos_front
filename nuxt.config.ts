import tailwindcss from '@tailwindcss/vite'
import { resolveApiBase } from './config/api'

const mod = (process.env.MOD || 'dev').trim().toLowerCase()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'motion-v/nuxt', 'shadcn-nuxt'],
  pinia: {
    storesDirs: ['./app/store'],
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@8..144,300;8..144,400&display=swap',
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@lucide/vue'],
    },
  },
  runtimeConfig: {
    public: {
      mod,
      apiBase: resolveApiBase(mod),
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})