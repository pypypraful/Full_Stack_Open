import React from 'react'

const Notification = ({message, setErrorMessage}) => {
  if (message)
    return (
      <div className='error'>
        {message}
      </div>
    )
  else
    return null
}

export default Notification
