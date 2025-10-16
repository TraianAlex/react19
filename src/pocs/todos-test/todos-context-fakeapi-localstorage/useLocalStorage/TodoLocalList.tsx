import { useLocalStorage } from './useLocalStorage';
import 'font-awesome/css/font-awesome.css';
import { TodoItem } from './TodoItem';
import { Todo } from '../Context';

const TodoLocalList = ({ setIsEdit }: { setIsEdit: (id: string) => void }) => {
  const { todos, updateTodo } = useLocalStorage();

  const loading = false;
  const onUpdate = (id: string) => setIsEdit(id);

  const onSetCompleted = (id: string) => {
    const todo = todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      const completedTodo = {
        ...todo,
        completed: !todo.completed,
      } as Todo;
      updateTodo(id, completedTodo);
    }
  };

  return (
    <>
      {!loading &&
        todos &&
        todos
          .reverse()
          .map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onSetCompleted={onSetCompleted}
              onUpdate={onUpdate}
            />
          ))}
    </>
  );
};

export default TodoLocalList;
