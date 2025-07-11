import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("Token set in service:", token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async (formvalues) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("Creating blog with token:", token);
  console.log(config);
  const response = await axios.post(baseUrl, formvalues, config);
  return response.data;
};

export default { getAll, create, setToken };
