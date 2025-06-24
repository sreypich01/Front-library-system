<template>
  <table class="w-full border text-left">
    <thead class="bg-blue-100 text-blue-700">
      <tr>
        <th class="px-4 py-2 border">#</th>
        <th class="px-4 py-2 border">Name</th>
        <th class="px-4 py-2 border">Email</th>
        <th class="px-4 py-2 border">Gender</th>
        <th class="px-4 py-2 border">Created At</th>
        <th class="px-4 py-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(reader, index) in readers" :key="reader.id" class="hover:bg-gray-100 relative">
        <td class="px-4 py-2 border">{{ index + 1 }}</td>
        <td class="px-4 py-2 border">{{ reader.name }}</td>
        <td class="px-4 py-2 border">{{ reader.email }}</td>
        <td class="px-4 py-2 border">{{ reader.gender }}</td>
        <td class="px-4 py-2 border">{{ formatDate(reader.created_at) }}</td>
        <td class="px-4 py-2 border relative">
          <button @click="toggleMenu(reader.id)" class="text-gray-600 hover:text-blue-600">⋮</button>
          <div
            v-if="activeMenu === reader.id"
            class="absolute z-10 bg-white border rounded shadow w-28 right-0 mt-2"
          >
            <button
              @click="edit(reader)"
              class="block w-full text-left px-4 py-2 hover:bg-blue-100"
            >✏️ Edit</button>
            <button
              @click="confirmDelete(reader)"
              class="block w-full text-left px-4 py-2 hover:bg-red-100"
            >🗑️ Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["readers"]);

const editReader = reader => {
  emit("edit", reader);
  openMenuId.value = null;
};

const deleteReader = id => {
  emit("delete", id);
  openMenuId.value = null;
};

const formatDate = date => {
  return new Date(date).toLocaleString();
};
const emit = defineEmits(["edit", "delete"]);
const activeMenu = ref(null);

const toggleMenu = id => {
  activeMenu.value = activeMenu.value === id ? null : id;
};

const edit = reader => {
  emit("edit", reader);
  activeMenu.value = null;
};

const confirmDelete = reader => {
  emit("delete", reader);
  activeMenu.value = null;
};
</script>
