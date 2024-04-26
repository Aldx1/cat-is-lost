import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ModalProvider } from "./contexts/ModalContext.tsx";
import { GeoProvider } from "./contexts/GeoContext.tsx";
import { PostsProvider } from "./contexts/PostsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <GeoProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </GeoProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
