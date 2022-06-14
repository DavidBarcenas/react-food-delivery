import {Link, useRoutes} from 'react-router-dom';
import Spinner from '../components/spinner';
import {useProfile} from '../hooks/use-profile';
import Error from '../pages/error';
import {routes} from './routes';
import logo from '../assets/img/logo.png';

const navLinks = [
  {
    icon: 'home',
    label: 'Inicio',
    to: '/',
  },
  {
    icon: 'dashboard',
    label: 'Explorar',
    to: '/dashboard',
  },
  {
    icon: 'star_outline',
    label: 'Favoritos',
    to: '/favorites',
  },
  {
    icon: 'email',
    label: 'Mensajes',
    to: '/messages',
  },
  {
    icon: 'settings',
    label: 'Ajustes',
    to: '/settings',
  },
];

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
      <div className='fixed top-0 left-0 flex h-full w-64 flex-col justify-between bg-gray-50 px-4 py-6'>
        <div className='sidebar-header'>
          <div className='mb-8 flex items-center pl-2'>
            <img src={logo} alt='logo' width={40} className='mr-3' />
            <h1 className='text-xl font-medium'>Food Delivery</h1>
          </div>
          <nav>
            <ul className='text-sm'>
              {navLinks.map(({icon, label, to}) => (
                <li key={to} className='mb-2'>
                  <Link
                    to={to}
                    className={`block rounded-md p-3 ${
                      to === '/' ? 'bg-purple-800 font-medium text-white' : 'hover:bg-gray-100'
                    }`}>
                    <span className='material-icons-outlined mr-3 inline-block align-middle'>
                      {icon}
                    </span>
                    <span className='sidebar-link inline-block align-middle'>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button className='flex justify-center rounded-md bg-gray-100 py-3 hover:bg-gray-200'>
          <span className='material-icons-outlined mr-3'>logout</span>
          Cerrar sesión
        </button>
      </div>
      <div className='main'>{router}</div>
    </div>
  );
}

export default LoggedInRouter;
