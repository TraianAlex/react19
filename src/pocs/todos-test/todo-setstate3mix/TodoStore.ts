/* CONFIG */
export interface TodosState {
  id: string;
  text: string;
}

type TodosType = {
  todos: TodosState[];
  title: string;
  subTitle: string;
  count1: number;
  count2: number;
  user: string;
  list: string[];
  render: boolean;
  posts: any[];
};

export const initialState: TodosType = {
  todos: [],
  title: 'SetState3',
  subTitle: '',
  count1: 0,
  count2: 0,
  user: '',
  list: [],
  render: false,
  posts: [],
};

export interface TodoActionState {
  success: boolean;
  error: string | null;
  message: string | null;
}
