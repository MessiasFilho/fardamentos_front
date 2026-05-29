<template>
  <div class="flex min-h-screen flex-col bg-canvas font-sans text-ink">
    <header
      :class="[
        'sticky top-0 z-50 h-16 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200',
        headerSolid
          ? 'border-b border-hairline-soft bg-canvas/95 shadow-[var(--shadow-subtle)]'
          : 'border-b border-transparent bg-canvas/80',
      ]"
    >
      <div :class="[ui.container, 'flex h-full items-center justify-between gap-lg']">
        <NuxtLink to="/" class="inline-flex shrink-0 items-center gap-md no-underline hover:opacity-90">
          <span
            class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-surface text-caption font-semibold text-ink"
          >
            SC
          </span>
          <span class="block leading-tight">
            <span class="mb-0.5 hidden text-micro font-semibold uppercase tracking-wider text-steel sm:block">
              Santiago Camisaria
            </span>
            <span class="block whitespace-nowrap text-heading-md font-semibold tracking-tight">Fardamentos</span>
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
        class="flex flex-col gap-xs border-t border-hairline-soft bg-canvas p-lg md:hidden"
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
      <BannerComponents v-if="showBanner" v-bind="bannerProps" />
      <slot />
    </main>

    <footer class="border-t border-hairline-soft bg-canvas pb-xxl pt-section">
      <div :class="ui.container">
        <div class="grid gap-xxl md:grid-cols-[1.4fr_1fr_1fr] md:gap-xl">
          <div>
            <NuxtLink to="/" class="mb-4 inline-flex items-center gap-md no-underline hover:opacity-90">
              <span
                class="inline-flex size-10 items-center justify-center rounded-md border border-hairline bg-surface text-caption font-semibold text-ink"
              >
                SC
              </span>
              <span class="block leading-tight">
                <span class="mb-0.5 hidden text-micro font-semibold uppercase tracking-wider text-steel sm:block">
                  Santiago Camisaria
                </span>
                <span class="block text-heading-md font-semibold">Fardamentos</span>
              </span>
            </NuxtLink>
            <p class="max-w-narrow text-body-md text-charcoal">
              Uniformes e fardamentos sob medida — do pedido à entrega, com atendimento próximo.
            </p>
          </div>

          <div>
            <p :class="[ui.eyebrow, 'mb-3']">Navegação</p>
            <ul class="space-y-2">
              <li><NuxtLink to="/servicos" :class="ui.footerLink">Serviços</NuxtLink></li>
              <li><NuxtLink to="/#projetos" :class="ui.footerLink">Projetos</NuxtLink></li>
              <li><NuxtLink to="/como-funciona" :class="ui.footerLink">Como funciona</NuxtLink></li>
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
          <div
            class="mt-xxl w-full rounded-lg border border-hairline bg-canvas-dark p-xl text-on-dark shadow-[var(--shadow-card)]"
          >
            <p class="mb-2 text-micro-cap text-on-dark-muted">Próximo passo</p>
            <p class="text-heading-lg font-semibold">Solicite um orçamento sem compromisso</p>
            <p class="mt-2 text-body-md text-on-dark-muted">
              Cadastre-se, descreva tecido e quantidade — respondemos com proposta detalhada.
            </p>
            <NuxtLink
              :to="showAsClient ? '/propostas/nova' : '/register'"
              :class="[ui.btnOnDark, 'mt-5 inline-flex']"
            >
              {{ showAsClient ? 'Enviar proposta' : 'Começar agora' }}
            </NuxtLink>
          </div>
        </MotionComponent>

        <p class="mt-10 text-center text-caption text-stone md:text-left">
          © {{ year }} Santiago Camisaria
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import BannerComponents from '~/components/BannerComponents.vue'

export interface PageBannerMeta {
  hide?: boolean
  title?: string
  description?: string
  eyebrow?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  accentPrimary?: boolean
}

const ui = useSiteUi()
const year = new Date().getFullYear()
const route = useRoute()
const router = useRouter()
const { showAsClient, showAsGuest, userStore } = useClientAuthUi()

const pageBanner = computed(() => (route.meta.banner as PageBannerMeta | undefined) ?? {})
const showBanner = computed(() => !pageBanner.value.hide)

const bannerProps = computed(() => {
  const custom = pageBanner.value

  return {
    eyebrow: custom.eyebrow ?? 'Fardamentos sob medida',
    title: custom.title ?? 'Orçamento de fardamentos sob medida',
    description:
      custom.description ??
      'Descreva sua necessidade, receba proposta comercial clara e acompanhe cada etapa online.',
    primaryLabel: custom.primaryLabel ?? (showAsClient.value ? 'Nova proposta' : 'Solicitar orçamento'),
    primaryTo: custom.primaryTo ?? (showAsClient.value ? '/propostas/nova' : '/register'),
    secondaryLabel: custom.secondaryLabel ?? (showAsGuest.value ? 'Entrar' : ''),
    secondaryTo: custom.secondaryTo ?? (showAsGuest.value ? '/login' : ''),
    accentPrimary: custom.accentPrimary ?? true,
  }
})

const navLinks = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/#projetos', label: 'Projetos' },
  { to: '/como-funciona', label: 'Como funciona' },
  { to: '/como-funciona#duvidas', label: 'Dúvidas' },
]

const mobileOpen = ref(false)
const headerSolid = ref(false)

function onScroll() {
  headerSolid.value = !showBanner.value || window.scrollY > 48
}

function logout() {
  userStore.logout()
  mobileOpen.value = false
  router.push('/')
}

watch(() => route.path, () => {
  mobileOpen.value = false
  headerSolid.value =
    !showBanner.value || (import.meta.client && window.scrollY > 48)
})

onMounted(() => {
  headerSolid.value = !showBanner.value
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('scroll', onScroll)
})
</script>
