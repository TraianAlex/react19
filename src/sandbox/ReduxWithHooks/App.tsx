import { useSelector, useDispatch, Provider } from 'react-redux';

import { increment, decrement, signIn } from './actions';
import { store } from './store';

const IncrementReduxHooks = () => {
  const counter = useSelector((state: any) => state.counter);
  const isLogged = useSelector((state: any) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button
        className='btn btn-primary me-1'
        onClick={() => dispatch(increment(5))}
      >
        +
      </button>
      <button
        className='btn btn-danger me-1'
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button className='btn btn-success' onClick={() => dispatch(signIn())}>
        {isLogged ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default () => (
  <Provider store={store}>
    <IncrementReduxHooks />
  </Provider>
);

// import { increment, decrement } from './actions/actions';
// import { store } from './store';

// componentDidMount() {
//   store.subscribe(() => console.log(store.getState()));
//   store.dispatch(increment());
//   store.dispatch(decrement());
// }
