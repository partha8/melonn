import { useFilterContext } from "../context";

export const useFilteredNotes = (pinnedNotes, notes) => {
  let newPinnedNotes = [...pinnedNotes];
  let newNotes = [...notes];
  const {
    filterState: { sortByPriority, sortByDateCreated, sortByTag },
  } = useFilterContext();

  if (sortByPriority && sortByPriority === "HIGH_TO_LOW") {
    newPinnedNotes = newPinnedNotes.sort(
      (a, b) => b.priority["number"] - a.priority["number"]
    );
    newNotes = newNotes.sort(
      (a, b) => b.priority["number"] - a.priority["number"]
    );
  }
  if (sortByPriority && sortByPriority === "LOW_TO_HIGH") {
    newPinnedNotes = newPinnedNotes.sort(
      (a, b) => a.priority["number"] - b.priority["number"]
    );
    newNotes = newNotes.sort(
      (a, b) => a.priority["number"] - b.priority["number"]
    );
  }
  if (sortByDateCreated && sortByDateCreated === "OLDEST_FIRST") {
    newPinnedNotes = newPinnedNotes.sort(
      (a, b) => a["createdAt"] - b["createdAt"]
    );
    newNotes = newNotes.sort((a, b) => a["createdAt"] - b["createdAt"]);
  }
  if (sortByDateCreated && sortByDateCreated === "LATEST_FIRST") {
    newPinnedNotes = newPinnedNotes.sort(
      (a, b) => b["createdAt"] - a["createdAt"]
    );
    newNotes = newNotes.sort((a, b) => b["createdAt"] - a["createdAt"]);
  }
  if (sortByTag.length > 0) {
    newPinnedNotes = newPinnedNotes.filter((note) =>
      sortByTag.includes(note.tag)
    );
    newNotes = newNotes.filter((note) => sortByTag.includes(note.tag));
  }
  
  return { newPinnedNotes, newNotes };
};
