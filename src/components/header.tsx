import {Link} from 'react-router-dom';
import Logo from './logo';

function Header() {
  return (
    <header className='border-b-2 py-5'>
      <div className='mx-auto flex w-full items-center justify-between px-5 md:px-10'>
        <Link to='/'>
          <Logo />
        </Link>
        <Link to='my-profile'>
          <span className='material-icons'>person</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
