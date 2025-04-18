<template>
  <header class="top-app-bar">
    <h1 class="title">Expenso</h1>
    <div class="currency-selector">
      <button class="currency-button" @click="toggleCurrencyMenu">
        {{ currencyStore.currency }}
        <span class="material-symbols-outlined">expand_more</span>
      </button>
      <div class="currency-menu" :class="{ visible: currencyMenuVisible }">
        <ul>
          <li v-for="currency in currencyStore.availableCurrencies" :key="currency.code">
            <button @click="selectCurrency(currency.code)">
              <span class="currency-symbol">{{ currency.symbol }}</span>
              <span class="currency-code">{{ currency.code }}</span> - {{ currency.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="profile-button-container">
      <button class="icon-button" @click="$emit('toggleProfileMenu')" aria-label="Profile menu">
        <span class="material-symbols-outlined">account_circle</span>
      </button>
      <div class="profile-menu" :class="{ visible: profileMenuVisible }">
        <ul>
          <li><a href="#"><span class="material-symbols-outlined">account_circle</span>My Account</a></li>
          <li><a href="#"><span class="material-symbols-outlined">settings</span>Settings</a></li>
          <li class="divider"></li>
          <li><a href="#"><span class="material-symbols-outlined">help</span>Help & Feedback</a></li>
          <li><a href="#"><span class="material-symbols-outlined">logout</span>Sign Out</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useCurrencyStore } from '../stores/currencyStore';

export default {
  props: {
    profileMenuVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const currencyStore = useCurrencyStore();
    const currencyMenuVisible = ref(false);
    
    function toggleCurrencyMenu() {
      currencyMenuVisible.value = !currencyMenuVisible.value;
    }
    
    function selectCurrency(code) {
      currencyStore.setCurrency(code);
      currencyMenuVisible.value = false;
    }
    
    return {
      currencyStore,
      currencyMenuVisible,
      toggleCurrencyMenu,
      selectCurrency
    };
  }
}
</script>

<style scoped>
.currency-selector {
  position: relative;
  margin-right: auto;
  margin-left: 16px;
}

.currency-button {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 16px;
  color: white;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
}

.currency-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.currency-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;
  margin-top: 8px;
  z-index: 100;
  display: none;
}

.currency-menu.visible {
  display: block;
}

.currency-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.currency-menu li {
  border-bottom: 1px solid #f0f0f0;
}

.currency-menu li:last-child {
  border-bottom: none;
}

.currency-menu button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.currency-menu button:hover {
  background: #f5f5f5;
}

.currency-symbol {
  width: 20px;
  display: inline-block;
  margin-right: 8px;
}

.currency-code {
  font-weight: 500;
  margin-right: 4px;
}
</style>