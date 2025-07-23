import { useDispatch } from "react-redux";
import { newAnecdoteAction } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdotesService.createAnecdote(content);
    console.log(newAnecdote);
    dispatch(newAnecdoteAction(newAnecdote));
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
