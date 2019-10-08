import React from 'react'
import phoneService from '../services/phonebook'

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
    const checkContact = persons.find( ({name}) => name===newName)
    if(!checkContact){
      phoneService
        .create(numberObject)
        .then(returnedPhonebook => {
          setPersons(persons.concat(returnedPhonebook))
          setNewName('')
          setNewNumber('')
        })
    }
    else{
      if(window.confirm(newName + ' is already added to phonebook. Due want to update the number?')){
        phoneService
          .update(checkContact.id, numberObject)
          .then(returnedPhonebook => {
            setPersons(persons.filter(person => person.id!==checkContact.id).concat(returnedPhonebook))
          })
        setNewName('')
        setNewNumber('')
      }
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
