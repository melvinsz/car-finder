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
