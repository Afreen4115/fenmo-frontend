import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="https://fenmo-backend-mnoe.onrender.com"

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (category = null) => {
    let url = `${API_URL}/api/expense`;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await axios.get(url);
    console.log("getting data", response);
    return response.data.expenses;
  },
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense, { dispatch }) => {
    const response = await axios.post(
      `${API_URL}/api/expense`,
      expense,
    );
    // Refetch categories after adding expense to update UI with new categories
    dispatch(fetchCategories());
    return response.data.expense;
  },
);

export const fetchCategories = createAsyncThunk(
  "expenses/fetchCategories",
  async () => {
    const response = await axios.get(
      `${API_URL}/api/expense/categories`,
    );
    return response.data.categories;
  },
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    categories: [],
    status: "idle",
    error: null,
    categoryFilter: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.list.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Note: Categories will be refetched by the component after this action
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategoryFilter } = expenseSlice.actions;
export default expenseSlice.reducer;
