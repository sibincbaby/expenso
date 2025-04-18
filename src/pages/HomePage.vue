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
        <div class="card-amount amount-incoming">{{ currencyStore.formatAmount(3240.50) }}</div>
        <div class="card-subtitle">This month</div>
      </div>
      <div class="card">
        <div class="card-title">Expenses</div>
        <div class="card-amount amount-outgoing">{{ currencyStore.formatAmount(2108.12) }}</div>
        <div class="card-subtitle">This month</div>
      </div>
    </div>

    <div class="card card-outlined">
      <div class="card-title">Balance</div>
      <div class="card-amount amount-neutral">{{ currencyStore.formatAmount(1132.38) }}</div>
      <div class="card-subtitle">Saved this month</div>
    </div>
    
    <h2 class="list-header">Recent Transactions</h2>
    <ul class="transaction-list">
      <li class="transaction-item">
        <div class="transaction-icon-bg">
          <span class="material-symbols-outlined">shopping_bag</span>
        </div>
        <div class="transaction-details">
          <div class="transaction-title">Grocery shopping</div>
          <div class="transaction-subtitle">April 18, 2025</div>
        </div>
        <div class="transaction-amount outgoing">{{ currencyStore.formatAmount(87.32) }}</div>
      </li>
      <li class="transaction-item">
        <div class="transaction-icon-bg">
          <span class="material-symbols-outlined">restaurant</span>
        </div>
        <div class="transaction-details">
          <div class="transaction-title">Dinner with friends</div>
          <div class="transaction-subtitle">April 15, 2025</div>
        </div>
        <div class="transaction-amount outgoing">{{ currencyStore.formatAmount(62.80) }}</div>
      </li>
      <li class="transaction-item">
        <div class="transaction-icon-bg">
          <span class="material-symbols-outlined">payments</span>
        </div>
        <div class="transaction-details">
          <div class="transaction-title">Paycheck</div>
          <div class="transaction-subtitle">April 15, 2025</div>
        </div>
        <div class="transaction-amount incoming">{{ currencyStore.formatAmount(1620.25) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCurrencyStore } from '../stores/currencyStore';

export default {
  name: 'HomePage',
  setup() {
    const currencyStore = useCurrencyStore();
    
    return {
      currencyStore
    };
  }
}
</script>