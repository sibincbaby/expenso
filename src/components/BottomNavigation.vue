<template>
  <nav class="bottom-nav">
    <button 
      class="nav-item" 
      :class="{ active: currentPage === 'page-home' }"
      @click="$emit('changePage', 'page-home')"
    >
      <div class="icon-container">
        <span class="material-symbols-outlined">home</span>
      </div>
      <span class="label">Home</span>
    </button>
    
    <button 
      class="nav-item" 
      :class="{ active: currentPage === 'page-transactions' }"
      @click="$emit('changePage', 'page-transactions')"
    >
      <div class="icon-container">
        <span class="material-symbols-outlined">receipt_long</span>
      </div>
      <span class="label">Transactions</span>
    </button>
    
    <button 
      class="nav-item" 
      :class="{ active: currentPage === 'page-reports' }"
      @click="$emit('changePage', 'page-reports')"
    >
      <div class="icon-container">
        <span class="material-symbols-outlined">donut_large</span>
      </div>
      <span class="label">Reports</span>
    </button>
    
    <button 
      class="nav-item" 
      :class="{ active: currentPage === 'page-budgets' }"
      @click="$emit('changePage', 'page-budgets')"
    >
      <div class="icon-container">
        <span class="material-symbols-outlined">account_balance_wallet</span>
      </div>
      <span class="label">Budgets</span>
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: String,
      required: true
    }
  }
}
</script>