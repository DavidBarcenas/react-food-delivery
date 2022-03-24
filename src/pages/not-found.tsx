import {useNavigate} from 'react-router-dom';
import notFoundImg from '../assets/img/not-found.svg';
import Button from '../components/button';
import Title from '../components/title';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='main-container justify-center px-4'>
      <Title text='404' />
      <img src={notFoundImg} alt='404' className='mb-5 md:w-1/3' />
      <h2 className='mb-2 text-4xl font-bold'>404</h2>
      <h3 className='mb-5 text-3xl'>No encontramos lo que buscabas</h3>
      <Button text='Ir al inicio' mode='normal' onClick={() => navigate('/')} />
    </div>
  );
}

export default NotFound;
