import { configureStore } from '@reduxjs/toolkit';
import workersReducer from "./components/workers/workersSlice";
import billReducer from "./components/bill/billSlice";
import activeTables from './components/modal/activeTablesSlice';

export const store = configureStore({
  reducer: {
    workers: workersReducer,
    bill: billReducer,
    tables: activeTables
  },
  devTools: true
});