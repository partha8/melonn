import React, { createContext, useContext, useState } from "react";

import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNotesContext } from "./NotesProvider";

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const {
    notesState: { selectedNoteID },
    notesDispatch,
  } = useNotesContext();

  const archiveNote = (note, collectionPath) => {
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
    const colRef = collection(db, "archive");
    addDoc(colRef, {
      archived: true,
      body: note.body,
      color: note.color,
      createdAt: note.createdAt,
      pinned: note.pinned,
      tag: note.tag,
      title: note.title,
      trashed: false,
      priority: note.priority,
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
      tag: note.tag,
      title: note.title,
      trashed: false,
      priority: note.priority,
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
