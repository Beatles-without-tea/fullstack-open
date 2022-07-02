import { useState , useEffect} from 'react'
import axios from 'axios'
import {REACT_APP_API_KEY} from './API_KEY.js'


const FindCountries = ({countryData,newSearchCountry,handleCountryChange}) =>{
  return(
    <div>
      find countries<input value={newSearchCountry} onChange={handleCountryChange}/>   
    </div>
  )
}

const DisplayDetails = ({match,REACT_APP_API_KEY}) => {
  const [cityWeather, setCityWeather] =useState('')
  const [cityWind, setCityWind] =useState('')
  const [cityImage, setCityImage] =useState('')
  const city = match.capital
 
  // console.log('weather:',cityWeather.data.current.temperature)

  const weatherApi=`http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${city}`
  const weather_hook = (weatherApi) => {
    axios
      .get(weatherApi)
      .then(response => {
        console.log('response',response)
        setCityWeather(response.data.current.temperature)
        setCityWind(response.data.current.wind_speed)
        setCityImage(response.data.current.weather_icons[0])
    })
  }
  useEffect(()=> weather_hook(weatherApi),[])   

  
  const languages = match.languages
  return(
    <div>
    <h1>{match.name.common}</h1>
    <p>capital {match.capital}</p>
    <p>area {match.area}</p>
    <b>languages:</b>
    <ul>
      {Object.values(languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={match.flags.svg} width="300" height="250"/>
    <h2>Weather in {match.capital}</h2>
    <p>temperature {cityWeather} Celcius</p>
    <img src={cityImage}/>
    <p>wind {cityWind} m/s</p>
    </div>
  )
}

const DisplayCountrywithButton = ({matchingCountries,handleButtonPress,extraInfo,REACT_APP_API_KEY}) => {
  // if (extraInfo[country.name.common]){
  //   < DisplayDetails match={country}/>
  // }

  return(
    
    matchingCountries.map(country => 
    <div>
    <table>
    <tr>
      <td><p key={country.name.common}>{country.name.common}</p></td>
      
     <td> <button onClick={(event) =>handleButtonPress(event,country,extraInfo)}>show</button></td>
    </tr>
  </table>
  {extraInfo[country.name.common]===true ? < DisplayDetails match={country} REACT_APP_API_KEY={REACT_APP_API_KEY} 
  />:""}

  {console.log(extraInfo)}
    </div>
  )
  )
}

const DisplayMatches = ({countryData,newSearchCountry,handleButtonPress,extraInfo,REACT_APP_API_KEY}) => {
  const matchingCountries = countryData.filter( function(country){
    return country.name.common.toLowerCase().includes(newSearchCountry.toLowerCase())})
  const matchingNames=matchingCountries.map(country => country.name.common)
  if (matchingNames.length>10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if ((matchingNames.length<=10) && (matchingNames.length>1)){
    return (
     < DisplayCountrywithButton extraInfo={extraInfo} matchingNames={matchingNames} matchingCountries={matchingCountries} handleButtonPress={handleButtonPress} 
     REACT_APP_API_KEY={REACT_APP_API_KEY}  />
    )
  }else if (matchingNames.length==1){
    const match = matchingCountries[0]
    return(
    <DisplayDetails match={match}/>
    )
  }
  } 

const App = () => {
  const [newSearchCountry, setSearchCountry] = useState('')
  const [countryData ,setCountryData] = useState([])
  const [extraInfo, setExtraInfo] = useState({'placeholder':true})
 

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryData(response.data)
      })
  }
  
  useEffect(hook, [])

  


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  const handleButtonPress = (event,country,extraInfo) => {
    console.log('event target',event.target)
    const country_name=country.name.common
    console.log('country',country_name)
    if (Object.keys(extraInfo).includes(country_name)){
      if (extraInfo[country_name]){
        setExtraInfo({...extraInfo,[country_name]:false})
      }else{
        setExtraInfo({...extraInfo, [country_name]: true})
      }
    }else{
      setExtraInfo({...extraInfo, [country_name]: true})
    }
    
    console.log(extraInfo)
    // setExtraInfo({...extraInfo, [country_name]: true})
    
    
    console.log('extrainfo', extraInfo)

    
  }

  


  return (
    <div>

    <FindCountries newSearchCountry={newSearchCountry} handleCountryChange={handleCountryChange} />
    <DisplayMatches countryData={countryData} extraInfo={extraInfo} newSearchCountry={newSearchCountry} handleButtonPress={handleButtonPress}
    REACT_APP_API_KEY={REACT_APP_API_KEY} />
    </div>

  )
}

export default App;
