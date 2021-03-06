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
  const [isEditing, setIsEditing] = useState(false);
  const {
    notesState: { tags, selectedNote, selectedNoteID },
    updateNote,
  } = useNotesContext();

  const {
    editorState: { title, body, tag, priority },
    editorDispatch,
    handleNewTag,
  } = useEditorContext();

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    editorDispatch({
      type: "SET_INITIAL_EDITOR_STATE",
      payload: {
        title: selectedNote.title,
        body: selectedNote.body,
        tag: selectedNote.tag,
        priority: selectedNote.priority.name,
      },
    });
  }, [selectedNote]);

  useEffect(() => {
    let timer;
    if (isEditing) {
      timer = setTimeout(() => {
        updateNote(title, body, tag, priority, selectedNoteID);
      }, 1000);
      setIsEditing(false);
    }
    return () => clearTimeout(timer);
  }, [title, body, tag, priority]);

  const handleTagInput = (e) => {
    if (e.keyCode === 13) {
      handleNewTag(tagInput);
      setIsEditing(true);
      setTagInput("");
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.titleContainer}>
        <AiTwotoneEdit />
        <input
          className={styles.title}
          value={title}
          onChange={(e) => {
            setIsEditing(true);
            editorDispatch({ type: "SET_TITLE", payload: e.target.value });
          }}
        />
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={body}
        placeholder="Type your content here"
        onChange={(event, editor) => {
          const data = editor.getData();
          setIsEditing(true);
          editorDispatch({ type: "SET_BODY", payload: data });
        }}
      />

      <section className={styles.editorUtils}>
        <div className={styles.tagsContainer}>
          <FaTags />
          <select
            onChange={(e) => {
              setIsEditing(true);
              editorDispatch({ type: "SET_TAG", payload: e.target.value });
            }}
            className={styles.tags}
          >
            {tags?.map((value) => {
              return (
                <option
                  key={value.id}
                  value={value.tag}
                  selected={value.tag === tag}
                >
                  {value.tag}
                </option>
              );
            })}
          </select>
          <input
            onKeyDown={handleTagInput}
            placeholder="new tag"
            className={styles.tagInput}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        </div>

        <div className={styles.priorityContainer}>
          <MdOutlinePriorityHigh /> <span>Priority</span>
          <select
            onChange={(e) => {
              setIsEditing(true);
              editorDispatch({ type: "SET_PRIORITY", payload: e.target.value });
            }}
            className={styles.priorities}
          >
            {priorities.map((priority) => {
              return (
                <option
                  selected={priority.name === selectedNote.priority.name}
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
