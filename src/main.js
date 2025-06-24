import './assets/tailwindcss.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(router)
app.use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
