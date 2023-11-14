import React from 'react'

export const Weather = ({country, temp, icon, wind}) => {
  return (
    <div>
        <h2>Weather in {country}</h2>
        <p>temperature {temp} Celsius</p>
        <img src={`${icon}`} alt="" />
        <p>wind {wind} mph</p>
    </div>
  )
}
