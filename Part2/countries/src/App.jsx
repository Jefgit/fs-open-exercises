import { useEffect, useState } from 'react'

import { Country } from './components/Country'
import { Weather } from './components/Weather'
import { CountryName } from './components/CountryName'
import countriesServices from './services/countries'
import weatherServices from './services/weather'

function App() {
  const [textSearch, setTextSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    countriesServices
    .getAll()
      .then(returnedCountries => setCountries((returnedCountries))
    )
  }, [])

  useEffect(() => {
    if( countriesFiltered.length === 1){
     weatherServices
     .getWeather(countriesFiltered[0].name.common)
        .then(weather => {
          setWeatherInfo({
            country: weather.location.country, 
            temp: weather.current.temp_c, 
            wind: weather.current.wind_mph,
            icon: weather.current.condition
          })
      })
    .catch(err => console.log(err)) 
    } else {
      setWeatherInfo(null)
    }
  },[countriesFiltered])
  
  const searchHandler = (e) => {
    setTextSearch(e.target.value)
    const textSearch_lc = textSearch.toLowerCase()

    const countriesCopy = countries.filter(
      country => country.name.common.toString().toLowerCase().includes(textSearch_lc)
    )
    setCountriesFiltered(countriesCopy)
  }

  const showCountry = (countryName) => {
    const oneCountry = countriesFiltered.filter(country => country.name.common === countryName)
    setCountriesFiltered(oneCountry)
  }

  let countryInfo = '';
  let weather = '';
  switch(true){
    case countriesFiltered.length > 10:
      countryInfo = <p>Too many matches, specify another filter</p>
      break;

    case countriesFiltered.length <= 10 && countriesFiltered.length > 1 :
      countryInfo = countriesFiltered.map((country) => 
      <CountryName key={country.name.common} name={country.name.common} handler={showCountry}/>
      )
      break;

    case countriesFiltered.length === 1:
      countryInfo = countriesFiltered.map((country) => 
        <Country 
          key={country.name.common}
          name={country.name.common} 
          capital={country.capital} 
          area={country.area} 
          languages={country.languages} 
          flag={country.flags.png}
        />
      )

      weather = weatherInfo 
      ?
        <Weather 
          country={weatherInfo.country} 
          temp={weatherInfo.temp} 
          icon={weatherInfo.icon.icon} 
          wind={weatherInfo.wind}
        /> 
      : <p>loading weather...</p>
      break;

    default: countryInfo = ''  
    }
   
  return (
    <div>
      {
        countries 
          ? <p>find countries <input type="text" value={textSearch} onChange={searchHandler}/></p>
          : 'loading database....'
      }
        
      { countryInfo }

      { weather }
    </div>
  )
}

export default App
