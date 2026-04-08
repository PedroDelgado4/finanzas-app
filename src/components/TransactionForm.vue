<script setup>
import { ref, watch } from 'vue';
import { useFinanceStore } from '../stores/financeStore';
// Importamos useI18n para poder traducir dentro del <script> si hiciera falta
import { useI18n } from 'vue-i18n'; 

const financeStore = useFinanceStore();
const { t } = useI18n();

const title = ref('');
const amount = ref('');
const type = ref('gasto');
const category = ref('');

// Guardamos las CLAVES, no la traducción final
const categoryKeys = ['food', 'transport', 'leisure', 'salary', 'home', 'others'];

watch(() => financeStore.activeEditItem, (newItem) => {
  if (newItem) {
    title.value = newItem.title;
    amount.value = newItem.amount;
    type.value = newItem.type;
    category.value = newItem.category; // Recupera la clave 'food', 'transport', etc.
  } else {
    title.value = '';
    amount.value = '';
    type.value = 'gasto';
    category.value = '';
  }
});

const submitForm = () => {
  if (!title.value || amount.value <= 0 || !category.value) return;

  if (financeStore.activeEditItem) {
    financeStore.editTransaction({
      id: financeStore.activeEditItem.id,
      title: title.value,
      amount: parseFloat(amount.value),
      type: type.value,
      category: category.value,
      date: financeStore.activeEditItem.date
    });
    financeStore.clearActiveEditItem();
  } else {
    financeStore.addTransaction({
      title: title.value,
      amount: parseFloat(amount.value),
      type: type.value,
      category: category.value
    });
  }

  title.value = '';
  amount.value = '';
  category.value = '';
};

const cancelEdit = () => {
  financeStore.clearActiveEditItem();
};
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('form.titleLabel') }}</label>
      <input 
        v-model="title" 
        type="text" 
        :placeholder="$t('form.titlePlaceholder')"
        class="w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green bg-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" 
        required 
      />
    </div>

    <div class="flex gap-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" v-model="type" value="ingreso" class="accent-brand-green" /> 
        <span class="text-gray-700 dark:text-gray-300">{{ $t('form.typeIncome') }}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" v-model="type" value="gasto" class="accent-red-500" /> 
        <span class="text-gray-700 dark:text-gray-300">{{ $t('form.typeExpense') }}</span>
      </label>
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('form.amountLabel') }}</label>
      <input 
        v-model="amount" 
        type="number" 
        step="0.01" 
        min="0.01"
        placeholder="0.00"
        class="w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green bg-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" 
        required 
      />
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">{{ $t('form.categoryLabel') }}</label>
      <select 
        v-model="category" 
        class="appearance-none w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 cursor-pointer" 
        required
      >
        <option value="" disabled>{{ $t('form.categoryPlaceholder') }}</option>
        <option v-for="catKey in categoryKeys" :key="catKey" :value="catKey">
          {{ $t(`categories.${catKey}`) }}
        </option>
      </select>
    </div>

    <div class="flex gap-2 mt-2">
      <button 
        type="submit" 
        class="flex-1 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        :class="financeStore.activeEditItem ? 'bg-blue-500' : 'bg-brand-green'"
      >
        {{ financeStore.activeEditItem ? $t('form.saveButton') : $t('form.addButton') }}
      </button>

      <button 
        v-if="financeStore.activeEditItem"
        type="button"
        @click="cancelEdit"
        class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {{ $t('form.cancelButton') }}
      </button>
    </div>
  </form>
</template>