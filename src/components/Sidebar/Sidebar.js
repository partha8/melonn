import React from "react";
import { useNotesContext } from "../../context";
import { Card } from "../Card/Card";
import styles from "./sidebar.module.css";
import { MdStickyNote2 } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { useFilteredNotes } from "../../hooks/useFilteredNotes";
import { FilterModal } from "../FilterModal/FilterModal";

export const Sidebar = () => {
  const {
    notesState: { notes, pinnedNotes },
  } = useNotesContext();

  const { newPinnedNotes, newNotes } = useFilteredNotes(pinnedNotes, notes);

  return (
    <section className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h4>
          <MdStickyNote2 /> Notes
        </h4>
        <div className={styles.filterContainer}>
          <p>{notes.length + pinnedNotes.length} notes</p>
          <FilterModal />
        </div>
      </div>
      {newPinnedNotes?.map((pinnedNote) => {
        return <Card key={pinnedNote.id} {...pinnedNote} />;
      })}
      {newNotes?.map((note) => {
        return <Card key={note.id} {...note} />;
      })}
    </section>
  );
};
