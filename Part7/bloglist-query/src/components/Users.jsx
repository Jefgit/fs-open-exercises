import React from 'react'
import { Link } from 'react-router-dom'
import { BoxContainer } from './styles/BoxContainer.styled'
import { StyledTable } from './styles/Table.styled'
import { StyledTitle } from './styles/Title.styled'

const Users = ({users}) => {
  return (
    <BoxContainer> 
      <StyledTitle>Users</StyledTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => 
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
            )
          }
        </tbody>
      </StyledTable>
    </BoxContainer>
  )
}

export default Users