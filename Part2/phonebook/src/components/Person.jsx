import React from 'react'

export const Person = ({handler, id, name, number}) => {
  return (
    <p key={id}>{name} {number} <button onClick={() => handler(id)}>delete</button></p>
  )
}
