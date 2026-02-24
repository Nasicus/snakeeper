import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { initializeFirebase } from "./firebase.ts";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";

initializeFirebase();

const snake: MantineColorsTuple = [
  "#f0faf0",
  "#dff2df",
  "#b8e2b8",
  "#8ed18e",
  "#6bc26b",
  "#53b853",
  "#45b245",
  "#359c35",
  "#2b8b2b",
  "#1d781d",
];

const theme = createTheme({
  primaryColor: "snake",
  primaryShade: 6,
  defaultRadius: "md",
  colors: { snake },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
