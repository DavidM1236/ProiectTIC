<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/productStore';

const productStore = useProductStore();

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const isEditing = ref(false);
const editName = ref(props.product.name);
const editPrice = ref(props.product.price);

const handleSave = () => {
  const updatedData = {
    name: editName.value,
    price: Number(editPrice.value)
  };
  productStore.updateProduct(props.product.id, updatedData);
  isEditing.value = false;
};
</script>

<template>
  <div class="product-card">
    <div v-if="!isEditing">
      <h2>{{ product.name }}</h2>
      <p class="category">{{ product.category.name }}</p>
      <p class="price">{{ product.price }} RON</p>
      
      <div class="card-actions">
        <button class="btn-edit" @click="isEditing = true">Editeaza</button>
        <button class="btn-delete" @click="productStore.deleteProduct(product.id)">Sterge</button>
      </div>
    </div>

    <div v-else class="edit-mode">
      <input v-model="editName" type="text" />
      <input v-model="editPrice" type="number" />
      
      <div class="card-actions">
        <button class="btn-save" @click="handleSave">Salveaza</button>
        <button class="btn-cancel" @click="isEditing = false">Anuleaza</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom: 15px;
}
.category {
  color: #666;
  font-size: 0.9rem;
}
.card-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}
button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
.btn-edit { background-color: #f39c12; }
.btn-edit:hover { background-color: #d68910; }
.btn-delete { background-color: #e74c3c; }
.btn-delete:hover { background-color: #c0392b; }
.btn-save { background-color: #2ecc71; }
.btn-save:hover { background-color: #27ae60; }
.btn-cancel { background-color: #95a5a6; }
.btn-cancel:hover { background-color: #7f8c8d; }

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.edit-mode input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>