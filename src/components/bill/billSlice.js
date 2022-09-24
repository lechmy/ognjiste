import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBill: []
};

export const billSlice = createSlice({
  name: 'currentBill',
  initialState,
  reducers: {
    addToCurrentBill: (state, action) => {
      let index = state.currentBill.findIndex(currentBillRow => currentBillRow.id === action.payload.id);
      if (index < 0) {
        let menuItem = { ...action.payload };
        menuItem.quantity = 1;
        state.currentBill.push(menuItem);
      } else {
        state.currentBill[index].quantity++;
      }
    },
    removeFromCurrentBill: (state, action) => {
      let index = state.currentBill.findIndex(currentBillRow => currentBillRow.id === action.payload.id);
      if (index >= 0) {
        state.currentBill[index].quantity--;
        if (state.currentBill[index].quantity < 1) {
          state.currentBill.splice(index, 1);
        }
      }
    },
    removeAllFromCurrentBill: state => {
      state.currentBill = [];
    }
  }
});

export const { addToCurrentBill, removeFromCurrentBill, removeAllFromCurrentBill } = billSlice.actions;

export default billSlice.reducer;