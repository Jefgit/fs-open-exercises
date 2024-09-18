import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {

  const {showNotif, isError, message} = useSelector(({notification}) => notification)
  console.log(showNotif)
  const style = isError ? 'error' : 'success'
  const display = showNotif ? {} : {display: 'none'} 
  return (
    <div className={style} style={display}>
      <p>{message}</p>
    </div>
  )
}
