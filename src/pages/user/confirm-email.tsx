import {gql, useMutation} from '@apollo/client';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {verifyEmail, verifyEmailVariables} from '../../types/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const [verifyEmail, {loading}] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
  );
  const locations = useLocation();

  useEffect(() => {
    const [_, code] = location.search.split('?code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div>
      <h2>Confirmando correo</h2>
      <h4>Por favor espere, no cierre esta ventana.</h4>
    </div>
  );
}

export default ConfirmEmail;
