import React from 'react'
import Formulario from '../components/Formulario'
import Header from '../components/Header'

const NuevoCliente = () => {
  return (
    <div>

      <Header 
        titulo='Nuevo cliente'
        mensaje='Llena los campos para registras un nuevo cliente'
      />

      <Formulario />
    </div>
  )
}

export default NuevoCliente