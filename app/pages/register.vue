<template>
  <AuthPanel
    wide
    eyebrow="Nova conta"
    title="Cadastre-se"
    subtitle="Pessoa física ou jurídica — envie propostas de fardamento em poucos minutos."
  >
    <RegisterForm />

    <template #footer>
      Já tem conta?
      <NuxtLink to="/login" class="ml-1 font-normal text-primary no-underline hover:text-primary-deep">
        Entrar
      </NuxtLink>
    </template>
  </AuthPanel>
</template>

<script setup lang="ts">
import AuthPanel from '~/components/auth/AuthPanel.vue'
import RegisterForm from '~/components/auth/RegisterForm.vue'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Cadastrar · Fardamentos' })
</script>
