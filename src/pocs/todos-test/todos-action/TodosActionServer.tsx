import { createTodoAction } from './serverAction';
import TodosActionServerForm from './TodosActionServerForm';
import { styles } from './TodosAction';

export default function TodosActionServer() {
  // This demonstrates passing a server action as a prop
  // In a React Server Components setup, this component could be a Server Component
  // that defines an inline server function with 'use server' directive
  // For this example, we're passing the imported server action to show the pattern

  // In a true Server Component environment, you could do:
  // async function handleCreateTodo(formData: FormData) {
  //   'use server';
  //   return createTodoAction(initialTodoActionState, formData);
  // }

  return (
    <div className={styles.todosActionContainer}>
      <h2 className={styles.todosActionTitle}>Server Function as Prop Example</h2>
      <p className={styles.todosActionDescription}>
        This form demonstrates passing a Server Function as a prop to a Client
        Component. In a React Server Components setup, a Server Component could
        define an inline Server Function with the <code>'use server'</code> directive and pass it to this Client Component. Here we pass the imported server action to demonstrate the pattern.
      </p>
      <TodosActionServerForm createTodoAction={createTodoAction} />
    </div>
  );
}
