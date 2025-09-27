import { memo } from "react";

const ToDoItemText = ({ important, todoText }) => {
  return (
    <>
      {important ? (
        <span className="badge warning-bg">
          <i className="fa fa-exclamation-circle"></i>
        </span>
      ) : null}
      {todoText.slice(0, 60)}
    </>
  );
};

export default memo(ToDoItemText);
