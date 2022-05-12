import React, { createContext, useContext, useReducer } from "react";
import { notesReducer } from "../reducers";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    selectedNoteIndex: null,
    selectedNote: null,
    addingNote: false,
    pinnedNotes: [],
    tags: [],
  });
  return (
    <NotesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
