import React, { useEffect } from "react";
import { useArchiveContext, useAppContext } from "../context";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const useGetArchivedNotes = () => {
  const { setArchivedNotes } = useArchiveContext();
  const { setLoading } = useAppContext();

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "archive");
    const queryRef = query(colRef, orderBy("archivedAt", "desc"));
    const unsub = onSnapshot(queryRef, (snapShot) => {
      let notes = [];
      notes = snapShot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      setArchivedNotes(notes);
      setLoading(false);
    });
    return () => unsub();
  }, []);
};
