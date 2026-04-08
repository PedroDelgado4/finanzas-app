<script setup>

import { useFinanceStore } from './stores/financeStore';
import TransactionForm from './components/TransactionForm.vue';
import TransactionList from './components/TransactionList.vue';
import SettingsBar from './components/SettingsBar.vue';
import FloatingProfileButton from './components/FloatingProfileButton.vue';


const financeStore = useFinanceStore();

// Función para formatear el dinero en formato europeo
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

</script>

<template>
  <div class="min-h-screen p-4 md:p-8 transition-colors duration-300">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <SettingsBar />

      <header class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {{ $t('app.title') }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          {{ $t('app.subtitle') }}
        </p>
      </header>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-brand-silver dark:border-gray-700 flex flex-col items-center transition-colors duration-300">
        <h2 class="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ $t('app.totalBalance') }}</h2>
        <p 
          class="text-5xl font-bold mt-2" 
          :class="financeStore.balance >= 0 ? 'text-brand-green' : 'text-red-500'"
        >
          {{ formatCurrency(financeStore.balance) }}
        </p>
      </section>

      <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-brand-silver dark:border-gray-700">
          <h3 class="font-bold text-gray-700 dark:text-gray-200 mb-4">{{ $t('app.addMovement') }}</h3>
          <TransactionForm />
        </div>
        <div class="lg:col-span-2">
          <TransactionList />
        </div>
      </main>
      <FloatingProfileButton/>
    </div>
  </div>
</template>