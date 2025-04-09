import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const response = await axios.get("http://localhost:3001/employees");
  return response.data;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
