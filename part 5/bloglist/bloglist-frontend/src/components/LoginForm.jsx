import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          data-testid="username"
        />
        <br />
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          data-testid="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
