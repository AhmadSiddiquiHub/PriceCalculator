import { proxy, subscribe } from "valtio";
import { devtools } from "valtio/utils";

// Helper functions to manage localStorage
const loadState = () => {
  const storedState = localStorage.getItem("cart");
  return storedState ? JSON.parse(storedState) : [];
};

const saveState = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartStore = proxy({
  items: loadState(),
  addItem: (item) => {
    const existingItem = cartStore.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartStore.items.push({ ...item, quantity: 1 });
    }
  },
  removeItem: (id) => {
    const index = cartStore.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartStore.items.splice(index, 1);
    }
  },
  updateItem: (id, quantity) => {
    const item = cartStore.items.find((i) => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
  },
  clearCart: () => {
    cartStore.items.length = 0;
  },
});

// Subscribe to changes in cartStore and save to localStorage
subscribe(cartStore.items, () => {
  saveState(cartStore.items);
});

devtools(cartStore, { name: "VoletMarket", enabled: true });

export default cartStore;
