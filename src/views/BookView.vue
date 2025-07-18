<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Books Management</h1>
      <button 
        @click="openModal"
        class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        Add New Book
      </button>
    </div>

    <!-- Replace BookTable with BookCardGrid -->
    <BookCardGrid 
      :books="books" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Keep the modal and confirm dialog -->
    <BookModal
      :show="showModal"
      :editBook="currentBook"
      :categories="categories"
      @close="closeModal"
      @saved="fetchBooks"
    />

    <ConfirmDialog
      v-if="showConfirmDialog"
      :show="showConfirmDialog"
      message="Are you sure you want to delete this book?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getBooks, deleteBook, getCategories } from '@/api/book'
import BookModal from '@/components/BookModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import BookCardGrid from '@/components/BookCardGrid.vue'

const toast = useToast()
const books = ref([])
const categories = ref([])
const showModal = ref(false)
const showConfirmDialog = ref(false)
const currentBook = ref(null)
const itemToDelete = ref(null)

onMounted(async () => {
  await fetchBooks()
  await fetchCategories()
})

const fetchBooks = async () => {
  try {
    const response = await getBooks()
    books.value = response.data
  } catch (error) {
    toast.error('Failed to fetch books')
    console.error(error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response.data
  } catch (error) {
    toast.error('Failed to fetch categories')
    console.error(error)
  }
}

const openModal = () => {
  currentBook.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleEdit = (book) => {
  currentBook.value = book
  showModal.value = true
}

const handleDelete = (id) => {
  itemToDelete.value = id
  showConfirmDialog.value = true
}

const confirmDelete = async () => {
  try {
    await deleteBook(itemToDelete.value)
    toast.success('Book deleted successfully')
    fetchBooks()
  } catch (error) {
    toast.error('Failed to delete book')
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