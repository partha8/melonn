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
import ColorPalette from "./Colors/Colors";


export const Card = ({
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
}) => {
  body = removeHTMLTags(body);
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
        <span className="icon">{pinned ? <BsFillPinFill /> : <BsPin />}</span>
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
          <span>
            <ColorPalette id={id} />
          </span>
          <span>{archived ? <BsArchiveFill /> : <BsArchive />}</span>
          <span>{trashed ? <BsTrashFill /> : <BsTrash />}</span>
        </div>
      </section>
    </div>
  );
};
