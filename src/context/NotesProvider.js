import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useReducer } from "react";
import { db } from "../firebase.config";
import { notesReducer } from "../reducers";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    selectedNoteID: null,
    selectedNote: null,
    addingNote: false,
    pinnedNotes: [],
    tags: [],
  });

  const updateNote = (title, body, tag, priority, id) => {
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      title: title,
      body: body,
      tag: tag,
      priority: priority,
    });
  };
  return (
    <NotesContext.Provider value={{ notesState, notesDispatch, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
