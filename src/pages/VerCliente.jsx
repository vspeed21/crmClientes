import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  
  const { id } = useParams()

  useEffect( () => {
    const obtenerClienteID = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
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

  const { nombre, email, empresa, telefono, notas } = cliente;

  return (
    <div>

      {cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? 
        <p>No hay resultados</p> : 
      (
        <div>
          <Header 
            titulo='Ver cliente'
            mensaje='Informacion acerca del cliente'
          />

          <p className='text-2xl text-gray-800 mb-4 mt-4'>
            <span className='font-bold'>Nombre:</span> {''}
            {nombre}
          </p>
          <p className='text-2xl text-gray-800 mb-4'>
            <span className='font-bold'>E-mail:</span> {''}
            {email}
          </p>
          <p className='text-2xl text-gray-800 mb-4'>
            <span className='font-bold'>Empresa:</span> {''}
            {empresa}
          </p>
          {telefono && (
            <p className='text-2xl text-gray-800 mb-4'>
            <span className='font-bold'>Telefono:</span> {''}
            {telefono}
          </p>
          )}

          {notas && (
            <p className='text-2xl text-gray-800 mb-4'>
            <span className='font-bold'>Notas:</span> {''}
            {notas}
          </p>
          )}
        </div>
      )}

    </div>
  )
}

export default VerCliente