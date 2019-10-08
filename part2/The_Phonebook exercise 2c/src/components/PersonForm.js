import React, {useState} from 'react'

const PersonForm = (props) =>{
  let newName = props.newName
  let newNumber = props.newNumber
  let persons = props.persons
  let setNewName = props.setNewName
  let setNewNumber = props.setNewNumber
  let setPersons = props.setPersons
  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber,
    }
    if(!persons.find( ({name}) => name===newName)){
      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
    }
    else{
      window.alert(newName + ' is already added to phonebook')
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return(
      <form onSubmit = {addNumber}>
        <div>Name: <input value={newName} onChange = {handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange = {handleNumberChange} /></div>
        <div><button type="submit">Add</button></div>
      </form>
  )
}

export default PersonForm
