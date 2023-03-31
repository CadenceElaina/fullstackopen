import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <h3>add a new</h3>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            {/* <div>debug: {newName}</div> */}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm