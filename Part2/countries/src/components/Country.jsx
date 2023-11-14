import React from 'react'

export const Country = ({name, capital, area, languages, flag}) => {
  return (
    <div key={name}>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <strong>languages:</strong>
        <ul>
          {
            Object.values(languages).map((language,i) => <li key={i}>{language}</li>)
          }
        </ul>
        <img src={`${flag}`} alt="" />
      </div>
  )
}
