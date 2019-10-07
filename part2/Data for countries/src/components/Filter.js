import React from 'react'

const Filter = (props) => {
  let showAll = props.showAll
  let setShowAll = props.setShowAll
  let searchName = props.searchName
  let setSearchName = props.setSearchName
  let setSearchItemRegex = props.setSearchItemRegex


  const handleSearchName = (event) => {
    let itemRegex = new RegExp('^'+event.target.value,'i')
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
      Find Countries: <input value={searchName} onChange = {handleSearchName} />
      <h3> Showing {showAll ? 'All' : 'Matched'} Countries </h3>
    </div>
  )
}

export default Filter
