import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../components/button';
import InputError from '../../components/input-error';
import Title from '../../components/title';
import {createDish, createDishVariables} from '../../types/createDish';
import {MY_RESTAURANT_QUERY} from './my-restaurant';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface CreateDishForm {
  name: string;
  description: string;
  price: string;
}

function AddDish() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, formState} = useForm<CreateDishForm>();
  const {name, description, price} = formState.errors;
  const [createDishMutation, {data, loading}] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id: Number(id),
            },
          },
        },
      ],
    },
  );

  function onSubmit(data: CreateDishForm) {
    const {name, description, price} = data;
    if (!loading) {
      createDishMutation({
        variables: {
          input: {
            restaurantId: Number(id),
            price: Number(price),
            name,
            description,
          },
        },
      });
      navigate(`/restaurant/${id}`);
    }
  }

  return (
    <div>
      <Title text='Agregar platillos' />
      <h2 className='p-10 text-2xl font-medium'>Agregar platillos</h2>
      <div className='flex justify-center px-10'>
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {data?.createDish.error && (
              <InputError className='text-center' message={data?.createDish.error} filled />
            )}
            <div>
              <input
                {...register('name', {required: true})}
                type='text'
                required
                placeholder='Nombre del platillo'
                className='input'
              />
              {name?.type === 'required' && <InputError message='El nombre es requerido' />}
            </div>
            <div>
              <input
                {...register('description', {required: true})}
                type='text'
                required
                placeholder='Descripción'
                className='input'
              />
              {description?.type === 'required' && (
                <InputError message='La descripción es requerido' />
              )}
            </div>
            <div>
              <input
                {...register('price', {required: true})}
                type='number'
                min={0}
                required
                placeholder='Precio'
                className='input'
              />
              {price?.type === 'required' && <InputError message='El precio es requerido' />}
            </div>
            <Button type='submit' text='Guardar' loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDish;
