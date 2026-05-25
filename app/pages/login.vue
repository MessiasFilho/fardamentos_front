<template>
  <AuthPanel
    eyebrow="Área do cliente"
    title="Entrar"
    subtitle="Acesse suas propostas e envie novos pedidos de orçamento."
  >
    <LoginForm />

    <template #footer>
      Ainda não tem conta?
      <NuxtLink to="/register" class="ml-1 font-normal text-primary no-underline hover:text-primary-deep">
        Criar conta
      </NuxtLink>
    </template>
  </AuthPanel>
</template>

<script setup lang="ts">
import AuthPanel from '~/components/auth/AuthPanel.vue'
import LoginForm from '~/components/auth/LoginForm.vue'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Entrar · Fardamentos' })
</script>
