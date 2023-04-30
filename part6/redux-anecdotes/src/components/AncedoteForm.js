import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {createNotification} from '../reducers/notificationReducer'

const AncedoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    //console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(`You added ${content}`, 5))
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