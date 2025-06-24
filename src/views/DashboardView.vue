<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Library Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard 
        title="Total Books" 
        :value="stats.totalBooks" 
        icon="book"
        color="bg-blue-100 text-blue-600"
        :loading="loading"
      />
      <DashboardCard 
        title="Active Readers" 
        :value="stats.activeReaders" 
        icon="users"
        color="bg-green-100 text-green-600"
        :loading="loading"
      />
      <DashboardCard 
        title="Borrowed Books" 
        :value="stats.borrowedBooks" 
        icon="exchange-alt"
        color="bg-amber-100 text-amber-600"
        :loading="loading"
      />
      <DashboardCard 
        title="Overdue Books" 
        :value="stats.overdueBooks" 
        icon="exclamation-triangle"
        color="bg-red-100 text-red-600"
        :loading="loading"
      />
    </div>

    <!-- Recent Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <RecentBorrowings :borrowings="recentBorrowings" :loading="loading" />
      </div>
      <div>
        <QuickActions @action="handleQuickAction" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {getBooks} from '@/api/book'
import {getReaders} from '@/api/reader'
import {getBorrowings} from '@/api/borrowing'
import DashboardCard from '@/components/DashboardCard.vue'
import RecentBorrowings from '@/components/RecentBorrowings.vue'
import QuickActions from '@/components/QuickActions.vue'

const toast = useToast()
const loading = ref(true)

const stats = ref({
  totalBooks: 0,
  activeReaders: 0,
  borrowedBooks: 0,
  overdueBooks: 0
})

const recentBorrowings = ref([])

const fetchDashboardData = async () => {
  try {
    loading.value = true
    
    // Fetch all data in parallel
    const [booksRes, readersRes, borrowingsRes] = await Promise.all([
      getBooks(),
      getReaders(),
      getBorrowings()
    ])
    
    // Calculate stats from API responses
    stats.value = {
      totalBooks: booksRes.data.length,
      activeReaders: readersRes.data.length,
      borrowedBooks: borrowingsRes.data.filter(b => !b.returned_at).length,
      overdueBooks: borrowingsRes.data.filter(b => {
        return !b.returned_at && new Date(b.due_date) < new Date()
      }).length
    }
    
    // Get 5 most recent borrowings
    recentBorrowings.value = borrowingsRes.data
      .sort((a, b) => new Date(b.borrowed_at) - new Date(a.borrowed_at))
      .slice(0, 5)
      .map(borrowing => ({
        ...borrowing,
        status: borrowing.returned_at 
          ? 'returned' 
          : new Date(borrowing.due_date) < new Date() 
            ? 'overdue' 
            : 'active'
      }))
      
  } catch (error) {
    toast.error('Failed to load dashboard data')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleQuickAction = (action) => {
  // You can implement navigation to different pages here
  // For example using vue-router:
  // router.push({ name: action })
  toast.info(`Action: ${action}`)
}

onMounted(fetchDashboardData)
</script>