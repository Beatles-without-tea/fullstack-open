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

const StatisticLine = ({text,value}) => {
  return (
    <tr><td>{text} {value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const average =  (good -bad)/ (good +neutral +bad)
  const sum = (good + neutral + bad)
  const positive = (good)/ (good +neutral +bad) 
  if (good===0 && neutral===0 && bad===0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={sum}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>

      </table>

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
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App