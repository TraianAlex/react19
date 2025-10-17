import useGeneralizedCrudMethods from '../../../../hooks/useGeneralizedCrudMethods';

const useTodosData = () => {
  const url = 'http://localhost:4000/api/todos';

  const errorNotificationFn = (error: any) => {
    console.log('Error From useTodosData', error);
  };

  const {
    data,
    loadingStatus,
    createRecord,
    updateRecord,
    deleteRecord,
    reFetch,
  } = useGeneralizedCrudMethods(url, errorNotificationFn);

  const createTodo = (rec: any, callbackDone: () => void) => {
    createRecord(rec, callbackDone);
  };

  const updateTodo = (rec: any, callbackDone: () => void) => {
    updateRecord(rec, callbackDone);
  };

  const deleteTodo = (id: any, callbackDone: () => void) => {
    deleteRecord(id, callbackDone);
  };

  return {
    // todoList: data,
    todoList:
      data?.sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0)) ||
      [],
    loadingStatus,
    createTodo,
    updateTodo,
    deleteTodo,
    reFetch,
  };
};

export default useTodosData;
