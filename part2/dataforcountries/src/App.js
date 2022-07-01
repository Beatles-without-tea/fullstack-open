import { useState , useEffect} from 'react'
import axios from 'axios'

const FindCountries = ({countryData,newSearchCountry,handleCountryChange}) =>{
  return(
    <div>
      find countries<input value={newSearchCountry} onChange={handleCountryChange}/>
      
    </div>
  )
}

const DisplayMatches = ({countryData,newSearchCountry}) => {
  const matchingCountries = countryData.filter( function(country){
    return country.name.common.toLowerCase().includes(newSearchCountry.toLowerCase())})
  const matchingNames=matchingCountries.map(country => country.name.common)
  if (matchingNames.length>10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if ((matchingNames.length<=10) && (matchingNames.length>1)){
    return (
    matchingNames.map(name => <p key={name}>{name}</p>)
    )
  }else if (matchingNames.length==1){
    const match = matchingCountries[0]
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
  } 

const App = () => {
  const [newSearchCountry, setSearchCountry] = useState('')
  const [countryData ,setCountryData] = useState([])

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


  


  return (
    <div>

    <FindCountries newSearchCountry={newSearchCountry} handleCountryChange={handleCountryChange} />
    <DisplayMatches countryData={countryData} newSearchCountry={newSearchCountry}/>
    </div>

  )
}

export default App;
