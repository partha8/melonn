export const trashReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRASHED_NOTES": {
      return {
        ...state,
        trashedNotes: action.payload,
      };
    }
    default:
      throw new Error();
  }
};
