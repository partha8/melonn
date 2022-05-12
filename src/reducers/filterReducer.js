export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL": {
      return {
        ...state,
        showModal: action.payload,
      };
    }
    case "SORT_BY_PRIORITY": {
      return {
        ...state,
        sortByPriority: action.payload,
      };
    }
    case "SORT_BY_DATE_CREATED": {
      return {
        ...state,
        sortByDateCreated: action.payload,
      };
    }
    case "SORT_BY_TAG": {
      return {
        ...state,
        sortByTag: action.payload,
      };
    }
    case "CLEAR_FILTERS": {
      return {
        ...state,
        sortByPriority: null,
        sortByDateCreated: null,
        sortByTag: [],
      };
    }
    default:
      throw new Error();
  }
};
