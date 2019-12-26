import React from 'react'

const Persons = ({ persons, newInput }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newInput.toLowerCase()))

    const rows = () => personsToShow.map(person =>
        <Person
            key={person.name}
            person={person}
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}
const Person = ({ person }) => {
    console.log(person)
    return (
        <div>
            {person.name} {person.number}
        </div>
    )
}


export default Persons