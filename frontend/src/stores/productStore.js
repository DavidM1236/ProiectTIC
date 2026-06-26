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
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) throw new Error('Eroare la preluarea produselor');
      products.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) await fetchProducts();
    } catch (err) {
      console.error("Eroare la adaugare:", err);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) await fetchProducts();
    } catch (err) {
      console.error("Eroare la actualizare:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) await fetchProducts();
    } catch (err) {
      console.error("Eroare la stergere:", err);
    }
  };

  return { products, isLoading, error, fetchProducts, addProduct, updateProduct, deleteProduct };
});