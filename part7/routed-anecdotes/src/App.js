import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Notification from './components/Notification';


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  // Clear notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`A new anecdote ${anecdote.content} created!`)
  }



  /*  const anecdoteById = (id) =>
     anecdotes.find(a => a.id === id)
 
   const vote = (id) => {
     const anecdote = anecdoteById(id)
 
     const voted = {
       ...anecdote,
       votes: anecdote.votes + 1
     }
 
     setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
   } */
  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
