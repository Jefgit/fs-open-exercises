import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'http://api.weatherapi.com/v1/current.json?'

const getWeather = (countryName) => {
    const request = axios.get(`${baseUrl}key=${api_key}&q=${countryName}`)
    return (request.then(res => res.data))
}

export default { getWeather }