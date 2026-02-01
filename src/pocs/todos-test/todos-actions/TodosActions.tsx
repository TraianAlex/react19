import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sleep } from '../../../shared/utils/utils';

export default function TodosActions() {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const priority = formData.get('priority') as string;
      const dueDate = formData.get('dueDate') as string;
      const completed = formData.get('completed') as string;

      console.log(title, description, priority, dueDate, completed);
      // Simulate API call
      await sleep(1000);
      return { title, description, priority, dueDate, completed };
    },
    onSuccess: () => {
      toast.success('Todo created successfully');
    },
    onError: () => {
      toast.error('Failed to create todo');
    },
  });

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Create Todo</h2>

              <form action={mutation.mutate}>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title *
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='title'
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description *
                  </label>
                  <textarea
                    className='form-control'
                    id='description'
                    name='description'
                    rows={4}
                    required
                  />
                </div>

                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='priority' className='form-label'>
                      Priority *
                    </label>
                    <select
                      className='form-select'
                      id='priority'
                      name='priority'
                      defaultValue='medium'
                      required
                    >
                      <option value='low'>Low</option>
                      <option value='medium'>Medium</option>
                      <option value='high'>High</option>
                    </select>
                  </div>

                  <div className='col-md-6 mb-3'>
                    <label htmlFor='dueDate' className='form-label'>
                      Due Date *
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='dueDate'
                      name='dueDate'
                      required
                    />
                  </div>
                </div>

                <div className='mb-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='completed'
                      name='completed'
                    />
                    <label className='form-check-label' htmlFor='completed'>
                      Mark as completed
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary w-100'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Creating...' : 'Create Todo'}
                </button>
              </form>
            </div>
          </div>
          {mutation.isPending && (
            <div className='card'>
              <div className='card-body'>Loading...</div>
            </div>
          )}
          {mutation.data && (
            <div className='card'>
              <div className='card-body'>{JSON.stringify(mutation.data)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
