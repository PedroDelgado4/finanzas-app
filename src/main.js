import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './style.css'
import App from './App.vue'
import { i18n } from './i18n'

// Creamos la instancia de Pinia y le añadimos el plugin
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.mount('#app')

