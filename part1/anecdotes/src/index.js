import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  if (props.text==="Vote"){
      return(
        <div>
          <button onClick = {props.onSetPoint}> {props.text} </button>
        </div>
      )
  }
  else{
    return(
      <div>
      <button onClick = {props.onSetSelected}> {props.text}</button>
      </div>
    )
  }
}

const MostPopular = (props) => {
  return(
    <div>
      <h1>Anecdotes with most votes</h1>
      <p>{props.anecdotes[props.maxElement]}</p>
      <p>has {props.points[props.maxElement]} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const onSetSelected = () => {
    setSelected(Math.floor(Math.random()*5))
  }

  const [points, setPoint] = useState([...props.votes])
  const onSetPoint = () => {
    let copy = [...points]
    copy[selected]+=1
    setPoint(copy)
  }

  const maxElement = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
    <h1>Anecdotes of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="Vote" onSetPoint={()=>onSetPoint()} />
      <Button text="Next Anecdotes" onSetSelected={()=>onSetSelected()} />
      <MostPopular maxElement = {maxElement()} anecdotes={props.anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const votes = Array(6).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
)
