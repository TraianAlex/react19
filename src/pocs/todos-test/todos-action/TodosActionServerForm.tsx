import { useActionState, useTransition } from 'react';
import { initialTodoActionState, type TodoActionState } from './serverAction';
import stylesModule from './TodosAction.module.scss';
import classNames from 'classnames';

const styles = stylesModule as Record<string, string>;
const cx = classNames.bind(styles);

interface TodosActionServerFormProps {
  createTodoAction: (
    prevState: TodoActionState,
    formData: FormData
  ) => Promise<TodoActionState>;
}

export default function TodosActionServerForm({
  createTodoAction,
}: TodosActionServerFormProps) {
  const [state, formAction, isPending] = useActionState(
    createTodoAction,
    initialTodoActionState
  );
  const [isTransitioning, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  const isLoading = isPending || isTransitioning;

  return (
    <form onSubmit={handleSubmit} className={styles.todosActionForm}>
      <div className={styles.formGroup}>
        <label htmlFor='title-server'>Title *</label>
        <input
          type='text'
          id='title-server'
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
        <label htmlFor='description-server'>Description *</label>
        <textarea
          id='description-server'
          name='description'
          rows={4}
          defaultValue={state.description}
          disabled={isLoading}
          className={state.errors?.description ? styles.error : ''}
          required
        />
        {state.errors?.description && (
          <span className={styles.errorMessage}>{state.errors.description}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor='priority-server'>Priority *</label>
          <select
            id='priority-server'
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
          <label htmlFor='dueDate-server'>Due Date *</label>
          <input
            type='date'
            id='dueDate-server'
            name='dueDate'
            defaultValue={state.dueDate}
            disabled={isLoading}
            className={state.errors?.dueDate ? styles.error : ''}
            required
          />
          {state.errors?.dueDate && (
            <span className={styles.errorMessage}>{state.errors.dueDate}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='category-server'>Category *</label>
        <select
          id='category-server'
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
        <label htmlFor='tags-server'>Tags (comma-separated)</label>
        <input
          type='text'
          id='tags-server'
          name='tags'
          defaultValue={state.tags}
          disabled={isLoading}
          placeholder='e.g., urgent, important, project'
        />
      </div>

      <div className={cx(styles.formGroup, styles.checkboxGroup)}>
        <label htmlFor='completed-server' className={styles.checkboxLabel}>
          <input
            type='checkbox'
            id='completed-server'
            name='completed'
            defaultChecked={state.completed}
            disabled={isLoading}
          />
          Mark as completed
        </label>
      </div>

      <button type='submit' disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Creating...' : 'Create Todo'}
      </button>

      {state.message && (
        <div
          className={cx(styles.message, {
            [styles.success]: state.isSuccess,
            [styles.error]: !state.isSuccess,
          })}
          role='alert'
        >
          {state.message}
        </div>
      )}
    </form>
  );
}
