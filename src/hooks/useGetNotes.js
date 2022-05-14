import React, { useEffect } from "react";
import { useAppContext, useAuthContext, useNotesContext } from "../context";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetNotes = () => {
  const { notesDispatch } = useNotesContext();
  const { setLoading } = useAppContext();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "notes");
    const queryRef = query(
      colRef,
      where("pinned", "==", false),
      orderBy("updatedAt", "desc")
    );
    const unsub = onSnapshot(queryRef, (snapShot) => {
      let notes = [];
      notes = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      notesDispatch({
        type: "SET_NOTES",
        payload: notes.filter((note) => note.uid === currentUser.uid),
      });
      setLoading(false);
    });
    return () => unsub();
  }, []);
};
