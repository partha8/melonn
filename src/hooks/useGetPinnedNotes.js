import { useEffect } from "react";
import { useAppContext, useAuthContext, useNotesContext } from "../context";
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
  const { setLoading } = useAppContext();
  const { currentUser } = useAuthContext();
  useEffect(() => {
    setLoading(true);
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

      notesDispatch({
        type: "SET_PINNED_NOTES",
        payload: pinnedNotes.filter((note) => note?.uid === currentUser?.uid),
      });
      setLoading(false);
    });
    return () => unsub();
  }, []);
};
