import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
  AppProvider,
  ArchiveProvider,
  EditorProvider,
  NotesProvider,
  TrashProvider,
} from "./context";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppProvider>
      <NotesProvider>
        <EditorProvider>
          <TrashProvider>
            <ArchiveProvider>
              <App />
            </ArchiveProvider>
          </TrashProvider>
        </EditorProvider>
      </NotesProvider>
    </AppProvider>
  </Router>
);
