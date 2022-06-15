import Spinner from './spinner';

interface ButtonProps {
  text: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'normal' | 'full';
  onClick?: () => void;
}

function Button({text, loading, type = 'button', mode = 'full', onClick}: ButtonProps) {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-primary-color py-3 px-5 text-lg text-white shadow-sm transition-colors hover:bg-opacity-90 ${
        mode === 'full' ? 'w-full' : ''
      }`}>
      {loading ? <Spinner /> : text}
    </button>
  );
}

export default Button;
