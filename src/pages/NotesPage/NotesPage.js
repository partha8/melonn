import React from "react";
import { Sidebar } from "../../components";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./notes-page.module.css";
import { FaTags } from "react-icons/fa";
import { MdOutlinePriorityHigh } from "react-icons/md";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { useNotesContext } from "../../context";

const priorities = [
  { id: 1, name: "High" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Low" },
];

export const NotesPage = () => {
  const {
    notesState: { tags },
  } = useNotesContext();

  return (
    <div className={`page ${styles.notesPage}`}>
      <Sidebar />
      <div className={styles.editorContainer}>
        <Editor
          // editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName wrapper"
          editorClassName="editorClassName editor"
          // onEditorStateChange={this.onEditorStateChange}
        />
        <section className={styles.editorUtils}>
          <div className={styles.tagsContainer}>
            <FaTags />
            <select className={styles.tags}>
              {tags?.map((tag) => {
                return (
                  <option key={tag.id} value={tag.tag}>
                    {tag.tag}
                  </option>
                );
              })}
            </select>
            <input placeholder="new tag" className={styles.tagInput} />
          </div>
          <div className={styles.priorityContainer}>
            <MdOutlinePriorityHigh /> <span>Priority</span>
            <select className={styles.priorities}>
              {priorities.map((priority) => {
                const Icon = priority.icon;
                return (
                  <>
                    <option>{priority.name}</option>
                  </>
                );
              })}
            </select>
          </div>
        </section>
      </div>
    </div>
  );
};
