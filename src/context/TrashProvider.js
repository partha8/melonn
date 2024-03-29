import React, { createContext, useContext, useState } from "react";

import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNotesContext } from "./NotesProvider";
import { useAuthContext } from "./AuthProvider";

const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const {
    notesState: { selectedNoteID },
    notesDispatch,
  } = useNotesContext();
  const { currentUser } = useAuthContext();

  const deleteNote = (note, collectionPath) => {
    if (note.id === selectedNoteID) {
      notesDispatch({
        type: "SELECT_NOTE",
        payload: {
          selectedNote: null,
          selectedNoteID: null,
        },
      });
    }

    const docRef = doc(db, collectionPath, note.id);
    const colRef = collection(db, "trash");
    addDoc(colRef, {
      archived: false,
      body: note.body,
      color: note.color,
      createdAt: note.createdAt,
      pinned: note.pinned,
      tag: note.tag,
      title: note.title,
      trashed: true,
      priority: note.priority,
      updatedAt: note.updatedAt,
      trashedAt: serverTimestamp(),
      uid: note.uid,
      id: note.id,
    });
    deleteDoc(docRef);
  };

  const restoreNote = (note) => {
    const docRef = doc(db, "trash", note.id);
    const colRef = collection(db, "notes");
    addDoc(colRef, {
      archived: false,
      body: note.body,
      color: note.color,
      createdAt: note.createdAt,
      pinned: note.pinned,
      tag: note.tag,
      title: note.title,
      priority: note.priority,
      trashed: false,
      uid: note.uid,
      updatedAt: note.updatedAt,
    });
    deleteDoc(docRef);
  };

  const deleteFromTrash = (id) => {
    const docRef = doc(db, "trash", id);
    deleteDoc(docRef);
  };

  const clearAll = async () => {
    const q = query(
      collection(db, "trash"),
      where("uid", "==", currentUser.uid)
    );
    const docsSnapshot = await getDocs(q);
    for await (const note of docsSnapshot.docs) {
      deleteFromTrash(note.id);
    }
  };

  return (
    <TrashContext.Provider
      value={{
        trashedNotes,
        setTrashedNotes,
        deleteNote,
        restoreNote,
        deleteFromTrash,
        clearAll,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

export const useTrashContext = () => useContext(TrashContext);
