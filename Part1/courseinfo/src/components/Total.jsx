import React from 'react'

export const Total = ({course}) => {
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <>
        <p>Number of exercises {total}</p>
    </>
    
  )
}
