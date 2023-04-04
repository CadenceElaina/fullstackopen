import React from 'react'

const Countries = ({ countries, setCountries }) => {
    //console.log(countries.length)
    return (
        <div>
            {countries.map((country) => (
                <p key={country.name.common}>{country.name.common}
                    <button onClick={() => setCountries([country])}>show</button></p>
            ))}
        </div>
    )
}

export default Countries