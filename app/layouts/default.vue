<template>
  <div class="min-h-screen flex flex-col bg-paper text-ink">
    <header class="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
      <div class="container-app flex h-16 items-center justify-between gap-6">
        <NuxtLink to="/" class="nav-link no-underline">
          <span class="text-feature-title tracking-tight">Fardamentos</span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex" aria-label="Principal">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="tab-pill"
            active-class="is-active"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="btn-black-pill no-underline hidden sm:inline-flex">
            Solicitar orçamento
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-ink/10 bg-ink text-paper">
      <div class="container-app py-12 md:py-16">
        <div class="grid gap-10 md:grid-cols-3">
          <div>
            <p class="label-mono text-paper/70 mb-3">Marca</p>
            <p class="text-feature-title text-paper">Fardamentos</p>
            <p class="mt-3 text-body-light text-paper/80 max-w-xs">
              Uniformes e fardamentos sob medida para empresas, escolas e equipes.
            </p>
          </div>

          <div>
            <p class="label-mono text-paper/70 mb-3">Navegação</p>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-paper/90 no-underline hover:text-paper">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <p class="label-mono text-paper/70 mb-3">Contato</p>
            <p class="text-body text-paper/90">contato@fardamentos.com.br</p>
            <p class="mt-1 text-body text-paper/90">(11) 0000-0000</p>
          </div>
        </div>

        <p class="mt-10 pt-6 border-t border-paper/15 tag-mono text-paper/60">
          © {{ year }} Fardamentos — todos os direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Sobre', to: '/sobre' },
]
</script>
