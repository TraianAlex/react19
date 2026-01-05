import { useActionState, useTransition, useEffect, useState } from 'react';
import {
  todoAction,
  initialTodoActionState,
  getInitialTodos,
  type TodoActionState,
  type Todo,
} from './serverAction';
import { toast } from 'react-hot-toast';

export default function TodosActionState() {
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const [state, formAction, isPending] = useActionState(
    todoAction,
    initialTodoActionState
  );

  const [isTransitioning, startTransition] = useTransition();

  // Fetch initial todos on mount
  useEffect(() => {
    async function loadInitialTodos() {
      try {
        const todos = await getInitialTodos();
        // Trigger refresh action to update state with fetched todos
        const formData = new FormData();
        formData.set('action', 'refresh');
        startTransition(() => {
          formAction(formData);
        });
      } catch (error) {
        console.error('Failed to load initial todos:', error);
      } finally {
        setIsLoadingInitial(false);
      }
    }
    loadInitialTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show toast notifications when error or message changes
  useEffect(() => {
    console.log('state.message', state.message);
    if (state.error) {
      toast.error(state.error);
    } else if (state.message) {
      toast.success(state.message);
    }
    state.error = null;
    state.message = null;
  }, [state.error, state.message]);

  const handleDelete = (id: number | string) => {
    const formData = new FormData();
    formData.set('action', 'delete');
    formData.set('id', id.toString());
    startTransition(() => {
      formAction(formData);
    });
  };

  if (isLoadingInitial) {
    return (
      <div className='container mt-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <div className='card'>
              <div className='card-body text-center'>
                <h2 className='card-title mb-4'>Loading todos...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Todos with useActionState</h2>

              <form action={formAction}>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title *
                  </label>
                  <input
                    type='text'
                    className={`form-control ${
                      state.error && !state.message ? 'is-invalid' : ''
                    }`}
                    id='title'
                    name='title'
                    required
                    disabled={isPending}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='date' className='form-label'>
                    Date *
                  </label>
                  <input
                    type='date'
                    className={`form-control ${
                      state.error && !state.message ? 'is-invalid' : ''
                    }`}
                    id='date'
                    name='date'
                    required
                    disabled={isPending}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary w-100'
                  disabled={isPending}
                >
                  {isPending ? 'Creating...' : 'Create Todo'}
                </button>

                {/* {state.error && (
                  <div className='alert alert-danger mt-3' role='alert'>
                    {state.error}
                  </div>
                )}

                {state.message && (
                  <div className='alert alert-success mt-3' role='alert'>
                    {state.message}
                  </div>
                )} */}
              </form>

              {state.todos.length > 0 && (
                <div className='mt-4'>
                  <h3>Your Todos</h3>
                  <ul className='list-group'>
                    {state.todos.map((todo: Todo) => (
                      <li
                        key={todo.id}
                        className='list-group-item d-flex justify-content-between align-items-center'
                      >
                        <div>
                          <strong>{todo.title}</strong>
                          <br />
                          <small className='text-muted'>
                            {todo.date
                              ? `Due: ${new Date(
                                  todo.date
                                ).toLocaleDateString()}`
                              : 'No due date'}
                            {todo.completed && (
                              <span className='badge bg-success ms-2'>
                                Completed
                              </span>
                            )}
                          </small>
                        </div>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => handleDelete(todo.id)}
                          disabled={isPending || isTransitioning}
                        >
                          {isPending || isTransitioning
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {state.todos.length === 0 && !isPending && !isLoadingInitial && (
                <div className='mt-4 text-center text-muted'>
                  <p>No todos yet. Create your first todo above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
