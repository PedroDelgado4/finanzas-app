import { createI18n } from 'vue-i18n';

const messages = {
  es: {
    app: {
      title: 'Finance Tracker',
      subtitle: 'Tu gestor de finanzas personales',
      totalBalance: 'Balance Total',
      addMovement: 'Añadir Movimiento',
    },
    form: {
      titleLabel: 'Título',
      titlePlaceholder: 'Ej. Compra supermercado',
      typeIncome: 'Ingreso',
      typeExpense: 'Gasto',
      amountLabel: 'Cantidad (€)',
      categoryLabel: 'Categoría',
      categoryPlaceholder: 'Selecciona una...',
      addButton: 'Añadir Movimiento',
      saveButton: 'Guardar Cambios',
      cancelButton: 'Cancelar',
    },
    list: {
      incomes: 'Ingresos',
      expenses: 'Gastos',
      noIncomes: 'No hay ingresos registrados',
      noExpenses: 'No hay gastos registrados',
      confirmDelete: '¿Estás seguro/a de que deseas eliminar este movimiento?',
    },
    categories: {
      food: 'Comida',
      transport: 'Transporte',
      leisure: 'Ocio',
      salary: 'Salario',
      home: 'Hogar',
      others: 'Otros'
    }
  },
  en: {
    app: {
      title: 'Finance Tracker',
      subtitle: 'Your personal finance manager',
      totalBalance: 'Total Balance',
      addMovement: 'Add Transaction',
    },
    form: {
      titleLabel: 'Title',
      titlePlaceholder: 'E.g. Groceries',
      typeIncome: 'Income',
      typeExpense: 'Expense',
      amountLabel: 'Amount (€)',
      categoryLabel: 'Category',
      categoryPlaceholder: 'Select one...',
      addButton: 'Add Transaction',
      saveButton: 'Save Changes',
      cancelButton: 'Cancel',
    },
    list: {
      incomes: 'Incomes',
      expenses: 'Expenses',
      noIncomes: 'No incomes recorded',
      noExpenses: 'No expenses recorded',
      confirmDelete: 'Are you sure you want to delete this transaction?',
    },
    categories: {
      food: 'Food',
      transport: 'Transport',
      leisure: 'Leisure',
      salary: 'Salary',
      home: 'Home',
      others: 'Others'
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages,
});