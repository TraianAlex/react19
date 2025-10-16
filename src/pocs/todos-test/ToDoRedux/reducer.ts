// import { resolveEach } from './reduxResolver'; // there is a package redux-resolver
import { resolveEach } from 'redux-resolver';
import { fromJS, Map } from 'immutable';
import * as actionTypes from './actionTypes';

const initialState = fromJS({
  newTodo: '',
  todos: [{ title: 'Finish this project' }],
});

const updateTodo = (
  state: { set: (arg0: string, arg1: any) => any },
  action: { todo: any }
) => {
  return state.set('newTodo', action.todo);
};

const createTodo = (
  state: {
    merge: (arg0: { newTodo: string; todos: any[] }) => any;
    get: (arg0: string) => any;
  },
  action: { todo: any }
) => {
  return state.merge({
    newTodo: '',
    todos: state.get('todos').push(Map({ title: action.todo })),
  });
};

export default resolveEach(initialState, {
  [actionTypes.UPDATE_TODO]: updateTodo,
  [actionTypes.CREATE_TODO]: createTodo,
});

// export default function reducer(state = initialState, action) {
//   switch(action.type) {
//     case actionTypes.UPDATE_TODO:
//       return {
//         ...state,
//         newTodo: action.todo
//       }
//     case actionTypes.CREATE_TODO:
//       return {
//         newTodo: '',
//         todos: state.todos.concat({title: action.todo})
//       }
//     default:
//       return state;
//   }
// }
