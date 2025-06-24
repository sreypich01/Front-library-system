<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 class="text-xl font-semibold text-blue-700 mb-4">
        {{ form.id ? 'Edit Reader' : 'Add New Reader' }}
      </h2>
      <form @submit.prevent="submit">
        <input v-model="form.name" type="text" placeholder="Name" class="mb-2 w-full border rounded px-3 py-2" required />
        <input v-model="form.email" type="email" placeholder="Email" class="mb-2 w-full border rounded px-3 py-2" required />
        <select v-model="form.gender" class="mb-4 w-full border rounded px-3 py-2" required>
          <option value="" disabled>Select Gender</option>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
        <div class="flex justify-end gap-2">
          <button type="button" @click="close" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ form.id ? 'Update' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from '@/plugin/axios'
import { useToast } from 'vue-toastification'

const props = defineProps(['show', 'editReader'])
const emit = defineEmits(['close', 'added'])

const toast = useToast()

const form = reactive({
  id: null,
  name: '',
  email: '',
  gender: ''
})

watch(() => props.editReader, (newVal) => {
  if (newVal) {
    form.id = newVal.id
    form.name = newVal.name
    form.email = newVal.email
    form.gender = newVal.gender
  } else {
    form.id = null
    form.name = ''
    form.email = ''
    form.gender = ''
  }
})

const close = () => emit('close')

const submit = async () => {
  try {
    if (form.id) {
      await axios.put(`/readers/${form.id}`, form)
      toast.success('Reader updated successfully')
    } else {
      await axios.post('/readers', form)
      toast.success('Reader added successfully')
    }
    emit('added')
    close()
  } catch (err) {
    toast.error('Failed to save reader')
    console.error(err)
  }
}
</script>