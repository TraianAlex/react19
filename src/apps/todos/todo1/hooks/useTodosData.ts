import useGeneralizedCrudMethods from "./useGeneralizedCrudMethods";

const useTodosData = () => {
  const url = "http://localhost:4000/api/todos";
  const errorNotificationFn = (error: any) => {
    console.log("Error From useTodosData", error);
  };

  const {
    data,
    error,
    loadingStatus,
    createRecord,
    updateRecord,
    deleteRecord,
    reFetch,
  } = useGeneralizedCrudMethods(url, errorNotificationFn);

  function createTodo(rec: any, callbackDone: () => void) {
    createRecord(rec, callbackDone);
  }

  function updateTodo(rec: any, callbackDone: () => void) {
    updateRecord(rec, callbackDone);
  }

  function deleteTodo(id: any, callbackDone: () => void) {
    deleteRecord(id, callbackDone);
  }

  return {
    todoList: data,
    loadingStatus,
    error, // TODO: remove this
    createTodo,
    updateTodo,
    deleteTodo,
    reFetch,
  };
};

export default useTodosData;
