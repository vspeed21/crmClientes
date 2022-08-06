import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  
  const { id } = useParams()

  useEffect( () => {
    const obtenerClienteID = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    }

    obtenerClienteID();
  }, []);

  return (
    <div>
      <Header 
        titulo='Editar Clients'
        mensaje='Edita los campos para editar'
      />

      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ): (
        <p>ID del cliente no valido</p>
      )}
    </div>
  )
}

export default EditarCliente