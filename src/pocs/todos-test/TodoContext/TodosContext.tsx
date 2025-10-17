import './style.scss';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoState from './TodoState';

const TodosContext = () => {
  return (
    <TodoState>
      <div className='container flex flex-col mt-4 todo-context'>
        <h2 className='text-center'>Todo App With Context</h2>
        <TodoForm />
        <div className='flex flex-col mt-2'>
          <TodoList />
        </div>
      </div>
    </TodoState>
  );
};

export default TodosContext;
