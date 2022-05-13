import React, { useState } from "react";
import styles from "./filter-modal.module.css";
import { FaFilter } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNotesContext, useFilterContext } from "../../context";

export const FilterModal = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    notesState: { tags },
    resetSelectedNote,
  } = useNotesContext();

  const {
    filterState: { sortByTag, sortByPriority, sortByDateCreated },
    filterDispatch,
  } = useFilterContext();

  const handleChange = (e) => {
    let arr = [...sortByTag];
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter((tag) => tag !== e.target.value);
    }
    filterDispatch({ type: "SORT_BY_TAG", payload: arr });
  };

  const domNode = useClickOutside(() => setShowModal(false));
  return (
    <div>
      <FaFilter
        onClick={() => {
          resetSelectedNote();
          setShowModal(true);
        }}
        className="more flex-center"
      />
      {showModal && (
        <section className={styles.filterModalContainer}>
          <div ref={domNode} className={styles.modal}>
            <div className={styles.modalHeader}>
              <h6>Filters</h6>{" "}
              <span onClick={() => filterDispatch({ type: "CLEAR_FILTERS" })}>
                Clear All
              </span>
            </div>
            <p>Sort By Priority</p>

            <form className={styles.form}>
              <label className={styles.filterOption}>
                <input
                  checked={sortByPriority === "HIGH_TO_LOW"}
                  type="radio"
                  name="priority"
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_PRIORITY",
                      payload: "HIGH_TO_LOW",
                    })
                  }
                />
                High To Low
              </label>
              <label className={styles.filterOption}>
                <input
                  checked={sortByPriority === "LOW_TO_HIGH"}
                  type="radio"
                  name="priority"
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_PRIORITY",
                      payload: "LOW_TO_HIGH",
                    })
                  }
                />
                Low to high
              </label>
            </form>

            <p>Sort By Date Created</p>

            <form className={styles.form}>
              <label className={styles.filterOption}>
                <input
                  checked={sortByDateCreated === "OLDEST_FIRST"}
                  type="radio"
                  name="date"
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_DATE_CREATED",
                      payload: "OLDEST_FIRST",
                    })
                  }
                />
                Oldest First
              </label>
              <label className={styles.filterOption}>
                <input
                  checked={sortByDateCreated === "LATEST_FIRST"}
                  type="radio"
                  name="date"
                  onChange={() =>
                    filterDispatch({
                      type: "SORT_BY_DATE_CREATED",
                      payload: "LATEST_FIRST",
                    })
                  }
                />
                Latest First
              </label>
            </form>

            <p>Sort By Tags</p>
            <form className={styles.form}>
              {tags?.map((value) => {
                return (
                  <label className={styles.filterOption}>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      value={value.tag}
                      checked={sortByTag.some((tag) => tag === value.tag)}
                    />
                    {value.tag}
                  </label>
                );
              })}
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
