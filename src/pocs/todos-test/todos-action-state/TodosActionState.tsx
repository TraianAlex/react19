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
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

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

  const handleEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const handleUpdate = async (formData: FormData) => {
    if (editingTodoId) {
      formData.set('action', 'update');
      formData.set('id', editingTodoId.toString());
      startTransition(() => {
        formAction(formData);
      });
      setEditingTodoId(null);
    }
  };

  // Get the todo being edited
  const editingTodo = editingTodoId
    ? state.todos.find((todo) => todo.id === editingTodoId)
    : null;

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

              {editingTodo ? (
                <form action={handleUpdate}>
                  <h5 className='mb-3'>Edit Todo</h5>
                  <div className='mb-3'>
                    <label htmlFor='edit-title' className='form-label'>
                      Title *
                    </label>
                    <input
                      type='text'
                      className={`form-control ${
                        state.error && !state.message ? 'is-invalid' : ''
                      }`}
                      id='edit-title'
                      name='title'
                      defaultValue={editingTodo.title}
                      required
                      disabled={isPending || isTransitioning}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='edit-date' className='form-label'>
                      Date *
                    </label>
                    <input
                      type='date'
                      className={`form-control ${
                        state.error && !state.message ? 'is-invalid' : ''
                      }`}
                      id='edit-date'
                      name='date'
                      defaultValue={editingTodo.date || ''}
                      required
                      disabled={isPending || isTransitioning}
                    />
                  </div>

                  <div className='mb-3 form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='edit-completed'
                      name='completed'
                      defaultChecked={editingTodo.completed}
                      disabled={isPending || isTransitioning}
                    />
                    <label
                      className='form-check-label'
                      htmlFor='edit-completed'
                    >
                      Completed
                    </label>
                  </div>

                  <div className='d-flex gap-2'>
                    <button
                      type='submit'
                      className='btn btn-primary flex-fill'
                      disabled={isPending || isTransitioning}
                    >
                      {isPending || isTransitioning
                        ? 'Updating...'
                        : 'Update Todo'}
                    </button>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={handleCancelEdit}
                      disabled={isPending || isTransitioning}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
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
                </form>
              )}

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
                        <div className='d-flex gap-2'>
                          <button
                            className='btn btn-sm btn-primary'
                            onClick={() => handleEdit(todo)}
                            disabled={
                              isPending ||
                              isTransitioning ||
                              editingTodoId === todo.id
                            }
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => handleDelete(todo.id)}
                            disabled={isPending || isTransitioning}
                          >
                            {isPending || isTransitioning
                              ? 'Deleting...'
                              : 'Delete'}
                          </button>
                        </div>
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
