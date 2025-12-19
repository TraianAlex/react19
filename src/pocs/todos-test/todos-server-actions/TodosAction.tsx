import TodosActionClient from './TodosActionClient';
import TodosActionServer from './TodosActionServer';
import stylesModule from './TodosAction.module.scss';

export const styles = stylesModule as Record<string, string>;

export default function TodosAction() {
  return (
    <div className={styles.todosActionWrapper}>
      <h1 className={styles.todosActionMainTitle}>
        React 19 Form Actions Examples
      </h1>
      <p className={styles.todosActionIntro}>
        This page demonstrates React 19's Server Functions with Form Actions.
        Both examples use the same server action but showcase different
        patterns:
      </p>

      <div className={styles.todosActionExamples}>
        <div className={styles.todosActionExample}>
          <TodosActionClient />
        </div>

        <div className={styles.todosActionExample}>
          <TodosActionServer />
        </div>
      </div>
    </div>
  );
}
