import { defineStore } from 'pinia';
import db from '../db/db';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    loading: false
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
    // Load all transactions from the database
    async loadTransactions() {
      this.loading = true;
      try {
        this.transactions = await db.transactions.toArray();
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Add a new transaction
    async addTransaction(transaction) {
      try {
        // Add to database
        const id = await db.transactions.add(transaction);
        
        // Update local state
        this.transactions.push({ id, ...transaction });
        
        return id;
      } catch (error) {
        console.error('Failed to add transaction:', error);
        throw error;
      }
    },
    
    // Delete a transaction by id
    async deleteTransaction(id) {
      try {
        // Delete from database
        await db.transactions.delete(id);
        
        // Update local state
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
          this.transactions.splice(index, 1);
        }
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        throw error;
      }
    },
    
    // Search transactions by query
    async searchTransactions(query) {
      query = query.toLowerCase();
      try {
        const allTransactions = await db.transactions.toArray();
        return allTransactions.filter(t => 
          t.title.toLowerCase().includes(query) ||
          t.date.toLowerCase().includes(query)
        );
      } catch (error) {
        console.error('Failed to search transactions:', error);
        return [];
      }
    },
    
    // Update a transaction
    async updateTransaction(id, updatedData) {
      try {
        // Update in database
        await db.transactions.update(id, updatedData);
        
        // Update local state
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
          this.transactions[index] = { ...this.transactions[index], ...updatedData };
        }
      } catch (error) {
        console.error('Failed to update transaction:', error);
        throw error;
      }
    }
  }
});