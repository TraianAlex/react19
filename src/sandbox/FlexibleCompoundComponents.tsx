import { useState } from 'react';

import Banner from './compound-components2/Banner';
import RadioImageForm from './compound-components2/RadioImageForm';
import DATA from './data';

const FlexibleCompoundComponents = () => {
  const [value, setValue] = useState('');

  const onChange = (value: string): void => {
    setValue(value);
  };

  const onSubmit = (value: string): void => {
    alert(`Submitted: ${value}`);
  };

  return (
    <div>
      <Banner
        title={'React Component Patterns'}
        subtitle={'Flexible Compound Components'}
      />
      <div>
        <h1 className='my-5'>Parent Value: {value}</h1>
        {/* The parent component that handles the onChange events 
				and managing the state of the currently selected value. */}
        <RadioImageForm onStateChange={onChange}>
          <div>{<RadioImageForm.CurrentValue />}</div>
          <form>
            <div>
              {/* The child, sub-components. 
							Each sub-component is an radio input displayed as an image
							where the user is able to click an image to select a value. */}
              {DATA.map(
                ({ label, value, imgSrc }): React.ReactElement => (
                  <RadioImageForm.RadioInput
                    label={label}
                    value={value}
                    name={label}
                    imgSrc={imgSrc}
                  />
                )
              )}
            </div>
          </form>
          <div className='d-flex'>
            <RadioImageForm.SubmitButton onSubmit={onSubmit} />
          </div>
        </RadioImageForm>
      </div>
    </div>
  );
};

export default FlexibleCompoundComponents;
