import styles from "./card.module.css";
import { removeHTMLTags } from "../../utils/utils";

import {
  BsPin,
  BsFillPinFill,
  BsTrashFill,
  BsTrash,
  BsArchive,
  BsArchiveFill,
} from "react-icons/bs";
import { MdClose } from "react-icons/md";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

import ColorPalette from "./Colors/Colors";
import {
  useAppContext,
  useArchiveContext,
  useNotesContext,
  useTrashContext,
} from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

import ReactTooltip from "react-tooltip";

// component starts here
export const Card = (note) => {
  let {
    id,
    title,
    archived,
    body,
    createdAt,
    pinned,
    trashed,
    tag,
    color,
    priority,
  } = note;

  const { deleteNote, restoreNote, deleteFromTrash } = useTrashContext();
  const { archiveNote, restoreNoteFromArchive, deleteFromArchive } =
    useArchiveContext();
  const {
    notesState: { selectedNoteID },
    notesDispatch,
    handlePinnedNote,
  } = useNotesContext();
  const { toastHandler } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  if (body) {
    body = removeHTMLTags(body);
  }

  if (title.length > 20) {
    title = title.substr(0, 20) + "...";
  }

  if (body.length > 100) {
    body = title.substr(0, 50) + "...";
  }

  let dateCreated;
  if (createdAt) {
    dateCreated = createdAt
      .toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join(" ");
  }

  const selectNote = (note) => {
    notesDispatch({
      type: "SELECT_NOTE",
      payload: { note: note, id: note.id },
    });
  };

  return (
    <div
      onClick={() => {
        if (location.pathname === "/notes") {
          selectNote(note);
        } else if (location.pathname === "/") {
          navigate("/notes");
          selectNote(note);
        }
      }}
      style={{
        background: `${color ? `${color}` : "fff"} `,
      }}
      className={`${
        location.pathname === "/notes"
          ? `${styles.card} ${styles.notesPageCard}`
          : styles.card
      } ${
        selectedNoteID === note.id && location.pathname === "/notes"
          ? styles.active
          : ""
      } `}
    >
      <section className={styles.cardBody}>
        <article>
          <h6>{title}</h6>{" "}
          {priority.name === "High" ? (
            <>
              <FcHighPriority data-tip="High Priority" />
              <ReactTooltip place="right" type="dark" />
            </>
          ) : priority.name === "Medium" ? (
            <>
              <FcMediumPriority data-tip="Medium Priority" />
              <ReactTooltip place="right" type="dark" />
            </>
          ) : (
            <>
              <FcLowPriority data-tip="Low Priority" />
              <ReactTooltip place="right" type="dark" />
            </>
          )}
          <p>{body}</p>
        </article>
        {location.pathname === "/" || location.pathname === "/notes" ? (
          <span className="icon card-icon">
            {pinned ? (
              <BsFillPinFill
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinnedNote(id, false);
                }}
              />
            ) : (
              <BsPin
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinnedNote(id, true);
                }}
              />
            )}
          </span>
        ) : (
          <MdClose
            className="icon card-icon"
            onClick={(e) => {
              e.stopPropagation();
              if (location.pathname === "/trash") {
                deleteFromTrash(id);
                toastHandler(true, "Deleted From Trash!", "success");
              } else if (location.pathname === "/archive") {
                deleteFromArchive(id);
                toastHandler(true, "Deleted From Archive", "success");
              }
            }}
          />
        )}
      </section>
      <p className={styles.tag}>{tag}</p>
      <section className={styles.footer}>
        <p className={styles.dateCreated}>Created on: {dateCreated} </p>
        <div className={styles.utils}>
          <ColorPalette id={id} />

          {archived ? (
            <BsArchiveFill
              onClick={(e) => {
                e.stopPropagation();
                restoreNoteFromArchive(note);
                toastHandler(true, "Note un-archived!", "success");
              }}
            />
          ) : (
            <BsArchive
              onClick={(e) => {
                e.stopPropagation();
                if (
                  location.pathname === "/" ||
                  location.pathname === "/notes"
                ) {
                  archiveNote(note, "notes");
                  toastHandler(true, "Note archived!", "success");
                } else if (location.pathname === "/trash") {
                  archiveNote(note, "trash");
                  toastHandler(true, "Note archived!", "success");
                }
              }}
            />
          )}
          {trashed ? (
            <BsTrashFill
              onClick={(e) => {
                e.stopPropagation();
                restoreNote(note);
                toastHandler(true, "Note un-trashed!", "success");
              }}
            />
          ) : (
            <BsTrash
              onClick={(e) => {
                e.stopPropagation();
                if (
                  location.pathname === "/" ||
                  location.pathname === "/notes"
                ) {
                  deleteNote(note, "notes");
                  toastHandler(true, "Note trashed!", "success");
                } else if (location.pathname === "/archive") {
                  deleteNote(note, "archive");
                  toastHandler(true, "Note trashed!", "success");
                }
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};
