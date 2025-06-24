<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Categories Management</h1>
      <button 
        @click="openModal"
        class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        Add New Category
      </button>
    </div>

    <CategoryTable 
      :categories="categories" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <CategoryModal
      :show="showModal"
      :editCategory="currentCategory"
      @close="closeModal"
      @saved="fetchCategories"
    />

    <ConfirmDialog
      :show="showConfirmDialog"
      title="Delete Category"
      message="Are you sure you want to delete this category?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getCategories, deleteCategory } from '@/api/category'
import CategoryTable from '@/components/category/categoryTable.vue'
import CategoryModal from '@/components/category/CategoryModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const toast = useToast()
const categories = ref([])
const showModal = ref(false)
const showConfirmDialog = ref(false)
const currentCategory = ref(null)
const itemToDelete = ref(null)

onMounted(() => {
  fetchCategories()
})

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
  currentCategory.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleEdit = (category) => {
  currentCategory.value = category
  showModal.value = true
}

const handleDelete = (id) => {
  itemToDelete.value = id
  showConfirmDialog.value = true
}

const confirmDelete = async () => {
  try {
    await deleteCategory(itemToDelete.value)
    toast.success('Category deleted successfully')
    fetchCategories()
  } catch (error) {
    toast.error('Failed to delete category')
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