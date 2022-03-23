import {Link} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Helmet} from 'react-helmet-async';
import {loginMutation, loginMutationVariables} from '../types/loginMutation';
import InputError from '../components/input-error';
import Button from '../components/button';
import {emailRegex} from '../utils/validators';
import {authToken, isLoggedInVar} from '../apollo';
import {LOCAL_STORAGE_TOKEN} from '../constants';
import Logo from '../components/logo';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const {register, handleSubmit, formState} = useForm<LoginForm>();
  const {email, password} = formState.errors;
  const [loginMutation, {data: loginMutationResult, loading}] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  function onCompleted(data: loginMutation): void {
    const {ok, token} = data.login;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  }

  function onSubmit(data: LoginForm) {
    if (!loading) {
      const {email, password} = data;
      loginMutation({
        variables: {
          loginInput: {email, password},
        },
      });
    }
  }

  return (
    <div className='flex h-screen flex-col items-center'>
      <Helmet>
        <title>Iniciar sesión | Food Delivery</title>
      </Helmet>
      <div className='w-full max-w-lg rounded-lg bg-white py-20'>
        <div className='mb-8 px-10 text-center'>
          <Logo mode='vertical' />
          <p className='mt-1'>Bienvenido de nuevo</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5 grid gap-5 px-10'>
          {loginMutationResult?.login.error && (
            <InputError className='text-center' message={loginMutationResult?.login.error} filled />
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
          <Button type='submit' text='Acceder' loading={loading} />
        </form>
        <p className='text-center text-sm'>
          ¿Eres nuevo por aqui?
          <Link to='/signup' className='ml-1 text-lime-500 hover:underline'>
            Crea una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
