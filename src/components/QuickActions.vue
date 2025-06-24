<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
    <div class="space-y-3">
      <button 
        @click="emit('action', 'add-book')"
        class="w-full flex items-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
      >
        <font-awesome-icon icon="plus-circle" class="mr-3" />
        <span>Add New Book</span>
      </button>
      <button 
        @click="emit('action', 'add-reader')"
        class="w-full flex items-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
      >
        <font-awesome-icon icon="user-plus" class="mr-3" />
        <span>Register New Reader</span>
      </button>
      <button 
        @click="emit('action', 'process-return')"
        class="w-full flex items-center p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition"
      >
        <font-awesome-icon icon="exchange-alt" class="mr-3" />
        <span>Process Book Return</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['action'])
</script>