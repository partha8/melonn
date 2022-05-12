export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES": {
      return {
        ...state,
        notes: [...action.payload],
      };
    }
    case "SET_PINNED_NOTES": {
      return {
        ...state,
        pinnedNotes: [...action.payload],
      };
    }
    case "SET_TAGS": {
      return {
        ...state,
        tags: [...action.payload],
      };
    }
    default:
      throw new Error();
  }
};
