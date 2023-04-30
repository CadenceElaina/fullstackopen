import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

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
  const anecdotes = useSelector(state => {
    if(state.filter === null) {
     // console.log(state.anecdotes)
      return [...state.anecdotes]
    }
    //console.log(state.filter)
     return state.anecdotes.filter((ancedote) => 
      ancedote.content
      .toLowerCase()
      .includes(state.filter.toLowerCase())
    ) 
  })

  const handleVote = (anecdote) => {
    dispatch(increaseVote(anecdote.id));
    dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
    {anecdotes.sort((a, b)=>b.votes-a.votes).map(anecdote =>
      <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={() => 
        handleVote(anecdote)
      }
      />
    )}
    </div>
  )
}

export default AnecdoteList