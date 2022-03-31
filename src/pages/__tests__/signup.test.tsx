import {ApolloProvider} from '@apollo/client';
import {screen, waitFor} from '@testing-library/react';
import {createMockClient, MockApolloClient} from 'mock-apollo-client';
import {customRender} from '../../__fixtures__/utils';
import Signup from '../signup';

let mockClient: MockApolloClient;

beforeEach(() => {
  mockClient = createMockClient();
  customRender(
    <ApolloProvider client={mockClient}>
      <Signup />
    </ApolloProvider>,
  );
});

it('render title correctly', async () => {
  expect(screen.getByText(/¡empecemos!/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/¡empecemos!/i)).toBeInTheDocument());
});
