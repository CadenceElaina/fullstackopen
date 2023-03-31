import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredSearch, setFilteredSearch] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilteredSearch = (e) => {
    //console.log(e.target.value)
    setFilteredSearch(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
    persons.map((person) => {
      if (person.name.toLowerCase() === e.target.value.toLowerCase()) {
        //console.log(person.name, e.target.value)
        /* return */ alert(`${person.name} is already added to phonebook`)
      }
    })
    //console.log(newName)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
    persons.map((person) => {
      if (person.number === e.target.value) {
        //console.log(person.name, e.target.value)
        /* return */ alert(`${person.number} is already added to phonebook`)
      }
    })
    //console.log(newName)
  }
  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }
    const person = persons.find(p => p.id === newName)
    if (!person) {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

    }
    else {
      //console.log(person)
      let result = window.confirm(`${newName} is already added to phonebook, replace the old
      number with ${newNumber}?`)
      if (result/*  === true */) {
        const changedPerson = { ...person, number: newNumber/* , id: newNumber  */ }
        personService
          .update(person.id, changedPerson)
          .then(changedPerson => {
            const oldNumber = persons.find(p => p.id === person.id)
            console.log(oldNumber)
            setPersons(persons.map(p => p.id !== person.id ? p : changedPerson))
            setNotification(`Changed ${changedPerson.name}'s number from ${oldNumber.number} to ${newNumber}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            //Update the UI to show that the person you are editing has been removed from the server in another browser
            setPersons(persons.filter(p => p.id !== person.id))
            console.log(error)
          })
        /* .then(changedPerson => {
          setPersons(persons.map(person => person.id !== person.id ? person : changedPerson))
        }) */
        //console.log(persons.map(p => p.id !== person.id ? p : changedPerson))
      }
      setNewName('')
      setNewNumber('')
    }
    /*  axios
       .post('http://localhost:3001/persons', personObject)
       .then(response => {
         setPersons(persons.concat(response.data))
         setNewName('')
         setNewNumber('')
       }) */
    /*  request.then(response => response.data)
     setPersons(persons.concat(personObject))
     setNewName('')
     setNewNumber('') */
  }

  const deletePerson = id => {
    let person = persons.find(p => p.id === id)
    person = person.name
    let result = window.confirm(`Delete ${person} ?`)
    if (result === true) {


      console.log(`delete id:${id}`)

      /*  const changedPerson = {...person, } */
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotification(`Information of ${person} has already been removed from server`)
          console.log(error)
        })
      /*  .then(response => console.log(response)) */
    }

  }

  const personsToShow = filteredSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filteredSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filteredSearch={filteredSearch} handleFilteredSearch={handleFilteredSearch} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson} />

      ...
    </div>
  )
}

export default App