import { createContext, useContext, useReducer, useState } from "react";
import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { editorReducer } from "../reducers";
import { useAuthContext } from "./AuthProvider";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [editorState, editorDispatch] = useReducer(editorReducer, {
    body: "",
    title: "",
    tag: "",
    pinned: "",
    newTag: "",
    priority: "",
  });

  const { currentUser } = useAuthContext();

  const handleNewTag = (newTag) => {
    const colRef = collection(db, "tags");
    addDoc(colRef, {
      createdAt: serverTimestamp(),
      tag: newTag,
      uid: currentUser.uid,
    });
    editorDispatch({ type: "SET_TAG", payload: newTag });
  };

  return (
    <>
      <EditorContext.Provider
        value={{
          handleNewTag,
          editorState,
          editorDispatch,
        }}
      >
        {children}
      </EditorContext.Provider>
    </>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
