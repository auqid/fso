import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdotes(state, action) {
      console.log(action);
      return action.payload;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;

export default filterSlice.reducer;
