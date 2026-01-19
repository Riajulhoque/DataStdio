import React, { useState } from "react";
import {
  FaSpotify,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaRedditAlien,
  FaPinterestP,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaTwitch,
  FaFacebookMessenger,
  FaTumblr,

  // ✅ ADD THESE
  FaUserCircle,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";



const accounts = [
  { icon: FaSpotify, color: "#1DB954", name: "Spotify" },
  { icon: FaFacebookF, color: "#1877F2", name: "Facebook" },
  { icon: FaInstagram, color: "#E1306C", name: "Instagram" },
  { icon: FaTwitter, color: "#1DA1F2", name: "Twitter" },

  { icon: FaLinkedinIn, color: "#0A66C2", name: "LinkedIn" },
  { icon: FaYoutube, color: "#FF0000", name: "YouTube" },
  { icon: FaTiktok, color: "#ff0050", name: "TikTok" },
  { icon: FaSnapchatGhost, color: "#FFFC00", name: "Snapchat" },

  { icon: FaRedditAlien, color: "#FF4500", name: "Reddit" },
  { icon: FaPinterestP, color: "#E60023", name: "Pinterest" },
  { icon: FaGithub, color: "#ffffff", name: "GitHub" },
  { icon: FaBehance, color: "#1769FF", name: "Behance" },

  { icon: FaDribbble, color: "#EA4C89", name: "Dribbble" },
  { icon: FaTwitch, color: "#9146FF", name: "Twitch" },
  { icon: FaFacebookMessenger, color: "#0084FF", name: "Messenger" },
  { icon: FaTumblr, color: "#00bcd4", name: "Tumblr" },
];


const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = (name) => {
    setPlatform(name);
    setOpen(true);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setOpen(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] flex items-center justify-center">
      {/* ICON GRID */}
      <div className="grid grid-cols-4 gap-6">
        {accounts.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => handleOpen(item.name)}
              className="group w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-xl
                         border border-white/10 flex items-center justify-center
                         hover:-translate-y-2 hover:scale-105 transition"
            >
              <Icon
                size={28}
                style={{
                  color: item.color,
                  filter: `drop-shadow(0 0 10px ${item.color})`,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[340px] rounded-xl bg-gradient-to-br from-slate-300/80 to-slate-400/80 p-6 backdrop-blur-xl relative">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-700 text-xl"
            >
              ×
            </button>

            {!success ? (
              <>
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-teal-700 flex items-center justify-center">
                    <FaUserCircle className="text-white text-3xl" />
                  </div>
                </div>

                <h3 className="text-center text-gray-800 mb-4 font-semibold">
                  Login to {platform}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center border-b border-gray-600">
                    <FaEnvelope className="text-gray-700 mr-2" />
                    <input
                      type="text"
                      placeholder="Email ID / Username"
                      required
                      className="w-full bg-transparent outline-none py-2 text-gray-800 placeholder-gray-600"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex items-center border-b border-gray-600">
                    <FaLock className="text-gray-700 mr-2" />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="w-full bg-transparent outline-none py-2 text-gray-800 placeholder-gray-600"
                    />
                  </div>

                  <div className="text-right text-sm text-gray-700">
                    forgot password?
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-800 text-white py-2 rounded mt-4 hover:bg-teal-900 transition"
                  >
                    LOGIN
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-green-800 font-semibold text-lg">
                  ✅ Social media account login successfully
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
