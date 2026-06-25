import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('products', () => {
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // apelez API din Express
      const response = await fetch('http://localhost:3000/api/products');
      
      if (!response.ok) {
        throw new Error('Eroare la preluarea produselor');
      }
      
      const data = await response.json();
      products.value = data;
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, isLoading, error, fetchProducts };
});