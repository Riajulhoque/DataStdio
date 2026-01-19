import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Overview", icon: "fas fa-chart-pie", path: "/tool" },
    { label: "Calendar", icon: "far fa-calendar-alt", path: "/tool/calendar" },
    { label: "Create Post", icon: "far fa-edit", path: "/tool/post" },
    { label: "Analytics", icon: "fas fa-chart-line", path: "/tool/analytics" },
    { label: "Inbox", icon: "fas fa-inbox", path: "/tool/inbox" },
    { label: "Accounts", icon: "fas fa-user-circle", path: "/tool/accounts" },
    { label: "Settings", icon: "fas fa-cog", path: "/tool/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
      >
        <i className="fas fa-bars" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-40
          h-screen w-[200px] bg-gray-900
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full px-3 py-4">
          <h1 className="text-xl font-bold text-indigo-400 mb-8 px-2">
             <span className="text-[#fff]">Data</span> Stdio
          </h1>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/tool" && location.pathname === "/tool");

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    toggleSidebar();
                  }}
                  className={`
                    relative w-full flex items-center gap-3
                    px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all
                    ${
                      isActive
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "text-gray-300 hover:bg-gray-700/40 hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 h-6 w-1 bg-indigo-500 rounded-r-md" />
                  )}
                  <i className={`${item.icon} text-sm`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <p className="text-sm text-white font-semibold">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
