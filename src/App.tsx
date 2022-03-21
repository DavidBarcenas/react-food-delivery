import {useReactiveVar} from '@apollo/client';
import {HelmetProvider} from 'react-helmet-async';
import {isLoggedInVar} from './apollo';
import LoggedInRouter from './routers/logged-in-router';
import LoggedOutRouter from './routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return <HelmetProvider>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</HelmetProvider>;
}

export default App;
