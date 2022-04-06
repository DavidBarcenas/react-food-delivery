import {gql, useMutation} from '@apollo/client';
import {useState} from 'react';
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
  [key: string]: string;
}

function AddDish() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [optionNumber, setOptionNumber] = useState<string[]>([]);
  const {register, handleSubmit, formState, unregister} = useForm<CreateDishForm>();
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
    const {name, description, price, ...rest} = data;
    const optionsObj = optionNumber.map(id => ({
      name: rest[`${id}-optionName`],
      extra: +rest[`${id}-optionExtra`],
    }));
    if (!loading) {
      createDishMutation({
        variables: {
          input: {
            restaurantId: Number(id),
            price: Number(price),
            name,
            description,
            options: optionsObj,
          },
        },
      });
      navigate(`/restaurant/${id}`);
    }
  }

  function addOptionFields() {
    const newId = crypto.randomUUID().split('-')[0];
    setOptionNumber(current => [...current, newId]);
  }

  function onDelete(optionId: string) {
    setOptionNumber(current => current.filter(id => id !== optionId));
    unregister(`${optionId}-optionName`);
    unregister(`${optionId}-optionExtra`);
  }

  return (
    <div>
      <Title text='Agregar platillos' />
      <h2 className='p-10 text-2xl font-medium'>Agregar platillos</h2>
      <div className='flex justify-center px-10'>
        <div className='form-container max-w-5xl'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            {data?.createDish.error && (
              <InputError className='text-center' message={data?.createDish.error} filled />
            )}
            <div className='flex'>
              <div className='mr-5 w-2/4'>
                <div className='mb-5'>
                  <input
                    {...register('name', {required: true})}
                    type='text'
                    required
                    placeholder='Nombre del platillo'
                    className='input'
                  />
                  {name?.type === 'required' && <InputError message='El nombre es requerido' />}
                </div>
                <div className='mb-5'>
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
                <div className='mb-5'>
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
              </div>
              <div className='w-2/4'>
                <Button type='button' text='Agregar opciones' onClick={addOptionFields} />
                {optionNumber.length > 0 &&
                  optionNumber.map(id => (
                    <div className='mb-5 mt-5' key={id}>
                      <input
                        {...register(`${id}-optionName`)}
                        type='text'
                        placeholder='Nombre de la opción'
                        className='input mb-5'
                      />
                      <input
                        {...register(`${id}-optionExtra`)}
                        type='number'
                        min={0}
                        placeholder='Precio extra'
                        className='input'
                      />
                      <button type='button' onClick={() => onDelete(id)}>
                        Eliminar
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <Button type='submit' text='Guardar' loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDish;
