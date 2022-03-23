import {Route, Routes} from 'react-router-dom';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import Signup from '../pages/signup';

function LoggedOutRouter() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default LoggedOutRouter;
