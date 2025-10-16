import * as actionTypes from './actionTypes';

export const updateTodo = (todo: any) => {
  return { type: actionTypes.UPDATE_TODO, todo };
};

export const createTodo = (todo: any) => {
  return { type: actionTypes.CREATE_TODO, todo };
};
