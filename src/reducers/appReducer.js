export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "SET_TOAST": {
      return {
        ...state,
        toast: action.payload,
      };
    }
    default:
      throw new Error();
  }
};
