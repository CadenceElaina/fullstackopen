import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {createNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AncedoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const ancedote = event.target.anecdote.value
    //console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(ancedote))
    dispatch(createNotification(`You added ${ancedote}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
      </div>
  )
}

export default AncedoteForm