import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAnecdote = async (content) => {
  console.log(content, "services");
  const object = {
    content,
    votes: 0,
  };
  console.log(object);
  const response = await axios.post(baseURL, object);
  console.log(response, "services");
  return response.data;
};

const upvote = async (id) => {
  const anecdote = await axios.get(`${baseURL}/${id}`);

  const newAnecdote = {
    ...anecdote.data,
    votes: anecdote.data.votes + 1,
  };
  const response = await axios.put(`${baseURL}/${id}`, newAnecdote);
  return response.data;
};

export default { getAll, createAnecdote, upvote };
