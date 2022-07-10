require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const Person = require('./models/person')



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


app.get('/info', (request, response) => {
    
    Person.find({}).then(persons => {
      response.send(`<h1>Phonebook has info for ${persons.length} people</h1>
       <h1>${new Date()}</h1>`
    )

    })  .catch(error => next(error))
  
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)

    }) .catch(error => next(error))  
})


app.post('/api/persons',(request,response) =>{
    const name = request.body.name
    const number = request.body.number
    
    //const duplicatedName = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    // const duplicatedName = 'name'
    // if (!name) {
    //     return response.status(400).json({ 
    //       error: 'name missing' 
    //     })
    //   }else if (!number) {
    //     return response.status(400).json({ 
    //         error: 'number missing' 
    //       })
        
    //   }else if (duplicatedName){
    //     return response.status(400).json({ 
    //         error: 'Duplicated name' 
    //       })
    //    }else{
    const person= new Person({
        name: name,
        number: number 
    })
    console.log(person)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    }) .catch(error => next(error))
  
  })


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


