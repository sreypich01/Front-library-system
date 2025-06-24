<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">
          {{ editCategory ? 'Edit Category' : 'Add New Category' }}
        </h2>
        
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="type">
              Type
            </label>
            <input
              v-model="form.type"
              id="type"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea
              v-model="form.description"
              id="description"
              rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
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
              {{ editCategory ? 'Update' : 'Save' }}
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
import { createCategory, updateCategory } from '@/api/category'

const props = defineProps({
  show: Boolean,
  editCategory: Object
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const form = reactive({
  id: null,
  type: '',
  description: ''
})

watch(() => props.editCategory, (newVal) => {
  if (newVal) {
    form.id = newVal.id
    form.type = newVal.type
    form.description = newVal.description
  } else {
    form.id = null
    form.type = ''
    form.description = ''
  }
})

const close = () => emit('close')

const submit = async () => {
  try {
    const categoryData = {
      type: form.type,
      description: form.description
    }

    if (form.id) {
      await updateCategory(form.id, categoryData)
      toast.success('Category updated successfully')
    } else {
      await createCategory(categoryData)
      toast.success('Category added successfully')
    }
    emit('saved')
    close()
  } catch (err) {
    toast.error('Failed to save category')
    console.error(err)
  }
}
</script>