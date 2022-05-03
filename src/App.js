import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { useNotesContext } from "./context";
import { useGetNotes, useGetPinnedNotes } from "./hooks";
import { Home } from "./pages";

export const App = () => {
  useGetNotes();
  useGetPinnedNotes();
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
