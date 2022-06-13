import {Link} from 'react-router-dom';
import {useProfile} from '../hooks/use-profile';
import Logo from './logo';

function Header() {
  const {data} = useProfile();

  return (
    <>
      {!data?.me?.emailVerified ? (
        <div className='border-b border-dotted border-red-600 bg-red-500 p-2 text-center'>
          <span className='text-sm font-medium text-white'>
            Por favor verifica tu correo electrónico.
          </span>
        </div>
      ) : null}
      <header className='border-b-2 py-5'>
        <div className='mx-auto flex w-full items-center justify-between px-5 md:px-10'>
          <Link to='/'>
            <Logo />
          </Link>
          <Link to='edit-profile'>
            <span className='material-icons'>person</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
