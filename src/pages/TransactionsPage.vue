<template>
  <div class="page" id="page-transactions">
    <div class="search-bar-container">
      <span class="material-symbols-outlined search-icon">search</span>
      <input 
        type="text" 
        class="search-input" 
        placeholder="Search transactions..." 
        v-model="searchQuery"
        @input="filterTransactions"
      />
    </div>
    
    <div class="filter-chips">
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'all' }" 
        @click="setFilter('all')"
      >
        <span class="material-symbols-outlined">tune</span>All
      </button>
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'expense' }" 
        @click="setFilter('expense')"
      >
        <span class="material-symbols-outlined">arrow_outward</span>Expense
      </button>
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'income' }" 
        @click="setFilter('income')"
      >
        <span class="material-symbols-outlined">arrow_downward</span>Income
      </button>
    </div>
    
    <h2 class="list-header">All Transactions</h2>
    <ul class="transaction-list">
      <li v-for="(transaction, index) in formattedTransactions" :key="index" class="transaction-item">
        <div class="transaction-icon-bg">
          <span class="material-symbols-outlined">{{ transaction.icon }}</span>
        </div>
        <div class="transaction-details">
          <div class="transaction-title">{{ transaction.title }}</div>
          <div class="transaction-subtitle">{{ transaction.date }}</div>
        </div>
        <div class="transaction-amount" :class="transaction.type">{{ transaction.formattedAmount }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useCurrencyStore } from '../stores/currencyStore';

export default {
  name: 'TransactionsPage',
  setup() {
    const currencyStore = useCurrencyStore();
    
    // Sample transaction data - in a real app, this would come from a store or API
    const transactions = ref([
      { 
        title: 'Paycheck', 
        date: 'April 15, 2025', 
        amount: 1620.25,
        icon: 'payments',
        type: 'incoming'
      },
      {
        title: 'Dinner with friends',
        date: 'April 15, 2025',
        amount: 62.80,
        icon: 'restaurant',
        type: 'outgoing'
      },
      {
        title: 'Grocery shopping',
        date: 'April 18, 2025',
        amount: 87.32,
        icon: 'shopping_bag',
        type: 'outgoing'
      },
      { 
        title: 'Rent payment', 
        date: 'April 5, 2025', 
        amount: 950.00,
        icon: 'home',
        type: 'outgoing'
      },
      { 
        title: 'Freelance work', 
        date: 'April 10, 2025', 
        amount: 250.00,
        icon: 'laptop',
        type: 'incoming'
      },
      { 
        title: 'Electric bill', 
        date: 'April 8, 2025', 
        amount: 75.42,
        icon: 'electric_bolt',
        type: 'outgoing'
      }
    ]);
    
    const searchQuery = ref('');
    const activeFilter = ref('all');
    
    const filteredTransactions = computed(() => {
      let result = transactions.value;
      
      // Filter by type
      if (activeFilter.value === 'expense') {
        result = result.filter(t => t.type === 'outgoing');
      } else if (activeFilter.value === 'income') {
        result = result.filter(t => t.type === 'incoming');
      }
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(t => 
          t.title.toLowerCase().includes(query) ||
          t.date.toLowerCase().includes(query)
        );
      }
      
      return result;
    });
    
    // Apply currency formatting to all transactions 
    const formattedTransactions = computed(() => {
      return filteredTransactions.value.map(transaction => ({
        ...transaction,
        formattedAmount: currencyStore.formatAmount(transaction.amount)
      }));
    });
    
    function setFilter(filter) {
      activeFilter.value = filter;
    }
    
    function filterTransactions() {
      // The computation happens automatically via computed property
    }
    
    return {
      searchQuery,
      activeFilter,
      formattedTransactions,
      setFilter,
      filterTransactions,
      currencyStore
    };
  }
}
</script>