import { useState , useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({newSearch,handleSearchChange}) => {
  return (
    <div>
    filter shown with: <input value={newSearch} onChange={handleSearchChange}/>
    </div>
  )
}

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons,newSearch}) => {
  const searchMatches = persons.filter( function(person) {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())})
    return(
    searchMatches.map(person => <p key={person.id}> {person.name} {person.number} </p>)
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const hook = () => {
    console.log('effect')
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    
  }else{
    const nameObject ={
      name: newName , 
      number: newNumber,
      id : persons.map(person => person.id)[persons.length-1]+1
    }

    personService.create(nameObject)
    .then(response => {
      console.log(response)
    })
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      < Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>


      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      < Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App