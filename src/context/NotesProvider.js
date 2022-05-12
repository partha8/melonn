import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
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
    let priorityNumber = 0;
    if (priority === "Low") {
      priorityNumber = 1;
    } else if (priority === "Medium") {
      priorityNumber = 2;
    } else {
      priorityNumber = 3;
    }

    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      title: title,
      body: body,
      tag: tag,
      priority: {
        number: priorityNumber,
        name: priority,
      },
      updatedAt: serverTimestamp(),
    });
  };
  const resetSelectedNote = () => {
    notesDispatch({ type: "SELECT_NOTE", payload: { note: null, id: null } });
  };
  return (
    <NotesContext.Provider
      value={{ notesState, notesDispatch, updateNote, resetSelectedNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
