import React, { useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Send, Calendar, User, MessageSquare, Clock } from "lucide-react";

const aptos = new Aptos();

const SendMessage: React.FC = () => {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();
  
  // Check if we're in demo mode (demo address)
  const isDemoMode = account?.address?.toString() === "0x1234567890abcdef1234567890abcdef12345678";

  const handleSend = async () => {
    if (!account) {
      alert("🔗 Please connect your wallet first!");
      return;
    }
    if (!receiver || !message || !unlockTime) {
      alert("📝 Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const unixTimestamp = Math.floor(new Date(unlockTime).getTime() / 1000);

    try {
      if (isDemoMode) {
        // Demo mode simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert(`� Demo Mode - Message sent successfully!
        
📤 To: ${receiver}
💌 Message: ${message}
⏰ Unlock Time: ${new Date(unlockTime).toLocaleString()}
        
Note: This is demo mode. Connect a real wallet to use the actual smart contract.`);
      } else {
        // Real smart contract interaction
        const transaction = await signAndSubmitTransaction({
          data: {
            function: "0xda88d049de049d1346cf8dccbe96ccc893e6a73df28d3d3a54c889a4973ba4d8::forever_message::send_message",
            typeArguments: [],
            functionArguments: [receiver, message, unixTimestamp.toString()],
          }
        });
        
        await aptos.waitForTransaction({ transactionHash: transaction.hash });
        
        alert(`🎉 Message sent successfully on Aptos blockchain!
        
📤 To: ${receiver}
💌 Message: ${message}
⏰ Unlock Time: ${new Date(unlockTime).toLocaleString()}
🔗 Transaction: ${transaction.hash}
        
Your message is now stored permanently on the Aptos blockchain! 🚀`);
      }
      
      // Reset form
      setReceiver("");
      setMessage("");
      setUnlockTime("");
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Send Forever Message
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Send a time-locked message that will be revealed at a specific time
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4" />
            Receiver Address
          </label>
          <input
            type="text"
            placeholder="0x1234567890abcdef..."
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter the Aptos wallet address of the message recipient
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MessageSquare className="w-4 h-4" />
            Your Message
          </label>
          <textarea
            placeholder="Write your forever message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>This message will be stored permanently on the blockchain</span>
            <span>{message.length}/500</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            Unlock Time
          </label>
          <input
            type="datetime-local"
            value={unlockTime}
            onChange={(e) => setUnlockTime(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {unlockTime && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <Calendar className="w-4 h-4 inline mr-2" />
                Message will unlock on: <strong>{formatDateTime(unlockTime)}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleSend} 
            disabled={!account || isLoading || !receiver || !message || !unlockTime}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 text-white ${
              !account || isLoading || !receiver || !message || !unlockTime
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Forever Message
              </>
            )}
          </button>
          
          {!account && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please connect your wallet first
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
