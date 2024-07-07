import { createSlice } from "@reduxjs/toolkit";

const selectedMessageSlice = createSlice({
  name: "selectedMessage",
  initialState: {
    messageId: null,
  },
  reducers: {
    selectMessage: (state, action) => {
      state.messageId = action.payload;
    },
  },
});

export const { selectMessage } = selectedMessageSlice.actions;

export default selectedMessageSlice.reducer;
