import Dexie from 'dexie';

// Create a Dexie database
const db = new Dexie('expenseTrackerDB');

// Define database schema with tables and indices
db.version(1).stores({
  transactions: '++id, title, date, type, amount, icon'
});

// Add some initial data if the database is new
db.on('populate', async () => {
  await db.transactions.bulkAdd([
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
    },
    {
      title: 'Paycheck',
      date: 'April 1, 2025',
      amount: 1620.25,
      icon: 'payments',
      type: 'incoming'
    }
  ]);
});

export default db;