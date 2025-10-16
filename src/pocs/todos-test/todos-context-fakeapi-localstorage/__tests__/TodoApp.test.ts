// // @ts-nocheck
// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import { TodoApp } from '../TodoApp';

// describe('<TodoApp />', () => {
//   it('Renders without crashing', () => {
//     const { getByText } = render(<TodoApp />);
//     expect(getByText('Todo App with Local Storage')).toBeInTheDocument();
//   });

//   describe('The default UI', () => {
//     it('Renders no default todo items', () => {
//       const { queryByText } = render(<TodoApp />);
//       expect(queryByText('clean the house')).toBeNull();
//     });

//     it('Has an input field', () => {
//       const { getByTestId } = render(<TodoApp />);
//       expect(getByTestId('todo-input')).toBeInTheDocument();
//     });

//     it('Has an save button', () => {
//       const { getByRole } = render(<TodoApp />);
//       expect(getByRole('submit').textContent).toBe('Save');
//     });
//   });

//   describe('Adding items', () => {
//     it('When the Save button is pressed, if the input field is empty, prevent item from being added', () => {
//       const { getByRole, getByTestId } = render(<TodoApp />);

//       const form = getByTestId('todo-form');
//       const input = getByTestId('todo-input');

//       userEvent.type(input, 'a');
//       fireEvent.click(getByRole('submit'));

//       expect(input).toBeRequired();
//       expect(form).toHaveFormValues({ title: 'a' });

//       const error = getByTestId('todo-error');
//       expect(error).toBeInTheDocument();
//       expect(error).toHaveTextContent('Please enter a todo!');
//     });

//     it('When the save button is pressed, if the input field has text, it creates a new todo item', () => {
//       const { getByRole, getByTestId, getByText } = render(<TodoApp />);

//       const event = { target: { value: 'buy milk' } };
//       fireEvent.change(getByTestId('todo-input'), event);
//       expect(getByTestId('todo-input').value).toBe('buy milk');
//       fireEvent.click(getByRole('submit'));

//       const event2 = { target: { value: 'Create more tests' } };
//       fireEvent.change(getByTestId('todo-input'), event2);
//       expect(getByTestId('todo-input').value).toBe('Create more tests');
//       fireEvent.click(getByRole('submit'));

//       expect(getByText('buy milk')).toBeInTheDocument();
//       expect(getByText('Create more tests')).toBeInTheDocument();
//     });
//   });

//   describe('Deleting items', () => {
//     it('When the delete button is pressed for the first todo item, it removes the entire item and the first toDoItem should be buy milk', () => {
//       const { queryAllByTestId } = render(<TodoApp />);

//       const todoText = queryAllByTestId('todo-text');
//       const deleteButtons = queryAllByTestId('delete-button');

//       expect(queryAllByTestId('todo-item').length).toBe(2);
//       fireEvent.click(deleteButtons[0]);

//       expect(queryAllByTestId('todo-item').length).toBe(1);
//       expect(todoText[0].textContent).toEqual('buy milk');
//     });

//     it('means that because the first toDoItem was deleted, the first toDoItem should now be buy milk', () => {
//       const { queryAllByTestId, queryByText } = render(<TodoApp />);

//       const deleteButtons = queryAllByTestId('delete-button');
//       fireEvent.click(deleteButtons[0]);
//       const todoText = queryByText('buy milk');

//       expect(todoText).toBeNull();
//     });
//   });
// });
