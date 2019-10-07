import React, {useState, useEffect} from 'react'
import Filter from './Filter'

import axios from 'axios'

const Country = (props) => {
  let showOneCountry = props.showOneCountry
  let setShowOneCountry = props.setShowOneCountry
  let country = props.country
  return(
    <div>
    <p>{country.name}
    <button onClick = {()=> showOneCountry ? setShowOneCountry('') : setShowOneCountry(country.name)}>
    {showOneCountry===country.name ? 'Hide' : 'Show'}
    </button></p>
    {showOneCountry===country.name ? <OneCountry key = {country.name} country = {country} /> : ''}
    </div>
  )
}

const Language = (props) => {
  return(
    <li>{props.language}</li>
  )
}

const OneCountry = (props) => {
  const [weather, setWeather] = useState([])
  const access_key = 'aab14a140090e21be890123f68276245'
  let query = 'http://api.weatherstack.com/current?access_key='+access_key+'&query='+props.country.capital
  useEffect(() => {
    axios
    .get(query)
    .then(response=>{
      setWeather(response.data)
    })
  },[query])

  console.log(weather, query)
  console.log(weather.current);

  return(
    <div>
      <h2> {props.country.name} </h2>
      <p> Capital -- {props.country.capital} </p>
      <p> Population -- {props.country.population} </p>
      <h3> Languages </h3>
      <ul>
        {props.country.languages.map(language =>
          <Language key = {language.name} language = {language.name} />
        )}
      </ul>
      <img src={props.country.flag} alt='Flag' width = '10%'/>
      <h2>Weather in {props.country.capital}</h2>
      <p><h3> Temperature: </h3> {weather.current.temperature} Celsius</p>
      <img src = {weather.current.weather_icons} alt = 'weather_icon' width='10%'/>
      <p><h3> Wind: </h3> {weather.current.wind_speed} direction -- {weather.current.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
  }, [])
  const [showOneCountry, setShowOneCountry] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [searchItemRegex, setSearchItemRegex] = useState('')

  const countriesToShow = showAll ? countries : countries.filter(country =>  searchItemRegex.test(country.name))

  const rows = () => {
    if (countriesToShow.length>10) {
      return(<p> Too many matches, Narrow down filter </p>)
    }
    else if (countriesToShow.length===1){
      return(
        countriesToShow.map(country =>
            <OneCountry key={country.name} country={country}/>
        )
      )
    }
    else{
      return(
      countriesToShow.map(country =>
        <Country
          key={country.name}
          country={country}
          setShowOneCountry = {setShowOneCountry}
          showOneCountry = {showOneCountry} />
        )
      )
    }
}


  return (
    <div>
      <h1>Countries</h1>
      <Filter
        showAll={showAll} setShowAll={setShowAll}
        searchName={searchName} setSearchName={setSearchName}
        searchItemRegex={searchItemRegex} setSearchItemRegex={setSearchItemRegex} />
      <div>
          {rows()}
      </div>
    </div>
  )
}

export default App
