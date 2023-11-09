import React from 'react'

export const Notification = ({message}) => {
    if (message.content === null) {
        return null
    }
    
  return (
    <div className={message.isError ? 'error' : 'success'}>
        {message.content}
    </div>
  )
}
