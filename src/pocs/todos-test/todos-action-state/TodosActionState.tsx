import { useActionState, useTransition } from 'react';
import {
  todoAction,
  initialTodoActionState,
  getTodos,
  type TodoActionState,
  type Todo,
} from './serverAction';

export default function TodosActionState() {
  // Initialize with existing todos
  const initialStateWithTodos: TodoActionState = {
    ...initialTodoActionState,
    todos: getTodos(),
  };

  const [state, formAction, isPending] = useActionState(
    todoAction,
    initialStateWithTodos
  );

  const [isTransitioning, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    const formData = new FormData();
    formData.set('action', 'delete');
    formData.set('id', id);
    startTransition(() => {
      formAction(formData);
    });
  };

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

                {state.error && (
                  <div className='alert alert-danger mt-3' role='alert'>
                    {state.error}
                  </div>
                )}

                {state.message && (
                  <div className='alert alert-success mt-3' role='alert'>
                    {state.message}
                  </div>
                )}
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
                            Due: {new Date(todo.date).toLocaleDateString()}
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

              {state.todos.length === 0 && !isPending && (
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
