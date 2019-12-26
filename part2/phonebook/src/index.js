import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newInput, setNewInput] = useState('')
  //const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newInput} setter={setNewInput} />
      <h3>add a new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} personsSetter={setPersons} nameSetter={setNewName} numberSetter={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} newInput={newInput} setPersons={setPersons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))