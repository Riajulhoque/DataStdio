import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import { Instagram, Facebook, Twitter, Youtube, ChevronDown, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

/* ---------- SIMPLE CARD COMPONENTS (NO SHADCN) ---------- */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

/* ---------- ENHANCED DUMMY DATA ---------- */
// 1. Enhanced JSON data for multiple social media metrics
const socialMediaMetrics = {
  instagram: {
    name: "Instagram",
    color: "#EC4899",
    icon: <Instagram size={16} />,
    engagementRate: 4.2,
    averageEngagementRate: 4.5,
    postsThisMonth: 12,
    totalPosts: 156,
    reach: 45000,
    dailyEngagement: [12, 15, 18, 14, 16, 20, 17],
    weeklyEngagement: [85, 92, 78, 95, 88, 96, 90],
    monthlyEngagement: [320, 340, 310, 330, 350, 360, 340, 330, 320, 340, 350, 360],
  },
  facebook: {
    name: "Facebook",
    color: "#3B82F6",
    icon: <Facebook size={16} />,
    engagementRate: 2.8,
    averageEngagementRate: 3.1,
    postsThisMonth: 8,
    totalPosts: 94,
    reach: 32000,
    dailyEngagement: [8, 10, 12, 9, 11, 14, 10],
    weeklyEngagement: [65, 70, 62, 68, 72, 75, 68],
    monthlyEngagement: [250, 270, 260, 280, 290, 300, 290, 280, 270, 290, 300, 310],
  },
  twitter: {
    name: "Twitter",
    color: "#22C55E",
    icon: <Twitter size={16} />,
    engagementRate: 1.5,
    averageEngagementRate: 1.8,
    postsThisMonth: 25,
    totalPosts: 210,
    reach: 28000,
    dailyEngagement: [5, 6, 8, 5, 7, 9, 6],
    weeklyEngagement: [42, 45, 38, 48, 43, 50, 44],
    monthlyEngagement: [180, 190, 175, 185, 200, 210, 200, 195, 190, 205, 210, 220],
  },
  youtube: {
    name: "YouTube",
    color: "#EF4444",
    icon: <Youtube size={16} />,
    engagementRate: 6.8,
    averageEngagementRate: 7.2,
    postsThisMonth: 6,
    totalPosts: 48,
    reach: 52000,
    dailyEngagement: [20, 22, 25, 18, 24, 28, 22],
    weeklyEngagement: [120, 125, 115, 130, 128, 135, 125],
    monthlyEngagement: [450, 470, 460, 480, 490, 500, 490, 480, 470, 490, 500, 510],
  },
};

const stats = [
  { 
    id: "total_followers", 
    title: "Total Followers", 
    value: "5,78,906", 
    color: "from-pink-500 to-purple-500",
    description: "Total followers across all platforms"
  },
  { 
    id: "engagement_rate", 
    title: "Engagement Rate", 
    value: "15.4%", 
    color: "from-blue-500 to-cyan-500",
    description: "Average engagement rate across posts"
  },
  { 
    id: "posts", 
    title: "Posts This Month", 
    value: "18", 
    color: "from-green-500 to-emerald-500",
    description: "Total posts published this month"
  },
  { 
    id: "reach", 
    title: "Reach", 
    value: "34.8M", 
    color: "from-orange-500 to-yellow-500",
    description: "Total reach across all platforms"
  },
  { 
    id: "average_engagement_rate", 
    title: "Avg. Engagement Rate", 
    value: "4.2%", 
    color: "from-indigo-500 to-blue-500",
    description: "Average engagement rate per post"
  },
  { 
    id: "post_reach", 
    title: "Post Reach", 
    value: "12.4K", 
    color: "from-red-500 to-orange-500",
    description: "Average reach per post"
  },
];

const platforms = [
  { id: "all", name: "All Platforms", icon: null, color: "#8b5cf6" },
  { id: "instagram", name: "Instagram", icon: <Instagram size={16} />, color: "#ec4899" },
  { id: "facebook", name: "Facebook", icon: <Facebook size={16} />, color: "#3b82f6" },
  { id: "twitter", name: "Twitter", icon: <Twitter size={16} />, color: "#22c55e" },
  { id: "youtube", name: "YouTube", icon: <Youtube size={16} />, color: "#ef4444" },
];

// Enhanced chart data with different timeframes
const chartData = {
  total_followers: {
    daily: [
      { name: "Mon", Instagram: 125, Facebook: 212, Twitter: 82, YouTube: 132, total: 551 },
      { name: "Tue", Instagram: 126, Facebook: 213, Twitter: 83, YouTube: 133, total: 555 },
      { name: "Wed", Instagram: 128, Facebook: 215, Twitter: 84, YouTube: 134, total: 561 },
      { name: "Thu", Instagram: 129, Facebook: 216, Twitter: 85, YouTube: 135, total: 565 },
      { name: "Fri", Instagram: 131, Facebook: 218, Twitter: 87, YouTube: 137, total: 573 },
      { name: "Sat", Instagram: 132, Facebook: 219, Twitter: 88, YouTube: 138, total: 577 },
      { name: "Sun", Instagram: 134, Facebook: 221, Twitter: 89, YouTube: 139, total: 583 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 120, Facebook: 210, Twitter: 80, YouTube: 130, total: 540 },
      { name: "Week 2", Instagram: 124, Facebook: 214, Twitter: 83, YouTube: 133, total: 554 },
      { name: "Week 3", Instagram: 128, Facebook: 218, Twitter: 86, YouTube: 136, total: 568 },
      { name: "Week 4", Instagram: 132, Facebook: 222, Twitter: 89, YouTube: 139, total: 582 },
      { name: "Week 5", Instagram: 136, Facebook: 226, Twitter: 92, YouTube: 142, total: 596 },
    ],
    monthly: [
      { name: "Jan", Instagram: 120, Facebook: 210, Twitter: 80, YouTube: 130, total: 540 },
      { name: "Feb", Instagram: 125, Facebook: 215, Twitter: 85, YouTube: 135, total: 560 },
      { name: "Mar", Instagram: 130, Facebook: 220, Twitter: 90, YouTube: 140, total: 580 },
      { name: "Apr", Instagram: 135, Facebook: 225, Twitter: 95, YouTube: 145, total: 600 },
      { name: "May", Instagram: 140, Facebook: 230, Twitter: 98, YouTube: 150, total: 618 },
      { name: "Jun", Instagram: 145, Facebook: 235, Twitter: 102, YouTube: 155, total: 637 },
    ],
    yAxisLabel: "Followers (K)",
    lineColor: "#8b5cf6"
  },
  engagement_rate: {
    daily: [
      { name: "Mon", Instagram: 14.2, Facebook: 9.5, Twitter: 5.3, YouTube: 18.7, total: 11.9 },
      { name: "Tue", Instagram: 14.5, Facebook: 9.8, Twitter: 5.6, YouTube: 19.0, total: 12.2 },
      { name: "Wed", Instagram: 14.8, Facebook: 10.1, Twitter: 5.9, YouTube: 19.3, total: 12.5 },
      { name: "Thu", Instagram: 15.1, Facebook: 10.4, Twitter: 6.2, YouTube: 19.6, total: 12.8 },
      { name: "Fri", Instagram: 15.4, Facebook: 10.7, Twitter: 6.5, YouTube: 19.9, total: 13.1 },
      { name: "Sat", Instagram: 15.7, Facebook: 11.0, Twitter: 6.8, YouTube: 20.2, total: 13.4 },
      { name: "Sun", Instagram: 16.0, Facebook: 11.3, Twitter: 7.1, YouTube: 20.5, total: 13.7 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 14.2, Facebook: 9.5, Twitter: 5.3, YouTube: 18.7, total: 11.9 },
      { name: "Week 2", Instagram: 14.8, Facebook: 10.0, Twitter: 5.8, YouTube: 19.2, total: 12.4 },
      { name: "Week 3", Instagram: 15.4, Facebook: 10.5, Twitter: 6.3, YouTube: 19.7, total: 12.9 },
      { name: "Week 4", Instagram: 16.0, Facebook: 11.0, Twitter: 6.8, YouTube: 20.2, total: 13.4 },
    ],
    monthly: [
      { name: "Jan", Instagram: 14.2, Facebook: 12.5, Twitter: 8.3, YouTube: 16.7, total: 12.9 },
      { name: "Feb", Instagram: 15.1, Facebook: 13.2, Twitter: 9.1, YouTube: 17.3, total: 13.7 },
      { name: "Mar", Instagram: 16.3, Facebook: 14.1, Twitter: 10.2, YouTube: 18.1, total: 14.7 },
      { name: "Apr", Instagram: 15.8, Facebook: 13.8, Twitter: 9.8, YouTube: 17.8, total: 14.3 },
      { name: "May", Instagram: 16.7, Facebook: 14.5, Twitter: 10.5, YouTube: 18.5, total: 15.0 },
      { name: "Jun", Instagram: 17.2, Facebook: 15.0, Twitter: 11.0, YouTube: 19.0, total: 15.5 },
    ],
    yAxisLabel: "Engagement Rate (%)",
    lineColor: "#3b82f6"
  },
  posts: {
    daily: [
      { name: "Mon", Instagram: 2, Facebook: 1, Twitter: 4, YouTube: 0, total: 7 },
      { name: "Tue", Instagram: 1, Facebook: 2, Twitter: 3, YouTube: 1, total: 7 },
      { name: "Wed", Instagram: 3, Facebook: 1, Twitter: 5, YouTube: 0, total: 9 },
      { name: "Thu", Instagram: 2, Facebook: 2, Twitter: 4, YouTube: 1, total: 9 },
      { name: "Fri", Instagram: 1, Facebook: 1, Twitter: 3, YouTube: 0, total: 5 },
      { name: "Sat", Instagram: 2, Facebook: 0, Twitter: 2, YouTube: 1, total: 5 },
      { name: "Sun", Instagram: 1, Facebook: 1, Twitter: 3, YouTube: 0, total: 5 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 12, Facebook: 8, Twitter: 15, YouTube: 4, total: 39 },
      { name: "Week 2", Instagram: 14, Facebook: 9, Twitter: 16, YouTube: 5, total: 44 },
      { name: "Week 3", Instagram: 13, Facebook: 8, Twitter: 14, YouTube: 4, total: 39 },
      { name: "Week 4", Instagram: 15, Facebook: 10, Twitter: 18, YouTube: 6, total: 49 },
    ],
    monthly: [
      { name: "Jan", Instagram: 12, Facebook: 8, Twitter: 15, YouTube: 4, total: 39 },
      { name: "Feb", Instagram: 14, Facebook: 9, Twitter: 16, YouTube: 5, total: 44 },
      { name: "Mar", Instagram: 13, Facebook: 8, Twitter: 14, YouTube: 4, total: 39 },
      { name: "Apr", Instagram: 15, Facebook: 10, Twitter: 18, YouTube: 6, total: 49 },
      { name: "May", Instagram: 16, Facebook: 11, Twitter: 19, YouTube: 7, total: 53 },
      { name: "Jun", Instagram: 17, Facebook: 12, Twitter: 20, YouTube: 8, total: 57 },
    ],
    yAxisLabel: "Number of Posts",
    lineColor: "#10b981"
  },
  reach: {
    daily: [
      { name: "Mon", Instagram: 1200, Facebook: 2100, Twitter: 800, YouTube: 1300, total: 5400 },
      { name: "Tue", Instagram: 1220, Facebook: 2120, Twitter: 820, YouTube: 1320, total: 5480 },
      { name: "Wed", Instagram: 1240, Facebook: 2140, Twitter: 840, YouTube: 1340, total: 5560 },
      { name: "Thu", Instagram: 1260, Facebook: 2160, Twitter: 860, YouTube: 1360, total: 5640 },
      { name: "Fri", Instagram: 1280, Facebook: 2180, Twitter: 880, YouTube: 1380, total: 5720 },
      { name: "Sat", Instagram: 1300, Facebook: 2200, Twitter: 900, YouTube: 1400, total: 5800 },
      { name: "Sun", Instagram: 1320, Facebook: 2220, Twitter: 920, YouTube: 1420, total: 5880 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 1200, Facebook: 2100, Twitter: 800, YouTube: 1300, total: 5400 },
      { name: "Week 2", Instagram: 1250, Facebook: 2150, Twitter: 850, YouTube: 1350, total: 5600 },
      { name: "Week 3", Instagram: 1300, Facebook: 2200, Twitter: 900, YouTube: 1400, total: 5800 },
      { name: "Week 4", Instagram: 1350, Facebook: 2250, Twitter: 950, YouTube: 1450, total: 6000 },
    ],
    monthly: [
      { name: "Jan", Instagram: 1200, Facebook: 2100, Twitter: 800, YouTube: 1300, total: 5400 },
      { name: "Feb", Instagram: 1250, Facebook: 2150, Twitter: 850, YouTube: 1350, total: 5600 },
      { name: "Mar", Instagram: 1300, Facebook: 2200, Twitter: 900, YouTube: 1400, total: 5800 },
      { name: "Apr", Instagram: 1350, Facebook: 2250, Twitter: 950, YouTube: 1450, total: 6000 },
      { name: "May", Instagram: 1400, Facebook: 2300, Twitter: 980, YouTube: 1500, total: 6180 },
      { name: "Jun", Instagram: 1450, Facebook: 2350, Twitter: 1020, YouTube: 1550, total: 6370 },
    ],
    yAxisLabel: "Reach (K)",
    lineColor: "#f59e0b"
  },
  // NEW: Average Engagement Rate Data
  average_engagement_rate: {
    daily: [
      { name: "Mon", Instagram: 4.2, Facebook: 2.8, Twitter: 1.5, YouTube: 6.8, total: 3.8 },
      { name: "Tue", Instagram: 4.3, Facebook: 2.9, Twitter: 1.6, YouTube: 6.9, total: 3.9 },
      { name: "Wed", Instagram: 4.4, Facebook: 3.0, Twitter: 1.7, YouTube: 7.0, total: 4.0 },
      { name: "Thu", Instagram: 4.5, Facebook: 3.1, Twitter: 1.8, YouTube: 7.1, total: 4.1 },
      { name: "Fri", Instagram: 4.6, Facebook: 3.2, Twitter: 1.9, YouTube: 7.2, total: 4.2 },
      { name: "Sat", Instagram: 4.7, Facebook: 3.3, Twitter: 2.0, YouTube: 7.3, total: 4.3 },
      { name: "Sun", Instagram: 4.8, Facebook: 3.4, Twitter: 2.1, YouTube: 7.4, total: 4.4 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 4.2, Facebook: 2.8, Twitter: 1.5, YouTube: 6.8, total: 3.8 },
      { name: "Week 2", Instagram: 4.3, Facebook: 2.9, Twitter: 1.6, YouTube: 6.9, total: 3.9 },
      { name: "Week 3", Instagram: 4.4, Facebook: 3.0, Twitter: 1.7, YouTube: 7.0, total: 4.0 },
      { name: "Week 4", Instagram: 4.5, Facebook: 3.1, Twitter: 1.8, YouTube: 7.1, total: 4.1 },
      { name: "Week 5", Instagram: 4.6, Facebook: 3.2, Twitter: 1.9, YouTube: 7.2, total: 4.2 },
    ],
    monthly: [
      { name: "Jan", Instagram: 4.1, Facebook: 2.7, Twitter: 1.4, YouTube: 6.7, total: 3.7 },
      { name: "Feb", Instagram: 4.2, Facebook: 2.8, Twitter: 1.5, YouTube: 6.8, total: 3.8 },
      { name: "Mar", Instagram: 4.3, Facebook: 2.9, Twitter: 1.6, YouTube: 6.9, total: 3.9 },
      { name: "Apr", Instagram: 4.4, Facebook: 3.0, Twitter: 1.7, YouTube: 7.0, total: 4.0 },
      { name: "May", Instagram: 4.5, Facebook: 3.1, Twitter: 1.8, YouTube: 7.1, total: 4.1 },
      { name: "Jun", Instagram: 4.6, Facebook: 3.2, Twitter: 1.9, YouTube: 7.2, total: 4.2 },
    ],
    yAxisLabel: "Engagement Rate (%)",
    lineColor: "#6366f1"
  },
  // NEW: Post Reach Data
  post_reach: {
    daily: [
      { name: "Mon", Instagram: 450, Facebook: 320, Twitter: 280, YouTube: 520, total: 393 },
      { name: "Tue", Instagram: 455, Facebook: 322, Twitter: 282, YouTube: 525, total: 396 },
      { name: "Wed", Instagram: 460, Facebook: 324, Twitter: 284, YouTube: 530, total: 399 },
      { name: "Thu", Instagram: 465, Facebook: 326, Twitter: 286, YouTube: 535, total: 402 },
      { name: "Fri", Instagram: 470, Facebook: 328, Twitter: 288, YouTube: 540, total: 405 },
      { name: "Sat", Instagram: 475, Facebook: 330, Twitter: 290, YouTube: 545, total: 408 },
      { name: "Sun", Instagram: 480, Facebook: 332, Twitter: 292, YouTube: 550, total: 411 },
    ],
    weekly: [
      { name: "Week 1", Instagram: 450, Facebook: 320, Twitter: 280, YouTube: 520, total: 393 },
      { name: "Week 2", Instagram: 460, Facebook: 325, Twitter: 285, YouTube: 530, total: 400 },
      { name: "Week 3", Instagram: 470, Facebook: 330, Twitter: 290, YouTube: 540, total: 407 },
      { name: "Week 4", Instagram: 480, Facebook: 335, Twitter: 295, YouTube: 550, total: 414 },
      { name: "Week 5", Instagram: 490, Facebook: 340, Twitter: 300, YouTube: 560, total: 421 },
    ],
    monthly: [
      { name: "Jan", Instagram: 440, Facebook: 315, Twitter: 275, YouTube: 510, total: 385 },
      { name: "Feb", Instagram: 450, Facebook: 320, Twitter: 280, YouTube: 520, total: 393 },
      { name: "Mar", Instagram: 460, Facebook: 325, Twitter: 285, YouTube: 530, total: 400 },
      { name: "Apr", Instagram: 470, Facebook: 330, Twitter: 290, YouTube: 540, total: 407 },
      { name: "May", Instagram: 480, Facebook: 335, Twitter: 295, YouTube: 550, total: 414 },
      { name: "Jun", Instagram: 490, Facebook: 340, Twitter: 300, YouTube: 560, total: 421 },
    ],
    yAxisLabel: "Reach per Post",
    lineColor: "#ef4444"
  }
};

const pieChartData = {
  total_followers: [
    { name: "Instagram", value: 128, color: "#ec4899" },
    { name: "Facebook", value: 210, color: "#3b82f6" },
    { name: "Twitter", value: 98, color: "#22c55e" },
    { name: "YouTube", value: 142, color: "#ef4444" },
  ],
  engagement_rate: [
    { name: "Instagram", value: 45, color: "#ec4899" },
    { name: "Facebook", value: 30, color: "#3b82f6" },
    { name: "Twitter", value: 15, color: "#22c55e" },
    { name: "YouTube", value: 10, color: "#ef4444" },
  ],
  posts: [
    { name: "Instagram", value: 35, color: "#ec4899" },
    { name: "Facebook", value: 25, color: "#3b82f6" },
    { name: "Twitter", value: 30, color: "#22c55e" },
    { name: "YouTube", value: 10, color: "#ef4444" },
  ],
  reach: [
    { name: "Instagram", value: 40, color: "#ec4899" },
    { name: "Facebook", value: 35, color: "#3b82f6" },
    { name: "Twitter", value: 15, color: "#22c55e" },
    { name: "YouTube", value: 10, color: "#ef4444" },
  ],
  // NEW: Average Engagement Rate Pie Chart Data
  average_engagement_rate: [
    { name: "Instagram", value: 38, color: "#ec4899" },
    { name: "Facebook", value: 25, color: "#3b82f6" },
    { name: "Twitter", value: 12, color: "#22c55e" },
    { name: "YouTube", value: 25, color: "#ef4444" },
  ],
  // NEW: Post Reach Pie Chart Data
  post_reach: [
    { name: "Instagram", value: 32, color: "#ec4899" },
    { name: "Facebook", value: 28, color: "#3b82f6" },
    { name: "Twitter", value: 18, color: "#22c55e" },
    { name: "YouTube", value: 22, color: "#ef4444" },
  ],
};

/* ---------- MAIN COMPONENT ---------- */
export default function AnalyticsDashboard() {
  const [selectedStat, setSelectedStat] = useState("total_followers");
  const [lineChartPlatforms, setLineChartPlatforms] = useState(["all"]);
  const [pieChartPlatform, setPieChartPlatform] = useState("all");
  const [timeFrame, setTimeFrame] = useState("monthly");

  // Toggle platform selection for line chart
  const toggleLineChartPlatform = (platformId) => {
    setLineChartPlatforms(prev => {
      if (platformId === "all") {
        return ["all"];
      }
      
      const newPlatforms = prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev.filter(p => p !== "all"), platformId];
      
      return newPlatforms.length === 0 ? ["all"] : newPlatforms;
    });
  };

  // Get line chart data based on selected time frame and platforms
  const getLineChartData = () => {
    const data = chartData[selectedStat][timeFrame];
    
    if (lineChartPlatforms.includes("all")) {
      return data.map(item => ({
        name: item.name,
        total: item.total
      }));
    } else {
      return data.map(item => {
        const result = { name: item.name };
        lineChartPlatforms.forEach(platform => {
          const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
          result[platform] = item[platformName];
        });
        return result;
      });
    }
  };

  // Filter pie chart data based on selected platform
  const getPieChartData = () => {
    if (pieChartPlatform === "all") {
      return pieChartData[selectedStat];
    } else {
      const platformData = pieChartData[selectedStat]?.find(p => 
        p.name.toLowerCase() === pieChartPlatform
      );
      return platformData ? [platformData] : [];
    }
  };

  // Platform selector component for line chart (multiple selection)
  const LineChartPlatformSelector = ({ selectedPlatforms, onChange }) => (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Platforms (Line Chart)
      </label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(platform.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedPlatforms.includes(platform.id)
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            style={{
              backgroundColor: selectedPlatforms.includes(platform.id) ? platform.color : undefined,
              border: selectedPlatforms.includes(platform.id) ? `2px solid ${platform.color}` : '2px solid transparent',
            }}
          >
            {platform.icon && <span>{platform.icon}</span>}
            {platform.name}
            {selectedPlatforms.includes(platform.id) && (
              <span className="ml-1 text-xs">✓</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  // Platform selector component for pie chart (single selection)
  const PieChartPlatformSelector = ({ selected, onChange }) => (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Platform (Pie Chart)
      </label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(platform.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selected === platform.id
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            style={{
              backgroundColor: selected === platform.id ? platform.color : undefined,
              border: selected === platform.id ? `2px solid ${platform.color}` : '2px solid transparent',
            }}
          >
            {platform.icon && <span>{platform.icon}</span>}
            {platform.name}
          </motion.button>
        ))}
      </div>
    </div>
  );

  // New: Individual Graph Component for better organization
  const MetricGraph = ({ 
    metricId, 
    title, 
    lineChartPlatforms, 
    setLineChartPlatforms,
    pieChartPlatform,
    setPieChartPlatform,
    timeFrame,
    setTimeFrame 
  }) => {
    const [localLineChartPlatforms, setLocalLineChartPlatforms] = useState(["all"]);
    const [localPieChartPlatform, setLocalPieChartPlatform] = useState("all");
    const [localTimeFrame, setLocalTimeFrame] = useState("monthly");

    // Use local state if not provided, otherwise use props
    const currentLineChartPlatforms = lineChartPlatforms || localLineChartPlatforms;
    const currentPieChartPlatform = pieChartPlatform || localPieChartPlatform;
    const currentTimeFrame = timeFrame || localTimeFrame;

    const toggleLocalLineChartPlatform = (platformId) => {
      const newPlatforms = currentLineChartPlatforms.includes(platformId)
        ? currentLineChartPlatforms.filter(p => p !== platformId)
        : [...currentLineChartPlatforms.filter(p => p !== "all"), platformId];
      
      const finalPlatforms = newPlatforms.length === 0 ? ["all"] : newPlatforms;
      
      if (setLineChartPlatforms) {
        setLineChartPlatforms(finalPlatforms);
      } else {
        setLocalLineChartPlatforms(finalPlatforms);
      }
    };

    const getLocalLineChartData = () => {
      const data = chartData[metricId][currentTimeFrame];
      
      if (currentLineChartPlatforms.includes("all")) {
        return data.map(item => ({
          name: item.name,
          total: item.total
        }));
      } else {
        return data.map(item => {
          const result = { name: item.name };
          currentLineChartPlatforms.forEach(platform => {
            const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
            result[platform] = item[platformName];
          });
          return result;
        });
      }
    };

    const getLocalPieChartData = () => {
      if (currentPieChartPlatform === "all") {
        return pieChartData[metricId] || [];
      } else {
        const platformData = pieChartData[metricId]?.find(p => 
          p.name.toLowerCase() === currentPieChartPlatform
        );
        return platformData ? [platformData] : [];
      }
    };

    return (
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500">
                {currentTimeFrame.charAt(0).toUpperCase() + currentTimeFrame.slice(1)} view
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp size={16} className="mr-2" />
              {currentLineChartPlatforms.includes("all") 
                ? "All Platforms" 
                : `${currentLineChartPlatforms.length} platform${currentLineChartPlatforms.length > 1 ? 's' : ''} selected`
              }
            </div>
          </div>

          {/* Time Frame Selector for this specific graph */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {["daily", "weekly", "monthly"].map((frame) => (
                <motion.button
                  key={frame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeFrame ? setTimeFrame(frame) : setLocalTimeFrame(frame)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${currentTimeFrame === frame
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {frame.charAt(0).toUpperCase() + frame.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getLocalLineChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: chartData[metricId].yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              
              {currentLineChartPlatforms.includes("all") ? (
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke={chartData[metricId].lineColor}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Total"
                />
              ) : (
                currentLineChartPlatforms.map((platform, index) => {
                  const platformInfo = platforms.find(p => p.id === platform);
                  return (
                    <Line
                      key={platform}
                      type="monotone"
                      dataKey={platform}
                      stroke={platformInfo?.color || "#8b5cf6"}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      name={platformInfo?.name}
                    />
                  );
                })
              )}
            </LineChart>
          </ResponsiveContainer>
          
          {/* Platform Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleLocalLineChartPlatform(platform.id)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${currentLineChartPlatforms.includes(platform.id)
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{
                    backgroundColor: currentLineChartPlatforms.includes(platform.id) ? platform.color : undefined,
                    border: currentLineChartPlatforms.includes(platform.id) ? `2px solid ${platform.color}` : '2px solid transparent',
                  }}
                >
                  {platform.icon && <span>{platform.icon}</span>}
                  {platform.name}
                  {currentLineChartPlatforms.includes(platform.id) && (
                    <span className="ml-1 text-xs">✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        Analytics Dashboard
      </motion.h1>

      {/* Stats Cards - Now with 6 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`
                overflow-hidden cursor-pointer transition-all duration-300
                ${selectedStat === item.id ? 'ring-2 ring-purple-500 shadow-lg' : ''}
              `}
              onClick={() => setSelectedStat(item.id)}
            >
              <div className={`h-1 bg-gradient-to-r ${item.color}`} />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">{item.title}</p>
                    <h2 className="text-lg md:text-xl font-bold">{item.value}</h2>
                  </div>
                  {selectedStat === item.id && (
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 truncate">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Graph Section - Now with 3 graphs in a row */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Followers Graph */}
        <MetricGraph 
          metricId="total_followers"
          title="Total Followers"
          lineChartPlatforms={lineChartPlatforms}
          setLineChartPlatforms={setLineChartPlatforms}
          pieChartPlatform={pieChartPlatform}
          setPieChartPlatform={setPieChartPlatform}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
        />

        {/* Average Engagement Rate Graph */}
        <MetricGraph 
          metricId="average_engagement_rate"
          title="Average Engagement Rate"
        />

        {/* Post Reach Graph */}
        <MetricGraph 
          metricId="post_reach"
          title="Post Reach"
        />
      </div>

      {/* Existing Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Original Line Chart */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {stats.find(s => s.id === selectedStat)?.title} Over Time
                </h3>
                <p className="text-sm text-gray-500">
                  {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} view
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp size={16} className="mr-2" />
                {lineChartPlatforms.includes("all") 
                  ? "All Platforms" 
                  : `${lineChartPlatforms.length} platform${lineChartPlatforms.length > 1 ? 's' : ''} selected`
                }
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getLineChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: chartData[selectedStat]?.yAxisLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                
                {lineChartPlatforms.includes("all") ? (
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke={chartData[selectedStat]?.lineColor || "#8b5cf6"}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total"
                  />
                ) : (
                  lineChartPlatforms.map((platform, index) => {
                    const platformInfo = platforms.find(p => p.id === platform);
                    return (
                      <Line
                        key={platform}
                        type="monotone"
                        dataKey={platform}
                        stroke={platformInfo?.color || "#8b5cf6"}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        name={platformInfo?.name}
                      />
                    );
                  })
                )}
              </LineChart>
            </ResponsiveContainer>
            
            <LineChartPlatformSelector
              selectedPlatforms={lineChartPlatforms}
              onChange={toggleLineChartPlatform}
            />
          </CardContent>
        </Card>

        {/* Pie/Donut Chart */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                {stats.find(s => s.id === selectedStat)?.title} Distribution
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                {pieChartPlatform === "all" ? "All Platforms" : 
                 platforms.find(p => p.id === pieChartPlatform)?.name}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              {pieChartPlatform === "all" ? (
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getPieChartData()?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    )) || []}
                  </Pie>
                  <Tooltip formatter={(value) => [value, selectedStat === 'engagement_rate' ? '%' : '']} />
                  <Legend />
                </PieChart>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4"
                         style={{ 
                           background: `conic-gradient(${getPieChartData()[0]?.color} 100%, transparent 0%)` 
                         }}>
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {getPieChartData()[0]?.value}
                          {selectedStat === 'engagement_rate' || selectedStat === 'average_engagement_rate' ? '%' : ''}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold">
                      {platforms.find(p => p.id === pieChartPlatform)?.name}
                    </h4>
                    <p className="text-gray-500">
                      {stats.find(s => s.id === selectedStat)?.title}
                    </p>
                  </div>
                </div>
              )}
            </ResponsiveContainer>
            
            <PieChartPlatformSelector
              selected={pieChartPlatform}
              onChange={setPieChartPlatform}
            />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Platform Performance Overview */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="font-semibold mb-6 text-lg">Platform Performance Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(socialMediaMetrics).map(([key, platform]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-2xl shadow p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{platform.name}</p>
                      <p className="text-xs text-gray-500">Active Platform</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: platform.color }}>
                      {platform.engagementRate}%
                    </p>
                    <p className="text-xs text-gray-500">Engagement Rate</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Avg. Engagement</p>
                    <p className="font-semibold">{platform.averageEngagementRate}%</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Posts/Month</p>
                    <p className="font-semibold">{platform.postsThisMonth}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Total Posts</p>
                    <p className="font-semibold">{platform.totalPosts}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Reach</p>
                    <p className="font-semibold">{(platform.reach / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats Bar */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h3 className="font-semibold">Current Period Summary</h3>
              <p className="text-sm text-gray-500">
                {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Performance Overview
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-purple-600">15.4%</p>
                <p className="text-xs md:text-sm text-gray-500">Avg. Engagement</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-green-600">+12.5%</p>
                <p className="text-xs md:text-sm text-gray-500">Growth Rate</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-blue-600">578.9K</p>
                <p className="text-xs md:text-sm text-gray-500">Total Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-indigo-600">4.2%</p>
                <p className="text-xs md:text-sm text-gray-500">Avg. Post Engagement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}