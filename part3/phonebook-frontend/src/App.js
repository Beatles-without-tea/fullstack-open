import { useState , useEffect} from 'react'

import personService from './services/persons'

const Filter = ({newSearch,handleSearchChange}) => {
  return (
    <div>
    filter shown with: <input value={newSearch} onChange={handleSearchChange}/>
    </div>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderSadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='success'>
      {message}
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

const Persons = ({persons,newSearch,deleteContact}) => {
  const searchMatches = persons.filter( function(person) {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())})
    return(
    <div>
      <table>
        {searchMatches.map(person => 
        <tr>
        <td><p key={person.id}> {person.name} {person.number} </p></td>
        <td><button onClick={() => deleteContact(person.id)}>delete</button> </td>
        </tr>
        )}
      </table>
    </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [successMessage, setSuccessMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const deleteContactOf = (id) => {
    const person_name = persons.filter(person => person.id ===id)[0].name
    if (window.confirm(`Delete ${person_name}`)) {
      console.log('object with id ' + id +'has been deleted' )
      personService.deleteObject(id).then(response =>
        setPersons(persons.filter(person => person.id !== id))
      ).catch(error => {
        console.log('failure')
      })
    }
    
   
  }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.map(person => person.name).includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook,replace the old number
      with a new one?`)){
        const personId=persons.filter(person => person.name ===newName)[0].id
        console.log('id of person tryna change:', personId)
        
        const nameObject ={
          name: newName , 
          number: newNumber,
          id : personId
        }
    
        personService.update(personId,nameObject).then( setSuccessMessage(`Added ${newName}`) ,
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)).catch(error => {
          setSuccessMessage(`Information of ${newName} was already removed from the server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      
        
        
     
        setPersons(persons.filter(peep => peep.id!== personId).concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
  } else{
    const nameObject ={
      name: newName , 
      number: newNumber,
      id : persons.map(person => person.id)[persons.length-1]+1
    }

    personService.create(nameObject)
    .then( setSuccessMessage(`Added ${newName}`) ,
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000))
    
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
      <Notification message={successMessage} />
      < Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>


      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      < Persons persons={persons} deleteContact={deleteContactOf} newSearch={newSearch} />
    </div>
  )
}

export default App