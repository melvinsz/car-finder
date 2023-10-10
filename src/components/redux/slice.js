import { createSlice } from "@reduxjs/toolkit";
import { fetchAll } from "./operations";

const initialState = {
  cars: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: "",
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filtercars: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.cars.isLoading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = null;
        state.cars.items = action.payload.items;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = action.error.message;
        state.cars.items = initialState.cars.items;
      });
  },
});

export const { filtercars } = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
