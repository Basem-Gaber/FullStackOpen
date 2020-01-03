import React from 'react'
import personService from './../services/persons'


const PersonForm = ({ persons, newName, newNumber, personsSetter, nameSetter, numberSetter, setMessage, setColorToggle }) => {
    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        let bool = false

        const existingPerson = persons.find(person => person.name === newName)
        console.log(existingPerson)
        if (existingPerson) {
            if (existingPerson.number === newNumber) {
                alert(`${newName} is already added to phonebook`)
                bool = true
            }
            else {
                const result = window.confirm(`${existingPerson.name} is already added to the phonebook, replace old number with new one ?`)
                if (result) {
                    console.log(existingPerson.name)
                    personService
                        .update(existingPerson.id, {
                            name: newName,
                            number: newNumber
                        })
                        .then(response => {
                            personsSetter(persons.map(person => person.name !== newName ? person : response.data))
                            setColorToggle(true)
                            setMessage(
                                `Updated number of '${existingPerson.name}'`
                            )
                            setTimeout(() => {
                                setMessage(null)
                            }, 10000)
                        })
                        .catch(error => {
                            setColorToggle(false)
                            setMessage(
                                `Information of '${existingPerson.name}' has already been removed from the server.`
                            )
                            setTimeout(() => {
                                setMessage(null)
                            }, 10000)
                        })
                }
                bool = true
            }
        }


        if (!bool) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService
                .create(personObject)
                .then(response => {
                    personsSetter(persons.concat(response.data))
                    nameSetter('')
                    numberSetter('')
                    setColorToggle(true)
                    setMessage(
                        `Added '${response.data.name}'`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 10000)
                })
                .catch(error => {
                    nameSetter('')
                    numberSetter('')
                    setColorToggle(false)
                    setMessage(error.response.data)
                    setTimeout(() => {
                        setMessage(null)
                    }, 10000)
                    console.log(error.response.data)
                })

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