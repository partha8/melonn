import styles from "./navigation.module.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash, IoMdArchive } from "react-icons/io";
import { MdHome, MdStickyNote2 } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <section className={styles.accountSetting}>
        <div className={styles.account}>
          <img
            className="avatar avatar-standard"
            src="https://images6.alphacoders.com/119/1199914.png"
            alt="gojo"
          />
          <span className="flex-center">Partha</span>
        </div>
        <BsThreeDots className={styles.more} />
      </section>

      <section className={styles.searchBar}>
        <AiOutlineSearch className={styles.searchIcon} />
        <input placeholder="search" className={styles.search} type="text" />
      </section>

      <section className={styles.btnContainer}>
        <button className={`btn ${styles.newBtn}`}>
          <AiOutlinePlus />
        </button>
        <p>New</p>
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
          to="/notes"
        >
          <FaTags className={styles.icon} /> <p className="flex-center">Tags</p>
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
