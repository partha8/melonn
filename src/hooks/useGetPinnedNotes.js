import { useEffect } from "react";
import { useAppContext, useNotesContext } from "../context";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetPinnedNotes = () => {
  const { notesDispatch } = useNotesContext();
  const { appDispatch } = useAppContext();
  useEffect(() => {
    appDispatch({ type: "SET_LOADING", payload: true });
    const colRef = collection(db, "notes");
    const queryRef = query(
      colRef,
      where("pinned", "==", true),
      orderBy("updatedAt", "desc")
    );
    const unsub = onSnapshot(queryRef, (snapShot) => {
      let pinnedNotes = [];
      pinnedNotes = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      notesDispatch({ type: "SET_PINNED_NOTES", payload: pinnedNotes });
      appDispatch({ type: "SET_LOADING", payload: false });
    });
    return () => unsub();
  }, []);
};
