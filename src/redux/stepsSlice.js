import { createSlice } from "@reduxjs/toolkit";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    currentStep: 1,
    completedSteps: [],
  },
  reducers: {
    goToNextStep: (state) => {
      state.currentStep += 1;
    },
    goToPreviousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    markStepCompleted: (state, action) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    resetSteps: (state) => {
      state.currentStep = 1;
      state.completedSteps = [];
    },
  },
});

export const { goToNextStep, goToPreviousStep, markStepCompleted, resetSteps } =
  stepsSlice.actions;

export default stepsSlice.reducer;
