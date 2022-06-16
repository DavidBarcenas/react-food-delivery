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
      <div className='fixed top-0 left-0 flex h-full w-64 flex-col justify-between bg-gray-50 px-4 py-5'>
        <div className='sidebar-header'>
          <div className='mb-5 flex items-center pl-2'>
            <img src={logo} alt='logo' width={40} className='mr-3' />
            <h1 className='text-xl font-medium'>Food Delivery</h1>
          </div>
          <nav>
            <ul className='text-sm'>
              {navLinks.map(({icon, label, to}) => (
                <li key={to}>
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

        <div className='rounded-md bg-orange-50 px-4 py-6'>
          <div className='text-center'>
            <img
              src='https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              className='mb-2 rounded-md'
              alt=''
            />
            <h3 className='font-semibold'>Hamburguesa por tan solo $20</h3>
            <p className='my-5 text-xs text-gray-500'>
              Es una oferta por tiempo limitado que caducará pronto
            </p>
            <button className='w-full rounded-md bg-orange-500 py-3 font-medium text-white'>
              Pidela ahora
            </button>
          </div>
        </div>

        <button className='flex justify-center rounded-md bg-gray-100 py-3 hover:bg-gray-200'>
          <span className='material-icons-outlined mr-3'>logout</span>
          Cerrar sesión
        </button>
      </div>
      <div className='main'>
        <header className='px-4'>
          <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex items-center text-sm'>
              <div className='mr-10 flex items-center'>
                <span className='material-icons-outlined mr-2'>gps_fixed</span>
                <span>Ciudad de México</span>
              </div>
              <div className='flex items-center'>
                <span className='material-icons-outlined mr-2'>local_activity</span>
                <span>Mejores ofertas</span>
              </div>
            </div>
            <div className='flex'>
              <form className='m-auto w-96' autoComplete='off'>
                <input type='search' placeholder='Buscar un restaurante' className='input' />
              </form>
              <button className='ml-5 flex items-center rounded-md bg-secondary-color p-3'>
                <span className='material-icons-outlined'>shopping_cart</span>
              </button>
            </div>
          </div>
        </header>
        {router}
      </div>
    </div>
  );
}

export default LoggedInRouter;
