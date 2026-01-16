import { useActionState, useTransition, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { todoAction, initialTodoActionState, type Todo } from './serverAction';

export default function TodosActionState() {
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
        // Trigger refresh action to update state with fetched todos
        const formData = new FormData();
        formData.set('action', 'refresh');
        startTransition(() => {
          formAction(formData);
        });
      } catch (error) {
        console.error('Failed to load initial todos:', error);
      }
    }
    loadInitialTodos();
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

  // Unified form handler for both create and update
  const handleSubmit = async (formData: FormData) => {
    if (editingTodoId) {
      // Update mode
      formData.set('action', 'update');
      formData.set('id', editingTodoId.toString());
      startTransition(() => {
        formAction(formData);
      });
      setEditingTodoId(null);
    } else {
      // Create mode - use default formAction which handles create
      startTransition(() => {
        formAction(formData);
      });
    }
  };

  // Get the todo being edited
  const editingTodo = editingTodoId
    ? state.todos.find((todo) => todo.id === editingTodoId)
    : null;

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Todos with useActionState</h2>

              <form key={editingTodoId || 'create'} action={handleSubmit}>
                {editingTodo && <h5 className='mb-3'>Edit Todo</h5>}

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
                    defaultValue={editingTodo?.title || ''}
                    required
                    disabled={isPending || isTransitioning}
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
                    defaultValue={editingTodo?.date || ''}
                    required
                    disabled={isPending || isTransitioning}
                  />
                </div>

                {editingTodo && (
                  <div className='mb-3 form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='completed'
                      name='completed'
                      defaultChecked={editingTodo.completed}
                      disabled={isPending || isTransitioning}
                    />
                    <label className='form-check-label' htmlFor='completed'>
                      Completed
                    </label>
                  </div>
                )}

                <div className={editingTodo ? 'd-flex gap-2' : ''}>
                  <button
                    type='submit'
                    className={`btn btn-primary ${
                      editingTodo ? 'flex-fill' : 'w-100'
                    }`}
                    disabled={isPending || isTransitioning}
                  >
                    {isPending || isTransitioning
                      ? editingTodo
                        ? 'Updating...'
                        : 'Creating...'
                      : editingTodo
                      ? 'Update Todo'
                      : 'Create Todo'}
                  </button>
                  {editingTodo && (
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={handleCancelEdit}
                      disabled={isPending || isTransitioning}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {isPending || isTransitioning ? (
                <div className='container mt-4'>
                  <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                      <div className='card-body text-center'>
                        <h3 className='card-title mb-4'>Loading todos...</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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
