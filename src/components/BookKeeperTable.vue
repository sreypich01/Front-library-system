<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="bookKeeper in bookKeepers" :key="bookKeeper.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ bookKeeper.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ bookKeeper.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button 
              @click="$emit('edit', bookKeeper)"
              class="text-teal-600 hover:text-teal-900 mr-3"
            >
              Edit
            </button>
            <button 
              @click="$emit('delete', bookKeeper.id)"
              class="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  bookKeepers: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>