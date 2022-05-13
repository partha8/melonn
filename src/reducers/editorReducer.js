export const editorReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_EDITOR_STATE": {
      const { title, body, tag, priority } = action.payload;
      return {
        ...state,
        title: title,
        body: body,
        tag: tag,
        priority: priority,
      };
    }
    case "SET_TITLE": {
      return {
        ...state,
        title: action.payload,
      };
    }
    case "SET_BODY": {
      return {
        ...state,
        body: action.payload,
      };
    }
    case "SET_TAG": {
      return {
        ...state,
        tag: action.payload,
      };
    }
    case "SET_PRIORITY": {
      return {
        ...state,
        priority: action.payload,
      };
    }
    default:
      throw new Error();
  }
};
