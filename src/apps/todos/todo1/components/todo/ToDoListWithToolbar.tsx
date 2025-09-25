import ToDoFilterToolbar from "./ToDoFilterToolbar";

const ToDoListWithToolbar = ({
  displayStatus,
  setDisplayStatus,
  important,
  setImportant,
  searchText,
  setSearchText,
  startTransition,
  isPending,
  children,
}: {
  displayStatus: string;
  setDisplayStatus: (status: string) => void;
  important: boolean;
  setImportant: (important: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  startTransition: (callback: () => void) => void;
  isPending: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <ToDoFilterToolbar
      displayStatus={displayStatus}
      setDisplayStatus={setDisplayStatus}
      important={important}
      setImportant={setImportant}
      searchText={searchText}
      setSearchText={setSearchText}
      startTransition={startTransition}
      isPending={isPending}
    />
    {children}
  </div>
);
export default ToDoListWithToolbar;
