interface InputErrorProps {
  message: string;
  className?: string;
  filled?: boolean;
}

function InputError({message, className, filled = false}: InputErrorProps) {
  return (
    <span
      role='alert'
      className={`block w-full rounded-md text-sm text-danger-alert-color
        ${className || ''} 
        ${filled ? 'mb-3 bg-danger-alert py-2 font-medium' : 'ml-1 py-1'}`}>
      {message}
    </span>
  );
}

export default InputError;
