<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
// Modulos de chart.js
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

// Registramos los modulos de chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

//Props
const props = defineProps({
    transactions: {
        type: Array,
        required: true
    },
    color: {
        type: String,
        default: '#2e8d1b'
    },
    labelName: {
        type: String,
        default: 'Movimientos'
    }
})

// calculo de datos para la grafica
const chartData = computed(() => {
    const labels = [];
    const dataTotals = [];
    const today = new Date()
    // generar ultimos 30 dias
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)

        // formateo de fecha a DD/MM
        const dateString = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit'
        })
        labels.push(dateString)
        // sumamos el total de cada dia que coincida con la fecha
        const totalForDay = props.transactions.reduce((sum, t) => {
            const tDate = new Date(t.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
            if  (tDate === dateString) {
                return sum + t.amount
            }
            return sum
        }, 0)
        dataTotals.push(totalForDay)
    }
    // estructura que exige chart.js
    return {
        labels,
        datasets: [
            {
                label: props.labelName,
                backgroundColor: props.color,
                borderRadius: 4,
                data: dataTotals
            }
        ]
    }
})

// opciones visuales de la grafica
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { display: false }, // Ocultamos los números del eje Y
      grid: { display: false }   // Ocultamos las líneas de fondo horizontales
    },
    x: {
      grid: { display: false },  // Ocultamos las líneas verticales
      ticks: { maxTicksLimit: 6 } // Mostramos solo unas pocas fechas para no apelotonar el texto
    }
  },
  plugins: {
    legend: { display: false } // Ocultamos la leyenda superior
  }
};
</script>
<template>
  <div class="h-48 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>