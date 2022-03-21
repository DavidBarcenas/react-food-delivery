import {Link} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Helmet} from 'react-helmet';
import InputError from '../components/input-error';
import logo from '../assets/img/logo.png';
import Button from '../components/button';
import {emailRegex} from '../utils/validators';
import {UserRole} from '../types/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface RegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
  role: UserRole;
}

function Signup() {
  const {register, handleSubmit, formState} = useForm<RegisterForm>({
    defaultValues: {role: UserRole.Client},
  });
  const {email, password, repeatPassword} = formState.errors;
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);

  function onSubmit(data: RegisterForm) {
    console.log(data);
  }

  return (
    <div className='flex h-screen flex-col items-center'>
      <Helmet>
        <title>Registrarse | Food Delivery</title>
      </Helmet>
      <div className='w-full max-w-lg rounded-lg bg-white py-20'>
        <div className='mb-8 px-10 text-center'>
          <img src={logo} alt='Food Delivery' width='80' className='inline-block' />
          <h1 className='mb-1 text-3xl text-gray-800'>
            <span className='font-medium text-lime-500'>Food</span> Delivery
          </h1>
          <p>¡Empecemos!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5 grid gap-5 px-10'>
          <div>
            <input
              {...register('email', {
                required: true,
                pattern: emailRegex,
              })}
              name='email'
              type='email'
              required
              placeholder='Correo electrónico'
              className='input'
            />
            {email?.type === 'required' && <InputError message='El correo es requerido' />}
            {email?.type === 'pattern' && <InputError message='Ingresa un correo válido' />}
          </div>
          <div>
            <input
              {...register('password', {required: 'La contraseña es requerida', minLength: 6})}
              type='password'
              placeholder='Contraseña'
              required
              className='input'
            />
            {password?.message && <InputError message={password?.message} />}
            {password?.type === 'minLength' && (
              <InputError message='La contraseña debe tener al menos 6 caracteres' />
            )}
          </div>
          <div>
            <input
              {...register('repeatPassword', {
                required: 'La contraseña es requerida',
                minLength: 6,
              })}
              type='password'
              placeholder='Confirmar contraseña'
              required
              className='input'
            />
            {repeatPassword?.message && <InputError message={repeatPassword?.message} />}
            {repeatPassword?.type === 'minLength' && (
              <InputError message='La contraseña debe tener al menos 6 caracteres' />
            )}
          </div>
          <div>
            <label>
              Client
              <input type='radio' {...register('role')} value={UserRole.Client} />
            </label>
            <label>
              Delivery
              <input type='radio' {...register('role')} value={UserRole.Delivery} />
            </label>
            <label>
              Owner
              <input type='radio' {...register('role')} value={UserRole.Owner} />
            </label>
          </div>
          <Button type='submit' text='Registrarse' />
        </form>
        <p className='text-center text-sm'>
          ¿Ya tienes una cuenta?
          <Link to='/' className='ml-1 text-lime-500 hover:underline'>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
