import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item.id !== productId);
  };

  const updateQuantity = (productId, amount) => {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      item.quantity += amount;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      }
    }
  };

  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((total, item) => total + (item.price * item.quantity), 0));

  return { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice };
});