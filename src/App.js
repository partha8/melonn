import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { useNotesContext } from "./context";
import { useGetNotes, useGetPinnedNotes, useGetTags } from "./hooks";
import { Archive, Home, NotesPage, Trash } from "./pages";

export const App = () => {
  useGetNotes();
  useGetPinnedNotes();
  useGetTags();
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </div>
  );
};
