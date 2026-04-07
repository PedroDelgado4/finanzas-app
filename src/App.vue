<script setup>

import { useFinanceStore } from './stores/financeStore';
import TransactionForm from './components/TransactionForm.vue';
const financeStore = useFinanceStore();

</script>

<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <header class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Finance Tracker</h1>
        <p class="text-gray-500">Tu gestor de finanzas personales</p>
      </header>
      <section class="bg-white rounded-2xl shadow-sm p-6 border border-brand-silver flex flex-col items-center">
        <h2 class="text-lg font-semibold text-gray-500 uppercase tracking-wide">Balance total</h2>
        <p class="text-5xl font-bold mt-2" :class="financeStore.balance >= 0 ? 'text-brand-green' : 'text-red-500'">{{ financeStore.balance }} €</p>
      </section>

      <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 bg-white rounded-2xl shadow-sm p-6 border border-brand-silver">
          <h3 class="font-bold text-gray-700 mb-4">Añadir movimiento...</h3>
          <TransactionForm/>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-brand-silver">
          <h3 class="font-bold text-gray-700 mb-4">Últimos movimientos</h3>
          <p class="text-gray-400 italic text-sm">Aquí va la lista de movimientos y graficas</p>
        </div>
      </main>
    </div>
  </div>
</template>
