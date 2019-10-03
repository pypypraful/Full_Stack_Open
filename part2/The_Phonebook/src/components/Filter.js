import React, {useState} from 'react'

const Filter = (props) => {
  let showAll = props.showAll
  let setShowAll = props.setShowAll
  let searchName = props.searchName
  let setSearchName = props.setSearchName
  let searchItemRegex = props.searchItemRegex
  let setSearchItemRegex = props.setSearchItemRegex


  const handleSearchName = (event) => {
    let itemRegex = new RegExp(event.target.value)
    setSearchItemRegex(itemRegex)
    setSearchName(event.target.value)
    if(event.target.value){
      setShowAll(false)
    }
    else{
      setShowAll(true)
    }
  }

  return(
    <div>
      <h1> Show {showAll ? 'All' : 'Matched'} Items </h1>
      <input value={searchName} onChange = {handleSearchName} />
    </div>
  )
}

export default Filter
