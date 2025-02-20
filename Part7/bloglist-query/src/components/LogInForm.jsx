import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setLoginUser } from '../reducers/loginUserReducer'
import { BoxContainer } from './styles/BoxContainer.styled'
import { Button } from './styles/Button.styled'
import { StyledInput, StyledForm } from './styles/Form.styled'
import { useUser } from '../UserContext'
import { useNotification } from '../NotificationContext'

export const LogInForm = ({username, password, setUsername, setPassword}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {login} = useUser()
  const {showNotification} = useNotification()

  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })
      console.log(user)
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      blogService.setToken(user.token)
      login(user)
      setUsername('')
      setPassword('')
      navigate('/')  

    } catch (error) {
      showNotification({canShow:true, isError: true, message: error.response.data.error})
      // dispatch(setNotification({message: error.response.data.error, isError:true}, 5))
    }
  }
  return (
    <BoxContainer >
      <img src='/images/weblog-orange.png'/>
      <StyledForm data-testid="loginForm" onSubmit={loginUser} >
        <StyledInput>
        <label htmlFor='username'>username</label>
          <input 
            id='username'
            data-testid='username'
            type="text"
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </StyledInput>
        <StyledInput>
            <label htmlFor='password'>password</label>
          <input 
            id='password'
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </StyledInput>
        <Button type='submit' bg={'#FFB703'}>login</Button>
      </StyledForm>
    </BoxContainer>
  )
}
