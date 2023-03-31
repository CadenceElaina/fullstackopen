import React from 'react'

const Filter = ({ filteredSearch, handleFilteredSearch }) => {
    return (
        <p>filter shown with <input value={filteredSearch} onChange={handleFilteredSearch} /></p>
    )
}

export default Filter