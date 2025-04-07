import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "997332471205-49r2o2btqfcvl6jkfsihhcchh4guml6u.apps.googleusercontent.com"; // Replace with your actual client ID

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
