import React, { useEffect } from "react";
import { useAppContext, useNotesContext, useTrashContext } from "../../context";
import { useGetTrashedNotes } from "../../hooks";
import styles from "./trash.module.css";
import { Card, Loading } from "../../components";

export const Trash = () => {
  const { trashedNotes, clearAll } = useTrashContext();
  const { loading } = useAppContext();
  const { resetSelectedNote } = useNotesContext();

  useGetTrashedNotes();

  useEffect(() => {
    resetSelectedNote();
  }, []);

  const dateStamp = new Date().toString().split(" ");
  const time = dateStamp[4].split(":");

  return (
    <div className="page">
      <section className="page-header">
        {time[0] < 12 ? <h5>Good Morning!</h5> : <h5>Good evening!</h5>}
        <h5>{`${dateStamp[0]}, ${dateStamp[1]} ${dateStamp[2]}, ${dateStamp[3]}`}</h5>
      </section>

      {loading ? (
        <div className="loading-component">
          <Loading />
        </div>
      ) : (
        <>
          {trashedNotes.length > 0 && (
            <section className="notesContainer">
              <div className={styles.trashAll}>
                <h5>Trash</h5>
                <h5 onClick={clearAll} className={styles.btn}>
                  Clear Trash
                </h5>
              </div>

              <div className="notes">
                {trashedNotes.map((note, index) => {
                  return <Card key={index} {...note} />;
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
