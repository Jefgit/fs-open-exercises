const express = require('express')
const app = express()
const morgan = require('morgan')

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

app.use(express.static('dist'))
app.use(express.json())

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.json(persons)
})

const generateId = () => {
  const newId = Math.floor(Math.random() *1000) + 1

  return newId
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({error: 'name or number is missing'})
  }

  const personExist = persons.find(person => person.name === body.name)

  if(personExist){
    return response.status(400).json({error: 'name must be unique'})
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)
  console.log(persons)
  response.json(persons)
})

app.get('/api/info',(request, response) => {
  const timeStamp =  new Date().toString();

  const output = `<p>Phonebook has info for ${persons.length} people</p><br/>
                  <p>${timeStamp}</p>`

    response.send(output)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log('listening on port',PORT);
})
