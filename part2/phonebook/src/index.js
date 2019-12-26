import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newInput, setNewInput] = useState('')
    //const [showAll, setShowAll] = useState(true)

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