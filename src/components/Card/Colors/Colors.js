import { useClickOutside } from "../../../hooks/useClickOutside";
import { BsPaletteFill } from "react-icons/bs";
import { useState } from "react";
import styles from "./colors.module.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";

const ColorPalette = ({id}) => {
  const [showPalette, setShowPalette] = useState(false);

  const updateColor = async (id, color) => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, {
      color: color,
    });
  };

  const changeColorHandler = (e) => {
    const colorClass = e.target.classList.value;
    if (colorClass.includes("color1")) {
      updateColor(id, "#F5C1EA");
    } else if (colorClass.includes("color2")) {
      updateColor(id, "#D3C1F5");
    } else if (colorClass.includes("color3")) {
      updateColor(id, "#C1E2F5");
    } else if (colorClass.includes("color4")) {
      updateColor(id, "#C1F5E6");
    } else if (colorClass.includes("color5")) {
      updateColor(id, "#E2F5C1");
    } else if (colorClass.includes("color6")) {
      updateColor(id, "#F5C5C1");
    } else if (colorClass.includes("color7")) {
      updateColor(id, "#fff");
    } else return;
  };

  const domNode = useClickOutside(() => setShowPalette(false));
  return (
    <div>
      <BsPaletteFill onClick={() => setShowPalette(!showPalette)} />
      {showPalette && (
        <div onClick={changeColorHandler} className={styles.palette} ref={domNode}>
          <div className={styles.color1}></div>
          <div className={styles.color2}></div>
          <div className={styles.color3}></div>
          <div className={styles.color4}></div>
          <div className={styles.color5}></div>
          <div className={styles.color6}></div>
          <div className={styles.color7}></div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
