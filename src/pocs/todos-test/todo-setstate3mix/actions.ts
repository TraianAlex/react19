import { createStore, State } from "./store";
import { mockDelay } from "../../../shared/utils/utils";
import { initialState, TodoActionState, TodosState } from "./TodoStore";
import { uppercaseWords } from "./utils";

export const { setState, useSelector, useStore } = createStore(initialState);

setState('user', 'Alex');

export const setSubTitle = (text: string) => {
  setState('subTitle', uppercaseWords(text.slice(0, 20)));
};

export const todoAddHandler = async (
  prevState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> => {
  const text = formData.get("todo-text");
  if (text === "" || !text) {
    return {
      success: false,
      error: "Todo text is required",
      message: "",
    };
  }
  setState("todos", (p: State["todos"]) => [
    ...p,
    { id: Math.random().toString(), text: text as string },
  ]);
  setState("count1", (p: State["count1"]) => p + 1);
  return {
    success: true,
    error: null,
    message: "Todo added successfully",
  };
};

export const createList = (text: string) => {
  setState("list", (p: State["list"]) => [...p, text]);
};

export const todoDeleteHandler = (todoId: string) => {
  setState("todos", (p: State["todos"]) => [
    ...p.filter((todo: TodosState) => todo.id !== todoId),
  ]);
  setState("count1", (p: State["count1"]) => p - 1);
};

export const setCount = (nr: number) => {
  setState("count1", (p: State["count1"]) => p + nr);
};

export const setCount2 = (nr: number) => {
  setState("count2", (p: State["count2"]) => p + nr);
};

export const fetchPosts = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  await mockDelay(1000);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await response.json();
  setState("posts", posts);
  return posts;
};

// export const setRender = (value: boolean) => {
//   setState('render', (p: State['render']) => !value);
// }
