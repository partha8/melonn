import styles from "./navigation.module.css";
import { BsThreeDots, BsPersonCircle } from "react-icons/bs";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash, IoMdArchive } from "react-icons/io";
import { MdHome, MdStickyNote2 } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNotesContext } from "../../context/NotesProvider";
import { useState } from "react";
import { useClickOutside } from "../../hooks/";
import {
  useArchiveContext,
  useAuthContext,
  useTrashContext,
} from "../../context";

export const Navigation = () => {
  const {
    newNoteHandler,
    notesDispatch,
    notesState: { tags },
  } = useNotesContext();
  const { setTrashedNotes } = useTrashContext();
  const { setArchivedNotes } = useArchiveContext();
  const { currentUser, logout } = useAuthContext();

  const [openDropDown, setDropDown] = useState(false);

  const domNode = useClickOutside(() => setDropDown(false));

  const logoutHandler = () => {
    logout();
    notesDispatch({ type: "RESET" });
    setArchivedNotes([]);
    setTrashedNotes([]);
  };

  return (
    <nav className={styles.nav}>
      <section className={styles.accountSetting}>
        <div className={styles.account}>
          {currentUser.photoURL ? (
            <img
              className="avatar avatar-standard"
              src={currentUser.photoURL}
              alt="profile"
            />
          ) : (
            <BsPersonCircle className="avatar avatar-standard" />
          )}

          <span className="flex-center">
            {currentUser.displayName ?? currentUser.email.substr(0, 10) + "..."}
          </span>
        </div>

        <BsThreeDots
          onClick={() => setDropDown(true)}
          className={styles.more}
        />
      </section>

      {openDropDown && (
        <div ref={domNode} className={styles.dropdown}>
          <ul>
            <li onClick={logoutHandler} className={styles.item}>
              Log out
            </li>
          </ul>
        </div>
      )}

      <section className={styles.searchBar}>
        <AiOutlineSearch className={styles.searchIcon} />
        <input placeholder="search" className={styles.search} type="text" />
      </section>

      <section
        onClick={() => newNoteHandler(tags[0].tag)}
        className={styles.btnContainer}
      >
        <button className={`btn ${styles.newBtn}`}>
          <AiOutlinePlus />
        </button>
        <p>New Note</p>
      </section>

      <section className={styles.icons}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.iconContainer} ${styles.active} `
              : `${styles.iconContainer}`
          }
          to="/"
        >
          <MdHome className={styles.icon} /> <p className="flex-center">Home</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.iconContainer} ${styles.active} `
              : `${styles.iconContainer}`
          }
          to="/notes"
        >
          <MdStickyNote2 className={styles.icon} />{" "}
          <p className="flex-center">Notes</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.iconContainer} ${styles.active} `
              : `${styles.iconContainer}`
          }
          to="/trash"
        >
          <IoMdTrash className={styles.icon} />{" "}
          <p className="flex-center">Trash</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.iconContainer} ${styles.active} `
              : `${styles.iconContainer}`
          }
          to="/archive"
        >
          <IoMdArchive className={styles.icon} />{" "}
          <p className="flex-center">Archive</p>
        </NavLink>
      </section>
    </nav>
  );
};
