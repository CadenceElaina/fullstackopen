import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: "", number: "" })
  const [filteredSearch, setFilteredSearch] = useState('')
  const [personsToShow, setPersonsToShow] = useState([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons);
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleFilteredSearch = (e) => {
    //console.log(e.target.value)
    const search = e.target.value
    setFilteredSearch(search)
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPerson({ ...newPerson, [name]: value })
    //https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
  }

  const addPerson = (e) => {
    //console.log(person, persons)
    e.preventDefault()
    const currentPerson = persons.filter(
      (person) => person.name === newPerson.name
    )
    if (currentPerson.length === 0) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setMessage(`Added ${newPerson.name} to phonebook`)
          /*    setTimeout(() => {
               setNotification(null)
             }, 5000) */
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(error.response.data.error)
        })
    }
    else {
      //console.log(person, persons)
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old
      number with ${newPerson.number}?`)) {
        personService
          .update(currentPerson[0].id, newPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson)
            setPersons(updatedPersons)
            setPersonsToShow(updatedPersons)
            setMessage(`Updated ${newPerson.name}'s number`);
          })
          .catch(error => setMessage(error.response.data.error))
      }
    }
    setNewPerson({ name: "", number: "" })
  }

  const deletePerson = (id, name) => {
    /*     let person = persons.find(p => p.id === id)
        person = person.name */
    let result = window.confirm(`Delete ${name} ?`)
    if (result) {
      console.log(`delete id:${id}`)

      /*  const changedPerson = {...person, } */
      personService
        .remove(id)
        .then(response => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setPersonsToShow(updatedPersons)
          setMessage(`Removed ${name} from phonebook`)
        })
      /*  .catch(error => {
         setNotification(`Information of ${name} has already been removed from server`)
         console.log(error)
       }) */
      /*  .then(response => console.log(response)) */
    }

  }

  /* const personsToShow = filteredSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filteredSearch.toLowerCase())) */

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filteredSearch={filteredSearch} handleFilteredSearch={handleFilteredSearch} />
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App