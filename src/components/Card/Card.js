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
import { useArchiveContext, useTrashContext } from "../../context";
import { useLocation } from "react-router-dom";

export const Card = (note) => {
  let {
    id,
    title,
    archived,
    body,
    createdAt,
    updatedAt,
    pinned,
    trashed,
    tags,
    color,
  } = note;

  const { deleteNote, restoreNote, deleteFromTrash } = useTrashContext();
  const { archiveNote, restoreNoteFromArchive, deleteFromArchive } =
    useArchiveContext();

  const location = useLocation();
  console.log(location.pathname);

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
      style={{ background: `${color ? `${color}` : "fff"} ` }}
      className={styles.card}
    >
      <section className={styles.cardBody}>
        <article>
          <h6>{title}</h6>
          <p>{body}</p>
        </article>
        {location.pathname === "/" ? (
          <span className="icon">{pinned ? <BsFillPinFill /> : <BsPin />}</span>
        ) : (
          <MdClose
            className="icon"
            onClick={() => {
              if (location.pathname === "/trash") {
                deleteFromTrash(id);
              }
            }}
          />
        )}
      </section>
      <section className={styles.tags}>
        {tags.map((tag, index) => {
          return (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          );
        })}
      </section>
      <section className={styles.footer}>
        <p className={styles.dateCreated}>Created on: {dateCreated} </p>
        <div className={styles.utils}>
          <ColorPalette id={id} />

          {archived ? (
            <BsArchiveFill onClick={() => restoreNoteFromArchive(note)} />
          ) : (
            <BsArchive
              onClick={() => {
                if (location.pathname === "/") {
                  archiveNote(note, "notes");
                } else if (location.pathname === "/trash") {
                  archiveNote(note, "trash");
                }
              }}
            />
          )}
          {trashed ? (
            <BsTrashFill onClick={() => restoreNote(note)} />
          ) : (
            <BsTrash
              onClick={() => {
                if (location.pathname === "/") {
                  deleteNote(note, "notes");
                } else if (location.pathname === "/archive") {
                  deleteNote(note, "archive");
                }
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};
