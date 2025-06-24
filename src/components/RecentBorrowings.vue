<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Recent Borrowings</h2>
    
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="animate-pulse h-12 bg-gray-200 rounded"></div>
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2 px-4">Book</th>
            <th class="text-left py-2 px-4">Reader</th>
            <th class="text-left py-2 px-4">Date</th>
            <th class="text-left py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="borrowing in borrowings" 
            :key="borrowing.id" 
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4">{{ borrowing.book?.title || 'N/A' }}</td>
            <td class="py-3 px-4">{{ borrowing.reader?.name || 'N/A' }}</td>
            <td class="py-3 px-4">{{ formatDate(borrowing.borrowed_at) }}</td>
            <td class="py-3 px-4">
              <span :class="statusClass(borrowing)">
                {{ borrowing.status }}
              </span>
            </td>
          </tr>
          <tr v-if="borrowings.length === 0">
            <td colspan="4" class="py-4 text-center text-gray-500">No recent borrowings</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  borrowings: Array,
  loading: Boolean
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const statusClass = (borrowing) => {
  return {
    'px-2 py-1 rounded text-xs': true,
    'bg-green-100 text-green-800': borrowing.status === 'active',
    'bg-red-100 text-red-800': borrowing.status === 'overdue',
    'bg-gray-100 text-gray-800': borrowing.status === 'returned'
  }
}
</script>