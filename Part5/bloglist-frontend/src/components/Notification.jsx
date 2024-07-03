import React from 'react'

export const Notification = ({ isError, message }) => {
  const style = isError ? 'error' : 'success'
  return (
    <div className={style}>
      <p>{message}</p>
    </div>
  )
}
