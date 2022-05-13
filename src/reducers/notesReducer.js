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
    case "SELECT_NOTE": {
      return {
        ...state,
        selectedNote: action.payload.note,
        selectedNoteID: action.payload.id,
      };
    }
    default:
      throw new Error();
  }
};
