<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">
          {{ editBook ? 'Edit Book' : 'Add New Book' }}
        </h2>
        
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
              Title
            </label>
            <input
              v-model="form.title"
              id="title"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
              Category
            </label>
            <select
              v-model="form.category_id"
              id="category"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.type }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
              Image URL
            </label>
            <input
              v-model="form.image"
              id="image"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://example.com/image.jpg"
            >
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="close"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
              {{ editBook ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { createBook, updateBook } from '@/api/book'

const props = defineProps({
  show: Boolean,
  editBook: Object,
  categories: Array
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const form = reactive({
  id: null,
  title: '',
  category_id: '',
  image: ''
})

watch(() => props.editBook, (newVal) => {
  if (newVal) {
    form.id = newVal.id
    form.title = newVal.title
    form.category_id = newVal.category_id
    form.image = newVal.image || ''
  } else {
    form.id = null
    form.title = ''
    form.category_id = ''
    form.image = ''
  }
})

const close = () => emit('close')

const submit = async () => {
  try {
    const bookData = {
      title: form.title,
      category_id: form.category_id,
      image: form.image || null
    }

    if (form.id) {
      await updateBook(form.id, bookData)
      toast.success('Book updated successfully')
    } else {
      await createBook(bookData)
      toast.success('Book added successfully')
    }
    emit('saved')
    close()
  } catch (err) {
    toast.error('Failed to save book')
    console.error(err)
  }
}
</script>