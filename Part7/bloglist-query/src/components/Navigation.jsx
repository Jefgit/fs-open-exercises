import React from 'react'
import { Link } from 'react-router-dom'
import { StyledHeader, Logo, Nav } from './styles/Header.styled'
import { Button } from './styles/Button.styled'
import { useUser } from '../UserContext'

const Navigation = () => {
  const {state, logout} = useUser()
  console.log(state)
  return (
    <StyledHeader>
        <Logo src='/images/weblog-orange.png' />
        <Nav>
          <Link to='/'>blogs</Link>
          <Link to='/users'>users</Link>
        </Nav>  
        <p>{state.user.name} logged in <Button type="button" onClick={logout}>logout</Button></p>
    </StyledHeader>
  )
}

export default Navigation