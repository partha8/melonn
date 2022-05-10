import { useEffect } from "react";
import { useNotesContext } from "../context";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetTags = () => {
  const { notesDispatch } = useNotesContext();
  useEffect(() => {
    const colRef = collection(db, "tags");
    const queryRef = query(colRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(queryRef, (snapShot) => {
      let tags = [];
      tags = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      notesDispatch({ type: "SET_TAGS", payload: tags });
    });
    return () => unsub();
  }, []);
};
