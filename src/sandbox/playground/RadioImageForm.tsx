import {
  ChangeEvent,
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
  children: React.ReactNode;
}

interface RadioInputProps {
  label: string;
  value: string;
  name: string;
  imgSrc: string;
  currentValue?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

/**
 * @desc RadioInput component - A subset component of RadioImageForm.
 * In the `RadioInput` component, we have abstracted the implementation details of the radio input element,
 * where the parent component, RadioImageForm, deals with the onChange event actions and updating
 * the currently checked radio input.
 */
const RadioInput: React.FC<RadioInputProps> = ({
  currentValue,
  onChange,
  label,
  value,
  name,
  imgSrc,
}) => (
  <label className='radio-button-group'>
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

/**
 * @desc RadioImageForm uses compound component pattern. 
 *  1. RadioImageForm - the parent component that manages the entire state
 * 	2. RadioInput - Next, the user can start adding their radio inputs 
 * with the `RadioInput` compound component. A subset component of RadioImageForm. 
 * @example:
  <RadioImageForm onStateChange={onChange}>
		{DATA.map(
			({ label, value, name, imgSrc }): React.ReactElement => (
				<RadioImageForm.RadioInput
					label={label}
					value={value}
					name={label}
					imgSrc={imgSrc}
					key={imgSrc}
				/>
			),
		)}
	</RadioImageForm>
 * */
const RadioImageForm = ({
  onStateChange,
  defaultValue = '',
  children,
}: Props) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setCurrentValue(value);
      onStateChange?.(value);
    },
    [onStateChange]
  );

  /**
   * We're trying to let the consumer of our component to render the components they want within the
   * RadioImageForm component. But the RadioInput components will need access to the internal state,
   * the internal `onChange` function and as well the user's props for them to work properly. But how do
   * we pass this data to the subset component? This is where React.Children.map and React.cloneElement
   * comes into play.
   *
   * To do this, we can use:
   * 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
   * 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement
   */
  return (
    <RadioImageFormWrapper>
      <form>
        {Children.map(children as ReactElement, (child: ReactElement) =>
          cloneElement(child, {
            currentValue,
            onChange,
            defaultValue,
          } as any)
        )}
      </form>
    </RadioImageFormWrapper>
  );
};

// Create compound component
RadioImageForm.RadioInput = RadioInput;

export default RadioImageForm;

const RadioImageFormWrapper = styled.div`
  form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .radio-button-group {
    position: relative;
    cursor: pointer;
    margin-right: 0.75rem;

    /* HIDE RADIO */
    [type='radio'] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* IMAGE STYLES */
    [type='radio'] ~ img {
      cursor: pointer;
      display: block;
      height: 100px;
      width: 100px;
    }

    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      transition: 0.3s ease;
    }

    [type='radio']:focus ~ .overlay {
      opacity: 1;
      outline: 2px solid #86a8df;

      svg {
        display: none;
      }
    }

    /* CHECKED STYLES */
    [type='radio']:checked ~ .overlay {
      opacity: 1;
      border: 2px solid #ffffff;

      svg {
        display: block;
        color: white;
        font-size: 100px;
        position: absolute;
        top: 3.5%;
        left: 4%;
        text-align: center;
      }
    }

    svg {
      display: none;
    }
  }
`;
