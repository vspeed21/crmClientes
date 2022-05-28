import React from 'react'

const Error = ({mensaje}) => {
  return (
    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 text-center uppercase p-3 my-4'>
      <p>{mensaje}</p>
    </div>
  )
}

export default Error