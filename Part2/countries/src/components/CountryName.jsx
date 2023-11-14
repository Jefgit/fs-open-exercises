import React from 'react'

export const CountryName = ({name, handler}) => {
  return (
    <p key={name}>
        {name} 
        <button 
        onClick={() => handler(name)}
        >
        show
        </button>
    </p>
  )
}
