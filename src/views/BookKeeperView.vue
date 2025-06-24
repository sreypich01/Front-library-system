<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Book Keepers</h1>
      <button 
        @click="openModal"
        class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        Add Book Keeper
      </button>
    </div>

    <BookKeeperTable 
      :bookKeepers="bookKeepers" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <BookKeeperModal
      :show="showModal"
      :editBookKeeper="currentBookKeeper"
      @close="closeModal"
      @saved="fetchBookKeepers"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getBookKeepers, deleteBookKeeper } from '@/api/bookKeeper'
import BookKeeperTable from '@/components/BookKeeperTable.vue'
import BookKeeperModal from '@/components/BookKeeperModal.vue'

const toast = useToast()
const bookKeepers = ref([])
const showModal = ref(false)
const currentBookKeeper = ref(null)

onMounted(() => {
  fetchBookKeepers()
})

const fetchBookKeepers = async () => {
  try {
    const response = await getBookKeepers()
    bookKeepers.value = response.data
  } catch (error) {
    toast.error('Failed to fetch book keepers')
    console.error(error)
  }
}

const openModal = () => {
  currentBookKeeper.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleEdit = (bookKeeper) => {
  currentBookKeeper.value = bookKeeper
  showModal.value = true
}

const handleDelete = async (id) => {
  try {
    await deleteBookKeeper(id)
    toast.success('Book keeper deleted successfully')
    fetchBookKeepers()
  } catch (error) {
    toast.error('Failed to delete book keeper')
    console.error(error)
  }
}
</script>