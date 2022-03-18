import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/login';
import Signup from '../pages/signup';

function LoggedOutRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<h1>Upps! 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedOutRouter;
