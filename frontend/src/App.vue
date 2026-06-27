<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from './stores/productStore';
import { useAuthStore } from './stores/authStore';
import ProductCard from './components/ProductCard.vue';

const productStore = useProductStore();
const authStore = useAuthStore();

// Variabile pentru produs
const newName = ref('');
const newPrice = ref('');

// Variabile pentru Login Modal
const showLoginModal = ref(false);
const email = ref('');
const password = ref('');

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

// Functia de procesare Login
const handleLogin = async () => {
  await authStore.login(email.value, password.value);
  if (!authStore.error) {
    showLoginModal.value = false;
    email.value = '';
    password.value = '';
  }
};

// Functia pentru butonul de sus
const toggleAuth = () => {
  if (authStore.user) {
    authStore.logout();
  } else {
    showLoginModal.value = true;
  }
};
</script>

<template>
  <div class="app-wrapper">
    <nav class="navbar">
      <div class="nav-container">
        <h1>Periferice.ro</h1>
        <div class="user-menu" @click="toggleAuth">
          <span>{{ authStore.user ? 'Logout' : 'Guest' }}</span>
        </div>
      </div>
    </nav>

    <div v-if="showLoginModal" class="modal-overlay" @click.self="showLoginModal = false">
      <div class="modal-content">
        <h2>Conectare Administrator</h2>
        <input v-model="email" type="email" placeholder="Email" class="login-input" />
        <input v-model="password" type="password" placeholder="Parola" class="login-input" />
        
        <p v-if="authStore.error" class="error-text">{{ authStore.error }}</p>
        
        <div class="modal-actions">
          <button class="btn-login" @click="handleLogin">Intra in cont</button>
          <button class="btn-close" @click="showLoginModal = false">Anuleaza</button>
        </div>
      </div>
    </div>

    <main class="main-content">
      <div v-if="authStore.user" class="add-section">
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
  background-color: #EEE9DF;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #182632;
}

.app-wrapper {
  min-height: 100vh;
}

.navbar {
  background-color: #2C384D;
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
  color: #EEE9DF;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.user-menu {
  font-weight: 700;
  color: #182632;
  background: #FFB162;
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
  border-top: 4px solid #A35139;
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
  background-color: #182632;
  color: #EEE9DF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-add:hover {
  background-color: #2C384D;
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

.loading { 
  color: #2C384D; 
  font-weight: 500; 
}

.error { 
  color: #A35139; 
  font-weight: 500; 
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(24, 38, 50, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.modal-content h2 {
  margin: 0 0 10px 0;
  color: #2C384D;
  text-align: center;
}
.login-input {
  padding: 12px;
  border: 1px solid #C9C1B1;
  border-radius: 8px;
  font-size: 1rem;
}
.login-input:focus {
  outline: none;
  border-color: #2C384D;
}
.error-text {
  color: #A35139;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}
.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.btn-login {
  flex: 1; padding: 12px;
  background-color: #2C384D; color: white;
  border: none; border-radius: 8px; cursor: pointer; font-weight: bold;
}
.btn-login:hover { background-color: #182632; }
.btn-close {
  flex: 1; padding: 12px;
  background-color: #C9C1B1; color: #182632;
  border: none; border-radius: 8px; cursor: pointer; font-weight: bold;
}
.btn-close:hover { opacity: 0.8; }
</style>