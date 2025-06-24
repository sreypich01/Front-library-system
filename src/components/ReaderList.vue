<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Reader List</h2>
    <ul>
      <li v-for="reader in readers" :key="reader.id">
        {{ reader.type }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../plugin/axios'; // import our Axios instance

export default {
  name: 'ReaderList',
  data() {
    return {
      readers: []
    };
  },
  mounted() {
    this.getReaders();
  },
  methods: {
    async getReaders() {
      try {
        const response = await api.get('/categories');
        this.readers = response.data;
      } catch (error) {
        console.error('Failed to fetch readers:', error);
      }
    }
  }
};
</script>
