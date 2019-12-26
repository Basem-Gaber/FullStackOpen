import React from 'react'

const Filter = ({ value, setter }) => {
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setter(event.target.value)
    }
    return (
        <div>
            filter shown with <input value={value} onChange={handleInputChange} />
        </div>
    )
}


export default Filter