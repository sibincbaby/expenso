<template>
  <div class="bottom-sheet" :class="{ visible }">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          type="text" 
          id="title" 
          v-model="transaction.title" 
          placeholder="Grocery shopping, Rent, etc."
          required
        />
      </div>
      
      <div class="form-group">
        <label for="amount">Amount</label>
        <input 
          type="number" 
          id="amount" 
          v-model.number="transaction.amount" 
          placeholder="0.00"
          step="0.01"
          min="0.01"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="date">Date</label>
        <input 
          type="date" 
          id="date" 
          v-model="dateInput"
          required
        />
      </div>
      
      <div class="form-group">
        <label>Transaction Type</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="transaction.type" value="incoming" /> 
            Income
          </label>
          <label>
            <input type="radio" v-model="transaction.type" value="outgoing" /> 
            Expense
          </label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="icon">Icon</label>
        <select id="icon" v-model="transaction.icon">
          <option value="payments">💰 Payments</option>
          <option value="restaurant">🍽️ Restaurant</option>
          <option value="shopping_bag">🛒 Shopping</option>
          <option value="home">🏠 Home</option>
          <option value="laptop">💻 Work</option>
          <option value="electric_bolt">⚡ Utilities</option>
          <option value="directions_car">🚗 Transport</option>
          <option value="medical_services">🏥 Healthcare</option>
          <option value="school">🎓 Education</option>
          <option value="nightlife">🎉 Entertainment</option>
        </select>
      </div>
      
      <button type="submit" class="filled-button">Add Transaction</button>
      <button type="button" class="text-button" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useTransactionsStore } from '../stores/transactionsStore';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  
  setup(props, { emit }) {
    const transactionsStore = useTransactionsStore();
    
    // Format today's date as YYYY-MM-DD for the date input
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const dateInput = ref(formattedDate);
    
    const transaction = reactive({
      title: '',
      amount: null,
      type: 'outgoing',
      icon: 'shopping_bag'
    });
    
    // Format the date for display and storage
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
    
    async function handleSubmit() {
      if (transaction.title && transaction.amount) {
        try {
          // Format the date for storage
          const formattedDisplayDate = formatDate(dateInput.value);
          
          // Create a new transaction object
          const newTransaction = {
            title: transaction.title,
            amount: transaction.amount,
            date: formattedDisplayDate,
            type: transaction.type,
            icon: transaction.icon
          };
          
          // Add transaction to the store (which will save to IndexedDB)
          await transactionsStore.addTransaction(newTransaction);
          
          // Reset form
          transaction.title = '';
          transaction.amount = null;
          dateInput.value = formattedDate;
          transaction.type = 'outgoing';
          transaction.icon = 'shopping_bag';
          
          // Close the sheet
          emit('close');
        } catch (error) {
          console.error('Failed to add transaction:', error);
          // You could add error handling UI here
        }
      }
    }

    return {
      transaction,
      dateInput,
      handleSubmit
    };
  }
}
</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: bottom 0.3s ease-in-out;
}

.bottom-sheet.visible {
  bottom: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

input, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.filled-button {
  background-color: #007BFF;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.text-button {
  background: none;
  color: #007BFF;
  border: none;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>