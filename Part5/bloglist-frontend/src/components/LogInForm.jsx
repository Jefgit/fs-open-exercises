import React from 'react'

export const LogInForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form data-testid="loginForm" onSubmit={ handleLogin } >
        <div>
            username
          <input 
            data-testid='username'
            type="text"
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input 
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
