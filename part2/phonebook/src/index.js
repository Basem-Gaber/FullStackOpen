import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newInput, setNewInput] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')
  const [colorToggle, setColorToggle] = useState(true)


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
      <Notification message={message} colorToggle={colorToggle} setColorToggle={setColorToggle} />
      <Filter value={newInput} setter={setNewInput} />
      <h3>add a new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} personsSetter={setPersons} nameSetter={setNewName} numberSetter={setNewNumber} setMessage={setMessage} setColorToggle={setColorToggle} />
      <h3>Numbers</h3>
      <Persons persons={persons} newInput={newInput} setPersons={setPersons} setMessage={setMessage} setColorToggle={setColorToggle} />
    </div>
  )
}
const Notification = ({ message, colorToggle, setColorToggle }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle = {
    ...messageStyle,
    color: 'red'
  }

  if (message === null) {
    return null
  }
  if (colorToggle === false) {
    console.log("yes is false")
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  else {
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))