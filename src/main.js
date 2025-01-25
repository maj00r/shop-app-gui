import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

export const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5223";

export async function verify() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/verify`, { method: 'POST', credentials: 'include' });
    if (!response.ok) {
       throw new Error();
    }
  } catch (error) {
    console.error(error)
    throw new Error();
  }
}
const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

