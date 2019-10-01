import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
  return(
  //<div>
  <button onClick={props.handleClick}>{props.text}</button>
  //</div>
)
}
const Average = (props) => {
   return(
     <tr>
      <td>Average</td>
      <td>{(props.good - props.bad)/(props.good+props.neutral+props.bad)}</td>
     </tr>
   )
 }

const Positive = (props) => {
  return(
    <tr>
      <td>Positive</td><
      td>{props.good/(props.good+props.neutral+props.bad)} %</td>
    </tr>
  )
}

const Statistic = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good+props.neutral+props.bad>0){
    return(
      <div>
        <h1> Statistics </h1>
        <table>
        <tbody>
        <Statistic text="Good" value={props.good}/>
        <Statistic text="Neutral" value={props.neutral}/>
        <Statistic text="Bad" value={props.bad}/>
        <Statistic text="All" value={props.good+props.neutral+props.bad}/>
        <Average good = {props.good} neutral = {props.neutral} bad = {props.bad} />
        <Positive good = {props.good} neutral = {props.neutral} bad = {props.bad} />
        </tbody>
        </table>
      </div>
    )
  }
  else{
    return(
      <div>
        <h1> Statistics </h1>
        <p>No Feedback given</p>
      </div>
    )
  }
}

const FeedBack = (props) => {
  return(
    <div>
      <Button handleClick = {()=>props.setToGood(props.good+1)} text = "Good"/>
      <Button handleClick = {()=>props.setToNeutral(props.neutral+1)} text = "Neutral"/>
      <Button handleClick = {()=>props.setToBad(props.bad+1)} text = "Bad"/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
    <h1> Give FeedBack</h1>
      <FeedBack setToGood={setToGood} setToNeutral={setToNeutral} setToBad={setToBad} good={good} neutral={neutral} bad={bad}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
