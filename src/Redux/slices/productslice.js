import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoading: false,
  getProductLoading: false,
  createProductLoading: false,
  deleteProductLoading: false,
  updateProductLoading: false,
  products: [],
  isSidebarOpen: false,
};

// Async thunk using fetch with the provided API URL
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      return data; // Assuming data is an array of products
    } catch (e) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProductLocal: (state, { payload: { name, sizes } }) => {
      state.products.push({ name, sizes });
    },
    // Add any additional local reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        // Assuming you have a toast library to handle errors
      });
  },
});

// Export actions
export const { createProductLocal } = productSlice.actions;

// Export reducer to be imported in the store
export default productSlice.reducer;
