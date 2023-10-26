import { useState } from 'react'
import { Statistics } from './components/Statistics'
import { Button } from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const feedback = {
          good:good, 
          neutral:neutral, 
          bad:bad
        }

  return (
    <div>
      <h1>give feedback</h1>
        <Button handler={() => setGood(good + 1)} text='good' />
        <Button handler={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handler={() => setBad(bad + 1)} text='bad' />
      <Statistics stats={feedback} />
    </div>
  )
}

export default App