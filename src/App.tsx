import {ApolloProvider, useReactiveVar} from '@apollo/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {client, isLoggedInVar} from './apollo';
import {ErrorBoundary} from './pages/error/error-boundary';
import LoggedInRouter from './routers/logged-in-router';
import LoggedOutRouter from './routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <ErrorBoundary>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</ErrorBoundary>
        </HelmetProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
