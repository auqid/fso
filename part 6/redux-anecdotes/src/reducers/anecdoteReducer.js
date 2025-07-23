import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log(action);
      const id = action.payload;
      const anecdoteChanged = state.find((x) => x.id === id);
      const newAnecdote = {
        ...anecdoteChanged,
        votes: anecdoteChanged.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? newAnecdote : anecdote
      );
    },
    newAnecdoteAction(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, newAnecdoteAction, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
