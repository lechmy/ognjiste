import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import tableStorage from "../../storage/tables";
import workers from "../../data/workers.json";

const { setTable, getTables } = tableStorage();
const wt = workers.workers.reduce((acc, curr) => Object.assign(acc, acc[curr.name] = {}), {});

const initialState = {
  activeTables: Object.assign({}, wt, getTables()),
  currentTable: null
};

export const activeTablesSlice = createSlice({
  name: 'activeTables',
  initialState,
  reducers: {
    createTable: (state, action) => {
      const { worker, place, date, bill } = action.payload;
      const tableId = uuidv4();

      state.currentTable = tableId;
      state.activeTables[worker.name][tableId] = {tableId, place, date};
      state.activeTables[worker.name][tableId].bills = [...bill];
      state.activeTables[worker.name][tableId].total = bill.reduce((acc, item) => acc + item.cena * item.quantity, 0);
      setTable(state.activeTables)
    },
    updateTable: (state, action) => {
      const {tableId, worker, bill} = action.payload;
      let bills = [...current(state.activeTables[worker][tableId].bills)];
      const total = state.activeTables[worker][tableId].total

      bill.forEach(b => {
        let index = bills.findIndex(currentBillRow => currentBillRow.id === b.id);
        if(index >= 0) {
          state.activeTables[worker][tableId].bills[index].quantity = bills[index].quantity + b.quantity;
        } else {
          state.activeTables[worker][tableId].bills.push(b);
        }
      });
      state.activeTables[worker][tableId].total = state.activeTables[worker][tableId].bills.reduce((acc, item) => acc + item.cena * item.quantity, total);
      setTable(state.activeTables)
    },
    updateArticle: (state, action) => {
      const {tableId, worker, article} = action.payload;
      let bills = [];
      state.activeTables[worker][tableId].bills.forEach(item => {
        if(item.id === article.id) {
          item.quantity--;
          if(item.quantity === 0) {
            return;
          }
        }
        bills.push(item);
      })
      if(bills.length) {
        state.activeTables[worker][tableId].bills = bills;
        state.activeTables[worker][tableId].total = bills.reduce((acc, item) => acc + item.cena * item.quantity, 0);
      } else {
        delete state.activeTables[worker][tableId]
      }
      setTable(state.activeTables)
    },
    setCurrentTable: (state, action) => {
      state.currentTable = action.payload;
    },
    setCurrentTableToPaid: (state, action) => {
      const { worker, tableId } = action.payload
      state.activeTables[worker][tableId].paid = true;
    },
    clearAllTable: (state, action) => {
      state.activeTables = Object.assign({}, wt)
      setTable(state.activeTables)
    },
    clearCurrentTable: (state, action) => {
      state.currentTable = null;
    }
  }
});

export const { createTable, updateTable, updateArticle, setCurrentTable, setCurrentTableToPaid, clearAllTable, clearCurrentTable } = activeTablesSlice.actions;

export default activeTablesSlice.reducer;
