<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar />
    <div class="ml-64">
      <Header />
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
