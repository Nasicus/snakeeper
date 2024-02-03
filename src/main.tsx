import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import { initializeFirebase } from "./firebase.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

initializeFirebase();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
