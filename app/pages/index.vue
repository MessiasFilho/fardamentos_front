<template>
  <div>
    <!-- Hero -->
    <section class="hero-gradient">
      <div class="container-app py-20 md:py-28 lg:py-32">
        <MotionComponent animation="fade" :delay="0">
          <p class="label-mono text-paper/80 mb-4">Uniformes profissionais</p>
        </MotionComponent>

        <MotionComponent animation="slide" direction="up" :duration="0.7" :delay="0.1">
          <h1 class="text-display max-w-4xl text-paper">
            Fardamentos para a sua equipe
          </h1>
        </MotionComponent>

        <MotionComponent animation="slide" direction="up" :duration="0.7" :delay="0.25">
          <p class="mt-6 max-w-2xl text-subheading-light text-paper/90">
            Produção sob medida, tecidos de qualidade e identidade visual alinhada à sua marca.
          </p>
        </MotionComponent>

        <MotionComponent animation="fade" :delay="0.45">
          <div class="mt-10 flex flex-wrap gap-4">
            <button type="button" class="btn-white-pill">Ver catálogo</button>
            <button type="button" class="btn-glass-light px-6 py-2.5">Falar com consultor</button>
          </div>
        </MotionComponent>
      </div>
    </section>

    <!-- Intro -->
    <section class="bg-paper py-16 md:py-24">
      <div class="container-app">
        <MotionComponent animation="slide" direction="left" :distance="40">
          <p class="label-mono mb-4">Página modelo</p>
          <h2 class="text-section max-w-3xl">Base para novas telas do projeto</h2>
          <p class="mt-6 max-w-2xl text-body-lg text-ink/80">
            Use esta página como referência de tipografia, botões, cards e animações configuráveis
            via <code class="tag-mono rounded-subtle bg-glass-dark px-1.5 py-0.5">MotionComponent</code>.
          </p>
        </MotionComponent>
      </div>
    </section>

    <!-- Cards com animações -->
    <section class="bg-paper pb-20 md:pb-28">
      <div class="container-app">
        <MotionComponent animation="slide" direction="up" :delay="0.1">
          <p class="label-mono mb-4">Serviços</p>
          <h2 class="text-section mb-12">O que oferecemos</h2>
        </MotionComponent>

        <div class="grid gap-6 md:grid-cols-3">
          <MotionComponent
            v-for="(item, index) in services"
            :key="item.title"
            animation="slide"
            direction="up"
            :delay="0.15 + index * 0.12"
            :duration="0.55"
            :hover="true"
            :tap="true"
          >
            <article class="card surface-elevated p-8 h-full">
              <p class="tag-mono mb-4">{{ item.tag }}</p>
              <h3 class="text-feature-title">{{ item.title }}</h3>
              <p class="mt-3 text-body-light text-ink/75">{{ item.description }}</p>
            </article>
          </MotionComponent>
        </div>
      </div>
    </section>

    <!-- Showcase de animações -->
    <section class="border-t border-ink/10 bg-paper py-16 md:py-24">
      <div class="container-app">
        <p class="label-mono mb-4">MotionComponent</p>
        <h2 class="text-section mb-10">Tipos de animação</h2>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MotionComponent
            v-for="(demo, index) in animationDemos"
            :key="demo.label"
            :animation="demo.animation"
            :direction="demo.direction"
            :rotate="demo.rotate"
            :delay="index * 0.08"
            :duration="0.5"
            class="block w-full"
          >
            <div class="surface border border-ink/10 p-6 text-center">
              <p class="text-feature-title">{{ demo.label }}</p>
              <p class="mt-2 tag-mono text-ink/60">{{ demo.animation }}</p>
            </div>
          </MotionComponent>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Fardamentos · Página modelo',
})

const services = [
  {
    tag: 'Empresas',
    title: 'Uniformes corporativos',
    description: 'Camisas, polos e conjuntos com bordado ou silk da sua marca.',
  },
  {
    tag: 'Escolas',
    title: 'Fardamento escolar',
    description: 'Peças resistentes, confortáveis e padronizadas para alunos e equipe.',
  },
  {
    tag: 'Eventos',
    title: 'Equipes e operações',
    description: 'Lotes para eventos, segurança, hospitalar e indústria.',
  },
]

const animationDemos = [
  { label: 'Fade', animation: 'fade' as const },
  { label: 'Slide up', animation: 'slide' as const, direction: 'up' as const },
  { label: 'Scale', animation: 'scale' as const },
  { label: 'Rotate', animation: 'rotate' as const, rotate: 8 },
  { label: 'Bounce', animation: 'bounce' as const },
  { label: 'Flip', animation: 'flip' as const, direction: 'up' as const },
]
</script>
