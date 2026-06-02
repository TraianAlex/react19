import { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useTodo } from './useTodo';
import { TodoProvider, type TodoItem } from './TodoContext';

const TodoApp = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const renderTodoItem = (todo: TodoItem) => (
    <Card key={todo.id} className="mb-3 shadow-sm">
      <Card.Body
        className={`d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light opacity-75' : ''}`}
      >
        <div
          className="flex-grow-1"
          onClick={() => toggleTodo(todo.id)}
          style={{ cursor: 'pointer' }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            onClick={() => toggleTodo(todo.id)}
            className="me-3"
          />
          {todo.text}
        </div>
        <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)} className="ms-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 mb-5">
        <h2 className="card-title mb-4 text-primary">React Hooks + Context ToDo Demo</h2>
        <Form onSubmit={handleSubmit} className="d-flex mb-4">
          <Form.Control
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="me-2"
          />
          <Button variant="primary" type="submit">
            Add Todo
          </Button>
        </Form>
        <div className="todo-list-container">
          {todos.length === 0 ? (
            <p className="text-muted mt-3">You have no tasks! Add one above to get started.</p>
          ) : (
            todos.map(renderTodoItem)
          )}
        </div>
      </Card>
    </Container>
  );
};

const Test2 = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);

export default Test2;
