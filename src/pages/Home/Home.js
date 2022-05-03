import React from "react";
import { Card } from "../../components";
import { useNotesContext } from "../../context";
import styles from "./home.module.css";

export const Home = () => {
  const {
    notesState: { notes, pinnedNotes },
  } = useNotesContext();

  const dateStamp = new Date().toString().split(" ");
  const time = dateStamp[4].split(":");
  console.log(notes);

  return (
    <div className="page">
      <section className={styles.header}>
        {time[0] < 12 ? <h5>Good Morning!</h5> : <h5>Good evening!</h5>}
        <h5>{`${dateStamp[0]}, ${dateStamp[1]} ${dateStamp[2]}, ${dateStamp[3]}`}</h5>
      </section>

      {pinnedNotes.length ? (
        <section className={styles.notesContainer}>
          <div className={styles.pinnedNotes}>
            <h4>Pinned Notes</h4>
            {pinnedNotes.map((note) => {
              const { id } = note;
              return <Card key={id} {...note} />;
            })}
          </div>
          <div className={styles.otherNotes}>
            <h4>Other notes</h4>
            {notes.map((note) => {
              const { id } = note;
              return <Card key={id} {...note} />;
            })}
          </div>
        </section>
      ) : (
        <section className={styles.notesContainer}>
          <div className={styles.otherNotes}>
            {notes.map((note) => {
              const { id } = note;
              return <Card key={id} {...note} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
};
