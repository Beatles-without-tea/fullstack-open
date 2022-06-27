import { useState } from 'react'


const Main_tag = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Button = (props) => {
    return(
    <button onClick={props.handleClick}> {props.name}</button>
    )
}

const Display = (props) => {
  return (
    <p>{props.name} {props.state}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const average =  (good -bad)/ (good +neutral +bad)
  const sum = (good + neutral + bad)
  const positive = (good)/ (good +neutral +bad) 
  return (
    <div>
    <p>all {sum}</p>
    <p>average {average}</p>
    <p>positive {positive} % </p>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Main_tag name='give feedback'/>
      <Button handleClick={()=> setGood(good+1)}  name='good'/>
      <Button handleClick={()=> setNeutral(neutral+1)} name='neutral'/>
      <Button handleClick={()=> setBad(bad+1)} name='bad'/>
      <Main_tag name='statistics'/>
      <Display name='good' state={good}/>
      <Display name='neutral' state={neutral}/>
      <Display name='bad' state={bad}/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App