import {gql, useMutation} from '@apollo/client';
import {createDish, createDishVariables} from '../../types/createDish';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

function AddDish() {
  const [createDishMutation, {data, loading}] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
  );
  return <div>AddDish</div>;
}

export default AddDish;
