export function resolveEach(
  initialState: any,
  handlers: { [x: string]: (arg0: any, arg1: any) => any }
) {
  return function resolve(state = initialState, action: any) {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
}
