import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  //console.log(handleClick, text)
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all > 0 ? ((good - bad) / all).toFixed(2) : 0
  const positive = all > 0 ? ((good / all) * 100) : 0

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  /*  const [all, setAll] = useState({
     good: 0,
     neutral: 0,
     bad: 0,
     total: 0
   }) */
  //const [average, setAverage] = useState(0)

  const handleGood = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedGood = good + 1
    setGood(updatedGood)
    /*     setAll({ ...all, good: all.good + 1, total: all.total + 1 })
        console.log(all.total)
        all.bad === 0 ? setAverage(updatedGood) :
          setAverage(updatedGood + (all.bad * -1) / all.total + 1) */
  }

  const handleNeutral = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    /*     setAll({ ...all, neutral: all.neutral + 1, total: all.total + 1 })
        setAverage(all.good + (all.bad * -1) / all.total + 1) */
  }

  const handleBad = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedBad = bad + 1
    setBad(updatedBad)
    /*     setAll({ ...all, bad: all.bad + 1, total: all.total + 1 })
        setAverage(all.good + (updatedBad * -1) / all.total + 1) */
  }

  const a = (good + (neutral * 0) + (bad * -1)) / total.toFixed(1)
  const positive = ((good / total) * 100).toFixed(1)
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      {/*   <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {isNaN(a) ? 0 : a}</p>
      <p>positive {isNaN(positive) ? 0 : positive}%</p> */}
    </div>
  )
}

export default App