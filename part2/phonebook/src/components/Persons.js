import React from 'react'
import personService from './../services/persons'

const Persons = ({ persons, newInput, setPersons, setMessage, setColorToggle }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newInput.toLowerCase()))

    const deletePerson = id => {
        const result = window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)
        if (result) {
            const temp = persons.find(person => person.id === id).name
            personService.deleteAxios(id).then(response => {
                setPersons(persons.filter(person => person.id !== id))
                setColorToggle(true)
                setMessage(
                    `Removed '${temp}'`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 10000)
            }).catch(error => {
                setColorToggle(false)
                setMessage(error.response.data)
                setTimeout(() => {
                    setMessage(null)
                }, 10000)
                console.log(error.response.data)
            })
        }
    }

    const rows = () => personsToShow.map(person =>
        <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person.id)}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}
const Person = ({ person, deletePerson }) => {
    console.log(person)
    return (
        <div>
            {person.name} {person.number}
            <button onClick={deletePerson}>Delete</button>
        </div>
    )
}


export default Persons