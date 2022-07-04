const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(express.static('build'))
app.use(
    morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms',
          JSON.stringify(req.body)
        
        ].join(' ')
      })
)
app.use(cors())
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
    
    const duplicatedName = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    if (!name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }else if (!number) {
        return response.status(400).json({ 
            error: 'number missing' 
          })
      }else if (duplicatedName){
        return response.status(400).json({ 
            error: 'Duplicated name' 
          })
      }else{
    const person ={
        name: name,
        number: number,
        id: Math.floor(Math.random() * 52343+5)
    }
    
    persons = persons.concat(person)
    response.json(person)
}

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

const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})