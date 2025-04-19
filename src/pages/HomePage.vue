<template>
  <div class="page" id="page-home">
    <div class="date-navigation">
      <button class="icon-button" aria-label="Previous month">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <div class="current-period">April 2025</div>
      <button class="icon-button" aria-label="Next month">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>

    <div class="summary-section">
      <div class="card">
        <div class="card-title">Income</div>
        <div class="card-amount amount-incoming">{{ currencyStore.formatAmount(transactionsStore.getCurrentMonthIncome) }}</div>
        <div class="card-subtitle">This month</div>
      </div>
      <div class="card">
        <div class="card-title">Expenses</div>
        <div class="card-amount amount-outgoing">{{ currencyStore.formatAmount(transactionsStore.getCurrentMonthExpenses) }}</div>
        <div class="card-subtitle">This month</div>
      </div>
    </div>

    <div class="card card-outlined">
      <div class="card-title">Balance</div>
      <div class="card-amount amount-neutral">{{ currencyStore.formatAmount(transactionsStore.getCurrentMonthBalance) }}</div>
      <div class="card-subtitle">Saved this month</div>
    </div>
    
    <h2 class="list-header">Recent Transactions</h2>
    <ul class="transaction-list">
      <li class="transaction-item" v-for="transaction in recentTransactions" :key="transaction.id">
        <div class="transaction-icon-bg">
          <span class="material-symbols-outlined">{{ transaction.icon }}</span>
        </div>
        <div class="transaction-details">
          <div class="transaction-title">{{ transaction.title }}</div>
          <div class="transaction-subtitle">{{ transaction.date }}</div>
        </div>
        <div class="transaction-amount" :class="transaction.type === 'incoming' ? 'incoming' : 'outgoing'">
          {{ currencyStore.formatAmount(transaction.amount) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCurrencyStore } from '../stores/currencyStore';
import { useTransactionsStore } from '../stores/transactionsStore';

export default {
  name: 'HomePage',
  setup() {
    const currencyStore = useCurrencyStore();
    const transactionsStore = useTransactionsStore();
    
    const recentTransactions = computed(() => {
      return transactionsStore.getRecentTransactions(3);
    });
    
    return {
      currencyStore,
      transactionsStore,
      recentTransactions
    };
  }
}
</script>