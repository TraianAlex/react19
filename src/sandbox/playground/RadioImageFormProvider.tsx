import { createContext, useMemo, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
}

interface State {
  currentValue: string;
  defaultValue?: string;
}

interface ProviderState extends State {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

// Create a RadioImageFormContext with React.createContext
export const RadioImageFormContext = createContext<ProviderState>({
  currentValue: "",
  defaultValue: undefined,
  onChange: () => {},
});
// Context object accepts a displayName string property.
// React DevTools uses this string to determine what to display
// for the context.
RadioImageFormContext.displayName = "RadioImageForm";

/**
 * @desc RadioImageForm uses flexible compound component pattern with React's Context API.
 * Flexible Compound Components allow to implicitly accept the internal state of our class
 * component regardless of where they're rendered within the level in the component tree.
 * In order to accomplish this we will use the React's Context API.
 * Use case for flexible compound components: When several components need to share state,
 * but the user does not need to know about it.
 * 
 *  1. RadioImageForm - the parent component that manages the entire state
 * 	2. RadioInput - Next, the user can start adding their radio inputs 
 * with the `RadioInput` compound component. A subset component of RadioImageForm. 
 * In the `RadioInput` component, we have abstracted the implementation details of the radio input element, 
 * where the parent component, RadioImageForm, deals with the onChange event actions and updating 
 * the currently checked radio input.
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

// RadioImageForm isn't a React.FC, because
// can't assign extra pros to React.FC
// so no RadioImageForm.SubmitButton = SubmitButton
// if want to use React.FC use the following code
/*
export default Object.assign(RadioImageForm, {
  RadioInput,
  SubmitButton,
  CurrentValue,
})
*/
export const RadioImageFormProvider = ({
  children,
  defaultValue = "",
  onStateChange,
}: React.PropsWithChildren<Props>) => {
  const [state, setState] = useState<State>({
    currentValue: "",
    defaultValue,
  });

  // memoized so that providerState isn't recreated on each render
  const provState = useMemo(
    () => ({
      onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setState({
          currentValue: value,
        });
        onStateChange?.(value);
      },
      ...state,
    }),
    [state, onStateChange]
  );

  return (
    <RadioImageFormWrapper>
      <RadioImageFormContext.Provider value={provState}>
        {children}
      </RadioImageFormContext.Provider>
    </RadioImageFormWrapper>
  );
};

const RadioImageFormWrapper = styled.div`
	form {
		display: flex;
		justify-content: center;
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

	.current-value {
		background: #2c5282;
	}
`;
