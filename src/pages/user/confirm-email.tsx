import {gql, useApolloClient, useMutation} from '@apollo/client';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useProfile} from '../../hooks/use-profile';
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
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });
  const client = useApolloClient();
  const location = useLocation();
  const {data: profile} = useProfile();

  function onCompleted(response: verifyEmail) {
    if (response.verifyEmail.ok && profile?.me?.id) {
      client.writeFragment({
        id: `User:${profile.me.id}`,
        fragment: gql`
          fragment VerifyEmail on User {
            verifyEmail
          }
        `,
        data: {
          verifyEmail: true,
        },
      });
    }
  }

  useEffect(() => {
    const code = location.search.split('?code=')[1];

    if (code) {
      verifyEmail({
        variables: {
          input: {
            code,
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <h2>Confirmando correo</h2>
      <h4>Por favor espere, no cierre esta ventana.</h4>
    </div>
  );
}

export default ConfirmEmail;
