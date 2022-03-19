import {useForm} from 'react-hook-form';
import logo from '../assets/img/logo.png';

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
      <div className='w-full max-w-md rounded-lg bg-white py-20'>
        <div className='mb-8 text-center'>
          <img src={logo} alt='Food Delivery' width='80' className='inline-block' />
          <h1 className='mb-5 text-2xl text-gray-800'>Ingresa a Food Delivery</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5 px-10'>
          <div>
            <input
              {...register('email', {required: 'El correo electrónico es requerido'})}
              name='email'
              type='email'
              required
              placeholder='Correo electrónico'
              className='input'
            />
            {errors.email?.message && <span className='input-error'>{errors.email?.message}</span>}
          </div>
          <div>
            <input
              {...register('password', {required: 'La contraseña es requerida', minLength: 6})}
              type='password'
              placeholder='Contraseña'
              required
              className='input'
            />
            {errors.password?.message && (
              <span className='input-error'>{errors.password?.message}</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className='input-error'>La contraseña debe tener al menos 6 caracteres</span>
            )}
          </div>
          <button type='submit' className='btn'>
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
