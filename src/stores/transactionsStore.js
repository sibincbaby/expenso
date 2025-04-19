import { defineStore } from 'pinia';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [
      { 
        id: 1,
        title: 'Paycheck', 
        date: 'April 15, 2025', 
        amount: 1620.25,
        icon: 'payments',
        type: 'incoming'
      },
      {
        id: 2,
        title: 'Dinner with friends',
        date: 'April 15, 2025',
        amount: 62.80,
        icon: 'restaurant',
        type: 'outgoing'
      },
      {
        id: 3,
        title: 'Grocery shopping',
        date: 'April 18, 2025',
        amount: 87.32,
        icon: 'shopping_bag',
        type: 'outgoing'
      },
      { 
        id: 4,
        title: 'Rent payment', 
        date: 'April 5, 2025', 
        amount: 950.00,
        icon: 'home',
        type: 'outgoing'
      },
      { 
        id: 5,
        title: 'Freelance work', 
        date: 'April 10, 2025', 
        amount: 250.00,
        icon: 'laptop',
        type: 'incoming'
      },
      { 
        id: 6,
        title: 'Electric bill', 
        date: 'April 8, 2025', 
        amount: 75.42,
        icon: 'electric_bolt',
        type: 'outgoing'
      },
      {
        id: 7,
        title: 'Paycheck',
        date: 'April 1, 2025',
        amount: 1620.25,
        icon: 'payments',
        type: 'incoming'
      }
    ]
  }),

  getters: {
    // Get all transactions
    getAllTransactions: (state) => state.transactions,
    
    // Get recent transactions (most recent first)
    getRecentTransactions: (state) => (limit = 3) => {
      return [...state.transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
    },
    
    // Filter transactions by type (incoming/outgoing)
    getTransactionsByType: (state) => (type) => {
      return state.transactions.filter(transaction => transaction.type === type);
    },
    
    // Get transactions for current month
    getCurrentMonthTransactions: (state) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      return state.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });
    },
    
    // Calculate total income for current month
    getCurrentMonthIncome: (state) => {
      return state.transactions
        .filter(t => {
          const transactionDate = new Date(t.date);
          const currentDate = new Date();
          return t.type === 'incoming' && 
                 transactionDate.getMonth() === currentDate.getMonth() && 
                 transactionDate.getFullYear() === currentDate.getFullYear();
        })
        .reduce((total, t) => total + t.amount, 0);
    },
    
    // Calculate total expenses for current month
    getCurrentMonthExpenses: (state) => {
      return state.transactions
        .filter(t => {
          const transactionDate = new Date(t.date);
          const currentDate = new Date();
          return t.type === 'outgoing' && 
                 transactionDate.getMonth() === currentDate.getMonth() && 
                 transactionDate.getFullYear() === currentDate.getFullYear();
        })
        .reduce((total, t) => total + t.amount, 0);
    },
    
    // Calculate balance (income - expenses) for current month
    getCurrentMonthBalance: (state) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      let income = 0;
      let expenses = 0;
      
      state.transactions.forEach(t => {
        const transactionDate = new Date(t.date);
        if (transactionDate.getMonth() === currentMonth && 
            transactionDate.getFullYear() === currentYear) {
          if (t.type === 'incoming') {
            income += t.amount;
          } else if (t.type === 'outgoing') {
            expenses += t.amount;
          }
        }
      });
      
      return income - expenses;
    }
  },

  actions: {
    // Add a new transaction
    addTransaction(transaction) {
      const newId = Math.max(0, ...this.transactions.map(t => t.id)) + 1;
      this.transactions.push({
        id: newId,
        ...transaction
      });
    },
    
    // Delete a transaction by id
    deleteTransaction(id) {
      const index = this.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        this.transactions.splice(index, 1);
      }
    },
    
    // Search transactions by query
    searchTransactions(query) {
      query = query.toLowerCase();
      return this.transactions.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.date.toLowerCase().includes(query)
      );
    }
  }
});