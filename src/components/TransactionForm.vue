<script setup>
import { ref } from 'vue';
import { useFinanceStore } from '../stores/financeStore';
const financeStore = useFinanceStore();

// 1. Estado local del form
// usamos ref para guardar temporalmente lo que el usuario escribe anyes de enviarlo
const title = ref('');
const amount = ref('');
const type = ref('gasto');
const category = ref('');

const categories = ['Comida', 'Transporte', 'Ocio', 'Salario', 'Hogar', 'Salud', 'Otros']

// 2. Funcion de envio del form
const submitForm = () => {
    // validacion para evitar datos vacios o negativos
    if (!title.value || !amount.value || amount.value <= 0 || !category.value) return

    // llamamos al store para guardar el dato
    financeStore.addTransaction({
        title: title.value,
        amount: parseFloat(amount.value), // parseamos para decimal
        type: type.value,
        category: category.value
    })

    // limpiar campos tras guardad
    title.value = '';
    amount.value = '';
    category.value = '';
}
</script>

<template>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div>
            <label class="block text-sm text-gray-600 mb-1">Título</label>
            <input 
                v-model="title" 
                type="text" 
                placeholder="Ej: Compra supermercado" 
                class="w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green"
                required
            />
        </div>
        <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="type" value="ingreso" class="accent-brand-green">
                <span class="text-gray-700">Ingreso</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="type" value="gasto" class="accent-red-500">
                <span class="text-gray-700">Gasto</span>
            </label>
        </div>
        <div>
            <label class="block text-sm text-gray-600 mb-1">Cantidad</label>
            <input 
                v-model="amount" 
                type="number" 
                step="0.01"
                min="0.01"
                placeholder="0.00" 
                class="w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green"
                required
            />
        </div>
        <div>
            <label class="block text-sm text-gray-600 mb-1">Categoría</label>
            <select
                v-model="category"
                class="w-full border border-brand-silver rounded-lg p-2 focus:outline-none focus:border-brand-green"
                required
            >
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
            </select>
        </div>

        <button type="submit" class="w-full bg-brand-green text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity mt-2">
            Añadir movimiento
        </button>
    </form>
</template>