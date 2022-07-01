import { useState , useEffect} from 'react'
import axios from 'axios'

const FindCountries = ({countryData,newSearchCountry,handleCountryChange}) =>{
  return(
    <div>
      find countries<input value={newSearchCountry} onChange={handleCountryChange}/>   
    </div>
  )
}

const DisplayDetails = ({match}) => {
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
    </div>
  )
}

const DisplayCountrywithButton = ({matchingCountries,handleButtonPress,extraInfo}) => {
  // if (extraInfo[country.name.common]){
  //   < DisplayDetails match={country}/>
  // }

  return(
    
    matchingCountries.map(country => 
    <div>
    <table>
    <tr>
      <td><p key={country.name.common}>{country.name.common}</p></td>
      
     <td> <button onClick={(event) =>handleButtonPress(event,country)}>show</button></td>
    </tr>
  </table>
  {extraInfo[country.name.common] ? < DisplayDetails match={country}/>:""}

  {console.log(extraInfo)}
    </div>
  )
  )
}

const DisplayMatches = ({countryData,newSearchCountry,handleButtonPress,extraInfo}) => {
  const matchingCountries = countryData.filter( function(country){
    return country.name.common.toLowerCase().includes(newSearchCountry.toLowerCase())})
  const matchingNames=matchingCountries.map(country => country.name.common)
  if (matchingNames.length>10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if ((matchingNames.length<=10) && (matchingNames.length>1)){
    return (
     < DisplayCountrywithButton extraInfo={extraInfo} matchingNames={matchingNames} matchingCountries={matchingCountries} handleButtonPress={handleButtonPress}/>
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
    

    setExtraInfo({...extraInfo, [country_name]: true})
    
    console.log('button pressed')
    console.log('extrainfo', extraInfo)

    
  }

  


  return (
    <div>

    <FindCountries newSearchCountry={newSearchCountry} handleCountryChange={handleCountryChange} />
    <DisplayMatches countryData={countryData} extraInfo={extraInfo} newSearchCountry={newSearchCountry} handleButtonPress={handleButtonPress}/>
    </div>

  )
}

export default App;
