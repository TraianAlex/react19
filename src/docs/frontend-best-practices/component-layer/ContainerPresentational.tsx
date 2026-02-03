import { useState, useEffect } from 'react';

const ContainerPresentational = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>4. Container/Presentational Pattern</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Mixed responsibilities</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Clear separation</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Separate data logic (containers) from presentation (presentational components).
                Components that know about business logic shouldn't also be responsible for styling 
                and layout details.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Container Component (Smart Component)
const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  return <TodoList todos={todos} loading={loading} />;
};

// Presentational Component (Dumb Component)
interface TodoListProps {
  todos: Todo[];
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Todo {
  id: number;
  text: string;
}

// ❌ Bad: Mixed responsibilities
const BadApproach = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  // Mixed: data fetching + presentation
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h6>Mixed Component</h6>
      <ul className='list-group'>
        {todos.map((todo) => (
          <li key={todo.id} className='list-group-item'>
            {todo.title}
          </li>
        ))}
      </ul>
      <small className='text-muted mt-2 d-block'>
        Problems: Hard to test, hard to reuse, mixed concerns
      </small>
    </div>
  );
};

// ✅ Good: Clear separation
// Presentational Component (Dumb Component)
interface TodoListProps {
  todos: Todo[];
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading }) => {
  if (loading) return <div className='alert alert-info'>Loading...</div>;
  return (
    <div>
      <h6>Presentational Component</h6>
      <ul className='list-group'>
        {todos.map((todo) => (
          <li key={todo.id} className='list-group-item'>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Container Component (Smart Component)
const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  return <TodoList todos={todos} loading={loading} />;
};

const GoodApproach = () => {
  return (
    <div>
      <TodoContainer />
      <small className='text-muted mt-2 d-block'>
        Benefits: Easy to test, reusable presentational component, clear separation of concerns
      </small>
    </div>
  );
};

export default ContainerPresentational;
