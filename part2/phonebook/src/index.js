import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
        axios
          .get('http://localhost:3001/persons')
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
            <Persons persons={persons} newInput={newInput} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))