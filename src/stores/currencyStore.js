import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    currency: 'INR', // Default currency set to Indian Rupee
    currencySymbol: '₹',
    availableCurrencies: [
      { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
      { code: 'GBP', symbol: '£', name: 'British Pound' },
    ],
  }),
  
  getters: {
    // Get the current currency symbol
    currentCurrencySymbol: (state) => state.currencySymbol,
    
    // Get all available currencies
    getAllCurrencies: (state) => state.availableCurrencies,
    
    // Format amount according to current currency
    formatAmount: (state) => {
      return (amount) => {
        return `${state.currencySymbol}${amount.toFixed(2)}`;
      };
    },
  },
  
  actions: {
    // Change the currency
    setCurrency(currencyCode) {
      const selectedCurrency = this.availableCurrencies.find(c => c.code === currencyCode);
      if (selectedCurrency) {
        this.currency = selectedCurrency.code;
        this.currencySymbol = selectedCurrency.symbol;
      }
    },
  },
});