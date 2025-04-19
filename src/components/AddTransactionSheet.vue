<template>
  <div class="bottom-sheet" :class="{ visible }">
    <form @submit.prevent="handleSubmit">
      <div class="text-field-container">
        <textarea
          v-model="transactionText"
          placeholder="Enter transaction details"
          aria-label="Transaction details"
        ></textarea>
      </div>
      <button type="submit" class="filled-button">Add Transaction</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const transactionText = ref('');

    function handleSubmit() {
      if (transactionText.value.trim()) {
        emit('submit', transactionText.value);
        transactionText.value = '';
      }
    }

    return {
      transactionText,
      handleSubmit
    };
  }
}
</script>