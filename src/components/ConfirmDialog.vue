<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
      <h2 class="text-lg font-semibold mb-4 text-red-600">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button 
          @click="emit('cancel')" 
          class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button 
          @click="emit('confirm')" 
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Confirm Deletion'
  },
  message: {
    type: String,
    default: 'Are you sure you want to delete this item?'
  }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>