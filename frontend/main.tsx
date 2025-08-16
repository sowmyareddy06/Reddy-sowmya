import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// Note: Check if petra plugin is available or use standard wallet adapter

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider autoConnect>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);

