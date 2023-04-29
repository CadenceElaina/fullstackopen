import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
    {anecdotes.sort((a, b)=>b.votes-a.votes).map(anecdote =>
      <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => 
        dispatch(increaseVote(anecdote.id))
      }
      />
    )}
    </div>
  )
}

export default AnecdoteList