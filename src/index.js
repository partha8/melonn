import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
  AppProvider,
  ArchiveProvider,
  AuthProvider,
  EditorProvider,
  FilterProvider,
  NotesProvider,
  TrashProvider,
} from "./context";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <AppProvider>
        <NotesProvider>
          <EditorProvider>
            <TrashProvider>
              <ArchiveProvider>
                <FilterProvider>
                  <App />
                </FilterProvider>
              </ArchiveProvider>
            </TrashProvider>
          </EditorProvider>
        </NotesProvider>
      </AppProvider>
    </AuthProvider>
  </Router>
);
