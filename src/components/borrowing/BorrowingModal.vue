<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">
          {{ editBorrowing ? 'Edit Borrow Record' : 'New Borrow Record' }}
        </h2>
        
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="book_id">
                Book
              </label>
              <select
                v-model="form.book_id"
                id="book_id"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>Select a book</option>
                <option v-for="book in books" :key="book.id" :value="book.id">
                  {{ book.title }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="reader_id">
                Reader
              </label>
              <select
                v-model="form.reader_id"
                id="reader_id"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>Select a reader</option>
                <option v-for="reader in readers" :key="reader.id" :value="reader.id">
                  {{ reader.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="borrowed_at">
                Borrowed Date
              </label>
              <input
                v-model="form.borrowed_at"
                id="borrowed_at"
                type="date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
                Quantity
              </label>
              <input
                v-model="form.quantity"
                id="quantity"
                type="number"
                min="1"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>
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
              {{ editBorrowing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { createBorrowing, updateBorrowing } from '@/api/borrowing'
import { getBooks } from '@/api/book'
import { getReaders } from '@/api/reader'

const props = defineProps({
  show: Boolean,
  editBorrowing: Object
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const form = reactive({
  id: null,
  book_id: '',
  reader_id: '',
  borrowed_at: new Date().toISOString().split('T')[0],
  quantity: 1
})

const books = ref([])
const readers = ref([])

onMounted(async () => {
  await fetchBooks()
  await fetchReaders()
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

const fetchReaders = async () => {
  try {
    const response = await getReaders()
    readers.value = response.data
  } catch (error) {
    toast.error('Failed to fetch readers')
    console.error(error)
  }
}

watch(() => props.editBorrowing, (newVal) => {
  if (newVal) {
    form.id = newVal.id
    form.book_id = newVal.book_id
    form.reader_id = newVal.reader_id
    form.borrowed_at = newVal.borrowed_at.split('T')[0]
    form.quantity = newVal.quantity
  } else {
    form.id = null
    form.book_id = ''
    form.reader_id = ''
    form.borrowed_at = new Date().toISOString().split('T')[0]
    form.quantity = 1
  }
})

const close = () => emit('close')

const submit = async () => {
  try {
    const borrowingData = {
      book_id: form.book_id,
      reader_id: form.reader_id,
      borrowed_at: form.borrowed_at,
      quantity: form.quantity
    }

    if (form.id) {
      await updateBorrowing(form.id, borrowingData)
      toast.success('Borrow record updated successfully')
    } else {
      await createBorrowing(borrowingData)
      toast.success('Borrow record created successfully')
    }
    emit('saved')
    close()
  } catch (err) {
    toast.error('Failed to save borrow record')
    console.error(err)
  }
}
</script>