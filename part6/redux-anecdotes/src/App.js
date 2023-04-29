import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'

const App = () => {
/*   const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
  }
 */

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App