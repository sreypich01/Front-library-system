<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">
          {{ editBookKeeper ? 'Edit Book Keeper' : 'Add New Book Keeper' }}
        </h2>
        
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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
              {{ editBookKeeper ? 'Update' : 'Save' }}
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
import { createBookKeeper, updateBookKeeper } from '@/api/bookKeeper'

const props = defineProps({
  show: Boolean,
  editBookKeeper: Object
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const form = reactive({
  id: null,
  name: ''
})

watch(() => props.editBookKeeper, (newVal) => {
  if (newVal) {
    form.id = newVal.id
    form.name = newVal.name
  } else {
    form.id = null
    form.name = ''
  }
})

const close = () => emit('close')

const submit = async () => {
  try {
    if (form.id) {
      await updateBookKeeper(form.id, { name: form.name })
      toast.success('Book keeper updated successfully')
    } else {
      await createBookKeeper({ name: form.name })
      toast.success('Book keeper added successfully')
    }
    emit('saved')
    close()
  } catch (err) {
    toast.error('Failed to save book keeper')
    console.error(err)
  }
}
</script>