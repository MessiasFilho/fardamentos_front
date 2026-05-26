<template>
  <div class="flex min-h-screen flex-col bg-canvas font-sans font-light text-ink">
    <header
      :class="[
        'sticky top-0 z-50 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200',
        headerSolid
          ? 'border-b border-hairline bg-white/95 shadow-1'
          : 'border-b border-transparent bg-white/72',
      ]"
    >
      <div :class="[ui.container, 'flex h-17 items-center justify-between gap-lg']">
        <NuxtLink to="/" class="inline-flex shrink-0 items-center gap-md no-underline hover:opacity-90">
          <span
            class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-linear-to-br from-primary-bg-subdued to-canvas text-caption font-normal text-primary-deep"
          >
            SC
          </span>
          <span class="block leading-tight">
            <span class="mb-0.5 hidden text-[0.6875rem] font-normal uppercase tracking-wider text-ink-mute sm:block">
              Santiago Camisaria
            </span>
            <span class="block whitespace-nowrap text-heading-md font-light tracking-tight">Fardamentos</span>
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-xs md:flex" aria-label="Principal">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" :class="ui.navLink">
            {{ link.label }}
          </NuxtLink>
          <NuxtLink v-if="showAsClient" to="/propostas" :class="ui.navLink">
            Minhas propostas
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-sm">
          <template v-if="showAsClient">
            <NuxtLink to="/propostas/nova" :class="[ui.btnPrimary, 'hidden text-sm sm:inline-flex']">
              Nova proposta
            </NuxtLink>
            <button type="button" :class="ui.navLink" @click="logout">Sair</button>
          </template>
          <template v-else-if="showAsGuest">
            <NuxtLink to="/login" :class="[ui.navLink, 'hidden sm:inline-flex']">Entrar</NuxtLink>
            <NuxtLink to="/register" :class="[ui.btnPrimary, 'text-sm']">Cadastrar</NuxtLink>
          </template>

          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas md:hidden"
            :aria-expanded="mobileOpen"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            {{ mobileOpen ? '✕' : '☰' }}
          </button>
        </div>
      </div>

      <nav
        v-show="mobileOpen"
        class="flex flex-col gap-xs border-t border-hairline bg-canvas p-lg md:hidden"
        aria-label="Menu mobile"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="ui.navLink"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          v-if="showAsClient"
          to="/propostas"
          :class="ui.navLink"
          @click="mobileOpen = false"
        >
          Minhas propostas
        </NuxtLink>
        <NuxtLink
          v-if="showAsClient"
          to="/propostas/nova"
          :class="[ui.btnPrimary, 'text-center']"
          @click="mobileOpen = false"
        >
          Nova proposta
        </NuxtLink>
        <template v-else-if="showAsGuest">
          <NuxtLink to="/login" :class="ui.navLink" @click="mobileOpen = false">Entrar</NuxtLink>
          <NuxtLink to="/register" :class="[ui.btnPrimary, 'text-center']" @click="mobileOpen = false">
            Cadastrar
          </NuxtLink>
        </template>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-hairline bg-canvas pb-xxl pt-huge">
      <div :class="ui.container">
        <div class="grid gap-xxl md:grid-cols-[1.4fr_1fr_1fr] md:gap-xl">
          <div>
            <NuxtLink to="/" class="mb-4 inline-flex items-center gap-md no-underline hover:opacity-90">
              <span
                class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-linear-to-br from-primary-bg-subdued to-canvas text-caption font-normal text-primary-deep"
              >
                SC
              </span>
              <span class="block leading-tight">
                <span class="mb-0.5 hidden text-[0.6875rem] uppercase tracking-wider text-ink-mute sm:block">
                  Santiago Camisaria
                </span>
                <span class="block text-heading-md font-light">Fardamentos</span>
              </span>
            </NuxtLink>
            <p class="max-w-narrow text-body-md text-ink-secondary">
              Uniformes e fardamentos sob medida — do pedido à entrega, com atendimento próximo.
            </p>
          </div>

          <div>
            <p :class="[ui.eyebrow, 'mb-3']">Navegação</p>
            <ul class="space-y-2">
              <li><NuxtLink to="/#portfolio" :class="ui.footerLink">Portfólio</NuxtLink></li>
              <li><NuxtLink to="/#empresas" :class="ui.footerLink">Empresas</NuxtLink></li>
              <li><NuxtLink to="/#como-funciona" :class="ui.footerLink">Como funciona</NuxtLink></li>
            </ul>
          </div>

          <div>
            <p :class="[ui.eyebrow, 'mb-3']">Conta</p>
            <ul class="space-y-2">
              <li v-if="showAsClient">
                <NuxtLink to="/propostas" :class="ui.footerLink">Minhas propostas</NuxtLink>
              </li>
              <li v-if="showAsClient">
                <NuxtLink to="/propostas/nova" :class="ui.footerLink">Nova proposta</NuxtLink>
              </li>
              <template v-else-if="showAsGuest">
                <li><NuxtLink to="/login" :class="ui.footerLink">Entrar</NuxtLink></li>
                <li><NuxtLink to="/register" :class="ui.footerLink">Criar conta</NuxtLink></li>
              </template>
            </ul>
          </div>
        </div>

        <MotionComponent animation="fade" :delay="0.1" :duration="0.6">
          <div class="mt-xxl w-full rounded-lg bg-linear-to-br from-brand-dark-900 to-ink p-xl text-on-primary">
            <p class="mb-2 text-micro-cap uppercase tracking-wide text-white/60">Próximo passo</p>
            <p class="text-heading-lg font-light">Solicite um orçamento sem compromisso</p>
            <p class="mt-2 text-body-md text-white/80">
              Cadastre-se, descreva tecido e quantidade — respondemos com proposta detalhada.
            </p>
            <NuxtLink
              :to="showAsClient ? '/propostas/nova' : '/register'"
              :class="[ui.btnPrimary, 'mt-5 inline-flex']"
            >
              {{ showAsClient ? 'Enviar proposta' : 'Começar agora' }}
            </NuxtLink>
          </div>
        </MotionComponent>

        <p class="mt-10 text-center text-caption text-ink-mute md:text-left">
          © {{ year }} Santiago Camisaria
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const ui = useSiteUi()
const year = new Date().getFullYear()
const route = useRoute()
const router = useRouter()
const { showAsClient, showAsGuest, userStore } = useClientAuthUi()

const navLinks = [
  { to: '/#portfolio', label: 'Portfólio' },
  { to: '/#como-funciona', label: 'Como funciona' },
  { to: '/#empresas', label: 'Empresas' },
]

const mobileOpen = ref(false)
const headerSolid = ref(false)
const isHome = computed(() => route.path === '/')

function onScroll() {
  headerSolid.value = !isHome.value || window.scrollY > 48
}

function logout() {
  userStore.logout()
  mobileOpen.value = false
  router.push('/')
}

watch(() => route.path, () => {
  mobileOpen.value = false
  headerSolid.value = !isHome.value || (import.meta.client && window.scrollY > 48)
})

onMounted(() => {
  headerSolid.value = !isHome.value
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('scroll', onScroll)
})
</script>
