import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraPlugin } from "@aptos-labs/petra-plugin";

const wallets = [new PetraPlugin()];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider plugins ={wallets} autoConnect>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);

