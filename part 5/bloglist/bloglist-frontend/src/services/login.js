import axios from 'axios'
const baseUrl = '/api/login'
const login = async (values) => {
  const response = await axios.post(baseUrl, values)
  return response.data
}

export default { login }
