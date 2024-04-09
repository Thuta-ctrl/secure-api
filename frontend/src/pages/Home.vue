<template>
  <h1>Home Page</h1>
  <button @click="router.push({name: 'about'})">Go to About</button>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>