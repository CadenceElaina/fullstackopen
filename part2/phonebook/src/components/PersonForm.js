import React from 'react'

const PersonForm = ({ addPerson, newPerson, handleChange }) => {
    return (
        <form onSubmit={addPerson}>
            <h3>add a new</h3>
            <div>
                name: <input name="name" value={newPerson.name} onChange={handleChange} />
            </div>
            <div>
                number: <input name="number" value={newPerson.number} onChange={handleChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm