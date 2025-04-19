<template>
  <div class="app-container">
    <AppHeader :profileMenuVisible="profileMenuVisible" @toggleProfileMenu="toggleProfileMenu" />
    
    <div class="main-content-area" id="mainContentArea" @scroll="handleFabScroll">
      <HomePage v-if="currentPage === 'page-home'" class="page active" />
      <TransactionsPage v-if="currentPage === 'page-transactions'" class="page active" />
      <ReportsPage v-if="currentPage === 'page-reports'" class="page active" />
      <BudgetsPage v-if="currentPage === 'page-budgets'" class="page active" />
    </div>
    
    <BottomNavigation :currentPage="currentPage" @changePage="setActivePage" />
    
    <button 
      class="fab" 
      :class="{ 'fab-extended': fabExtended }" 
      id="fabAddTransaction" 
      aria-label="Add new transaction"
      @click="showBottomSheet"
    >
      <span class="material-symbols-outlined">add</span>
      <span class="fab-label">Add Transaction</span>
    </button>
    
    <div class="scrim" :class="{ visible: bottomSheetVisible }" @click="hideBottomSheet"></div>
    
    <AddTransactionSheet 
      :visible="bottomSheetVisible" 
      @close="hideBottomSheet"
      @submit="handleTransactionSubmit"
    />
    
    <!-- PWA update prompt -->
    <ReloadPrompt />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useCurrencyStore } from "./stores/currencyStore";
import AppHeader from "./components/AppHeader.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
import HomePage from "./pages/HomePage.vue";
import TransactionsPage from "./pages/TransactionsPage.vue";
import ReportsPage from "./pages/ReportsPage.vue";
import BudgetsPage from "./pages/BudgetsPage.vue";
import AddTransactionSheet from "./components/AddTransactionSheet.vue";
import ReloadPrompt from "./components/pwa/ReloadPrompt.vue";

export default {
  components: {
    AppHeader,
    BottomNavigation,
    HomePage,
    TransactionsPage,
    ReportsPage,
    BudgetsPage,
    AddTransactionSheet,
    ReloadPrompt
  },
  setup() {
    const currentPage = ref("page-home");
    const profileMenuVisible = ref(false);
    const bottomSheetVisible = ref(false);
    const fabExtended = ref(true);
    let lastScrollTop = 0;
    const scrollThreshold = 10;
    
    // Initialize the currency store
    const currencyStore = useCurrencyStore();

    function setActivePage(pageId) {
      currentPage.value = pageId;
      // Reset scroll position when changing pages
      if (document.getElementById("mainContentArea")) {
        document.getElementById("mainContentArea").scrollTop = 0;
      }
      // Re-evaluate FAB state when changing pages
      handleFabScroll();
    }

    function toggleProfileMenu() {
      profileMenuVisible.value = !profileMenuVisible.value;
    }

    function showBottomSheet() {
      bottomSheetVisible.value = true;
    }

    function hideBottomSheet() {
      bottomSheetVisible.value = false;
    }

    function handleTransactionSubmit(transactionText) {
      console.log("Transaction Submitted:", transactionText);
      hideBottomSheet();
      // Here you would normally process the transaction
      // and update your state/store
    }
    
    function handleFabScroll(event) {
      const mainContentArea = document.getElementById("mainContentArea");
      if (!mainContentArea) return;
      
      const currentScrollTop = mainContentArea.scrollTop;
      
      // Scrolling Up OR Near the Top: Extend FAB
      if (currentScrollTop < lastScrollTop || currentScrollTop <= scrollThreshold) {
        fabExtended.value = true;
      }
      // Scrolling Down: Collapse FAB
      else if (currentScrollTop > lastScrollTop) {
        fabExtended.value = false;
      }
      
      lastScrollTop = Math.max(0, currentScrollTop);
    }

    onMounted(() => {
      // Initialize the lastScrollTop value once mounted
      const mainContentArea = document.getElementById("mainContentArea");
      if (mainContentArea) {
        lastScrollTop = mainContentArea.scrollTop;
        handleFabScroll();
      }
    });

    return {
      currentPage,
      profileMenuVisible,
      bottomSheetVisible,
      fabExtended,
      currencyStore, // Expose currency store to the template
      setActivePage,
      toggleProfileMenu,
      showBottomSheet,
      hideBottomSheet,
      handleTransactionSubmit,
      handleFabScroll
    };
  }
};
</script>

<style>
/* Ensure the main-content-area has these styles */
.main-content-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
</style>