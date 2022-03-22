import {useReactiveVar} from '@apollo/client';
import {HelmetProvider} from 'react-helmet-async';
import {isLoggedInVar} from './apollo';
import {ErrorBoundary} from './pages/error-boundary';
import LoggedInRouter from './routers/logged-in-router';
import LoggedOutRouter from './routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <HelmetProvider>
      <ErrorBoundary>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
