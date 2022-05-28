import React from 'react'

const Header = ({titulo, mensaje}) => {
  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>{titulo}</h1>
      <p className='mt-3'>{mensaje}</p>
    </div>
  )
}

export default Header