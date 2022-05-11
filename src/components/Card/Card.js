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
import ColorPalette from "./Colors/Colors";
import {
  useAppContext,
  useArchiveContext,
  useTrashContext,
} from "../../context";
import { useLocation } from "react-router-dom";

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
  } = note;

  const { deleteNote, restoreNote, deleteFromTrash } = useTrashContext();
  const { archiveNote, restoreNoteFromArchive, deleteFromArchive } =
    useArchiveContext();
  const { toastHandler } = useAppContext();

  const location = useLocation();

  if (body) {
    body = removeHTMLTags(body);
  }

  if (title.length > 20) {
    title = title.substr(0, 20) + "...";
  }

  if (body.length > 100) {
    body = title.substr(0, 50) + "...";
  }

  let dateCreated = createdAt
    .toDate()
    .toString()
    .split(" ")
    .splice(0, 4)
    .join(" ");

  return (
    <div
      style={{
        background: `${color ? `${color}` : "fff"} `,
      }}
      className={`${
        location.pathname === "/notes"
          ? `${styles.card} ${styles.notesPageCard}`
          : styles.card
      }`}
    >
      <section className={styles.cardBody}>
        <article>
          <h6>{title}</h6>
          <p>{body}</p>
        </article>
        {location.pathname === "/" || location.pathname === "/notes" ? (
          <span className="icon">{pinned ? <BsFillPinFill /> : <BsPin />}</span>
        ) : (
          <MdClose
            className="icon"
            onClick={() => {
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
              onClick={() => {
                restoreNoteFromArchive(note);
                toastHandler(true, "Note un-archived!", "success");
              }}
            />
          ) : (
            <BsArchive
              onClick={() => {
                if (location.pathname === "/") {
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
              onClick={() => {
                restoreNote(note);
                toastHandler(true, "Note un-trashed!", "success");
              }}
            />
          ) : (
            <BsTrash
              onClick={() => {
                if (location.pathname === "/") {
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
