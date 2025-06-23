<template>
  <aside class="w-64 h-screen bg-teal-700 text-white p-6 fixed">
    <h2 class="text-2xl font-bold mb-8">My Dashboard</h2>
    <nav class="space-y-4">
      <RouterLink to="/" class="block hover:text-teal-200">Home</RouterLink>
      <RouterLink to="/about" class="block hover:text-teal-200">About</RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
