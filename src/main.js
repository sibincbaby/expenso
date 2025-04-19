import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import './styles.css'
import { useTransactionsStore } from './stores/transactionsStore'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // This function is called when a new service worker is available
    console.log('New content available, click on reload button to update.')
  },
  onOfflineReady() {
    // This function is called when the app is ready to work offline
    console.log('App ready to work offline')
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize the app
app.mount('#app')

// Once the app is mounted, load the transactions from IndexedDB
const transactionsStore = useTransactionsStore()
transactionsStore.loadTransactions()
