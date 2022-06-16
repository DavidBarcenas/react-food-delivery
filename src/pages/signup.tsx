import {useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import InputError from '../components/input-error';
import Button from '../components/button';
import {emailRegex} from '../utils/validators';
import {UserRole} from '../types/globalTypes';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../types/createAccountMutation';
import Title from '../components/title';
import {CREATE_ACCOUNT_MUTATION} from '../graphql/mutations';
import logo from '../assets/img/logo.png';

interface RegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
  role: UserRole;
}

function Signup() {
  const navigate = useNavigate();
  const {register, handleSubmit, formState, watch} = useForm<RegisterForm>({
    defaultValues: {role: UserRole.Client},
  });
  const {email, password, repeatPassword} = formState.errors;
  const [createAccountMutation, {data: createAccountMutationResult, loading}] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {onCompleted});
  const roleList = [
    {
      text: 'Quiero ser cliente',
      icon: 'person_outline',
      id: 'client',
      value: UserRole.Client,
    },
    {
      text: 'Quiero ser repartidor',
      icon: 'delivery_dining',
      id: 'delivery',
      value: UserRole.Delivery,
    },
    {
      text: 'Quiero registrar mi negocio',
      icon: 'storefront',
      id: 'owner',
      value: UserRole.Owner,
    },
  ];
  const passwordRef = useRef({});
  passwordRef.current = watch('password', '');

  function onCompleted(data: createAccountMutation): void {
    const {ok} = data.createAccount;
    if (ok) {
      navigate('/');
    }
  }

  function onSubmit(data: RegisterForm) {
    if (!loading) {
      const {email, password, role} = data;
      createAccountMutation({
        variables: {
          createAccountInput: {email, password, role},
        },
      });
    }
  }

  return (
    <div className='flex flex-wrap md:h-screen'>
      <Title text='Registrarse' />
      <div className='auth-bg mb-12 max-h-52 w-full md:mb-0 md:max-h-full md:w-2/5'>
        <img src={logo} alt='Food Delivery' className='mr-3' width={40} />
        <h1 className='text-2xl text-white md:text-3xl'>Food Delivery</h1>
      </div>
      <div className='flex w-full items-center justify-center md:w-3/5'>
        <div className='w-3/4 md:w-2/4'>
          <div className='mb-7'>
            <h2 className='mb-1 text-2xl font-semibold tracking-wide'>¡Empecemos!</h2>
            <p className='text-gray-500'>
              Creaa una cuenta para seguir disfruntando de nuestro servicio.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {createAccountMutationResult?.createAccount.error && (
              <InputError
                className='text-center'
                message={createAccountMutationResult?.createAccount.error}
                filled
              />
            )}
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
                  validate: value =>
                    value === passwordRef.current || 'Las contraseñas no coinciden',
                })}
                type='password'
                placeholder='Confirmar contraseña'
                required
                className='input'
              />
              {repeatPassword?.message && <InputError message={repeatPassword.message} />}
            </div>
            <div>
              {roleList.map(({id, text, value, icon}) => (
                <label
                  htmlFor={id}
                  key={id}
                  className={`group mb-3 flex items-center rounded-lg border-2 py-4 px-3 transition-colors hover:cursor-pointer hover:border-secondary-color ${
                    value === watch('role') ? 'border-secondary-color' : 'border-gray-200'
                  }`}>
                  <span className='material-icons mr-2'>{icon}</span>
                  <p>{text}</p>
                  <input
                    type='radio'
                    id={id}
                    {...register('role')}
                    value={value}
                    className='hidden'
                  />
                </label>
              ))}
            </div>
            <Button type='submit' text='Registrarse' loading={loading} />
          </form>
          <p className='pb-7 text-center text-sm text-gray-500'>
            ¿Ya tienes una cuenta?
            <Link to='/' className='ml-1 text-secondary-color hover:underline'>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
