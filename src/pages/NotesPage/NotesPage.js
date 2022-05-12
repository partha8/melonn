import React from "react";
import { EditorContainer, Sidebar } from "../../components";
import styles from "./notes-page.module.css";

import { useNotesContext } from "../../context";

export const NotesPage = () => {
  const {
    notesState: { tags },
  } = useNotesContext();

  return (
    <div className={`page ${styles.notesPage}`}>
      <Sidebar />
      <EditorContainer />
    </div>
  );
};
