<template>
  <h1>About Page</h1>
  <button @click="router.push({name: 'home'})">Go to Home</button>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>