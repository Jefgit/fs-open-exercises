import React from 'react'

export const Button = ({handler, text}) => {
  return <button onClick={handler}>{text}</button>
}
