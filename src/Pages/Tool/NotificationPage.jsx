import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, Youtube, Send, X, MessageSquare } from "lucide-react";

/* ---------- SIMPLE CARD ---------- */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow ${className}`}>{children}</div>
);

/* ---------- MOCK DATA GENERATOR ---------- */
const generateMockMessages = () => {
  const platforms = ["Facebook", "Instagram", "Youtube", "Tiktok"];
  const users = [
    "@rahim", "@ripi", "@minhaz", "@sarah", "@john", "@emma", "@alex", "@mike",
    "@lisa", "@david", "@sophia", "@james", "@olivia", "@william", "@ava", "@noah"
  ];
  const messages = [
    "content title.......",
    "Check out this new post!",
    "You have a new comment",
    "Someone mentioned you",
    "Your video is trending",
    "New follower alert",
    "Live stream starting soon",
    "Your post got 100 likes!",
    "Reply to this comment",
    "Weekly analytics are ready"
  ];
  
  const notifications = [];
  const now = new Date();
  
  for (let i = 1; i <= 200; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const timeAgo = Math.floor(Math.random() * 1440); // 0-1440 minutes ago
    
    const notificationTime = new Date(now.getTime() - timeAgo * 60000);
    const timeString = getTimeAgoString(timeAgo);
    
    notifications.push({
      id: i,
      platform: platform,
      user: user,
      text: `${messages[Math.floor(Math.random() * messages.length)]} #${i}`,
      time: timeString,
      originalTime: notificationTime,
      read: Math.random() > 0.3,
      liked: Math.random() > 0.7,
      messageType: Math.random() > 0.5 ? "message" : "notification"
    });
  }
  
  // Sort by time (newest first)
  return notifications.sort((a, b) => b.originalTime - a.originalTime);
};

const getTimeAgoString = (minutes) => {
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
  return `${Math.floor(minutes / 1440)} days ago`;
};

/* ---------- PLATFORM ICONS ---------- */
const PlatformIcon = ({ platform, className = "" }) => {
  const iconProps = { className: `w-5 h-5 ${className}` };
  
  switch (platform) {
    case "Instagram":
      return <Instagram {...iconProps} />;
    case "Facebook":
      return <Facebook {...iconProps} />;
    case "Youtube":
      return <Youtube {...iconProps} />;
    case "Tiktok":
      return <div className="w-5 h-5 bg-black text-white rounded flex items-center justify-center text-xs">TT</div>;
    default:
      return <MessageSquare {...iconProps} />;
  }
};

