import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Wallet, LogOut, Copy, Check, Sparkles, Zap } from "lucide-react";

const WalletConnector: React.FC = () => {
  const { connected, account, wallets, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [demoAccount] = useState({ 
    address: "0x1234567890abcdef1234567890abcdef12345678" 
  });

  const handleConnect = async () => {
    try {
      const petra = wallets.find((w) => w.name === "Petra");
      if (petra) {
        await connect(petra.name);
      } else {
        // Enable demo mode if Petra not found
        setDemoMode(true);
        alert("🎮 Demo Mode Enabled! \n\nPetra Wallet not found. Using demo wallet for testing.\nIn demo mode, you can test all features without a real wallet.");
      }
    } catch (err) {
      console.error("Connection failed", err);
      // Fallback to demo mode
      setDemoMode(true);
      alert("🎮 Demo Mode Enabled! \n\nConnection failed. Using demo wallet for testing.");
    }
  };

  const handleDisconnect = () => {
    if (demoMode) {
      setDemoMode(false);
    } else {
      disconnect();
    }
  };

  const handleCopyAddress = async () => {
    const addressToCopy = demoMode ? demoAccount.address : account?.address?.toString();
    if (addressToCopy) {
      await navigator.clipboard.writeText(addressToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentAccount = demoMode ? demoAccount : account;
  const isConnected = demoMode || connected;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-2xl border border-cyan-200/50 dark:border-cyan-700/50 backdrop-blur-sm overflow-hidden">
      {/* Header with animated gradient */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 animate-pulse"></div>
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Wallet Connection</h2>
            <Zap className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-cyan-100">
            {isConnected 
              ? (demoMode ? "🎮 Demo Mode Active!" : "🎉 Your wallet is connected!") 
              : "🔗 Connect your Petra wallet to continue"
            }
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {isConnected ? (
          <div className="space-y-6">
            {/* Connected Status */}
            <div className="p-6 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 rounded-xl border-2 border-green-300 dark:border-green-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 animate-pulse"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-green-800 dark:text-green-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Connected Address
                  </p>
                  <p className="text-lg text-green-700 dark:text-green-300 font-mono bg-white/50 dark:bg-green-900/20 px-3 py-2 rounded-lg mt-2">
                    {formatAddress(currentAccount?.address?.toString() || "")}
                  </p>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="p-3 bg-green-200 dark:bg-green-700 border-2 border-green-300 dark:border-green-600 rounded-xl hover:bg-green-300 dark:hover:bg-green-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-300" />
                  ) : (
                    <Copy className="w-5 h-5 text-green-600 dark:text-green-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Disconnect Button */}
            <button 
              onClick={handleDisconnect} 
              className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl border-2 border-red-300 dark:border-red-600 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-red-500/50"
            >
              <LogOut className="w-5 h-5" />
              {demoMode ? "Exit Demo Mode" : "Disconnect Wallet"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connect Button */}
            <button 
              onClick={handleConnect} 
              className="w-full flex items-center justify-center gap-3 px-6 py-5 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-blue-300 dark:border-blue-600"
            >
              <Wallet className="w-6 h-6" />
              🚀 Connect Petra Wallet
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </button>

            {/* Info Box */}
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-600">
              <p className="text-center text-yellow-800 dark:text-yellow-200 font-medium">
                ⚡ Connect your wallet to start sending forever messages!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnector;
