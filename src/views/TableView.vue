<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between mb-4">
      <h1 class="text-2xl font-bold text-blue-700">📚 Readers</h1>
      <button @click="openAddForm" class="bg-blue-600 text-white px-4 py-2 rounded-lg">➕ Add Reader</button>
    </div>

    <ReaderTable :readers="readers" @edit="startEdit" @delete="showDeleteConfirm" />
    <ReaderForm
      :show="showModal"
      :editReader="editReader"
      @close="closeForm"
      @added="fetchReaders"
    />
    <ConfirmDialog
      :show="showDeleteModal"
      title="Delete Reader"
      message="This will permanently delete the reader and their borrowing history."
      @confirm="deleteReader"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from 'vue-toastification';
import ReaderTable from "@/components/ReaderTable.vue";
import ReaderForm from "@/components/ReaderForm.vue";
import axios from "@/plugin/axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const toast = useToast();
const editReader = ref(null);
const readerToDelete = ref(null);
const showDeleteModal = ref(false);
const readers = ref([]);
const showModal = ref(false);

const fetchReaders = async () => {
  try {
    const response = await axios.get("/readers");
    readers.value = response.data;
  } catch (error) {
    toast.error("Failed to fetch readers");
    console.error(error);
  }
};

const openAddForm = () => {
  editReader.value = null;
  showModal.value = true;
};

const startEdit = (reader) => {
  editReader.value = { ...reader };
  showModal.value = true;
};

const closeForm = () => {
  showModal.value = false;
  editReader.value = null;
};

const showDeleteConfirm = (reader) => {
  readerToDelete.value = reader;
  showDeleteModal.value = true;
};

const deleteReader = async () => {
  try {
    await axios.delete(`/readers/${readerToDelete.value.id}`);
    showDeleteModal.value = false;
    readerToDelete.value = null;
    fetchReaders();
    toast.success("Reader deleted successfully");
  } catch (err) {
    toast.error("Failed to delete reader");
    console.error(err);
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  readerToDelete.value = null;
};

onMounted(fetchReaders);
</script>