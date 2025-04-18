<template>
  <div class="page" id="page-reports">
    <div class="filter-chips">
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'week' }" 
        @click="setFilter('week')"
      >
        Week
      </button>
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'month' }" 
        @click="setFilter('month')"
      >
        Month
      </button>
      <button 
        class="chip" 
        :class="{ active: activeFilter === 'year' }" 
        @click="setFilter('year')"
      >
        Year
      </button>
    </div>
    
    <div class="chart-placeholder">
      Expense chart will be displayed here
    </div>
    
    <h2 class="list-header">Spending by Category</h2>
    <div class="card">
      <div v-for="(category, index) in categories" :key="index" class="category-list-item">
        <div class="category-icon">
          <span class="material-symbols-outlined">{{ category.icon }}</span>
        </div>
        <div class="category-details">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-percent">{{ category.percent }}% of total</div>
        </div>
        <div class="category-amount">{{ category.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ReportsPage',
  setup() {
    const activeFilter = ref('month');
    
    const categories = ref([
      {
        name: 'Housing',
        icon: 'home',
        percent: 45,
        amount: '$950.00'
      },
      {
        name: 'Food',
        icon: 'restaurant',
        percent: 20,
        amount: '$425.50'
      },
      {
        name: 'Transportation',
        icon: 'directions_car',
        percent: 15,
        amount: '$312.75'
      },
      {
        name: 'Entertainment',
        icon: 'movie',
        percent: 10,
        amount: '$209.40'
      },
      {
        name: 'Utilities',
        icon: 'water_drop',
        percent: 10,
        amount: '$210.47'
      }
    ]);
    
    function setFilter(filter) {
      activeFilter.value = filter;
      // In a real app, you would update the data based on the selected time period
    }
    
    return {
      activeFilter,
      categories,
      setFilter
    };
  }
}
</script>