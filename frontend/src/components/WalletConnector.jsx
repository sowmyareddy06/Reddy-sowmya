import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const WalletConnector: React.FC = () => {
  const { connected, account, wallets, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      const petra = wallets.find((w) => w.name === "Petra");
      if (petra) {
        await connect(petra.name);
      } else {
        alert("Petra Wallet not found");
      }
    } catch (err) {
      console.error("Connection failed", err);
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected: {account?.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Petra Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
