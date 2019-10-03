import React, {useState} from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'

const Person = (props) => {
  return(
    <p>{props.name} {props.number}</p>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9876543456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [searchItemRegex, setSearchItemRegex] = useState('')

  const phonebookToShow = showAll ? persons : persons.filter(person =>  searchItemRegex.test(person.name))

  const rows = () => phonebookToShow.map(person =>
      <Person
        key={person.name}
        name={person.name}
        number={person.number} />
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
          {rows()}
      </div>
    </div>
  )
}

export default App
