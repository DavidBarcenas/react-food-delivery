function Login() {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-800'>
      <div className='w-full max-w-lg rounded-lg bg-white py-10 text-center'>
        <h1 className='mb-5 text-2xl text-gray-800'>Ingresa a Food Delivery</h1>
        <form className='flex flex-col px-5'>
          <input
            type='text'
            placeholder='Correo electrónico'
            className='
            mb-3 rounded-lg border-2 bg-gray-100 py-3 px-5 shadow-sm focus:border-green-500 focus:border-opacity-50 focus:outline-none'
          />
          <input
            type='password'
            placeholder='Contraseña'
            className='mb-3 rounded-lg border-2 bg-gray-100 py-3 px-5 shadow-sm focus:border-green-500 focus:border-opacity-50 focus:outline-none'
          />
          <button
            type='submit'
            className='y-3 rounded-lg bg-green-500 py-3 px-5 text-lg text-white shadow-sm'>
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
