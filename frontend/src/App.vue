<script setup>
import { onMounted } from 'vue';
import { useProductStore } from './stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Magazin Periferice</h1>
    </header>

    <main>
      <p v-if="productStore.isLoading">Se incarca produsele...</p>
      
      <p v-if="productStore.error" style="color: red;">{{ productStore.error }}</p>

      <div v-if="!productStore.isLoading && productStore.products.length > 0" class="products-grid">
        <div v-for="product in productStore.products" :key="product.productId" class="product-card">
          <h2>{{ product.name }}</h2>
          <p class="category">{{ product.category.name }}</p>
          <p class="price">{{ product.price }} RON</p>
        </div>
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
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}
.category {
  color: #666;
  font-size: 0.9rem;
}
</style>