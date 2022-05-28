import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
  
  const navigate = useNavigate()

  const { nombre, empresa, email, telefono, id} = cliente;

  return (
    <tr className='border-b hover:bg-gray-100'>
      <td className='p-3'>{nombre}</td>
      <td className='p-3'>
        <p><span className="text-gray-800 font-bold uppercase">Email: </span>
          {email}
        </p>
        <p><span className="text-gray-800 font-bold uppercase">Tel: </span>
          {telefono}</p>
      </td>
      <td className='p-3'>{empresa}</td>
      <td className='p-3'>

        <div className='flex flex-col items-center gap-1'>
          <button
            type='button'
            className='bg-amber-500 hover:bg-amber-600 text-white w-full p-2 uppercase font-bold text-xs'
            onClick={() => navigate(`/clientes/${id}`)}
          >Ver</button>

          <button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 text-white w-full p-2 uppercase font-bold text-xs'
            onClick={() => navigate(`/clientes/editar/${id}`)}
          >Editar</button>
          <button
            type='button'
            className='bg-red-600 hover:bg-red-700 text-white w-full p-2 uppercase font-bold text-xs'
            onClick={() => handleEliminar(id)}
          >Eliminar</button>
        </div>
        
      </td>

    </tr>
  )
}

export default Cliente