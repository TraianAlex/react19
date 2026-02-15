import {
  useRef,
  useActionState,
  useEffect,
  useOptimistic,
  useTransition,
} from 'react';
import toast from 'react-hot-toast';
import {
  useSelector,
  useStore,
  todoAddHandler,
  setCount,
  setCount2,
} from './actions';
import { sleep } from '../../../shared/utils/utils';
import { List } from './List';

const NewTodoForm = () => {
  // const [user] = useStore('user');
  const user = useSelector<string>((state) => state.user);
  const textInputRef = useRef<HTMLInputElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(todoAddHandler, {
    success: false,
    error: null,
    message: null,
  });
  const [list, setList] = useStore('list');
  const [isPendingList, startTransition] = useTransition();
  const [optimisticList, addOptimisticList] = useOptimistic(
    list,
    (state: string[], newList: string) => [...state, newList],
  );

  useEffect(() => {
    setList(() => ['initial list']);
  }, []);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      textInputRef.current?.focus();
      toast.success(state.message);
    }
    state.error = null;
    state.message = null;
  }, [state.error, state.success]);

  const createListHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const enteredText = formData.get('todo-list') as string;
      if (enteredText === '') {
        addOptimisticList('test ...');
        await sleep(1000);
        setList((p: string[]) => [...p, 'test']);
        return;
      }
      addOptimisticList(enteredText);
      await sleep(1000);
      setList((p: string[]) => [...p, enteredText]);
      form.reset();
      listInputRef.current?.focus();
    });
  };

  const handleClick1 = () => {
    setCount(1);
  };

  const handleClick2 = () => {
    setCount2(1);
  };

  console.log('render NewTodoForm');

  return (
    <>
      <List optimisticList={optimisticList} />
      <form onSubmit={createListHandler}>
        <div className='form-group d-flex align-items-center flex-1'>
          <label htmlFor='todo-text' className='form-label'>
            Todo {user}
          </label>
          <input
            type='text'
            name='todo-list'
            ref={listInputRef}
            className='form-control'
            placeholder='add something or just click Add To List button'
          />
          <button
            type='submit'
            className='btn btn-outline-primary ms-2'
            disabled={isPendingList}
          >
            ADD
          </button>
        </div>
      </form>
      <form action={formAction}>
        <div className='form-group d-flex align-items-center flex-1'>
          <label htmlFor='todo-text' className='form-label'>
            Todo {user}
          </label>
          <input
            type='text'
            name='todo-text'
            ref={textInputRef}
            className='form-control'
            placeholder='add something'
          />
          <button type='submit' className='btn btn-outline-primary ms-2'>
            ADD
          </button>
        </div>
        {state.error && (
          <div className='alert alert-danger mt-2' role='alert'>
            {state.error}
          </div>
        )}
      </form>
      <div>
        <button
          onClick={handleClick1}
          type='button'
          className='btn btn-outline-primary ms-2'
        >
          COUNT1
        </button>
        <button
          onClick={handleClick2}
          type='button'
          className='btn btn-outline-primary ms-2'
        >
          COUNT2
        </button>
      </div>
      {isPending && <p>Adding todo...</p>}
    </>
  );
};

export default NewTodoForm;
