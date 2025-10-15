export const UPDATE_TODO = 'UPDATE_TODO';
export const CREATE_TODO = 'CREATE_TODO';

interface State {
  newTodo: string;
  todos: { title: string }[];
}

const initialState: State = {
  newTodo: '',
  todos: [{ title: 'Finish this project' }],
};

const reduce = (state: State, action: { type: any; todo: any }) => {
  switch (action.type) {
    case UPDATE_TODO:
      return {
        ...state,
        newTodo: action.todo,
      };
    case CREATE_TODO:
      return {
        newTodo: '',
        todos: state.todos.concat({ title: action.todo }),
      };
    default:
      return state;
  }
};

let state = initialState;
let store: {
  subscribe: (listener: any) => void;
  dispatch: (action: any) => any;
  getState: () => State;
} | null = null;

export const createStore = () => {
  if (store) {
    return store;
  }
  let listeners: any[] = [];

  store = {
    subscribe: (listener) => {
      listeners.push(listener);
    },
    dispatch: (action) => {
      state = reduce(state, action);
      listeners.forEach((l) => l());
      return action;
    },
    getState: () => state,
  };

  return store;
};

/************************************************
export const UPDATE_TODO = "UPDATE_TODO";
export const CREATE_TODO = "CREATE_TODO";

const initialState = {
  newTodo: "",
  todos: [{ title: "Finish this project" }],
};

function reduce(state, action) {
  switch (action.type) {
    case UPDATE_TODO:
      return {
        ...state,
        newTodo: action.todo,
      };
    case CREATE_TODO:
      return {
        newTodo: "",
        todos: state.todos.concat({ title: action.todo }),
      };
    default:
      return state;
  }
}

let state = initialState;
let store = null;

export default function createStore() {
  if (store) {
    return store;
  }
  let listeners = [];

  store = {
    subscribe: (listener) => {
      listeners.push(listener);
    },
    dispatch: (action) => {
      state = reduce(state, action);
      listeners.forEach((l) => l());
      return action;
    },
    getState: () => state,
  };

  return store;
}
 */
