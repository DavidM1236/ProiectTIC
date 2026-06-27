<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

const productStore = useProductStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

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

const emit = defineEmits(['notify']);

const addToCartAndNotify = () => {
  cartStore.addToCart(props.product);
  emit('notify'); 
};

</script>

<template>
<div class="product-card">
	<div v-if="!isEditing" class="card-content">
		<div class="info">
			<p class="category">{{ product.category.name }}</p>
			<h2>{{ product.name }}</h2>
			<p class="price">{{ product.price }}
				<span>RON</span>
			</p>
		</div>
		<div v-if="authStore.user" class="card-actions">
			<button class="btn btn-edit" @click="isEditing = true">Editeaza</button>
			<button class="btn btn-delete" @click="productStore.deleteProduct(product.id)"> Sterge </button>
		</div>
		<div v-else class="card-actions">
			<button class="btn btn-buy" @click="addToCartAndNotify"> Cumpara </button>
		</div>
	</div>
	<div v-else class="edit-mode">
		<input v-model="editName" type="text" placeholder="Nume produs" />
		<input v-model="editPrice" type="number" placeholder="Pret" />
		<div v-if="authStore.user" class="card-actions">
			<button class="btn btn-save" @click="handleSave">Salveaza</button>
			<button class="btn btn-cancel" @click="isEditing = false"> Anuleaza </button>
		</div>
	</div>
</div>
</template>

<style scoped>
.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid #c9c1b1;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(24, 38, 50, 0.1);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.info {
  flex-grow: 1;
}

h2 {
  margin: 5px 0 15px 0;
  font-size: 1.25rem;
  color: #182632;
  line-height: 1.4;
}

.category {
  color: #2c384d;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  font-weight: 700;
}

.price {
  font-weight: 800;
  font-size: 1.5rem;
  color: #a35139;
  margin: 0 0 20px 0;
}

.price span {
  font-size: 1rem;
  color: #2c384d;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.2s, opacity 0.2s;
}

.btn-edit {
  background-color: #ffb162;
  color: #182632;
}

.btn-edit:hover {
  opacity: 0.85;
}

.btn-delete {
  background-color: #a35139;
  color: #eee9df;
}

.btn-delete:hover {
  opacity: 0.85;
}

.btn-save {
  background-color: #2c384d;
  color: #eee9df;
}

.btn-save:hover {
  background-color: #182632;
}

.btn-cancel {
  background-color: #c9c1b1;
  color: #182632;
}

.btn-cancel:hover {
  opacity: 0.85;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.edit-mode input {
  padding: 10px 12px;
  border: 1px solid #c9c1b1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

.edit-mode input:focus {
  border-color: #2c384d;
}

.btn-buy {
  background-color: #ffb162;
  color: #182632;
  width: 100%;
}

.btn-buy:hover {
  opacity: 0.85;
}
</style>