/* ---------- MAIN COMPONENT ---------- */
export default function NotificationPage() {
  const [messages, setMessages] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  
  // Initialize with generated messages
  useEffect(() => {
    setMessages(generateMockMessages());
  }, []);

  const togglePlatform = (p) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const startReply = (message) => {
    setReplyingTo(message.id);
    setReplyText(`Replying to ${message.user}: `);
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    
    // Show alert with reply
    alert(`Reply sent: "${replyText}" to ${messages.find(m => m.id === replyingTo)?.user}`);
    
    // Remove the message from the list
    setMessages(prev => prev.filter(m => m.id !== replyingTo));
    
    // Reset reply state
    setReplyingTo(null);
    setReplyText("");
  };

  const markAllAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  };

  const toggleLike = (id) => {
    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, liked: !m.liked } : m
      )
    );
  };

  // Filter messages based on platform selection, search, and unread filter
  const filteredMessages = messages.filter(msg => {
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(msg.platform);
    const searchMatch = searchTerm === "" || 
      msg.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.text.toLowerCase().includes(searchTerm.toLowerCase());
    const unreadMatch = !unreadOnly || !msg.read;
    
    return platformMatch && searchMatch && unreadMatch;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const totalCount = messages.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Card className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notification Center</h1>
            <p className="text-gray-500">
              Manage all your social media messages in one place
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                {totalCount} messages • {unreadCount} unread
              </span>
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-2 mt-4 md:mt-0">
            <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
              <div className="font-bold">{unreadCount}</div>
              <div className="text-xs text-gray-500">Unread</div>
            </div>
            <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
              <div className="font-bold">{totalCount}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                unreadOnly 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {unreadOnly ? "Show All" : "Unread Only"}
            </button>
            <button
              onClick={markAllAsRead}
              className="px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Mark all read
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Messages Section */}
          <div className="lg:col-span-3">
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Showing {filteredMessages.length} of {totalCount} messages
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPlatforms([])}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  Clear filters
                </button>
              </div>
            </div>

            {/* Messages List */}
            <AnimatePresence>
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No messages found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.005 }}
                      className={`rounded-xl p-5 border ${
                        msg.read 
                          ? "bg-gray-50 border-gray-200" 
                          : "bg-blue-50 border-blue-200"
                      } ${msg.liked ? "border-pink-200" : ""}`}
                    >
                      {/* Message Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            msg.platform === "Instagram" ? "bg-pink-100" :
                            msg.platform === "Facebook" ? "bg-blue-100" :
                            msg.platform === "Youtube" ? "bg-red-100" :
                            "bg-gray-100"
                          }`}>
                            <PlatformIcon 
                              platform={msg.platform} 
                              className={
                                msg.platform === "Instagram" ? "text-pink-600" :
                                msg.platform === "Facebook" ? "text-blue-600" :
                                msg.platform === "Youtube" ? "text-red-600" :
                                "text-gray-600"
                              }
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{msg.platform}</span>
                              <span className="text-gray-500">{msg.user}</span>
                              {!msg.read && (
                                <span className="px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {msg.messageType === "message" ? "Direct Message" : "Notification"} • {msg.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleLike(msg.id)}
                            className={`p-2 rounded-full ${
                              msg.liked 
                                ? "bg-pink-100 text-pink-600" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {msg.liked ? "❤️" : "🤍"}
                          </button>
                          <button
                            onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Message Body */}
                      <p className="text-gray-700 mb-4">{msg.text}</p>

                      {/* Reply Section */}
                      {replyingTo === msg.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4"
                        >
                          <div className="flex gap-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type your reply..."
                              className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              rows="2"
                              autoFocus
                            />
                            <button
                              onClick={sendReply}
                              disabled={!replyText.trim()}
                              className={`self-end px-4 py-3 rounded-lg font-medium flex items-center gap-2 ${
                                replyText.trim()
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <Send size={18} />
                              Send
                            </button>
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startReply(msg)}
                            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                          >
                            <MessageSquare size={16} />
                            Reply
                          </button>
                          <button
                            onClick={() => setMessages(prev => 
                              prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
                            )}
                            className="px-4 py-2 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* Filters Sidebar */}
          <div className="space-y-6">
            {/* Platform Filter */}
            <Card className="p-5">
              <h3 className="font-semibold text-lg mb-4">Social Platforms</h3>
              <div className="space-y-3">
                {["Facebook", "Instagram", "Youtube", "Tiktok"].map((p) => {
                  const count = messages.filter(m => m.platform === p).length;
                  const unread = messages.filter(m => m.platform === p && !m.read).length;
                  
                  return (
                    <motion.label
                      key={p}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPlatforms.includes(p)
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(p)}
                          onChange={() => togglePlatform(p)}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform={p} />
                          <span>{p}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {unread > 0 && (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                            {unread}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{count}</span>
                      </div>
                    </motion.label>
                  );
                })}
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-5">
              <h3 className="font-semibold text-lg mb-4">Activity Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Messages</span>
                  <span className="font-semibold">{totalCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unread</span>
                  <span className="font-semibold text-blue-600">{unreadCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Liked</span>
                  <span className="font-semibold text-pink-600">
                    {messages.filter(m => m.liked).length}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <button
                    onClick={() => setMessages(generateMockMessages())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}