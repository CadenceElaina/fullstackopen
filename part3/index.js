require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

/* const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
} */

/* morgan.token("data", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms")) */
/* let persons = [
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
] */

const generateId = () => {
    /*  const maxId = persons.length > 0
         ? Math.max(...persons.map(p => p.id))
         : 0
     return maxId + 1 */
    const rand = Math.random() * 1000 + 10
    return rand
}

app.get('/', (request, response) => {
    response.send('<h1>Hi uwu ^-^ D:</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
    /*  response.json(persons) */
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
    /*    const id = Number(request.params.id)
       const person = persons.find(person => person.id === id)
       if (person) {
           response.json(person)
       } else {
           response.status(404).end()
       } */
})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then((people) => {
            response.send(
                `<p>Phonebook has info for ${people.length
                } people</p><p>${new Date()}</p>`
            )
        })
        .catch((error) => next(error))


    /*     const currentDate = new Date().toLocaleDateString()
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone */
    /*     console.log(timeZone, currentDate) */
    /*   const currentDate = new Date().toString()

  response.send(`
  <div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${currentDate}</p>
  </div>
  `) */
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    /* const body = request.body */
    const { name, number } = request.body

    if (!name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if (!number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    if (persons.some(person => person.name === name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    if (persons.some(person => person.number === number)) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    const person = new Person({
        id: generateId(),
        name: name,
        number: number,
    })

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
    /*   persons = persons.concat(person)
  
      response.json(person) */
})


/* app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
}) */



const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);




const PORT = process.env.PORT
/* const PORT = process.env.PORT || 3001 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})