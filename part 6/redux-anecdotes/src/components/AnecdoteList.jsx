import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { upvote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotificationPopup,
} from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const memoizedSorted = useMemo(
    () => [...anecdotes].sort((a, b) => b.votes - a.votes),
    [anecdotes]
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(upvote(anecdote.id));
    dispatch(setNotificationPopup(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {memoizedSorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
