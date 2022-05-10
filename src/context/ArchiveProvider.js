import React, { createContext, useContext, useState } from "react";

import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  const archiveNote = (note, collectionPath) => {
    const docRef = doc(db, collectionPath, note.id);
    const colRef = collection(db, "archive");
    addDoc(colRef, {
      archived: true,
      body: note.body,
      color: note.color,
      createdAt: note.createdAt,
      pinned: note.pinned,
      tags: note.tags,
      title: note.title,
      trashed: false,
      updatedAt: note.updatedAt,
      archivedAt: serverTimestamp(),
      id: note.id,
    });
    deleteDoc(docRef);
  };

  const restoreNoteFromArchive = (note) => {
    const docRef = doc(db, "archive", note.id);
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

  const deleteFromArchive = (id) => {
    const docRef = doc(db, "archive", id);
    deleteDoc(docRef);
  };

  return (
    <ArchiveContext.Provider
      value={{
        archivedNotes,
        setArchivedNotes,
        archiveNote,
        restoreNoteFromArchive,
        deleteFromArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchiveContext = () => useContext(ArchiveContext);
