import React from 'react'
import personService from './../services/persons'


const PersonForm = ({ persons, newName, newNumber, personsSetter, nameSetter, numberSetter, setMessage, setColorToggle }) => {
    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        let bool = false
        let i
        for (i in persons) {
            console.log(`now name is ${persons[i].name}`)
            if (persons[i].name === newName) {
                if (persons[i].number === newNumber) {
                    alert(`${newName} is already added to phonebook`)
                }
                else {
                    const result = window.confirm(`${persons[i].name} is already added to the phonebook, replace old number with new one ?`)
                    if (result) {
                        console.log(persons[i].id)
                        personService
                            .update(persons[i].id, {
                                name: newName,
                                number: newNumber
                            })
                            .then(response => {
                                personsSetter(persons.map(person => person.name !== newName ? person : response.data))        
                                setColorToggle(true)
                                setMessage(
                                    `Updated number of '${persons[i].name}'`
                                )
                                setTimeout(() => {
                                    setMessage(null)
                                }, 10000)
                            })
                            .catch(error => {
                                setColorToggle(false)
                                setMessage(
                                    `Information of '${persons[i].name}' has already been removed from the server.`
                                )
                                setTimeout(() => {
                                    setMessage(null)
                                }, 10000)
                            })
                    }
                }
                bool = true
                break
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
                })
            setColorToggle(true)
            setMessage(
                `Added '${personObject.name}'`
            )
            setTimeout(() => {
                setMessage(null)
            }, 10000)
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