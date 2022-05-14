import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { notesReducer } from "../reducers";
import { useAuthContext } from "./AuthProvider";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const navigate = useNavigate();
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    selectedNoteID: null,
    selectedNote: null,
    addingNote: false,
    pinnedNotes: [],
    tags: [],
  });
  const { currentUser } = useAuthContext();

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

  const newNoteHandler = async () => {
    const colRef = collection(db, "notes");
    await addDoc(colRef, {
      title: "Untitled",
      body: "",
      tag: "common",
      priority: {
        number: 1,
        name: "Low",
      },
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      pinned: false,
      archived: false,
      trashed: false,
      color: "#fff",
      uid: currentUser.uid,
    });
    navigate("/notes");
  };

  const handlePinnedNote = (id, pinStatus) => {
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      pinned: pinStatus,
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notesState,
        notesDispatch,
        updateNote,
        resetSelectedNote,
        newNoteHandler,
        handlePinnedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
