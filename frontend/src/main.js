import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './routes/router'
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

