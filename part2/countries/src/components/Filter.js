import React from 'react'

const Filter = ({ search, handleSearch }) => {
    /*     console.log(filteredSearch) */
    return (
        <div>
            find countries  <input value={search} onChange={handleSearch} />
        </div>
    )
}

export default Filter