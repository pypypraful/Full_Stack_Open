import React, {useState, useEffect} from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import phoneService from '../services/phonebook'


const Person = (props) => {
  return(
    <p>{props.name} {props.number} 
    <button onClick={()=> props.deleteContact(props.id, props.name)}>
    Delete
    </button>
    </p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState(null)
  const [ loaded, setLoaded] = useState(false)
  useEffect(()=>{
    phoneService
    .getAll()
    .then(response => {
      setPersons(response)
      setLoaded(true)
    })
  },[])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [searchItemRegex, setSearchItemRegex] = useState('')

  const phonebookToShow = showAll ? persons : persons.filter(person =>  searchItemRegex.test(person.name))


  const deleteContact = (id,name) => {
    const updatedPhonebook = persons.filter(person => person.id!==id)
    if(window.confirm(`Do you want to delete contact ${name} ??`)){
      phoneService
        .deleteIt(id)
        .then(returnedPhonebook => {
          setPersons(updatedPhonebook)
        })
        .catch(error => console.log(error))
    }}

  const rows = () => phonebookToShow.map(person =>
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        id = {person.id}
        deleteContact = {deleteContact}
      />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber = {setNewNumber}
        persons = {persons} setPersons={setPersons} />

      <Filter
        showAll={showAll} setShowAll={setShowAll}
        searchName={searchName} setSearchName={setSearchName}
        searchItemRegex={searchItemRegex} setSearchItemRegex={setSearchItemRegex} />

      <div>
          {loaded ? rows() : ''}
      </div>
    </div>
  )
}

export default App
