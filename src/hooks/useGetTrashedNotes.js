import React, { useEffect } from "react";
import { useTrashContext, useAppContext } from "../context";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetTrashedNotes = () => {
  const { setTrashedNotes } = useTrashContext();
  const { setLoading } = useAppContext();

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "trash");
    const queryRef = query(colRef, orderBy("trashedAt", "desc"));
    const unsub = onSnapshot(queryRef, (snapShot) => {
      let notes = [];
      notes = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      setTrashedNotes(notes);
      setLoading(false);
    });
    return () => unsub();
  }, []);
};
