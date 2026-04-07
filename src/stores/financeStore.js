import {defineStore} from 'pinia'
import { ref, computed } from 'vue'

export const useFinanceStore = defineStore('finance', () => {
    // 1. ESTADO (State)
    // 'transactions' es el array principal. Guarda objetos con id, title, amount, type, category, date.
    const transactions = ref([])

    // 2. ACCIONES (Actions)
    // añadir nueva transaccion
    const addTransaction = (transaction) => {
        transactions.value.unshift({...transaction, id: Date.now().toString(), date: new Date().toISOString()})
    }

    // eliminar transaccion
    const deleteTransaction = (id) => {
        transactions.value = transactions.value.filter(transaction => transaction.id !== id)
    }

    // editar una trasnccion
    const editTransaction = (id, newTransaction) => {
        const index = transactions.value.findIndex(t => t.id === updatedTransaction.id)
        if (index !== -1) {
            transactions.value[index] = updatedTransaction
        }
    }

    // 3. GETTERS (datos dererivados/computasdos)
    // separamos ingresos
    const incomes = computed(() => transactions.value.filter(t => t.type === 'ingreso'))
    const expenses = computed(() => transactions.value.filter(t => t.type === 'gasto'))

    // Balance total
    const balance = computed (() => {
        const totalIncome = incomes.value.reduce((sum, t) => sum + t.amount, 0)
        const totalExpense = expenses.value.reduce((sum, t) => sum + t.amount, 0)
        return totalIncome - totalExpense
    })

    // retornamos todo lo que exponemos a los componentes
    return {
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        incomes,
        expenses,
        balance
    },
    // 4. CONFIGURACIÓN DEL PLUGIN
    // Esta línea hace que todo el array 'transactions' se guarde en localStorage automaticamente
    { persist: true }

    
})