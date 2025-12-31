import { useSyncExternalStore } from 'react';

export type State = Record<string, any>;
type Selector<TState, TResult = any> = (state: TState) => TResult;
export type Action = { type: string; value?: any };

type Store = {
  getState: () => State;
  setState: (newState: State) => void;
  subscribe: (onStoreChange: () => void) => () => void;
};

export const createStore = (initialState: State): Store => {
  let state = initialState;
  const listeners = new Set<() => void>();
  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    },
    subscribe: (onStoreChange: () => void) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
  };
};

// const useStore = <TResult = any>(
//   store: Store,
//   selector: Selector<State, TResult> = (state: State) => state as TResult
// ) => {
//   const { getState, subscribe } = store;
//   const [state, setState] = useState<TResult>(selector(getState()));

//   useEffect(
//     () => subscribe((state: State) => setState(selector(state))),
//     [selector, subscribe]
//   );

//   return state;
// };

export const useSelector = <T = any>(store: Store, item: string | number): T =>
  useStore<T>(store, (state) => state[item] as unknown as T);

/// Too many renders if you use in the same file with useSelector
// export const useStoreRaw = (store: Store) => {
//   const { getState, subscribe } = store;
//   const [state, setState] = useState(getState());

//   useEffect(() => subscribe(setState), [subscribe]);

//   return state;
// };

// React 18 only
// const useStore = (store, selector = (state) => state) =>
//   useSyncExternalStore(store.subscribe, () => selector(store.getState()));
const useStore = <TResult = any>(
  store: Store,
  selector: Selector<State, TResult> = (state: State) => state as TResult
) =>
  useSyncExternalStore(
    store.subscribe as (onStoreChange: () => void) => () => void,
    () => selector(store.getState())
  );

// export const useStoreRaw = (store) =>
//   useSyncExternalStore(store.subscribe, () => selector(store.getState()));
export const useStoreRaw = <TResult = any>(
  store: Pick<Store, 'subscribe' | 'getState'>,
  selector: Selector<State, TResult> = (state: State) => state as TResult
) =>
  useSyncExternalStore(
    store.subscribe as (onStoreChange: () => void) => () => void,
    () => selector(store.getState())
  );

/*************************** CONFIG *********************************
 * type your initial state
 * -------------------------------------
 * type TodosType = {
 *  todos: TodosState[]; (interface TodosState { id: string; text: string })
 *  count: number;
 *  user: string;
 *  list: string[];
 * };
 * -------------------------------------
 * create the initial state with default values
 * -------------------------------------
 * const initialState: TodosType = {
 *  todos: [],
 *  title: 'Dispatch',
 *  count: 0,
 *  user: '',
 *  list: [],
 * };
 * -------------------------------------
 * create the store
 * -------------------------------------
 * export const todoStore = createStore(initialState);
 *----------------------------------------
 **************************** USAGE ***************************
 *** WRITE ***
   const { getState, setState } = todoStore;
   setState({
      todos: [
        ...getState().todos,
        { id: Math.random().toString(), text: 'value' },
      ],
      count: getState().count + 1,
    });

  *** READ *** - recomended when a peace of state need to use - 
  * this will render only the component that consume this part of state
   const todos = useSelector(todoStore, 'todos');

  * OR - not recomended (not in the same time and in the same component with useSelector)
  * return the entire store - good for debugging or when all state need in the same file
  * the component will always render
   const { todos, count, user, list } = useStoreRaw(todoState);
*/
