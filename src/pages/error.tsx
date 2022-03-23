import serverErrorImg from '../assets/img/internal-error.svg';
import Button from '../components/button';

interface ErrorProps {
  message?: '';
  redirect?: '';
}

function Error({message}: ErrorProps) {
  return (
    <div className='flex h-screen flex-col items-center justify-center px-4'>
      <img src={serverErrorImg} alt='Internal error' className='mb-5 md:w-1/3' />
      <h2 className='mb-5 w-[30rem] text-center text-xl font-medium md:text-3xl'>
        {message
          ? {message}
          : `Upps! Lo sentimos, ocurrió un error. Por favor, intentalo más tarde.`}
      </h2>
      <Button text='Aceptar' />
    </div>
  );
}

export default Error;
