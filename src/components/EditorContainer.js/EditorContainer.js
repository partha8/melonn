import React from "react";
import styles from "./editor-container.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNotesContext } from "../../context";

import { FaTags } from "react-icons/fa";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

const priorities = [
  { id: 1, name: "Low" },
  { id: 2, name: "Medium" },
  { id: 3, name: "High" },
];

export const EditorContainer = () => {
  const {
    notesState: { tags },
  } = useNotesContext();
  return (
    <div className={styles.editorContainer}>
      <div className={styles.titleContainer}>
        <AiTwotoneEdit />
        <input className={styles.title} />
      </div>
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
  );
};
