<script setup>
// import de store para aaceder a las listas
import { useFinanceStore } from '../stores/financeStore';
import TransactionChart from './TransactionChart.vue';

const financeStore = useFinanceStore();

// funcion para formatear el dinero
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(value)
}

// confirmar antes de borar
const confirmDelete = (id) => {
    if(confirm('¿Estás seguro/a de que deseas eliminar este movimiento?')) {
        financeStore.deleteTransaction(id)
    }
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
            <h4 class="text-brand-green font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-green rounded-full"></span>
                Ingresos
            </h4>
            
            <div class="mb-6 bg-brand-silver/10 rounded-xl p-4 border border-brand-silver">
                <TransactionChart 
                    :transactions="financeStore.incomes" 
                    color="#2E8D1B" 
                    labelName="Ingresos" 
                />
            </div>

            <div class="space-y-3">
                <div v-for="item in financeStore.incomes" :key="item.id" class="bg-white border border-brand-silver rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                    <div>
                        <p class="font-medium text-gray-800">{{ item.title }}</p>
                        <p class="text-xs text-gray-400">{{ item.category }}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-bold text-brand-green">{{ formatCurrency(item.amount) }}</span>
                        <button @click="financeStore.setActiveEditItem(item)" class="text-gray-300 hover:text-blue-500 transition-colors" title="Editar">
                            ✎
                        </button>
                        <button @click="confirmDelete(item.id)" class="text-gray-300 hover:text-red-500 transition-colors" title="Eliminar">
                            &times;
                        </button>
                    </div>
                </div>

                <p v-if="financeStore.incomes.length === 0" class="text-gray-400 italic text-sm text-center py-4">
                    No hay ingresos registrados
                </p>
            </div>
        </div>

        <div>
            <h4 class="text-red-500 font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                Gastos
            </h4>

            <div class="mb-6 bg-brand-silver/10 rounded-xl p-4 border border-brand-silver">
                <TransactionChart 
                    :transactions="financeStore.expenses" 
                    color="#EF4444" 
                    labelName="Gastos" 
                />
            </div>

            <div class="space-y-3">
                <div v-for="item in financeStore.expenses" :key="item.id" class="bg-white border border-brand-silver rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                    <div>
                        <p class="font-medium text-gray-800">{{ item.title }}</p>
                        <p class="text-xs text-gray-400">{{ item.category }}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-bold text-red-500">{{ formatCurrency(item.amount) }}</span>
                        <button @click="financeStore.setActiveEditItem(item)" class="text-gray-300 hover:text-blue-500 transition-colors" title="Editar">
                            ✎
                        </button>
                        <button @click="confirmDelete(item.id)" class="text-gray-300 hover:text-red-500 transition-colors" title="Eliminar">
                            &times;
                        </button>
                    </div>
                </div>
                <p v-if="financeStore.expenses.length === 0" class="text-gray-400 italic text-sm text-center py-4">
                    No hay gastos registrados
                </p>   
            </div>
        </div>

    </div>
</template>