import {gql, useApolloClient, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Button from '../../components/button';
import InputError from '../../components/input-error';
import Title from '../../components/title';
import {createRestaurant, createRestaurantVariables} from '../../types/createRestaurant';
import {MY_RESTAURANTS_QUERY} from './my-restaurants';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface CreateRestaurantForm {
  name: string;
  address: string;
  categoryName: string;
  coverImage: string;
}

function AddRestaurant() {
  const client = useApolloClient();
  const navigate = useNavigate();
  const {register, handleSubmit, formState, getValues} = useForm<CreateRestaurantForm>();
  const {name, address, categoryName} = formState.errors;
  const [createRestaurantMutation, {loading, data}] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {onCompleted});

  function onCompleted(data: createRestaurant) {
    const {name, address, categoryName, coverImage} = getValues();
    if (data.createRestaurant.ok) {
      const queryResult = client.readQuery({query: MY_RESTAURANTS_QUERY});
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            __typename: 'MyRestaurantsOutput',
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImage,
                id: data.createRestaurant.restaurantId,
                isPromoted: false,
                name,
                __typename: 'Restaurant',
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      navigate('/');
    }
  }

  function onSubmit(data: CreateRestaurantForm) {
    if (!loading) {
      const {name, address, categoryName, coverImage} = data;
      createRestaurantMutation({
        variables: {
          input: {name, address, categoryName, coverImage},
        },
      });
    }
  }

  return (
    <section>
      <header className='p-10'>
        <Title text='Agregar restaurante' />
        <h2 className='text-2xl font-medium'>Agregar Restaurante</h2>
      </header>
      <div className='flex justify-center px-10'>
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {data?.createRestaurant.error && (
              <InputError className='text-center' message={data?.createRestaurant.error} filled />
            )}
            <div>
              <input
                {...register('name', {required: true})}
                type='text'
                required
                placeholder='Nombre del restaurante'
                className='input'
              />
              {name?.type === 'required' && <InputError message='El nombre es requerido' />}
            </div>
            <div>
              <input
                {...register('address', {required: true})}
                type='text'
                required
                placeholder='Dirección'
                className='input'
              />
              {address?.type === 'required' && <InputError message='La dirección es requerida' />}
            </div>
            <div>
              <input
                {...register('categoryName', {required: true})}
                type='text'
                required
                placeholder='Nombre de la categoría'
                className='input'
              />
              {categoryName?.type === 'required' && (
                <InputError message='La categoría es requerida' />
              )}
            </div>
            <div>
              <input
                {...register('coverImage')}
                type='text'
                placeholder='Agregar url de imagen de portada'
                className='input'
              />
            </div>
            <Button type='submit' text='Guardar' loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddRestaurant;
