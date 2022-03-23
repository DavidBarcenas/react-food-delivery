import logo from '../assets/img/logo.png';

function Header() {
  return (
    <header className='py-4'>
      <div className='mx-auto w-full px-10'>
        <img src={logo} width='28' alt='' />
      </div>
    </header>
  );
}

export default Header;
