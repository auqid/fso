import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    dispatch(newAnecdote(content));
    dispatch(setNotification(`You added ${content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
