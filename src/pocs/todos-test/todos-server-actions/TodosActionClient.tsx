import { useActionState, useTransition } from 'react';
import {
  createTodoAction,
  initialTodoActionState,
  type TodoActionState,
} from './serverAction';
import stylesModule from './TodosAction.module.scss';
import classNames from 'classnames';

const styles = stylesModule as Record<string, string>;
const cx = classNames.bind(styles);

export default function TodosActionClient() {
  const [state, formAction, isPending] = useActionState(
    createTodoAction,
    initialTodoActionState
  );
  const [isTransitioning, startTransition] = useTransition();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   startTransition(() => {
  //     formAction(formData);
  //   });
  // };

  const isLoading = isPending || isTransitioning;

  return (
    <div className={styles.todosActionContainer}>
      <h2 className={styles.todosActionTitle}>Client Component Example</h2>
      <p className={styles.todosActionDescription}>
        This form uses React 19's <code>useActionState</code> hook with a Server
        Function. The form is submitted from a client component.
      </p>

      {/* <form onSubmit={handleSubmit} className={styles.todosActionForm}></form> */}
      <form action={formAction} className={styles.todosActionForm}>
        <div className={styles.formGroup}>
          <label htmlFor='title'>Title *</label>
          <input
            type='text'
            id='title'
            name='title'
            defaultValue={state.title}
            disabled={isLoading}
            className={state.errors?.title ? styles.error : ''}
            required
          />
          {state.errors?.title && (
            <span className={styles.errorMessage}>{state.errors.title}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='description'>Description *</label>
          <textarea
            id='description'
            name='description'
            rows={4}
            defaultValue={state.description}
            disabled={isLoading}
            className={state.errors?.description ? styles.error : ''}
            required
          />
          {state.errors?.description && (
            <span className={styles.errorMessage}>
              {state.errors.description}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor='priority'>Priority *</label>
            <select
              id='priority'
              name='priority'
              defaultValue={state.priority}
              disabled={isLoading}
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='dueDate'>Due Date *</label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              defaultValue={state.dueDate}
              disabled={isLoading}
              className={state.errors?.dueDate ? styles.error : ''}
              required
            />
            {state.errors?.dueDate && (
              <span className={styles.errorMessage}>
                {state.errors.dueDate}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='category'>Category *</label>
          <select
            id='category'
            name='category'
            defaultValue={state.category}
            disabled={isLoading}
            className={state.errors?.category ? styles.error : ''}
            required
          >
            <option value=''>Select a category</option>
            <option value='work'>Work</option>
            <option value='personal'>Personal</option>
            <option value='shopping'>Shopping</option>
            <option value='health'>Health</option>
            <option value='other'>Other</option>
          </select>
          {state.errors?.category && (
            <span className={styles.errorMessage}>{state.errors.category}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='tags'>Tags (comma-separated)</label>
          <input
            type='text'
            id='tags'
            name='tags'
            defaultValue={state.tags}
            disabled={isLoading}
            placeholder='e.g., urgent, important, project'
          />
        </div>

        <div className={cx(styles.formGroup, styles.checkboxGroup)}>
          <label htmlFor='completed' className={styles.checkboxLabel}>
            <input
              type='checkbox'
              id='completed'
              name='completed'
              defaultChecked={state.completed}
              disabled={isLoading}
            />
            Mark as completed
          </label>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Creating...' : 'Create Todo'}
        </button>

        {state.message && (
          <>
            <div
              className={cx(styles.message, {
                [styles.success]: state.isSuccess,
                [styles.error]: !state.isSuccess,
              })}
              role='alert'
            >
              {state.message}
            </div>
            <div
              className={cx(styles.message, {
                [styles.success]: state.isSuccess,
                [styles.error]: !state.isSuccess,
              })}
              role='alert'
            >
              {JSON.stringify(state.todos)}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
