<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Borrowing Management</h1>
      <button 
        @click="openModal"
        class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        New Borrow Record
      </button>
    </div>

    <BorrowingTable 
      :borrowings="borrowings" 
      @edit="handleEdit"
      @delete="handleDelete"
      @return="handleReturn"
    />

    <BorrowingModal
      :show="showModal"
      :editBorrowing="currentBorrowing"
      @close="closeModal"
      @saved="fetchBorrowings"
    />

    <ConfirmDialog
      :show="showConfirmDialog"
      title="Delete Borrow Record"
      message="Are you sure you want to delete this borrowing record?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getBorrowings, deleteBorrowing, returnBorrowing } from '@/api/borrowing'
import BorrowingTable from '@/components/borrowing/BorrowingTable.vue'
import BorrowingModal from '@/components/borrowing/BorrowingModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const toast = useToast()
const borrowings = ref([])
const showModal = ref(false)
const showConfirmDialog = ref(false)
const currentBorrowing = ref(null)
const itemToDelete = ref(null)

onMounted(() => {
  fetchBorrowings()
})

const fetchBorrowings = async () => {
  try {
    const response = await getBorrowings()
    borrowings.value = response.data
  } catch (error) {
    toast.error('Failed to fetch borrowing records')
    console.error(error)
  }
}

const openModal = () => {
  currentBorrowing.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleEdit = (borrowing) => {
  currentBorrowing.value = borrowing
  showModal.value = true
}

const handleDelete = (id) => {
  itemToDelete.value = id
  showConfirmDialog.value = true
}

const handleReturn = async (id) => {
  try {
    await returnBorrowing(id)
    toast.success('Book returned successfully')
    fetchBorrowings()
  } catch (error) {
    toast.error('Failed to return book')
    console.error(error)
  }
}

const confirmDelete = async () => {
  try {
    await deleteBorrowing(itemToDelete.value)
    toast.success('Borrow record deleted successfully')
    fetchBorrowings()
  } catch (error) {
    toast.error('Failed to delete borrow record')
    console.error(error)
  } finally {
    showConfirmDialog.value = false
    itemToDelete.value = null
  }
}

const cancelDelete = () => {
  showConfirmDialog.value = false
  itemToDelete.value = null
}
</script>