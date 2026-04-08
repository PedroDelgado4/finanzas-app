<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// Importamos la imagen desde assets
import PDLogo from '../assets/PDLogo.svg'

// Estado reactivo para abrir/cerrar
const isOpen = ref(false)
// Referencia al contenedor para detectar clics fuera
const containerRef = ref(null)

// Función para cerrar si haces clic fuera (Equivalente al useEffect de React)
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Registrar/Eliminar el evento global (Ciclo de vida de Vue)
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Función para alternar el menú
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60]" ref="containerRef">
    
    <Transition name="fade-slide">
      <div 
        v-if="isOpen" 
        class="absolute bottom-20 right-0 w-64 p-5 bg-white border border-stone-200 rounded-2xl shadow-2xl mb-2 backdrop-blur-sm"
      >
        <p class="text-stone-600 text-sm font-medium mb-4 leading-relaxed">
          ¡Visita mi perfil de GitHub para ver todos mis proyectos!
        </p>
        <a 
          href="https://github.com/PedroDelgado4/" 
          target="_blank" 
          rel="noreferrer"
          class="inline-block w-full text-center bg-stone-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-stone-800 transition-colors"
        >
          Ver GitHub →
        </a>
        <div class="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-stone-200 rotate-45"></div>
      </div>
    </Transition>

    <button 
      @click="toggle"
      class="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-300 group relative animate-pulse-emerald hover:animate-none"
    >
      <img 
        :src="PDLogo" 
        alt="Logo de Pedro Delgado" 
        class="w-8 h-8 object-contain group-hover:rotate-12 transition-transform"
      />
      
      <span v-if="isOpen" class="absolute inset-0 flex items-center justify-center bg-emerald-700 rounded-full text-white font-bold text-xl">
        ✕
      </span>
    </button>
  </div>
</template>

<style scoped>
/* 1. Animaciones de entrada/salida del popup (fade-slide) */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* 2. Definición de la animación de pulso (Keyframes CSS) */
@keyframes pulse-emerald {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); /* Esmeralda-500 con 70% opacidad */
  }
  70% {
    box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); /* Crece la sombra y se desvanece a 0% */
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); /* Vuelve al inicio */
  }
}

/* 3. Clase utilitaria para aplicar la animación */
.animate-pulse-emerald {
  animation: pulse-emerald 2s infinite; /* 2 segundos de duración, bucle infinito */
}
</style>