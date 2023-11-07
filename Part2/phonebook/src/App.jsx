import { useEffect, useState } from 'react'
import axios from 'axios'

import React from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Person } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filterPersons, setFilterPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => setPersons(res.data))
    .catch(err => console.log(err))
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const match = persons.find((person) => person.name === newName)
    console.log(match)
    if(match){
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(prevPersons => ([...prevPersons, {name: newName, number: newNumber} ]))
    
    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (e) => {

    setSearchText(e.target.value)
    const filterPersons = persons.filter(
      (person) => person.name.toLowerCase().includes(searchText.toLowerCase()) 
      || person.number.toLowerCase().includes(searchText.toLowerCase())
    )
    
    setFilterPersons(filterPersons)
  }

  return (
    <div>
      <div>debug: {newName} {newNumber}</div>
      <h2>Phonebook</h2>
      <Filter searchText = {searchText} handler={handleSearch}/> 
      <h1>add a new</h1>
      <PersonForm handler={handleSubmit} name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      { 
        !searchText 
        ? persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)
        : filterPersons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)
      }
    </div>
  )
}

export default App