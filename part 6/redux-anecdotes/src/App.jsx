import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList from "./AnecdoteList";
import Filter from "./Filter";
const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
