import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

//Load from localStorage
function loadCart() {
  try {
    const data = localStorage.getItem("cart");
    if (!data) return { items: [] };

    const parsed = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return { items: parsed };
    }

    return parsed;
  } catch {
    return { items: [] };
  }
}

// Create store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

// Save to localStorage
store.subscribe(() => {
  console.log("Subscribe Running");

  const state = store.getState();
  const cartData = { items: state.cart.items };
  localStorage.setItem("cart", JSON.stringify(cartData));
});
