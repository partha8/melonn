export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES": {
      return {
        ...state,
        notes: action.payload,
      };
    }
    case "SET_PINNED_NOTES": {
      return {
        ...state,
        pinnedNotes: action.payload,
      };
    }
    default:
      throw new Error();
  }
};
