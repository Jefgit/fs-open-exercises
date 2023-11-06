import React from 'react'
import { Header } from './Header'
import { Content } from './Content'

export const Course = ({course}) => {
  return (
    <div>
        <Header header={course.name} />
        <Content content={course.parts} />
    </div>
  )
}
