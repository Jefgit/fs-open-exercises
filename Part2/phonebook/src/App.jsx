import React from 'react'
import { useEffect, useState } from 'react'

import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Person } from './components/Person'
import phonebookService from './services/phonebook'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newContact, setNewContact] = useState({name:'', number:'', id:null})
  const [searchText, setSearchText] = useState('')
  const [filterPersons, setFilterPersons] = useState([])
  const [message, setMessage] = useState({isError: false, content:null})

  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
    .catch(err => console.log(err))
  }, [])
  
  const hideMessage = () => {
    setTimeout(() => {
      setMessage({isError:false, content:null})
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const contactObject = {
      ...newContact,
      id: persons.length + 1
    }
    const match = persons.find((person) => person.name === newContact.name)
    console.log(match)
    if(match){
      if(window.confirm(
        `${newContact.name} is already added to phonebook, 
          replace the old number with a new one?`)){
            const changeContact = {...match, number: newContact.number}
      phonebookService
      .update(match.id, changeContact)
      .then(changeContact => {
        setPersons(persons.map(person => person.id === match.id ? changeContact : person))
        setMessage({isError:false, content: `Contact ${changeContact.name} updated`})
        hideMessage()
      })
      .catch(err => {
        setMessage({
          isError: true, 
          content:`Information of ${changeContact.name} has already been removed from server`
        })
        setPersons(persons.filter(person => person.id !== changeContact.id))
        hideMessage()
      })
      }
    } else{
      phonebookService
      .create(newContact)
      .then(returnedPerson => {
        setPersons(prevPersons => ([...prevPersons, returnedPerson ]))
        setNewContact({name:'', number:'', id:null})
        setMessage({isError:false, content: `Added ${returnedPerson.name}`})
        hideMessage()
      })
      .catch(err => {
        setMessage({isError: true, content:'Something went wrong adding the contact...'})
        hideMessage()
      })
    }
    
  }

  const handleSearch = (e) => {

    setSearchText(e.target.value)
    const filterPersons = persons.filter(
      (person) => person.name.toLowerCase().includes(searchText.toLowerCase()) 
      || person.number.toLowerCase().includes(searchText.toLowerCase())
    )
    
    setFilterPersons(filterPersons)
  }

  const deleteHandler = (id) => {
    console.log(id)
    const match = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${match.name} ?`)){
      phonebookService
      .remove(id)
      .then(returnedPerson => {
        const updatedPersons = persons.filter(person => person.id != id)
        setPersons(updatedPersons)
      })
      .catch(err => console.log(err.message))
    }
  }

  return (
    <div>
      <div>debug: {newContact.name} {newContact.number}</div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchText = {searchText} handler={handleSearch}/> 
      <h1>add a new</h1>
      <PersonForm handler={handleSubmit} setContact={setNewContact} contact={newContact} />
      <h2>Numbers</h2>
      { 
        !searchText 
        ? persons.map(
          (person) => (
          <Person 
            key={person.id} 
            id={person.id}
            name={person.name} 
            number={person.number} 
            handler={deleteHandler} 
          />))
        : filterPersons.map(
          (person) => (
          <Person 
            key={person.id} 
            id={person.id}
            name={person.name} 
            number={person.number} 
            handler={deleteHandler}
            />))
      }
    </div>
  )
}

export default App