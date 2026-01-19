import React, { useState } from "react";
import {
  Image,
  Video,
  Link,
  Send,
  CalendarClock,
} from "lucide-react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: true,
    twitter: false,
    linkedin: false,
  });
  const [scheduleType, setScheduleType] = useState("now");

  const maxLength = 2200;
  const remaining = maxLength - content.length;

  const togglePlatform = (name) => {
    setPlatforms((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const activePlatforms = Object.keys(platforms).filter(
    (p) => platforms[p]
  );

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-white bg-gray-900 min-h-screen">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-semibold">Create Post</h1>
        <p className="text-gray-400">
          Write once, publish everywhere
        </p>

        {/* Platforms */}
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h2 className="font-medium mb-3">Platforms</h2>
          <div className="flex flex-wrap gap-6 text-sm">
            {Object.entries(platforms).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => togglePlatform(key)}
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h2 className="font-medium mb-3">Post Content</h2>
          <textarea
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={maxLength}
            placeholder="What do you want to share?"
            className="w-full bg-gray-900 p-3 rounded-lg border border-gray-700 resize-none"
          />

          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{remaining} characters left</span>
            <span className={remaining < 200 ? "text-yellow-400" : ""}>
              Max {maxLength}
            </span>
          </div>

          <div className="flex gap-4 mt-4 text-indigo-400 text-sm">
            <button className="flex items-center gap-1">
              <Image size={16} /> Image
            </button>
            <button className="flex items-center gap-1">
              <Video size={16} /> Video
            </button>
            <button className="flex items-center gap-1">
              <Link size={16} /> Link
            </button>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h2 className="font-medium mb-3">Schedule</h2>
          <div className="flex items-center gap-4">
            <select
              value={scheduleType}
              onChange={(e) => setScheduleType(e.target.value)}
              className="bg-gray-900 border border-gray-700 p-2 rounded-lg"
            >
              <option value="now">Post Now</option>
              <option value="later">Schedule Later</option>
            </select>

            {scheduleType === "later" && (
              <div className="flex gap-2">
                <input type="date" className="bg-gray-900 border p-2 rounded-lg" />
                <input type="time" className="bg-gray-900 border p-2 rounded-lg" />
              </div>
            )}
          </div>

          <button
            disabled={activePlatforms.length === 0}
            className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-xl font-medium
              ${
                activePlatforms.length
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
          >
            {scheduleType === "later" ? (
              <>
                <CalendarClock size={16} /> Schedule Post
              </>
            ) : (
              <>
                <Send size={16} /> Post Now
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT – LIVE PREVIEW */}
      <div className="space-y-6">
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h2 className="font-medium mb-3">Live Preview</h2>

          {activePlatforms.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Select a platform to see preview
            </p>
          ) : (
            activePlatforms.map((platform) => (
              <div
                key={platform}
                className="mb-4 bg-gray-900 p-4 rounded-lg border border-gray-700"
              >
                <p className="text-xs text-indigo-400 mb-2 capitalize">
                  {platform} preview
                </p>
                <p className="text-sm text-gray-200 whitespace-pre-wrap line-clamp-5">
                  {content || "Your post preview will appear here..."}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}