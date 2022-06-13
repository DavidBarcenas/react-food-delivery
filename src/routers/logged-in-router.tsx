import {Link, useRoutes} from 'react-router-dom';
import Spinner from '../components/spinner';
import {useProfile} from '../hooks/use-profile';
import Error from '../pages/error';
import {routes} from './routes';

function LoggedInRouter() {
  const {data, loading, error} = useProfile();
  const router = useRoutes(routes(data?.me?.role));

  if (!!error) {
    return <Error />;
  }

  if (!data || loading) {
    return (
      <div className='main-container justify-center text-xl'>
        <Spinner className='text-lime-500' size='large' />
      </div>
    );
  }

  return (
    <div>
      <div className='fixed top-0 left-0 h-full w-64 bg-gray-50'>
        <div className='sidebar-header'>
          <h1>Food Delivery</h1>
        </div>
        <div className='sidebar-body'>
          <nav>
            <ul>
              <li>
                <Link to='/'>
                  <span className='material-icons-outlined'>home</span>
                  <span className='sidebar-link'>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='material-icons-outlined'>dashboard</span>
                  <span className='sidebar-link'>Explorar</span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='material-icons-outlined'>star_outline</span>
                  <span className='sidebar-link'>Favoritos</span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='material-icons-outlined'>email</span>
                  <span className='sidebar-link'>Mensajes</span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='material-icons-outlined'>settings</span>
                  <span className='sidebar-link'>Ajustes</span>
                </Link>
              </li>
            </ul>
          </nav>
          <button>
            <span className='material-icons-outlined'>logout</span>
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className='main'>{router}</div>
    </div>
  );
}

export default LoggedInRouter;
