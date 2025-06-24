<template>
  <div class="bg-white rounded-lg shadow p-6 flex items-center">
    <div class="p-3 rounded-full mr-4" :class="color">
      <font-awesome-icon :icon="icon" class="text-xl" />
    </div>
    <div>
      <p class="text-gray-500 text-sm">{{ title }}</p>
      <p v-if="!loading" class="text-2xl font-bold">{{ value }}</p>
      <div v-else class="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [Number, String],
  icon: String,
  color: String,
  loading: Boolean
})
</script>