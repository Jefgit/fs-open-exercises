import React from 'react'
import { useSelector } from 'react-redux'
import { useNotification } from '../NotificationContext'
import {StyledNotification} from './styles/Notification.styled'

export const Notification = () => {
  const {state} = useNotification()
  console.log(state)

  return (
      <StyledNotification 
        bg={state.isError ? '#E52B50' : '#AFE1AF'} 
        display={state.canShow ? 'block' : 'none'}
      >
        <p>{state.message}</p>
      </StyledNotification>
  )
}
