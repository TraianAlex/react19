export const loggedReducer = (state = false, action: { type: string }) => {
  switch (action.type) {
    case 'SIGN_IN':
      return !state;
    default:
      return state;
  }
};
