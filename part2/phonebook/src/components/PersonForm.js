import React from 'react'

const PersonForm = ({ persons, newName, newNumber, personsSetter, nameSetter, numberSetter }) => {
    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        let bool = false
        let i
        for (i in persons) {
            console.log(`new name is ${persons[i].name}`)
            if (persons[i].name === newName) {
                alert(`${newName} is already added to phonebook`)
                bool = true
            }
        }
        if (!bool) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personsSetter(persons.concat(personObject))
            nameSetter('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        nameSetter(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        numberSetter(event.target.value)
    }
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange} /></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}


export default PersonForm