import React from 'react'

export const Person = ({name, number}) => {
  return (
    <p key={name}>{name} {number}</p>
  )
}
