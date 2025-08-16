import WalletConnector from './src/components/WalletConnector';
import SendMessage from './src/components/SendMessage';
import MessageList from './src/components/MessageList';
import { MessageCircle, Clock, Shield, Zap, Star, Sparkles, Heart, Rocket } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-cyan-100 dark:from-purple-900 dark:via-pink-900 dark:via-blue-900 dark:to-cyan-900 animate-gradient">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-cyan-600 text-white shadow-2xl border-b-4 border-white/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 via-blue-500/20 to-cyan-500/20 animate-pulse"></div>
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                  ✨ Forever Message ✨
                </h1>
                <p className="text-xl text-purple-100 font-semibold">
                  🚀 Decentralized Time-Locked Messages 🌟
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-lg text-white">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Shield className="w-6 h-6 text-green-300" />
                <span className="font-semibold">🔒 Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-6 h-6 text-orange-300" />
                <span className="font-semibold">⏰ Time-Locked</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold">⚡ Decentralized</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              Send Messages
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                🌈 Across Time 🌈
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed font-semibold">
              ✨ Create time-locked messages on the Aptos blockchain ✨<br/>
              🎉 Send birthday wishes, anniversary notes, or future reminders 🎊<br/>
              ⏰ That unlock exactly when you want them to! ⏰
            </p>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 rounded-3xl backdrop-blur-sm border-4 border-green-200 dark:border-green-700 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl mx-auto mb-6 w-fit">
                  <Shield className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">🔒 Secure & Immutable</h3>
                <p className="text-lg text-green-700 dark:text-green-300 leading-relaxed">
                  Messages are stored permanently on the Aptos blockchain, ensuring they can never be lost or altered. 🛡️✨
                </p>
              </div>
              <div className="p-8 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 dark:from-orange-900/30 dark:via-red-900/30 dark:to-pink-900/30 rounded-3xl backdrop-blur-sm border-4 border-orange-200 dark:border-orange-700 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl mx-auto mb-6 w-fit">
                  <Clock className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-4">⏰ Time-Locked</h3>
                <p className="text-lg text-orange-700 dark:text-orange-300 leading-relaxed">
                  Set exactly when your message should be revealed. Perfect for future surprises and reminders! 🎁⏰
                </p>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-3xl backdrop-blur-sm border-4 border-blue-200 dark:border-blue-700 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mx-auto mb-6 w-fit">
                  <Zap className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">⚡ Decentralized</h3>
                <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed">
                  No central authority controls your messages. True ownership and censorship resistance! 🌐⚡
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Wallet Connection */}
            <section className="flex justify-center">
              <div className="transform hover:scale-105 transition-all duration-300">
                <WalletConnector />
              </div>
            </section>

            {/* Send Message */}
            <section className="flex justify-center">
              <div className="transform hover:scale-105 transition-all duration-300">
                <SendMessage />
              </div>
            </section>

            {/* Message List */}
            <section className="flex justify-center">
              <div className="transform hover:scale-105 transition-all duration-300">
                <MessageList />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-800 via-purple-800 via-pink-800 to-blue-800 text-white mt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-black bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Forever Message
              </span>
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            <p className="text-2xl text-gray-300 mb-8 font-semibold">
              🚀 Built on Aptos blockchain for permanent, time-locked messaging 🌟
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg text-gray-400 font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Rocket className="w-5 h-5" />
                <span>Powered by Aptos</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Open Source</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Decentralized</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
