import axios, { all } from 'axios'
import Filter from "./components/Filter";
import CountryData from './components/CountryData';
import Countries from './components/Countries';

import { useState, useEffect } from "react";
import countryServices from './services/country'
function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    //note if you use search.toLowerCase() in the includes method - the search will be behind one letter
    const filteredCountries = allCountries.filter((country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
    setCountries(filteredCountries)
    console.log(filteredCountries)
    //console.log(e.target.value)
    /*   console.log(filteredSearch, handleFilteredSearch) */
    /*  const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(filteredSearch.toLowerCase()))
     if (e.target.value === '') {
       setCountries([])
     }
     else if (filteredCountries.length > 10) {
       return (
         <p>Too many matches, specify another filter</p>
       )
     }
     else if (filteredCountries.length <= 10) {
       setCountries(filteredCountries.map((country => {
         return (
           <p key={country.name.common}>{country.name.common}</p>
         )
       })))
     } */
    console.log(`countries state ${countries.map(country => ` ${country.name.common}`)}`)
  }

  return (
    <div className="App">
      <Filter
        search={search}
        handleSearch={handleSearch}
      />
      {countries.length === 1 ? (
        <CountryData country={countries[0]} />
      )
        :
        countries.length > 10 ?
          (<p>Too many matchs, specify another filter</p>)
          :
          (
            <Countries countries={countries} setCountries={setCountries} />
          )}
    </div>
  );
}

export default App;
