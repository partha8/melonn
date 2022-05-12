import React, { useState } from "react";
import styles from "./editor-container.module.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

      <CKEditor
        editor={ClassicEditor}
        // data="<p>Hello from CKEditor 5!</p>"
        placeholder="Type your content here"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
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
              return <option key={priority.id}>{priority.name}</option>;
            })}
          </select>
        </div>
      </section>
    </div>
  );
};
