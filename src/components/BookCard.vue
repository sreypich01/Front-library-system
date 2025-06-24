<!-- src/components/BookCard.vue -->
<template>
  <div class="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl transition">
    <img :src="book.cover" alt="Book Cover" class="w-full h-40 object-cover rounded-xl mb-4" />
    <div>
      <h2 class="text-xl font-semibold text-blue-700">{{ book.title }}</h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: Object
});
</script>
