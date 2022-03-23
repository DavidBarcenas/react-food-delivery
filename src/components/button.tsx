import Spinner from './spinner';

interface ButtonProps {
  text: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

function Button({text, loading, type = 'button', onClick}: ButtonProps) {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className='rounded-lg bg-lime-500 py-3 px-5 text-lg text-white shadow-sm transition-colors hover:bg-opacity-90'>
      {loading ? <Spinner /> : text}
    </button>
  );
}

export default Button;