// // @ts-nocheck
// import { render } from '../test-util';
// import { TodoItem } from '../useLocalStorage/TodoItem';

// describe('<ToDoItem/>', () => {
//   const item = { title: 'Clean the pot' };

//   it('Renders without crashing', () => {
//     const todo = render(<TodoItem todo={item} />);
//     expect(todo.getByText(/clean the pot/i)).toBeInTheDocument();
//   });

//   it('Renders the text from the prop', () => {
//     const { getByTestId } = render(<TodoItem todo={item} />);
//     expect(getByTestId('todo-text').textContent).toBe(item.title);
//   });

//   it('Renders a delete button', () => {
//     const { getByTestId } = render(<TodoItem todo={item} />);
//     expect(getByTestId('delete-button')).toBeInTheDocument();
//   });
// });
