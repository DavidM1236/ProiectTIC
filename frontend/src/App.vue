<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from './stores/productStore';
import ProductCard from './components/ProductCard.vue';

const productStore = useProductStore();

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
  
  newName.value = '';
  newPrice.value = '';
};
</script>

<template>
  <div class="app-wrapper">
    <nav class="navbar">
      <div class="nav-container">
        <h1>Periferice.ro</h1>
        <div class="user-menu">
          <span>Admin</span>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="add-section">
        <div class="add-card">
          <h3>Adauga un produs nou</h3>
          <div class="input-group">
            <input v-model="newName" type="text" placeholder="Nume produs" />
            <input v-model="newPrice" type="number" placeholder="Pret (RON)" />
            <button class="btn-add" @click="handleAdd">Adauga</button>
          </div>
        </div>
      </div>

      <div class="status-messages">
        <p v-if="productStore.isLoading" class="loading">Se incarca produsele...</p>
        <p v-if="productStore.error" class="error">{{ productStore.error }}</p>
      </div>

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
body {
  margin: 0;
  padding: 0;
  background-color: #EEE9DF; /* Palladian */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #182632; /* Abyssal Anchorfish Blue */
}

.app-wrapper {
  min-height: 100vh;
}

.navbar {
  background-color: #2C384D; /* Blue Fantastic - ofera greutate paginii */
  box-shadow: 0 4px 12px rgba(24, 38, 50, 0.15);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-container h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #EEE9DF; /* Palladian - text deschis pe fundal inchis */
  font-weight: 800;
  letter-spacing: -0.5px;
}

.user-menu {
  font-weight: 700;
  color: #182632; /* Abyssal */
  background: #FFB162; /* Burning Flame - pop de culoare pentru Admin */
  padding: 8px 18px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.user-menu:hover {
  transform: scale(1.05);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.add-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.add-card {
  background: #FFFFFF;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(24, 38, 50, 0.05);
  width: 100%;
  max-width: 700px;
  border: none;
  border-top: 4px solid #A35139; /* Truffle Trouble - accent sus */
}

.add-card h3 {
  margin: 0 0 20px 0;
  color: #182632;
}

.input-group {
  display: flex;
  gap: 15px;
}

.input-group input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #C9C1B1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background-color: #FAFAFA;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #2C384D;
}

.btn-add {
  padding: 10px 24px;
  background-color: #182632; /* Abyssal */
  color: #EEE9DF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-add:hover {
  background-color: #2C384D; /* Blue Fantastic la hover */
  transform: translateY(-1px);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.status-messages {
  text-align: center;
  margin-bottom: 20px;
}
.loading { color: #2C384D; font-weight: 500; }
.error { color: #A35139; font-weight: 500; }

@media (max-width: 600px) {
  .input-group {
    flex-direction: column;
  }
}
</style>