import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts", //"sliceName/actionName"
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);

let productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items=action.payload
      }).addCase(fetchProducts.rejected,(state)=>{
        state.loading=false
      })
  },
});
export default productSlice.reducer;
