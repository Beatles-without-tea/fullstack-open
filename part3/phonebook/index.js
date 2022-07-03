const express = require('express')
const app = express()


const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const numberPeople = persons.length
    response.send(`<h1>Phonebook has info for ${numberPeople} people</h1>
    <h1>${new Date()}</h1>`
    )
    
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3000
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})