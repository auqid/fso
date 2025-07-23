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
export default { getAll, createAnecdote };
