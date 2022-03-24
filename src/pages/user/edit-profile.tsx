import {useForm} from 'react-hook-form';
import Button from '../../components/button';
import InputError from '../../components/input-error';
import Title from '../../components/title';
import {emailRegex} from '../../utils/validators';

interface EditProfileForm {
  email?: string;
  password?: string;
}

function EditProfile() {
  const {register, formState, handleSubmit} = useForm<EditProfileForm>();
  const {email, password} = formState.errors;

  function onSubmit() {
    console.log('onSubmit');
  }

  return (
    <div className='main-container'>
      <Title text='Información de contacto' />
      <div className='form-container'>
        <h2 className='mb-10 text-center text-2xl font-semibold'>Información de contacto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
          <div>
            <input
              {...register('email', {
                required: true,
                pattern: emailRegex,
              })}
              name='email'
              type='email'
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
              className='input'
            />
            {password?.message && <InputError message={password?.message} />}
            {password?.type === 'minLength' && (
              <InputError message='La contraseña debe tener al menos 6 caracteres' />
            )}
          </div>
          <Button type='submit' text='Acceder' />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
