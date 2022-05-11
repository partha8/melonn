import { createContext, useContext, useReducer, useState } from "react";
// import { useNotes } from "./NotesProvider";
import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { editorReducer } from "../reducers";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  //   const { notes, selectNote, setSelectNote, tagOptions } = useNotes();

  const [editorState, editorDispatch] = useReducer(editorReducer, {
    body: "",
    title: "",
    tag: "",
    pinned: "",
    newTag: "",
    priority: "",
  });

  //   const handleChange = (event) => {
  //     useFirestore.collection("notes").doc(selectNote.id).update({
  //       tag: event.target.value,
  //     });
  //     setTag(event.target.value);
  //   };

  //   const handlePinned = () => {
  //     setPinned(!pinned);
  //     useFirestore.collection("notes").doc(selectNote.id).update({
  //       pinned: !pinned,
  //     });
  //   };

  //  const handleNewTag = () => {
  //     if(newTag){
  //       setNewTag("");

  //     useFirestore
  //       .collection("tags")
  //       .doc(tagOptions.id)
  //       .update({
  //         tags: [...tagOptions.data.tags, newTag],
  //       });
  //     }
  //   };

  return (
    <>
      <EditorContext.Provider
        value={{
          //   handleChange,
          //   handleNewTag,
          //   handlePinned,
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
