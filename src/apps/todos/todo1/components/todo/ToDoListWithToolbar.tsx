import ToDoFilterToolbar from './ToDoFilterToolbar';

interface ToDoListWithToolbarProps {
  displayStatus: string;
  setDisplayStatus: (status: string) => void;
  important: boolean;
  setImportant: (important: boolean) => void;
  setSearchText: (text: string) => void;
  startTransition: (callback: () => void) => void;
  isPending: boolean;
  children: React.ReactNode;
}

const ToDoListWithToolbar = ({
  displayStatus,
  setDisplayStatus,
  important,
  setImportant,
  setSearchText,
  startTransition,
  isPending,
  children,
}: ToDoListWithToolbarProps) => (
  <div>
    <ToDoFilterToolbar
      displayStatus={displayStatus}
      setDisplayStatus={setDisplayStatus}
      important={important}
      setImportant={setImportant}
      setSearchText={setSearchText}
      startTransition={startTransition}
      isPending={isPending}
    />
    {children}
  </div>
);

export default ToDoListWithToolbar;
