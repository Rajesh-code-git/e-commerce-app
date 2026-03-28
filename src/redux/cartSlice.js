import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        existing.quantity += 1; // ✅ already irundha increment
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // ✅ new item
      }
    },

    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    
    clearCart:(state)=>{
      state.items=[]
    }

  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, incrementQty, decrementQty,clearCart } =
  cartSlice.actions;
