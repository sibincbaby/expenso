<template>
  <div v-if="needRefresh" class="pwa-update-container">
    <div class="pwa-update-card">
      <span class="material-symbols-outlined update-icon">system_update</span>
      <div class="pwa-update-text">
        <div class="pwa-update-title">New version available</div>
        <div class="pwa-update-message">An updated version of Expenso is available</div>
      </div>
      <button @click="updateServiceWorker" class="pwa-update-button">
        Update
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'

// Initialize
const needRefresh = ref(false)
const offlineReady = ref(false)

let updateServiceWorker = () => {}

onMounted(() => {
  // Register service worker
  updateServiceWorker = registerSW({
    onNeedRefresh() {
      needRefresh.value = true
    },
    onOfflineReady() {
      offlineReady.value = true
    }
  })
})
</script>

<style>
.pwa-update-container {
  position: fixed;
  bottom: 96px; /* Position above the bottom nav */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 16px;
}

.pwa-update-card {
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-large);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--md-sys-color-outline-variant);
}

.pwa-update-text {
  flex: 1;
}

.update-icon {
  font-size: 24px;
  color: var(--md-sys-color-primary);
}

.pwa-update-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--md-sys-color-on-surface);
}

.pwa-update-message {
  font-size: 0.875rem;
  color: var(--md-sys-color-on-surface-variant);
}

.pwa-update-button {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border: none;
  border-radius: var(--md-sys-shape-corner-full);
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
</style>