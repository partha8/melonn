import React, { createContext, useContext, useState } from "react";

import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";

const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const deleteNote = (note, collectionPath) => {
    const docRef = doc(db, collectionPath, note.id);
    const colRef = collection(db, "trash");
    addDoc(colRef, {
      archived: false,
      body: note.body,
      color: note.color,
      createdAt: note.createdAt,
      pinned: note.pinned,
      tags: note.tags,
      title: note.title,
      trashed: true,
      updatedAt: note.updatedAt,
      trashedAt: serverTimestamp(),
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
      tags: note.tags,
      title: note.title,
      trashed: false,
      updatedAt: note.updatedAt,
    });
    deleteDoc(docRef);
  };

  const deleteFromTrash = (id) => {
    const docRef = doc(db, "trash", id);
    deleteDoc(docRef);
  };

  return (
    <TrashContext.Provider
      value={{
        trashedNotes,
        setTrashedNotes,
        deleteNote,
        restoreNote,
        deleteFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};

export const useTrashContext = () => useContext(TrashContext);
