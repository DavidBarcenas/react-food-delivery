import {gql, useApolloClient, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import Button from '../../components/button';
import InputError from '../../components/input-error';
import Title from '../../components/title';
import {useProfile} from '../../hooks/use-profile';
import {editProfile, editProfileVariables} from '../../types/editProfile';
import {emailRegex} from '../../utils/validators';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface EditProfileForm {
  email?: string;
  password?: string;
}

function EditProfile() {
  const client = useApolloClient();
  const {data: profile} = useProfile();
  const [editProfile, {loading}] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {onCompleted},
  );
  const {register, formState, handleSubmit, getValues} = useForm<EditProfileForm>({
    defaultValues: {
      email: profile?.me?.email,
    },
  });
  const {email, password} = formState.errors;

  function onCompleted(data: editProfile) {
    if (data.editProfile.ok && profile) {
      const prevEmail = profile.me?.email;
      const newEmail = getValues().email;

      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${profile?.me?.id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              emailVerified
            }
          `,
          data: {
            email: newEmail,
            emailVerified: false,
          },
        });
      }
    }
  }

  function onSubmit(data: EditProfileForm) {
    const {email, password} = data;

    if (email === profile?.me?.email && password === '') {
      return;
    }

    editProfile({
      variables: {
        input: {
          email,
          ...(password?.trim() !== '' && {password}),
        },
      },
    });
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
                pattern: emailRegex,
              })}
              name='email'
              type='email'
              placeholder='Correo electrónico'
              className='input'
            />
            {email?.type === 'pattern' && <InputError message='Ingresa un correo válido' />}
          </div>
          <div>
            <input
              {...register('password', {minLength: 6})}
              type='password'
              placeholder='Contraseña'
              className='input'
            />
            {password?.type === 'minLength' && (
              <InputError message='La contraseña debe tener al menos 6 caracteres' />
            )}
          </div>
          <Button type='submit' text='Guardar' loading={loading} />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
