const express = require('express')
const app = express()
app.use(express.json())

let persons = [
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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
    response.json(person)
    }else{
        response.status(404).end()
    }
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.post('/api/persons',(request,response) =>{
    const name = request.body.name
    const number = request.body.number
    
    
    // if ((!body.name) || (!body.number)) {
    //     return response.status(400).json({ 
    //       error: 'content missing' 
    //     })
    //   }
    const person ={
        name: name,
        number: number,
        id: Math.floor(Math.random() * 52343+5)
    }
    
    persons = persons.concat(person)
    response.json(person)

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons_updated = persons.filter(person => person.id !== id)
    if (persons.length!==persons_updated.length){
        response.status(204).end()
        persons=persons_updated
    }else{
    response.status(404).end()
    }
  })

const PORT = 3000
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})