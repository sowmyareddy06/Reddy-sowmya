import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { Inbox, Send, Clock, Eye, EyeOff, Calendar, Sparkles, Star, Heart } from "lucide-react";

const aptos = new Aptos();

interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  unlockTime: number;
  isRevealed: boolean;
  timestamp: number;
}

const MessageList: React.FC = () => {
  const { account } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [loading, setLoading] = useState(false);

  // Check if we're in demo mode
  const isDemoMode = account?.address?.toString() === "0x1234567890abcdef1234567890abcdef12345678";

  // Fetch messages from blockchain
  const fetchMessages = async () => {
    if (!account || isDemoMode) return;
    
    setLoading(true);
    try {
      const response = await aptos.view({
        payload: {
          function: "0xda88d049de049d1346cf8dccbe96ccc893e6a73df28d3d3a54c889a4973ba4d8::forever_message::get_messages",
          typeArguments: [],
          functionArguments: [account.address.toString()],
        }
      });
      
      // Convert blockchain messages to our format
      const blockchainMessages = response[0] as any[];
      const formattedMessages: Message[] = blockchainMessages.map((msg, index) => ({
        id: index.toString(),
        sender: msg.sender,
        receiver: account.address.toString(),
        content: msg.content,
        unlockTime: parseInt(msg.unlock_time) * 1000, // Convert to milliseconds
        isRevealed: parseInt(msg.unlock_time) * 1000 <= Date.now(),
        timestamp: parseInt(msg.sent_time) * 1000, // Convert to milliseconds
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Fall back to mock data if there's an error
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // Load mock data for demo
  const loadMockData = () => {
    if (account) {
      const mockMessages: Message[] = [
        {
          id: "1",
          sender: "0x1234567890abcdef",
          receiver: account.address.toString(),
          content: "Happy Birthday! Hope you have a wonderful year ahead! 🎉🎂✨",
          unlockTime: Date.now() - 86400000, // Yesterday (unlocked)
          isRevealed: true,
          timestamp: Date.now() - 172800000, // 2 days ago
        },
        {
          id: "2",
          sender: account.address.toString(),
          receiver: "0xabcdef1234567890",
          content: "Happy Anniversary! Can't wait to celebrate with you! 💕🥂",
          unlockTime: Date.now() + 86400000, // Tomorrow (locked)
          isRevealed: false,
          timestamp: Date.now() - 3600000, // 1 hour ago
        },
        {
          id: "3",
          sender: "0x9876543210fedcba",
          receiver: account.address.toString(),
          content: "Congratulations on your graduation! You did it! 🎓👏🌟",
          unlockTime: Date.now() + 604800000, // 1 week from now (locked)
          isRevealed: false,
          timestamp: Date.now() - 7200000, // 2 hours ago
        },
      ];
      setMessages(mockMessages);
    }
  };

  // Load data when component mounts or account changes
  useEffect(() => {
    if (account) {
      if (isDemoMode) {
        loadMockData();
      } else {
        fetchMessages();
      }
    }
  }, [account, isDemoMode]);

  const filteredMessages = messages.filter(message => {
    if (filter === 'sent') return message.sender === account?.address.toString();
    if (filter === 'received') return message.receiver === account?.address.toString();
    return true;
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const isUnlocked = (unlockTime: number) => {
    return Date.now() >= unlockTime;
  };

  if (!account) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mx-auto mb-6 w-fit">
              <Inbox className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              🔗 Connect your wallet to view your messages
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-rose-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 rounded-2xl shadow-2xl border border-rose-200/50 dark:border-rose-700/50 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 text-white p-6 rounded-t-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-full">
              <Inbox className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">
              {isDemoMode ? "Your Messages (Demo)" : "Your Messages"}
            </h2>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-rose-100">
            {isDemoMode 
              ? "Demo mode - showing sample messages" 
              : "View your sent and received time-locked messages"
            }
          </p>
          {loading && (
            <p className="text-yellow-200 mt-2">📡 Loading messages from blockchain...</p>
          )}
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              filter === 'all' 
                ? 'bg-white text-rose-600 shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🌟 All Messages
          </button>
          <button
            onClick={() => setFilter('received')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              filter === 'received' 
                ? 'bg-white text-orange-600 shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Inbox className="w-4 h-4" />
            📬 Received
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              filter === 'sent' 
                ? 'bg-white text-yellow-600 shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Send className="w-4 h-4" />
            📤 Sent
          </button>
        </div>
      </div>
      
      {/* Messages Content */}
      <div className="p-8 space-y-6">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mx-auto mb-6 w-fit">
              <Heart className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Messages Found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              💌 Start sending some forever messages!
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className="p-6 bg-gradient-to-r from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/30 dark:to-purple-900/30 rounded-2xl shadow-xl border-2 border-blue-200/50 dark:border-blue-700/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {message.sender === account?.address.toString() ? (
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center gap-2 font-semibold">
                      <Send className="w-4 h-4" />
                      📤 Sent
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center gap-2 font-semibold">
                      <Inbox className="w-4 h-4" />
                      📬 Received
                    </div>
                  )}
                  
                  {isUnlocked(message.unlockTime) ? (
                    <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full flex items-center gap-2 font-semibold">
                      <Eye className="w-4 h-4" />
                      🔓 Unlocked
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full flex items-center gap-2 font-semibold">
                      <EyeOff className="w-4 h-4" />
                      🔒 Locked
                    </div>
                  )}
                </div>
                
                <span className="text-lg font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full">
                  📅 {formatDate(message.timestamp)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-700 dark:text-gray-300">
                    {message.sender === account?.address.toString() ? '📤 To:' : '📬 From:'}
                  </span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                    {formatAddress(
                      message.sender === account?.address.toString()
                        ? message.receiver
                        : message.sender
                    )}
                  </span>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                  {isUnlocked(message.unlockTime) ? (
                    <p className="text-xl leading-relaxed text-gray-900 dark:text-gray-100 font-medium">
                      {message.content}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-600 dark:text-gray-400 italic flex items-center gap-2">
                        🔒 <strong>This message is time-locked and will be revealed on:</strong>
                      </p>
                      <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-600">
                        <div className="flex items-center gap-3 text-xl font-bold text-yellow-800 dark:text-yellow-200">
                          <Calendar className="w-6 h-6" />
                          ⏰ {formatDateTime(message.unlockTime)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!isUnlocked(message.unlockTime) && (
                <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border-2 border-orange-300 dark:border-orange-600">
                  <div className="flex items-center gap-3 text-lg font-semibold text-orange-700 dark:text-orange-300">
                    <Clock className="w-6 h-6" />
                    ⏳ Unlocks in {Math.ceil((message.unlockTime - Date.now()) / (1000 * 60 * 60 * 24))} days
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
