import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchAll } from "./operations";

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
      })
      .addCase(addContact.pending, (state) => {
        state.cars.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = null;
        state.cars.items = state.cars.items.concat(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.cars.isLoading = true;
        state.cars.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = null;
        const index = state.cars.items.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.cars.items.splice(index, 1);
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.cars.isLoading = false;
        state.cars.error = action.error.message;
      });
  },
});

export const { filtercars } = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
