import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation, Toast } from "./components";
import { useAppContext, useNotesContext } from "./context";
import { useGetNotes, useGetPinnedNotes, useGetTags } from "./hooks";
import { Archive, Home, NotesPage, Trash } from "./pages";

export const App = () => {
  useGetNotes();
  useGetPinnedNotes();
  useGetTags();
  const { toast } = useAppContext();
  return (
    <div className="App">
      <Navigation />
      {toast.showToast && <Toast />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </div>
  );
};
