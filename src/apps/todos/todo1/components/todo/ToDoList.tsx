import { useContext } from 'react';

import ToDo from './ToDo';
import DragDropContextProvider, {
  DragDropToDoList,
} from '../../contexts/DragDropContextProvider';
import { ToDosDataContext } from '../../contexts/ToDosDataContext';

interface ToDoListProps {
  displayStatus: string;
  toDoList: any[];
  important: boolean;
  searchText: string;
  handleToggle: (id: any) => void;
  handleDelete: (id: any) => void;
  handleEdit: (todoItem: any) => void;
  idUpdating: any;
}

const ToDoList = ({
  displayStatus,
  toDoList,
  important,
  searchText,
  handleToggle,
  handleDelete,
  handleEdit,
  idUpdating,
}: ToDoListProps) => {
  const { updateTodo } = useContext(ToDosDataContext);

  // Derive filtered list directly from props - no local state needed
  const filteredList = toDoList
    .filter((todo) => {
      if (displayStatus === 'all') {
        return true;
      } else if (displayStatus === 'pending') {
        return todo.completed === false;
      } else if (displayStatus === 'completed') {
        return todo.completed === true;
      } else {
        return false;
      }
    })
    .filter((todo) => {
      if (important === true) {
        return todo.important === true;
      } else {
        return true;
      }
    })
    .filter((todo) => {
      if (searchText?.length > 0) {
        return todo.todoText
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      } else {
        return true;
      }
    });

  // Handle reordering by updating todos with new sequence values
  const handleItemsChange = (reorderedFullList: any) => {
    // Update each todo with its new sequence based on position
    reorderedFullList.forEach((todo: any, index: number) => {
      const newSequence = index + 1;
      if (todo.sequence !== newSequence) {
        updateTodo({ ...todo, sequence: newSequence }, () => {});
      }
    });
  };

  return (
    <div className='tasks'>
      <DragDropContextProvider
        items={filteredList}
        fullList={toDoList as any}
        onItemsChange={handleItemsChange}
      >
        <DragDropToDoList>
          <ToDo
            handleToggleCompleted={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            idUpdating={idUpdating}
          />
        </DragDropToDoList>
      </DragDropContextProvider>
    </div>
  );
  // return (
  //   <div className='tasks'>
  //     {toDoList
  //       .filter((todo) => {
  //         if (displayStatus === 'all') {
  //           return true;
  //         } else if (displayStatus === 'pending') {
  //           return todo.completed === false;
  //         } else if (displayStatus === 'completed') {
  //           return todo.completed === true;
  //         } else {
  //           return false; // should not be needed
  //         }
  //       })
  //       .filter((todo) => {
  //         if (important === true) {
  //           return todo.important === true;
  //         } else {
  //           return true;
  //         }
  //       })
  //       .filter((todo) => {
  //         if (searchText?.length > 0) {
  //           //for (let i = 0; i < 300000000; i++) { }
  //           return todo.todoText
  //             .toLocaleLowerCase()
  //             .includes(searchText.toLocaleLowerCase());
  //         } else {
  //           return true;
  //         }
  //       })
  //       .map((todo) => {
  //         return (
  //           <ToDo
  //             key={todo.id}
  //             todoItem={todo}
  //             handleToggleCompleted={handleToggle}
  //             handleDelete={handleDelete}
  //             handleEdit={handleEdit}
  //             idUpdating={idUpdating}
  //           />
  //         );
  //       })}
  //   </div>
  // );
};

export default ToDoList;
