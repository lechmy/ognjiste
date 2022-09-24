import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWorker: null
};

export const workersSlice = createSlice({
  name: 'currentWorker',
  initialState,
  reducers: {
    setCurrentWorker: (state, action) => {
      state.currentWorker = action.payload;
    },
    clearCurrentWorker: (state, action) => {
      state.currentWorker = null;
    }
  }
});

export const { setCurrentWorker, clearCurrentWorker } = workersSlice.actions;

export default workersSlice.reducer;