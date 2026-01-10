import { useState, useOptimistic, useTransition } from 'react';
import { localApi } from '../shared/api';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import type { Todo } from '../shared/types';

interface OptimisticTodo extends Todo {
  optimistic?: boolean;
}

export function OptimisticDemo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [newTodoText, setNewTodoText] = useState('');

  // React 19's useOptimistic hook for optimistic updates
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], optimisticTodo: OptimisticTodo) => {
      if (optimisticTodo.optimistic) {
        // Adding new optimistic todo
        return [...state, optimisticTodo];
      } else {
        // Updating existing todo optimistically
        return state.map((todo) =>
          todo.id === optimisticTodo.id ? optimisticTodo : todo
        );
      }
    }
  );

  // Load todos from API
  const loadTodos = () => {
    startTransition(async () => {
      try {
        setError(null);
        const fetchedTodos = await localApi.getTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError(
          'Failed to load todos. Make sure json-server is running on localhost:4000'
        );
      }
    });
  };

  // Add todo with optimistic update
  const addTodo = () => {
    if (!newTodoText.trim()) return;

    const optimisticTodo: OptimisticTodo = {
      id: Date.now(), // Temporary ID
      todoText: newTodoText,
      completed: false,
      important: false,
      sequence: 0,
      optimistic: true,
    };

    // Immediately show optimistic update
    addOptimisticTodo(optimisticTodo);
    setNewTodoText('');

    // Perform actual API call
    startTransition(async () => {
      try {
        setError(null);
        const newTodo = await localApi.createTodo({
          todoText: newTodoText,
          completed: false,
          important: false,
          sequence: 0,
        });
        // Update with real data from server
        setTodos((prev) => [...prev, newTodo]);
      } catch (err) {
        setError('Failed to create todo');
        // Optimistic update will be reverted automatically
      }
    });
  };

  // Toggle todo completion with optimistic update
  const toggleTodo = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    // Immediately show optimistic update
    addOptimisticTodo(updatedTodo);

    // Perform actual API call
    startTransition(async () => {
      try {
        setError(null);
        await localApi.updateTodo(todo.id, { completed: !todo.completed });
        // Update real state
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todo.id ? { ...t, completed: !todo.completed } : t
          )
        );
      } catch (err) {
        setError('Failed to update todo');
        // Optimistic update will be reverted automatically
      }
    });
  };

  // Delete todo with optimistic update
  const deleteTodo = (todoId: number) => {
    // Optimistically remove from UI
    const filteredTodos = todos.filter((t) => t.id !== todoId);
    setTodos(filteredTodos);

    // Perform actual API call
    startTransition(async () => {
      try {
        setError(null);
        await localApi.deleteTodo(todoId);
        // Already updated optimistically
      } catch (err) {
        setError('Failed to delete todo');
        // Restore the todo on error
        const originalTodos = await localApi.getTodos();
        setTodos(originalTodos);
      }
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col'>
          <h2 className='h4 mb-3'>React 19 useOptimistic Demo</h2>
          <p className='text-muted mb-3'>
            The <code>useOptimistic</code> hook enables optimistic updates -
            showing changes immediately while the actual operation happens in
            the background. Changes revert if the operation fails.
          </p>

          <div className='d-flex gap-2 mb-3'>
            <button
              className='btn btn-primary btn-sm'
              onClick={loadTodos}
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Load Todos'}
            </button>
            <small className='text-muted align-self-center'>
              Requires json-server running on localhost:4000
            </small>
          </div>
        </div>
      </div>

      {error && (
        <div className='alert alert-danger alert-dismissible'>
          {error}
          <button
            type='button'
            className='btn-close'
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      <div className='row'>
        <div className='col-lg-6'>
          <h5>Add New Todo</h5>
          <div className='card p-3 mb-4'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter todo text...'
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                disabled={isPending}
              />
              <button
                className='btn btn-success'
                onClick={addTodo}
                disabled={isPending || !newTodoText.trim()}
              >
                Add Todo
              </button>
            </div>
            <small className='text-muted mt-2'>
              Notice how the todo appears immediately (optimistic update)
            </small>
          </div>

          <div className='alert alert-info'>
            <h6 className='alert-heading'>Try This:</h6>
            <ul className='mb-0 small'>
              <li>Add a todo - it appears instantly</li>
              <li>Toggle completion - changes immediately</li>
              <li>If json-server isn't running, changes will revert</li>
              <li>Optimistic todos have a subtle visual indicator</li>
            </ul>
          </div>
        </div>

        <div className='col-lg-6'>
          <h5>Todos ({optimisticTodos.length})</h5>

          {isPending && optimisticTodos.length === 0 && (
            <LoadingSpinner text='Loading todos...' />
          )}

          <div className='d-flex flex-column gap-2'>
            {optimisticTodos.map((todo) => (
              <div
                key={todo.id}
                className={`card ${todo.optimistic ? 'border-warning' : ''}`}
              >
                <div className='card-body py-2'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <input
                        type='checkbox'
                        className='form-check-input me-2'
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo)}
                        disabled={isPending}
                      />
                      <span
                        className={`${
                          todo.completed
                            ? 'text-decoration-line-through text-muted'
                            : ''
                        }`}
                      >
                        {todo.todoText}
                      </span>
                      {todo.optimistic && (
                        <span className='badge bg-warning text-dark ms-2 small'>
                          Optimistic
                        </span>
                      )}
                    </div>
                    <button
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => deleteTodo(todo.id)}
                      disabled={isPending}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {optimisticTodos.length === 0 && !isPending && (
              <div className='card'>
                <div className='card-body text-center text-muted'>
                  <p className='mb-0'>No todos yet. Add one above!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='alert alert-info'>
          <h6 className='alert-heading'>React 19 useOptimistic Features:</h6>
          <ul className='mb-0 small'>
            <li>Immediate UI updates for better user experience</li>
            <li>Automatic rollback on operation failure</li>
            <li>Works seamlessly with useTransition</li>
            <li>Reduces perceived latency in applications</li>
            <li>Handles complex state updates optimistically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
