import {appendErrors, useForm} from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>();

  function onSubmit(data: LoginForm) {
    console.log(data);
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gray-800'>
      <div className='w-full max-w-lg rounded-lg bg-white py-10 text-center'>
        <h1 className='mb-5 text-2xl text-gray-800'>Ingresa a Food Delivery</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-7 px-5'>
          <div>
            <input
              {...register('email', {required: true})}
              name='email'
              type='email'
              required
              placeholder='Correo electrónico'
              className='input'
            />
          </div>
          <input
            {...register('password', {required: 'La contraseña es requerida', minLength: 8})}
            type='password'
            required
            placeholder='Contraseña'
            className='input'
          />
          <button type='submit' className='btn'>
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
