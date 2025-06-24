<template>
  <aside class="w-64 h-screen bg-teal-700 text-white p-6 fixed">
    <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
      <font-awesome-icon icon="book-open" />
      <span>Library</span>
    </h2>
    
    <nav class="space-y-2">
      <!-- Dashboard -->
      <RouterLink 
        to="/dashboard" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="tachometer-alt" />
        <span>Dashboard</span>
      </RouterLink>

      <!-- Books -->
      <RouterLink 
        to="/books" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="book" />
        <span>Books</span>
      </RouterLink>

      <!-- Categories -->
      <RouterLink 
        to="/categories" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="tags" />
        <span>Categories</span>
      </RouterLink>

      <!-- Borrowing -->
      <RouterLink 
        to="/borrowing" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="exchange-alt" />
        <span>Borrowing</span>
      </RouterLink>

      <!-- Reader -->
      <RouterLink 
        to="/reader" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="user" />
        <span>Reader</span>
      </RouterLink>

      <!-- Book Keeper -->
      <RouterLink 
        to="/book-keeper" 
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-600 transition-colors"
        active-class="bg-teal-800"
      >
        <font-awesome-icon icon="user-shield" />
        <span>Book Keeper</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBookOpen, 
  faTachometerAlt, 
  faBook, 
  faTags, 
  faExchangeAlt, 
  faUser, 
  faUserShield 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(
  faBookOpen, 
  faTachometerAlt, 
  faBook, 
  faTags, 
  faExchangeAlt, 
  faUser, 
  faUserShield
)
</script>