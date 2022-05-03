import styles from "./card.module.css";
import { removeHTMLTags } from "../../utils/utils";
import { BsPin, BsFillPinFill } from "react-icons/bs";

export const Card = ({
  title,
  archived,
  body,
  createdAt,
  updatedAt,
  pinned,
  trashed,
}) => {
  body = removeHTMLTags(body);
  if (title.length > 20) {
    title = title.substr(0, 20) + "...";
  }
  if (body.length > 100) {
    body = title.substr(0, 50) + "...";
  }
  return (
    <div className={styles.card}>
      <section className={styles.cardBody}>
        <article>
          <h6>{title}</h6>
          <p>{body}</p>
        </article>
        <span className="icon">{pinned ? <BsFillPinFill /> : <BsPin />}</span>
      </section>
    </div>
  );
};
