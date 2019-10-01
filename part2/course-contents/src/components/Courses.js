import React from 'react'

const Part = (props) => {
  return(
      <li>{props.name} {props.exercises}</li>
  )
}

const Content = (props) => {
  const rows = () => props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  return(
    <ul>
      {rows()}
    </ul>
  )
}

const Header = (props) => {
  return(
      <h2>{props.name}</h2>
  )
}

const EachCourse = (props) => {
  return(
    <li>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts = {props.course.parts} />
    </li>
  )
}

const Courses = (props) => {
  const rows = () => props.course.map(course => <EachCourse key={course.id} course={course}/>)
  return (
    <ul>
      {rows()}
    </ul>
  )
}

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const sum = exercises.reduce((a,b)=> a+b)
  return (
    <p> Total of {sum} exercises</p>
  )
}

export default Courses;
