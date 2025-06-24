<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div 
      v-for="book in books" 
      :key="book.id" 
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div class="relative h-48 bg-gray-100">
        <img 
          v-if="book.image"
          :src="book.image" 
          :alt="book.title"
          class="w-full h-full object-cover"
        >
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
          <span>No Image</span>
        </div>
      </div>
      
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ book.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">
          <span class="font-medium">Category:</span> {{ book.category?.type || 'N/A' }}
        </p>
        
        <div class="flex justify-between items-center mt-4">
          <button 
            @click="$emit('edit', book)"
            class="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            Edit
          </button>
          <button 
            @click="$emit('delete', book.id)"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  books: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>

