import React from 'react'
import { Part } from './Part'
import { Total } from './Total'

export const Content = ({content}) => {
  return (
    <div>
        {content.map((part) => 
            <Part key={part.id} part={part}/>)
        }
    <Total content={content}/>
    </div>
  )
}
