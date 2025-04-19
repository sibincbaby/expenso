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
      <li v-for="transaction in formattedTransactions" :key="transaction.id" class="transaction-item">
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
import { useTransactionsStore } from '../stores/transactionsStore';

export default {
  name: 'TransactionsPage',
  setup() {
    const currencyStore = useCurrencyStore();
    const transactionsStore = useTransactionsStore();
    
    const searchQuery = ref('');
    const activeFilter = ref('all');
    
    const filteredTransactions = computed(() => {
      let result = [];
      
      // Filter by type
      if (activeFilter.value === 'expense') {
        result = transactionsStore.getTransactionsByType('outgoing');
      } else if (activeFilter.value === 'income') {
        result = transactionsStore.getTransactionsByType('incoming');
      } else {
        result = transactionsStore.getAllTransactions;
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
      currencyStore,
      transactionsStore
    };
  }
}
</script>