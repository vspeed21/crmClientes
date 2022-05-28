import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Error from './Error';
import Spinner from './Spinner';

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = yup.object().shape( {
    nombre: yup.string()
                .min(6, 'El nombre es muy corto')
                .max(40, 'El nombre es muy largo')
                .required('El nombre es obligatorio'),
    empresa: yup.string()
                  .required('El nombre de la empresa es obligatorio'),
    email: yup.string()
                .email('E-mail no valido')
                .required('El email es obligatorio'),
    telefono: yup.number()
                  .integer('Numero no valido')
                  .positive('Numero no valido')
                  .typeError('Numero no valido'),
  });

  async function handleSubmit(values) {
    try {
      if(cliente.id) {
        //Editando
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json'
          }
        });

        const result = await response.json();
        navigate('/clientes')
      }else{
        const url = 'http://localhost:4000/clientes';
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json'
          }
        })
        await response.json();

        navigate('/clientes')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (

    cargando ? <Spinner /> : (

    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md font-bold md:w-3/4 mx-auto'>
      <h2 className='text-gray-600 text-xl uppercase text-center'>
        {cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
      </h2>

      <Formik 
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}

        enableReinitialize={true}
        onSubmit={ async (values, {resetForm}) => {
          await handleSubmit(values);

          resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        { ({errors, touched}) => (
          <Form 
          className='mt-10'
        >
          <div className='mb-4'>
            <label
              className='text-gray-700' 
              htmlFor="nombre">Nombre:</label>
            <Field
              id='nombre'
              className='mt-2 block w-full p-3 bg-gray-100 rounded outline-0'
              type='text'
              placeholder='Nombre del cliente'
              name='nombre'
            />

            {errors.nombre && touched.nombre ? (
              <Error mensaje={errors.nombre}/>
            ) : (
              null
            )}
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-700' 
              htmlFor="empresa">Empresa:</label>
            <Field
              id='empresa'
              className='mt-2 block w-full p-3 bg-gray-100 rounded outline-0'
              type='text'
              placeholder='Empresa del cliente'
              name='empresa'
            />

            {errors.empresa && touched.empresa ? (
              <Error mensaje={errors.empresa}/>
            ) : (
              null
            )}
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-700' 
              htmlFor="email">E-mail:</label>
            <Field
              id='email'
              className='mt-2 block w-full p-3 bg-gray-100 rounded outline-0'
              type='email'
              placeholder='Email del cliente'
              name='email'
            />

            {errors.email && touched.email ? (
              <Error mensaje={errors.email}/>
            ) : (
              null
            )}
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-700' 
              htmlFor="telefono">Telefono:</label>
            <Field
              id='telefono'
              className='mt-2 block w-full p-3 bg-gray-100 rounded outline-0'
              type='tel'
              placeholder='Telefono del cliente'
              name='telefono'
            />

            {errors.telefono && touched.telefono ? (
              <Error mensaje={errors.telefono}/>
            ) : (
              null
            )}
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-700' 
              htmlFor="notas">Notas:</label>
            <Field
              as='textarea'
              id='notas'
              className='mt-2 block w-full p-3 bg-gray-100 rounded outline-0 h-40'
              type='text'
              placeholder='Notas del cliente'
              name='notas'
            />
          </div>

          <input 
            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-900 transition-colors'
            type='submit'
            value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
          />
        </Form>
        )}
      </Formik>
    </div>

    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario