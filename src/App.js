import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation, Toast } from "./components";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import { useAppContext, useAuthContext, useNotesContext } from "./context";
import { useGetNotes, useGetPinnedNotes, useGetTags } from "./hooks";
import { Archive, Home, Login, NotesPage, SignUp, Trash } from "./pages";

export const App = () => {
  useGetNotes();
  useGetPinnedNotes();
  useGetTags();
  const { toast } = useAppContext();
  const { currentUser } = useAuthContext();
  return (
    <div className="App">
      
      {currentUser && <Navigation />}
      {toast.showToast && <Toast />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/notes" element={<NotesPage />} />
        </Route>
      </Routes>
    </div>
  );
};
