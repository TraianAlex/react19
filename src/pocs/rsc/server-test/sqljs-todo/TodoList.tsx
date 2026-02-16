import { Dispatch } from 'react';
import { Todo as TodoType } from './server/actions';
import { EditorState, TodosAction } from './state';
import Todo from './Todo';

type TodoListProps = {
  dispatch: Dispatch<TodosAction>;
  todos: TodoType[];
  editor: EditorState;
  loading: boolean;
};

const TodoList = ({ dispatch, todos, editor, loading }: TodoListProps) => {
  return (
    <ul className='list-group mt-3'>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            dispatch={dispatch}
            todo={todo}
            todos={todos}
            editor={editor}
            loading={loading}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
