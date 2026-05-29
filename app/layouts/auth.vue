<template>
  <div class="grid min-h-dvh bg-canvas lg:grid-cols-[1fr_min(32rem,520px)]">
    <aside class="relative hidden overflow-hidden lg:block">
      <div aria-hidden="true" class="absolute inset-0" :class="ui.meshHero" />
      <div class="relative z-10 flex h-full flex-col justify-between p-huge">
        <NuxtLink to="/" class="inline-flex items-center gap-md no-underline hover:opacity-90">
          <span
            class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-linear-to-br from-primary-bg-subdued to-canvas text-caption font-normal text-primary-deep"
          >
            SC
          </span>
          <span class="block leading-tight">
            <span class="text-[0.6875rem] uppercase tracking-wider text-ink-mute">Santiago Camisaria</span>
            <span class="block text-heading-md font-light">Fardamentos</span>
          </span>
        </NuxtLink>

        <div class="max-w-copy">
          <p :class="[ui.pillSoft, 'mb-4 w-fit']">Uniformes profissionais</p>
          <h2 class="text-display-lg font-light text-ink">
            Fardamentos com
            <span class="bg-linear-to-r from-primary via-magenta to-lemon bg-clip-text text-transparent">
              personalidade
            </span>
          </h2>
          <p class="mt-4 text-body-lg text-ink-secondary">
            Propostas online e orçamento sob medida para equipes, escolas e empresas.
          </p>
        </div>

        <p class="text-caption text-ink-mute">© {{ year }} Santiago Camisaria</p>
      </div>
    </aside>

    <section class="flex flex-col">
      <header class="flex items-center justify-between border-b border-hairline px-lg py-md lg:px-xl">
        <NuxtLink to="/" class="text-body-md font-normal text-primary no-underline hover:text-primary-deep lg:hidden">
          ← Início
        </NuxtLink>
        <nav class="ml-auto flex gap-xs rounded-full border border-hairline bg-canvas-soft p-xs" aria-label="Entrar ou cadastrar">
          <NuxtLink
            to="/login"
            class="rounded-full px-md py-sm text-body-md no-underline transition-colors"
            :class="isLogin ? 'bg-canvas text-ink shadow-1' : 'text-ink-mute-2 hover:text-ink'"
          >
            Entrar
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="rounded-full px-md py-sm text-body-md no-underline transition-colors"
            :class="isRegister ? 'bg-canvas text-ink shadow-1' : 'text-ink-mute-2 hover:text-ink'"
          >
            Cadastrar
          </NuxtLink>
        </nav>
      </header>

      <main class="flex flex-1 items-center justify-center px-lg py-xl lg:px-xl">
        <slot />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
const ui = useSiteUi()
const route = useRoute()
const year = new Date().getFullYear()

const isLogin = computed(() => route.path === '/login')
const isRegister = computed(() => route.path === '/register')
</script>
