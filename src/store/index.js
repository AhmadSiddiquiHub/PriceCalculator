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

// Deep equality check for two objects
const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (
      key !== "quantity" &&
      (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key]))
    ) {
      return false;
    }
  }

  return true;
};

// Convert proxy object to plain object
const toPlainObject = (proxyObj) => {
  return JSON.parse(JSON.stringify(proxyObj));
};

const cartStore = proxy({
  items: loadState(),
  addItem: (item) => {
    // Convert item to plain object for comparison
    const plainItem = toPlainObject(item);

    // Check if an item with the same id and identical properties (other than quantity) already exists
    const existingItem = cartStore.items.find((i) => {
      const plainI = toPlainObject(i);
      return plainI.id === plainItem.id && deepEqual(plainI, plainItem);
    });

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartStore.items.push({ ...item, quantity: item.quantity || 1 });
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
