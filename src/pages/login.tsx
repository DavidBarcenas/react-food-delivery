import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {loginMutation, loginMutationVariables} from '../types/loginMutation';
import InputError from '../components/input-error';
import Button from '../components/button';
import {emailRegex} from '../utils/validators';
import {authToken, isLoggedInVar} from '../apollo';
import {LOCAL_STORAGE_TOKEN} from '../constants';
import Title from '../components/title';
import {LOGIN_MUTATION} from '../graphql/mutations';
import logo from '../assets/img/logo.png';

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
    <div className='flex flex-wrap md:h-screen'>
      <Title text='Iniciar sesión' />
      <div className='auth-bg mb-12 max-h-52 w-full md:mb-0 md:max-h-full md:w-2/5'>
        <img src={logo} alt='Food Delivery' className='mr-3' width={40} />
        <h1 className='text-2xl text-white md:text-3xl'>Food Delivery</h1>
      </div>
      <div className='flex w-full items-center justify-center md:w-3/5'>
        <div className='w-3/4 md:w-2/4'>
          <div className='mb-7'>
            <h2 className='mb-1 text-2xl font-semibold tracking-wide'>Bienvenido</h2>
            <p className='text-gray-500'>Inicia sesión en tu cuenta para continuar</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {loginMutationResult?.login.error && (
              <InputError
                className='text-center'
                message={loginMutationResult?.login.error}
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
            <Button type='submit' text='Acceder' loading={loading} />
          </form>
          <p className='text-center text-sm text-gray-500'>
            ¿Eres nuevo por aqui?
            <Link to='/signup' className='ml-1 text-secondary-color hover:underline'>
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
