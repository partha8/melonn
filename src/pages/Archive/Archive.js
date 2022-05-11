import React from "react";
import { useAppContext, useArchiveContext } from "../../context";
import { useGetArchivedNotes } from "../../hooks";
import styles from "./archive.module.css";
import { Card, Loading } from "../../components";

export const Archive = () => {
  const { archivedNotes, clearAll } = useArchiveContext();
  const { loading } = useAppContext();

  useGetArchivedNotes();

  const dateStamp = new Date().toString().split(" ");
  const time = dateStamp[4].split(":");

  return (
    <div className="page">
      <section className="page-header">
        {time[0] < 12 ? <h5>Good Morning!</h5> : <h5>Good evening!</h5>}
        <h5>{`${dateStamp[0]}, ${dateStamp[1]} ${dateStamp[2]}, ${dateStamp[3]}`}</h5>
      </section>
      {loading ? (
        <div className="loading-component">
          <Loading />
        </div>
      ) : (
        <>
          {archivedNotes.length > 0 && (
            <section className="notesContainer">
              <div className="notes">
                {archivedNotes.map((note, index) => {
                  return <Card key={index} {...note} />;
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
