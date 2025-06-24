<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reader</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returned Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="borrowing in borrowings" :key="borrowing.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ borrowing.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ borrowing.book?.title }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ borrowing.reader?.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(borrowing.borrowed_at) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ borrowing.returned_at ? formatDate(borrowing.returned_at) : 'Not returned' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="[
              'px-2 py-1 text-xs rounded-full',
              borrowing.returned_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]">
              {{ borrowing.returned_at ? 'Returned' : 'Borrowed' }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button 
              v-if="!borrowing.returned_at"
              @click="$emit('return', borrowing.id)"
              class="text-blue-600 hover:text-blue-900 mr-3"
            >
              Return
            </button>
            <button 
              @click="$emit('edit', borrowing)"
              class="text-teal-600 hover:text-teal-900 mr-3"
            >
              Edit
            </button>
            <button 
              @click="$emit('delete', borrowing.id)"
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
import { format } from 'date-fns'

defineProps({
  borrowings: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete', 'return'])

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}
</script>