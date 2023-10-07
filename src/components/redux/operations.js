import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://651060513ce5d181df5d30d0.mockapi.io";

export const fetchAll = createAsyncThunk("advert/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/advert");
    return { items: response.data };
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk("advert/addContact", async ({ name, number }, thunkAPI) => {
  try {
    const response = await axios.post("/advert", { name, phone: number });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk("advert/deleteTask", async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`/advert/${contactId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
