import React, { useEffect, useState } from "react";
import styles from "./editor-container.module.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useEditorContext, useNotesContext } from "../../context";

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
    notesState: { tags, selectedNote, selectedNoteID },
    updateNote,
  } = useNotesContext();

  const {
    editorState: { title, body, tag, priority },
    editorDispatch,
  } = useEditorContext();

  useEffect(() => {
    editorDispatch({
      type: "SET_INITIAL_EDITOR_STATE",
      payload: {
        title: selectedNote.title,
        body: selectedNote.body,
        tag: selectedNote.tag,
        priority: selectedNote.priority,
      },
    });
  }, [selectedNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateNote(title, body, tag, priority, selectedNoteID);
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, body, tag, priority]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.titleContainer}>
        <AiTwotoneEdit />
        <input
          className={styles.title}
          value={title}
          onChange={(e) =>
            editorDispatch({ type: "SET_TITLE", payload: e.target.value })
          }
        />
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={body}
        placeholder="Type your content here"
        onChange={(event, editor) => {
          const data = editor.getData();
          editorDispatch({ type: "SET_BODY", payload: data });
        }}
      />

      <section className={styles.editorUtils}>
        <div className={styles.tagsContainer}>
          <FaTags />
          <select
            onChange={(e) =>
              editorDispatch({ type: "SET_TAG", payload: e.target.value })
            }
            className={styles.tags}
          >
            {tags?.map((tag) => {
              return (
                <option
                  key={tag.id}
                  value={tag.tag}
                  selected={tag.tag === selectedNote.tag}
                >
                  {tag.tag}
                </option>
              );
            })}
          </select>
          <input placeholder="new tag" className={styles.tagInput} />
        </div>

        <div className={styles.priorityContainer}>
          <MdOutlinePriorityHigh /> <span>Priority</span>
          <select
            onChange={(e) =>
              editorDispatch({ type: "SET_PRIORITY", payload: e.target.value })
            }
            className={styles.priorities}
          >
            {priorities.map((priority) => {
              return (
                <option
                  selected={priority.name === selectedNote.priority}
                  value={priority.name}
                  key={priority.id}
                >
                  {priority.name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
    </div>
  );
};
