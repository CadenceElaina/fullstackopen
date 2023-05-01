import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext' 

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      {content, id: generateId(), votes: 0},
      {
        onSuccess: () => {
          dispatch({type:'CREATE', payload: content})
          setTimeout(() => {
            dispatch({type: 'HIDE'})
          }, 5000) 
        },
        onError: (err) =>{
          if(content.length < 5){
            dispatch({type: 'ERROR', payload: `too short anecdote, must have length 5 or more`})
            setTimeout(() => {
              dispatch({type: 'HIDE'})
            }, 5000) 
          }
          else{
          dispatch({type: 'ERROR', payload: `error: ${err}`})
          setTimeout(() => {
            dispatch({type: 'HIDE'})
          }, 5000) 
        }
        }
      }
      )
 
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
