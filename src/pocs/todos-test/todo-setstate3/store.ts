import { useState, useEffect, SetStateAction, useCallback } from 'react';

export type State = Record<string, any>;
type StateKeys = keyof State;
type Selector<State, Selected> = (state: State) => Selected;

const isFunction = (fn: unknown): fn is Function => typeof fn === 'function';

const updateValue = <Value>(oldValue: Value, newValue: SetStateAction<Value>) =>
  isFunction(newValue) ? newValue(oldValue) : newValue;

export const createStore = (initialState: State) => {
  let state = initialState;
  const listeners = new Set<(state: State) => void>();

  const getState = () => state;

  const setState = <StateKey extends StateKeys>(
    stateKey: StateKey,
    update: SetStateAction<State[StateKey]>,
  ) => {
    state = {
      ...state,
      [stateKey]: updateValue(state[stateKey], update),
    } as Pick<State, StateKey> as Partial<State>;

    listeners.forEach((listener: any) => listener(getState()));
  };

  const subscribe = (listener: (state: State) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const useSelector = <Selected,>(
    selector: Selector<State, Selected> = (state: State) =>
      state as unknown as Selected
  ) => {
    const [state, setState] = useState(selector(getState()));

    useEffect(() => {
      const unsubscribe = subscribe((state: State) => setState(selector(state)));
      return unsubscribe;
    }, [selector]);

    return state;
  };

  const useStore = <StateKey extends StateKeys>(stateKey: StateKey) => {
    const selector = useCallback((state: State) => state[stateKey], [stateKey]);
    const partialState = useSelector(selector);
    const updater = useCallback(
      (u: SetStateAction<State[StateKey]>) => setState(stateKey, u),
      [stateKey],
    );

    return [partialState, updater] as const;
  };

  return { setState, useSelector, useStore };
};

/*************************** CONFIG *********************************
 * type your initial state
 * -------------------------------------
 * type TodosType = {
 *  todos: TodosState[]; (interface TodosState { id: string; text: string })
 *  count: number;
 *  list: string[];
 * };
 * -------------------------------------
 * create the initial state with default values
 * -------------------------------------
 * const initialState: TodosType = {
 *  todos: [],
 *  count: 0,
 *  list: [],
 * };
 * -------------------------------------
 * create the store
 * -------------------------------------
 * export const { setState, useSelector, useStore} = createStore(initialState);
 *----------------------------------------
 **************************** USAGE ***************************
 *** SET OUTSIDE COMPONENT ***
  setState('todos', (prev: any) => [
    ...prev,
    { id: Math.random().toString(), text: text },
  ]);
  setState('count', (prev: any) => prev + 1);

  export { useSelector, useStore};

  *** GET and SET ***
  * this will render only the component that consume this part of state
   const [todos] = useStore('todos'); or const todos = useSelector(state => state.todos);
   const count = useStore('count);

  ** get and set like useState, use in component
   const [list, setList] = useStore('list');
   setList((prev: State['list']) => [...prev, 'initial list']);
   return <div>{list.map(item, index) => (<div key={1ndex}>{item}</div>))}</div>
*/

// React 18 only
// const useStore = (store, selector = (state) => state) =>
//   useSyncExternalStore(store.subscribe, () => selector(store.getState()));

// export const useStoreRaw = (store) =>
//   useSyncExternalStore(store.subscribe, () => selector(store.getState()));
