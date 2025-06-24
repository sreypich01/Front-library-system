<!-- src/pages/BookPage.vue -->
<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-blue-800">📚 Book Library</h1>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        @click="addBook"
      >
        ➕ Add New Book
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BookCard from '@/components/BookCard.vue';
import api from '@/plugin/axios'; // adjust based on your file location

const books = ref([]);

const getBooks = async () => {
  try {
    const res = await api.get('/books');
    books.value = res.data;
  } catch (error) {
    console.error('Failed to load books:', error);
  }
};

const addBook = () => {
  alert('📝 You clicked Add Book! (You can connect this to a modal or form)');
};

onMounted(() => {
  getBooks();
});
</script>
