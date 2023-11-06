import React from 'react'

export const Total = ({content}) => {
    console.log(content)
    const total = content.reduce((sum, course) => (sum + course.exercises), 0)

  return (
    <strong>total of {total} exercises</strong>
  )
}
