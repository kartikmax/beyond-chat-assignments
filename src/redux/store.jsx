// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import selectedMessageSlice from './selectedMessageSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    selectedMessage:selectedMessageSlice,
  },
});

export default store;
