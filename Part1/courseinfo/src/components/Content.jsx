import React from 'react'
import { Part } from './Part'

export const Content = ({course}) => {
  console.log(course)
  return (
    <>
        <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
        <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
        <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>
    </>
  )
}
