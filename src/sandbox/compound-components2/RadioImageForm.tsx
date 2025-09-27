import { useContext } from 'react';

import {
  RadioImageFormContext,
  RadioImageFormProvider,
} from './RadioImageFormProvider';

interface RadioInputProps {
  label: string;
  value: string;
  name: string;
  imgSrc: string;
}

interface SubmitButtonProps {
  onSubmit?(value: string): void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  value,
  name,
  imgSrc,
}) => {
  const { currentValue, onChange } = useContext(RadioImageFormContext);

  return (
    <label className='radio-button-group' key={value}>
      <input
        type='radio'
        name={name}
        value={value}
        aria-label={label}
        onChange={onChange}
        checked={currentValue === value}
        aria-checked={currentValue === value}
      />
      <img alt='' src={imgSrc} />
      <div className='overlay'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-check-circle'
        >
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
          <polyline points='22 4 12 14.01 9 11.01' />
        </svg>
      </div>
    </label>
  );
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  const { currentValue } = useContext(RadioImageFormContext);

  return (
    <button
      type='button'
      className='btn btn-primary'
      onClick={() => onSubmit?.(currentValue)}
      disabled={!currentValue}
      aria-disabled={!currentValue}
    >
      Submit
    </button>
  );
};

const CurrentValue: React.FC = () => {
  const { currentValue } = useContext(RadioImageFormContext);

  return currentValue ? (
    <div className='alert current-value'>
      <h1>Current Value: {currentValue}</h1>
    </div>
  ) : null;
};

const RadioImageForm = Object.assign(RadioImageFormProvider, {
  RadioInput,
  SubmitButton,
  CurrentValue,
});

export default RadioImageForm;
