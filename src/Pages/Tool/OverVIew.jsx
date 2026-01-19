import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';

const OverView = ({ onNavigate }) => {
  // Initial state for connected accounts
  const initialAccounts = [
    { id: 1, platform: 'Instagram', initials: 'IG', followers: '10.2K followers', color: 'bg-gradient-to-r from-pink-500 to-purple-600', connected: true },
    { id: 2, platform: 'Facebook', initials: 'FB', followers: '12.3K followers', color: 'bg-gradient-to-r from-blue-600 to-blue-800', connected: true },
    { id: 3, platform: 'Twitter', initials: 'TW', followers: '6.8K followers', color: 'bg-gradient-to-r from-blue-400 to-sky-500', connected: true },
    { id: 4, platform: 'LinkedIn', initials: 'LN', followers: '5.4K followers', color: 'bg-gradient-to-r from-blue-700 to-blue-900', connected: true },
    { id: 5, platform: 'TikTok', initials: 'TK', followers: '2.1K followers', color: 'bg-gradient-to-r from-black to-gray-800', connected: false },
    { id: 6, platform: 'YouTube', initials: 'YT', followers: '8.9K subscribers', color: 'bg-gradient-to-r from-red-600 to-red-700', connected: false },
    { id: 7, platform: 'Pinterest', initials: 'PN', followers: '3.2K followers', color: 'bg-gradient-to-r from-red-500 to-pink-600', connected: false },
  ];

  const [connectedAccounts, setConnectedAccounts] = useState(initialAccounts);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statCards = [
    { title: 'Total Followers', value: '45,231', change: '+12%', trend: 'up', icon: 'fas fa-users', color: 'bg-gradient-to-r from-blue-500 to-purple-600', textColor: 'text-blue-600' },
    { title: 'Engagement Rate', value: '3.2%', change: '-0.6%', trend: 'down', icon: 'fas fa-chart-line', color: 'bg-gradient-to-r from-green-500 to-teal-600', textColor: 'text-green-600' },
    { title: 'Posts This Month', value: '28', change: '+3', trend: 'up', icon: 'far fa-calendar-alt', color: 'bg-gradient-to-r from-orange-500 to-red-600', textColor: 'text-orange-600' },
    { title: 'Reach', value: '12.4K', change: '+4%', trend: 'up', icon: 'far fa-eye', color: 'bg-gradient-to-r from-purple-500 to-pink-600', textColor: 'text-purple-600' },
  ];

  const recentPosts = [
    { platform: 'Instagram', content: 'New product launch announcement! 🎉', time: '2 hours ago', stats: '245 likes, 10 comments', color: 'bg-pink-100', textColor: 'text-pink-600' },
    { platform: 'Facebook', content: 'Behind the scenes of our latest photoshoot', time: '4 hours ago', stats: '89 likes, 12 comments', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { platform: 'Twitter', content: 'Excited to announce our partnership with...', time: '6 hours ago', stats: '156 likes, 22 retweets', color: 'bg-sky-100', textColor: 'text-sky-600' },
    { platform: 'LinkedIn', content: 'Join our webinar about digital marketing trends', time: '1 day ago', stats: '45 likes, 8 comments', color: 'bg-blue-100', textColor: 'text-blue-700' },
  ];

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email or username is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email.length < 3) {
      // Check if it's either email format or at least 3 chars for username
      errors.email = 'Please enter a valid email or username (min 3 characters)';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleConnectClick = (accountId, platform) => {
    setCurrentAccountId(accountId);
    setCurrentPlatform(platform);
    setModalOpen(true);
    setLoginSuccess(false);
    setFormData({ email: '', password: '' });
    setFormErrors({ email: '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update account connection status
      setConnectedAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.id === currentAccountId ? { ...account, connected: true } : account
        )
      );
      
      setLoginSuccess(true);
      setIsSubmitting(false);
      
      // Show success in modal for 2 seconds, then close
      setTimeout(() => {
        setModalOpen(false);
        setSuccessMessage(`${currentPlatform} connected successfully!`);
        setShowSuccess(true);
        
        // Hide global success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }, 2000);
    }, 1500);
  };

  const handleDisconnectAccount = (accountId) => {
    const account = connectedAccounts.find(acc => acc.id === accountId);
    const confirmDisconnect = window.confirm(`Are you sure you want to disconnect your ${account.platform} account?\n\nClick "OK" to disconnect or "Cancel" to keep connected.`);
    
    if (confirmDisconnect) {
      setConnectedAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.id === accountId ? { ...account, connected: false } : account
        )
      );
      
      setSuccessMessage(`${account.platform} disconnected successfully!`);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleViewAllAccounts = () => {
    alert('Viewing all accounts page would open here. You would see detailed account analytics and management options.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section className="fade-in bg-white min-h-screen w-full ">
      {/* Success Message Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <i className="fas fa-check-circle"></i>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[340px] rounded-xl bg-gradient-to-br from-slate-300/80 to-slate-400/80 p-6 backdrop-blur-xl relative">
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-700 text-xl hover:text-gray-900 transition"
            >
              ×
            </button>

            {!loginSuccess ? (
              <>
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-emerald-700 flex items-center justify-center shadow-lg">
                    <FaUserCircle className="text-white text-3xl" />
                  </div>
                </div>

                <h3 className="text-center text-gray-800 mb-4 font-semibold text-lg">
                  Login to {currentPlatform}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <div className="flex items-center border-b border-gray-600">
                      <FaEnvelope className="text-gray-700 mr-2" />
                      <input
                        type="text"
                        name="email"
                        placeholder="Email ID / Username"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent outline-none py-2 text-gray-800 placeholder-gray-600"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-6">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center border-b border-gray-600">
                      <FaLock className="text-gray-700 mr-2" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent outline-none py-2 text-gray-800 placeholder-gray-600"
                      />
                    </div>
                    {formErrors.password && (
                      <p className="text-red-500 text-xs mt-1 ml-6">{formErrors.password}</p>
                    )}
                  </div>

                  <div className="text-right text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition">
                    Forgot password?
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-2 rounded-lg mt-4 transition flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-md'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Connecting...
                      </>
                    ) : (
                      'LOGIN'
                    )}
                  </button>
                  
                  <div className="text-center text-xs text-gray-600 mt-4">
                    <i className="fas fa-info-circle mr-1"></i>
                    Your credentials are securely encrypted
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="fas fa-check text-white text-2xl"></i>
                </div>
                <h3 className="text-green-800 font-semibold text-lg mb-2">
                  ✅ Successfully Connected!
                </h3>
                <p className="text-gray-700 text-sm">
                  Your {currentPlatform} account is now connected
                </p>
                <div className="mt-6">
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-gray-800">Overview</h1>
      <p className="text-gray-600 mb-8">Welcome back! Here's what's happening with your social media.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">{card.title}</h2>
              <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center text-white`}>
                <i className={`${card.icon} text-lg`}></i>
              </div>
            </div>
            <p className="text-4xl font-bold mb-2 text-gray-800">{card.value}</p>
            <p className={`text-xs ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center font-medium`}>
              <i className={`fas fa-arrow-${card.trend} mr-1`}></i>
              {card.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Connected Accounts and Recent Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Connected Accounts */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Connected Accounts</h2>
            <span className="text-sm text-gray-600">
              {connectedAccounts.filter(acc => acc.connected).length} of {connectedAccounts.length} connected
            </span>
          </div>
          <div className="space-y-4 mb-6">
            {connectedAccounts.slice(0, 5).map((account) => (
              <div key={account.id} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg ${account.color} flex items-center justify-center text-white text-sm font-bold mr-4 shadow-sm`}>
                    {account.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{account.platform}</p>
                    <p className="text-xs text-gray-500">{account.followers}</p>
                  </div>
                </div>
                {account.connected ? (
                  <button
                    onClick={() => handleDisconnectAccount(account.id)}
                    className="text-xs font-semibold px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center border border-red-100"
                    title="Click to disconnect"
                  >
                    <i className="fas fa-link mr-1"></i>
                    Connected
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnectClick(account.id, account.platform)}
                    className="text-xs font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition flex items-center shadow-sm"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Connection Status Summary and All Accounts Button */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm">
              <p className="text-gray-600">
                <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                <span className="font-medium text-green-600">{connectedAccounts.filter(acc => acc.connected).length}</span> accounts connected
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Connect more accounts to expand your reach
              </p>
            </div>
            <button
              onClick={handleViewAllAccounts}
              className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:opacity-90 transition flex items-center shadow-sm"
            >
              <i className="fas fa-th-list mr-2"></i>
              All Accounts
            </button>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Posts</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition">
              View All <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 ${post.color} ${post.textColor} rounded-full`}>
                    {post.platform}
                  </span>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-2">{post.content}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">{post.stats}</p>
                  <div className="flex space-x-2">
                    <button className="text-xs text-gray-500 hover:text-blue-600">
                      <i className="fas fa-chart-bar"></i>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-green-600">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('compose')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-150 flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Create Post
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-150 flex items-center"
          >
            <i className="far fa-calendar-alt mr-2"></i>
            Schedule Post
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-150 flex items-center"
          >
            <i className="fas fa-chart-pie mr-2"></i>
            View Analytics
          </button>
          
          {/* Bulk Connect/Disconnect */}
          <div className="flex-grow"></div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const confirmConnect = window.confirm('Connect all social media accounts?');
                if (confirmConnect) {
                  setConnectedAccounts(prevAccounts =>
                    prevAccounts.map(account => ({ ...account, connected: true }))
                  );
                  setSuccessMessage('All accounts connected successfully!');
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-2 px-5 rounded-xl transition duration-150 text-sm flex items-center shadow-sm"
            >
              <i className="fas fa-plug mr-2"></i>
              Connect All
            </button>
            <button
              onClick={() => {
                const confirmDisconnect = window.confirm('Disconnect all social media accounts?');
                if (confirmDisconnect) {
                  setConnectedAccounts(prevAccounts =>
                    prevAccounts.map(account => ({ ...account, connected: false }))
                  );
                  setSuccessMessage('All accounts disconnected successfully!');
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 text-white font-semibold py-2 px-5 rounded-xl transition duration-150 text-sm flex items-center shadow-sm"
            >
              <i className="fas fa-unlink mr-2"></i>
              Disconnect All
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-4">
          <i className="fas fa-bolt text-yellow-500 mr-2"></i>
          Quickly manage your social media presence with these actions
        </p>
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <i className="fas fa-lightbulb text-orange-500"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Tip of the Day</h3>
          </div>
          <p className="text-sm text-gray-700">
            Posting consistently at peak hours can increase engagement by up to 40%. Try scheduling posts for 2 PM - 4 PM.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
              <i className="fas fa-trending-up text-cyan-500"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Trending Now</h3>
          </div>
          <p className="text-sm text-gray-700">
            Video content is performing 3x better than images. Consider adding more videos to your content mix.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-5 rounded-xl border border-violet-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mr-3">
              <i className="fas fa-award text-violet-500"></i>
            </div>
            <h3 className="font-semibold text-gray-800">Your Best Platform</h3>
          </div>
          <p className="text-sm text-gray-700">
            Instagram is your top performer with 12.3% engagement rate. Consider allocating more resources here.
          </p>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default OverView;