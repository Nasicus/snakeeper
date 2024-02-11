import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { initializeFirebase } from "./firebase.ts";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { MantineProvider } from "@mantine/core";

initializeFirebase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
