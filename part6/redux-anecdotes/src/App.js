import AncedoteForm from './components/AncedoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
/*   const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
  }
 */

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AncedoteForm />
    </div>
  )
}

export default App