import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import stepsReducer from "./stepsSlice";

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    steps: stepsReducer,
  },
});

export default store;
