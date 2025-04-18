<template>
  <div class="page" id="page-budgets">
    <div v-if="budgets.length > 0">
      <div v-for="(budget, index) in budgets" :key="index" class="budget-item">
        <div class="budget-header">
          <div class="budget-icon">
            <span class="material-symbols-outlined">{{ budget.icon }}</span>
          </div>
          <div class="budget-info">
            <div class="budget-name">{{ budget.name }}</div>
            <div class="budget-limit">Budget: {{ budget.limit }}</div>
          </div>
          <div class="budget-status" :class="budget.statusClass">
            {{ budget.statusText }}
          </div>
        </div>
        
        <div class="progress-bar">
          <div 
            class="progress-bar-inner" 
            :class="budget.progressClass" 
            :style="{ width: budget.percentUsed + '%' }"
          ></div>
        </div>
        
        <div class="budget-details">
          <span>{{ budget.percentUsed }}% used</span>
          <span class="budget-spent">{{ budget.spent }} spent</span>
        </div>
      </div>
    </div>
    
    <div v-else class="no-budgets">
      <span class="material-symbols-outlined">account_balance_wallet</span>
      <h2>No Budgets Yet</h2>
      <p>Create budgets to help manage your spending and track your financial goals.</p>
      <button class="text-button" @click="createNewBudget">Create Budget</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'BudgetsPage',
  setup() {
    const budgets = ref([
      {
        name: 'Groceries',
        icon: 'shopping_basket',
        limit: '$400.00',
        spent: '$325.50',
        percentUsed: 81,
        statusText: 'Warning',
        statusClass: 'warning',
        progressClass: 'warning'
      },
      {
        name: 'Entertainment',
        icon: 'movie',
        limit: '$200.00',
        spent: '$142.25',
        percentUsed: 71,
        statusText: 'On Track',
        statusClass: 'ok',
        progressClass: ''
      },
      {
        name: 'Dining Out',
        icon: 'restaurant',
        limit: '$250.00',
        spent: '$267.80',
        percentUsed: 107,
        statusText: 'Over Budget',
        statusClass: 'error',
        progressClass: 'error'
      },
      {
        name: 'Transportation',
        icon: 'directions_car',
        limit: '$150.00',
        spent: '$83.47',
        percentUsed: 56,
        statusText: 'On Track',
        statusClass: 'ok',
        progressClass: ''
      }
    ]);
    
    function createNewBudget() {
      // In a real app, this would show a form to create a new budget
      alert('Budget creation functionality would go here');
    }
    
    return {
      budgets,
      createNewBudget
    };
  }
}
</script>