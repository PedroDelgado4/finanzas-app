<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// --- LÓGICA DE IDIOMAS ---
const { locale } = useI18n();

// --- LÓGICA DE MODO OSCURO ---
const isDark = ref(false);

// Al cargar, comprobamos si el usuario ya tenía el modo oscuro activado antes
onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});

const toggleDark = () => {
  isDark.value = !isDark.value;
  // Añadimos o quitamos la clase 'dark' de la etiqueta <html>
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Guardamos la preferencia
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
</script>

<template>
  <div class="flex justify-end items-center gap-4 mb-6">
    
    <button 
      @click="toggleDark" 
      class="relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none"
      :class="isDark ? 'bg-brand-green' : 'bg-gray-300'"
      aria-label="Toggle Dark Mode"
    >
      <span 
        class="inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 flex items-center justify-center text-xs shadow-sm"
        :class="isDark ? 'translate-x-9' : 'translate-x-1'"
      >
        {{ isDark ? '🌙' : '☀️' }}
      </span>
    </button>

    <div class="relative">
      <select 
        v-model="locale" 
        class="appearance-none bg-white dark:bg-gray-800 border border-brand-silver text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:border-brand-green cursor-pointer"
      >
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇬🇧 English</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>

  </div>
</template>