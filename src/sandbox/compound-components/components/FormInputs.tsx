import { useEditContactContext } from '../context/useEditContactContext';

export const FormInputs = () => {
  const { formState, setFormState, error } = useEditContactContext();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormState((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className='contact-form'>
      {error && <div className='error-message'>{error}</div>}
      <div className='form-group mb-1'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          id='name'
          name='name'
          value={formState.name}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <div className='form-group mb-1'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={formState.email}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <div className='form-group mb-1'>
        <label htmlFor='phone' className='form-label'>
          Phone
        </label>
        <input
          id='phone'
          name='phone'
          value={formState.phone}
          onChange={handleChange}
          className='form-control'
        />
      </div>
    </form>
  );
};
