import { useContext, useState } from 'react';

import { ToDosDataContext } from '../../contexts/ToDosDataContext';
import ToDoEditForm from './ToDoEditForm';
import ToDoList from './ToDoList';
import ToDoAddForm from './ToDoAddForm';

const ToDoManager = ({
  displayStatus,
  important,
  searchText,
}: {
  displayStatus: string;
  important: boolean;
  searchText: string;
}) => {
  const { todoList, updateTodo, createTodo, deleteTodo } =
    useContext(ToDosDataContext);

  const [todoRecord, setTodoRecord] = useState({
    id: 0,
    todoText: '',
    completed: false,
    important: false,
  });
  const [idUpdating, setIdUpdating] = useState(0);
  const [addOrEdit, setAddOrEdit] = useState('add'); // "add" or "edit"

  const handleToggle = (id: any) => {
    const rec = todoList.find((rec) => rec.id === id);
    const recUpdated = {
      ...rec,
      completed: !rec.completed,
    };
    setIdUpdating(rec.id);
    updateTodo(recUpdated, () => {
      setIdUpdating(0);
    });
  };

  const handleDelete = (id: any) => {
    deleteTodo(id, () => {});
  };

  const handleUpdate = () => {
    setIdUpdating(todoRecord.id as any);
    setAddOrEdit('add');
    updateTodo(todoRecord, () => {
      setIdUpdating(0);
    });
  };

  const handleEdit = (todoItem: any) => {
    setAddOrEdit('edit');
    setTodoRecord(todoItem);
  };

  const add = (todoText: string) => {
    createTodo(
      {
        todoText: todoText,
        completed: false,
        important: false,
      },
      () => {}
    );
  };

  if (!todoList) {
    return <div className='loading-state-canvas'>Loading...</div>;
  }

  return (
    <>
      <div className='form p-3'>
        <ToDoAddForm visible={addOrEdit === 'add'} add={add} />
        <ToDoEditForm
          visible={addOrEdit === 'edit'}
          update={handleUpdate}
          todoRecord={todoRecord}
          setTodoRecord={setTodoRecord}
          setAddOrEdit={setAddOrEdit}
        />
      </div>
      <ToDoList
        displayStatus={displayStatus}
        important={important}
        searchText={searchText}
        toDoList={todoList}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        idUpdating={idUpdating}
      />
    </>
  );
};
export default ToDoManager;
