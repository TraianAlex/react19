import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

// ---------------------------------------------
// Constants
// ---------------------------------------------
export const animationMs = 600; // unified animation duration (ms)
export const itemGap = 6; // space between items (px)

// ---------------------------------------------
// Context
// ---------------------------------------------
const DragDropContext = createContext<any>(undefined);

// ---------------------------------------------
// Provider
// ---------------------------------------------
export default function DragDropContextProvider({
  children,
  items,
  onItemsChange,
  fullList = null,
}: {
  children: React.ReactNode;
  items: any[];
  onItemsChange: (items: any[]) => void;
  fullList?: any[] | null;
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [pendingReorder, setPendingReorder] = useState<{
    items: any;
    droppedId: any;
    dropTargetId: any;
    originalItems: any;
    dropPosition: { x: number; y: number };
    dragOffset: { x: number; y: number } | null;
  } | null>(null);
  const [dropPosition, setDropPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null
  );

  // Refs to track timeouts for cleanup
  const dropTimeoutRef = useRef<number | null>(null);
  const dragEndTimeoutRef = useRef<number | null>(null);

  function handleDragStart(
    e: {
      dataTransfer: { effectAllowed: string };
      currentTarget: any;
      clientX: number;
      clientY: number;
    },
    item: SetStateAction<null>
  ) {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';

    // Store the offset of where the user clicked within the element
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
  }

  function handleDragOver(e: {
    preventDefault: () => void;
    dataTransfer: { dropEffect: string };
  }) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnter(
    e: { preventDefault: () => void },
    item: SetStateAction<null>
  ) {
    e.preventDefault();
    setDraggedOverItem(item);
  }

  function handleDragLeave(e: { preventDefault: () => void; target: any }) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('list-item')) {
      setDraggedOverItem(null);
    }
  }

  function handleDrop(
    e: {
      preventDefault: () => void;
      clientX: number;
      clientY: number;
      dataTransfer: { effectAllowed: string };
      currentTarget: any;
      target: any;
    },
    dropItem: { id: any }
  ) {
    e.preventDefault();

    if (!draggedItem || (draggedItem as any).id === (dropItem as any).id) {
      return;
    }

    // Get the exact drop position
    const dropX = e.clientX;
    const dropY = e.clientY;
    setDropPosition({ x: dropX, y: dropY });

    const draggedIndex = items.findIndex(
      (item: { id: any }) => item.id === (draggedItem as any).id
    );
    const dropIndex = items.findIndex(
      (item: { id: any }) => item.id === (dropItem as any).id
    );

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    // If we have a fullList, update the order in it
    let updatedFullList: any[] | null = null;
    if (fullList && typeof onItemsChange === 'function') {
      // Create a map of the new order from filtered items
      const orderMap = new Map();
      newItems.forEach((item, index) => {
        orderMap.set(item.id, index);
      });

      // Sort the full list based on the new order of filtered items
      updatedFullList = [...fullList];
      updatedFullList.sort((a, b) => {
        const aIndex = orderMap.get(a.id);
        const bIndex = orderMap.get(b.id);

        // If both items are in the reordered list, use their new order
        if (aIndex !== undefined && bIndex !== undefined) {
          return aIndex - bIndex;
        }

        // If only one item is in the reordered list, keep relative positions
        if (aIndex !== undefined) return -1;
        if (bIndex !== undefined) return 1;

        // If neither item is in the reordered list, maintain original order
        // return (fullList as any[]).indexOf(a) - (fullList as any[]).indexOf(b);
        return (a.sequence || 0) - (b.sequence || 0);
      });
    }

    // Set pending reorder with original items and drop target ID for reference
    setPendingReorder({
      items: newItems,
      droppedId: (draggedItem as any).id,
      dropTargetId: dropItem.id,
      originalItems: items,
      dropPosition: { x: dropX, y: dropY },
      dragOffset: dragOffset,
    });

    // Clear any existing timeout
    if (dropTimeoutRef.current) {
      clearTimeout(dropTimeoutRef.current);
    }

    // Execute reorder after the unified animation duration
    dropTimeoutRef.current = setTimeout(() => {
      onItemsChange(updatedFullList || newItems);
      setPendingReorder(null);
      setDropPosition(null);
      setDragOffset(null);
      dropTimeoutRef.current = null;
    }, animationMs);

    setDraggedItem(null);
    setDraggedOverItem(null);
  }

  function handleDragEnd(e: {
    preventDefault: () => void;
    clientX: any;
    clientY: any;
  }) {
    e.preventDefault();

    // If no successful drop occurred, we might want to animate back
    if (draggedItem && !pendingReorder) {
      // Get current mouse position as the end position
      const endX = e.clientX;
      const endY = e.clientY;
      setDropPosition({ x: endX, y: endY });

      // Clear any existing timeout
      if (dragEndTimeoutRef.current) {
        clearTimeout(dragEndTimeoutRef.current);
      }

      // Clear states after a short delay
      dragEndTimeoutRef.current = setTimeout(() => {
        setDraggedItem(null);
        setDraggedOverItem(null);
        setDropPosition(null);
        setDragOffset(null);
        dragEndTimeoutRef.current = null;
      }, 100);
    } else {
      setDraggedItem(null);
      setDraggedOverItem(null);
      setDragOffset(null);
    }
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (dropTimeoutRef.current) {
        clearTimeout(dropTimeoutRef.current);
      }
      if (dragEndTimeoutRef.current) {
        clearTimeout(dragEndTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DragDropContext.Provider
      value={{
        items,
        draggedItem,
        draggedOverItem,
        pendingReorder,
        dropPosition,
        dragOffset,
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

// ---------------------------------------------
// Hook
// ---------------------------------------------
export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

// ---------------------------------------------
// DraggableToDo Component - Wrapper for ToDo items with drag functionality
// ---------------------------------------------
export function DraggableToDo({
  todo,
  index,
  children,
}: {
  todo: any;
  index: number;
  children: React.ReactNode;
}) {
  const {
    draggedItem,
    draggedOverItem,
    pendingReorder,
    dropPosition,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragDrop();

  const itemRef = useRef(null);
  const [animationName, setAnimationName] = useState(null);
  const [droppedItemAnimation, setDroppedItemAnimation] = useState(null);

  useLayoutEffect(() => {
    if (!pendingReorder || !itemRef.current) {
      return;
    }

    const isDroppedItem = pendingReorder.droppedId === todo.id;
    const isDropTarget = pendingReorder.dropTargetId === todo.id;

    // Handle animation for the dropped item
    if (isDroppedItem && pendingReorder.dropPosition) {
      const element = itemRef.current;
      const finalRect = (element as any).getBoundingClientRect();

      // Calculate where the element should animate from
      // The drop position is where the mouse was, but we need to account for the drag offset
      const dragOffset = pendingReorder.dragOffset || { x: 0, y: 0 };
      const startX = pendingReorder.dropPosition.x - dragOffset.x;
      const startY = pendingReorder.dropPosition.y - dragOffset.y;

      // Calculate the translation needed to get from final position to start position
      const deltaX = startX - finalRect.left;
      const deltaY = startY - finalRect.top;

      const uniqueAnimationName = `animate-dropped-${todo.id}-${Date.now()}`;

      const keyframes = `
        @keyframes ${uniqueAnimationName} {
          0% {
            transform: translate(${deltaX}px, ${deltaY}px);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = keyframes;
      document.head.appendChild(styleElement);

      setDroppedItemAnimation(uniqueAnimationName as any);

      const timeoutId = setTimeout(() => {
        setDroppedItemAnimation(null);
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      }, animationMs);

      return () => {
        clearTimeout(timeoutId);
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }

    // Calculate position animation for all other items that need to move
    const previousIndex = pendingReorder.originalItems.findIndex(
      (i: { id: any }) => i.id === todo.id
    );
    const currentIndex = index;
    const indexDiff = previousIndex - currentIndex;

    if (indexDiff !== 0) {
      const itemHeight = (itemRef.current as any).offsetHeight;
      const totalHeight = itemHeight + itemGap;
      const translateDistance = indexDiff * totalHeight;

      const uniqueAnimationName = `animate-${todo.id}-${Date.now()}`;

      const keyframes = `
        @keyframes ${uniqueAnimationName} {
          0% {
            transform: translateY(${translateDistance}px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = keyframes;
      document.head.appendChild(styleElement);

      setAnimationName(uniqueAnimationName as any);

      const timeoutId = setTimeout(() => {
        setAnimationName(null);
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      }, animationMs);

      return () => {
        clearTimeout(timeoutId);
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, [pendingReorder, todo.id, index]);

  const isDragging = draggedItem?.id === todo.id;
  const isDraggedOver = draggedOverItem?.id === todo.id;
  const isPending = pendingReorder !== null;
  const isDropTarget = pendingReorder?.dropTargetId === todo.id;
  const isDroppedItem = pendingReorder?.droppedId === todo.id;

  // Determine z-index during animation
  let zIndex = 1; // default z-index
  if (isPending) {
    if (isDropTarget) {
      zIndex = 0; // drop target goes behind
    } else if (isDroppedItem) {
      zIndex = 10; // dropped item goes on top
    }
  }

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={(e) => handleDragStart(e, todo)}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, todo)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, todo)}
      onDragEnd={handleDragEnd}
      style={{
        cursor: 'move',
        position: 'relative',
        zIndex,
        marginBottom: `${itemGap}px`,
        ...(animationName
          ? {
              animation: `${animationName} ${animationMs}ms ease-out forwards`,
            }
          : {}),
        ...(droppedItemAnimation
          ? {
              animation: `${droppedItemAnimation} ${animationMs}ms ease-out forwards`,
            }
          : {}),
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`list-item ${isDraggedOver ? 'dragged-over' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------
// DragDropToDoList Component - Renders draggable todo items
// ---------------------------------------------
export function DragDropToDoList({ children }: { children: React.ReactNode }) {
  const { pendingReorder, items } = useDragDrop();
  const displayTodos = pendingReorder ? pendingReorder.items : items;

  return (
    <>
      {displayTodos.map((todo: any, index: number) => (
        <DraggableToDo key={todo.id} todo={todo} index={index}>
          {React.Children.map(
            children as React.ReactElement<any>[],
            (child: React.ReactElement<any> | undefined) =>
              child &&
              React.cloneElement(child, {
                todoItem: { ...todo, sequence: index + 1 },
              })
          )}
        </DraggableToDo>
      ))}
    </>
  );
}
