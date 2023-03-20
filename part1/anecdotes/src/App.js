import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [mostVoted, setMostVoted] = useState([])
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length).fill(0)
  )
  const randomInt = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const vote = () => {
    const temp = [...points]
    temp[selected] += 1
    setPoints(temp)
    const max = Math.max(...temp)
    console.log(max)
    let indexes = []
    let und = temp.map((x, i) => {
      if (x === max) {
        console.log(i)
        indexes.push(i)
      }
    })
    console.log(indexes)
    setMostVoted(indexes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <button onClick={vote}>vote</button>
      <button onClick={randomInt}>next anecdote</button>
      {/*    {points} */}
      {mostVoted.length === 1 &&
        <h2>Anecdote with most votes</h2>
      }
      {mostVoted.length > 1 &&
        <h2>There are {mostVoted.length} anecdote with the same number of votes!</h2>
      }

      {
        mostVoted.map((x, i) => {
          return (
            <>
              <br />
              <div key={i}>{anecdotes[x]}</div>
            </>
          )
        })
      }
    </div>
  )
}

export default App