import React, { useEffect } from "react";
import { useAppContext, useNotesContext } from "../context";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetNotes = () => {
  const { notesDispatch } = useNotesContext();
  const { appDispatch } = useAppContext();
  useEffect(() => {
    appDispatch({ type: "SET_LOADING", payload: true });
    const colRef = collection(db, "notes");
    const queryRef = query(colRef, orderBy("updatedAt", "desc"));
    onSnapshot(queryRef, (snapShot) => {
      let notes = [];
      notes = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      notesDispatch({ type: "SET_NOTES", payload: notes });
      appDispatch({ type: "SET_LOADING", payload: false });
    });
  }, []);
};
