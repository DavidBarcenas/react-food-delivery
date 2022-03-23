import logo from '../assets/img/logo.png';

interface LogoProps {
  mode?: 'vertical' | 'horizontal';
}

function Logo({mode = 'horizontal'}: LogoProps) {
  return (
    <div className={`flex items-center ${mode === 'vertical' ? 'flex-col' : ''}`}>
      <img
        src={logo}
        alt='Food Delivery'
        width={`${mode === 'vertical' ? '80' : '40'}`}
        className='mr-3'
      />
      <h1 className='text-2xl text-gray-800 md:text-3xl'>
        <span className='font-medium text-lime-500'>Food</span> Delivery
      </h1>
    </div>
  );
}

export default Logo;
