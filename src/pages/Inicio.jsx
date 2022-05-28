import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente';
import Header from '../components/Header';

const Inicio = () => {

  const [clientes, setClientes] = useState([]);

  useEffect( () => {
    async function obtenerClientes() {
      try {
        const url = 'http://localhost:4000/clientes';
        const response = await fetch(url);
        const result = await response.json();
        setClientes(result);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerClientes()
  }, []);

  const handleEliminar = async id => {
    const respuesta = confirm('¿Deseas eliminar este cliente?');

    if(respuesta) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });

        await response.json();

        const ArrayClientes = clientes.filter( cliente => cliente.id !== id);

        setClientes(ArrayClientes);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Header 
        titulo='Clientes'
        mensaje='Administra tus clientes'
      />

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map( cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}          
        </tbody>
      </table>
    </div>
  )
}

export default Inicio