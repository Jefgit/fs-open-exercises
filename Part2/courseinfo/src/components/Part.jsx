import React from 'react'

export const Part = ({part}) => {
  return (
    <p key={part.id}>{part.name} {part.exercises}</p>
  )
}
