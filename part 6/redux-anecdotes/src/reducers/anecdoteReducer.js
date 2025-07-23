import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

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
// thunk
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content);
    dispatch(newAnecdoteAction(newAnecdote));
  };
};

export const upvote = (id) => {
  return async (dispatch) => {
    console.log(id);
    const newAnecdote = await anecdotesService.upvote(id);
    console.log(newAnecdote, "check");
    dispatch(vote(newAnecdote.id));
  };
};
export const { vote, newAnecdoteAction, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
