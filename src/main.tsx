import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NewApp from "./NewApp.tsx";
 import { HashRouter } from "react-router-dom";

import "./index.css";


createRoot(document.getElementById("root")!).render(
  <> {/* removed strictmode temporarily */}
    <HashRouter>
      <NewApp />
    </HashRouter>
    {/* <App /> */}
  </>
);
