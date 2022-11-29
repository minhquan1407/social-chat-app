// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
