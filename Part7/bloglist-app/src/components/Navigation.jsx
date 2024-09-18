import React from 'react'
import { Link } from 'react-router-dom'
import { StyledHeader, Logo, Nav } from './styles/Header.styled'
import { Button } from './styles/Button.styled'

const Navigation = ({loggedInUser, handleLogout}) => {
  return (
    <StyledHeader>
        <Logo src='/images/weblog-orange.png' />
        <Nav>
          <Link to='/'>blogs</Link>
          <Link to='/users'>users</Link>
        </Nav>  
        <p>{loggedInUser.name} logged in <Button type="button" onClick={handleLogout}>logout</Button></p>
    </StyledHeader>
  )
}

export default Navigation