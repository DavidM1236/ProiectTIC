<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from './stores/productStore';
import ProductCard from './components/ProductCard.vue';

const productStore = useProductStore();

// Variabile pentru formular
const newName = ref('');
const newPrice = ref('');

onMounted(() => {
  productStore.fetchProducts();
});

const handleAdd = () => {
  if (!newName.value || !newPrice.value) return;
  
  const product = {
    name: newName.value,
    price: Number(newPrice.value),
    category: { id: 'cat_custom', name: 'Altele' }
  };

  productStore.addProduct(product);
  
  // Curatam formularul
  newName.value = '';
  newPrice.value = '';
};
</script>

<template>
  <div class="container">
    <header>
      <h1>Magazin Periferice</h1>
    </header>

    <main>
      <div class="add-form">
        <h3>Adauga un produs nou</h3>
        <input v-model="newName" type="text" placeholder="Nume produs (ex: Mouse Logitech)" />
        <input v-model="newPrice" type="number" placeholder="Pret (RON)" />
        <button @click="handleAdd">Adauga</button>
      </div>

      <p v-if="productStore.isLoading">Se incarca produsele...</p>
      <p v-if="productStore.error" style="color: red;">{{ productStore.error }}</p>

      <div v-if="!productStore.isLoading && productStore.products.length > 0" class="products-grid">
        <ProductCard 
          v-for="product in productStore.products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.add-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #eee;
}
.add-form input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.add-form button {
  padding: 8px 15px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-form button:hover {
  background-color: #27ae60;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>