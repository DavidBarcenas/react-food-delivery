import {useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import InputError from '../components/input-error';
import Button from '../components/button';
import {emailRegex} from '../utils/validators';
import {UserRole} from '../types/globalTypes';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../types/createAccountMutation';
import Logo from '../components/logo';
import Title from '../components/title';

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
    <div className='flex h-screen flex-col items-center'>
      <Title text='Registrarse' />
      <div className='w-full max-w-lg rounded-lg bg-white py-20'>
        <div className='mb-8 px-10 text-center'>
          <Logo mode='vertical' />
          <p className='mt-1'>¡Empecemos!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5 grid gap-5 px-10'>
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
                validate: value => value === passwordRef.current || 'Las contraseñas no coinciden',
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
                className={`group mb-3 flex items-center rounded-lg border-2 py-4 px-3 transition-colors hover:cursor-pointer hover:border-lime-500 ${
                  value === watch('role') ? 'border-lime-500' : 'border-gray-200'
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
