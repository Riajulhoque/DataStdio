import React, { useState, useEffect } from "react";
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Edit, X, Save, Trash2 } from "lucide-react";

// Initial schedules data
const initialSchedules = [
  {
    id: 1,
    title: "English Literature Exam",
    category: "Academic",
    date: "2025-03-12",
    time: "09:00 AM - 11:00 AM",
    color: "bg-pink-200",
    notes: "Bring stationery. No electronics allowed.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    category: "Events",
    date: "2025-03-12",
    time: "02:00 PM - 04:00 PM",
    color: "bg-cyan-200",
    notes: "Parents requested to arrive early.",
  },
  {
    id: 3,
    title: "Final Exam - Chemistry",
    category: "Academic",
    date: "2025-03-29",
    time: "08:30 AM - 11:30 AM",
    color: "bg-pink-300",
    notes: "Calculator allowed.",
  },
  {
    id: 4,
    title: "Math Quiz",
    category: "Academic",
    date: "2025-03-15",
    time: "10:00 AM - 11:00 AM",
    color: "bg-blue-200",
    notes: "Chapter 1-5",
  },
];

export default function CalendarDashboard() {
  // States
  const [schedules, setSchedules] = useState(initialSchedules);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("month"); // month, week, day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [customTitles, setCustomTitles] = useState(["Academic", "Events", "Finance", "Administration"]);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Academic",
    date: "",
    time: "",
    notes: "",
    color: "bg-blue-200",
  });

  // Generate calendar days based on view
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (view === "month") {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay();
      
      const days = [];
      // Empty cells for days before first day of month
      for (let i = 0; i < startDay; i++) {
        days.push(null);
      }
      // Days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    } else if (view === "week") {
      const currentDay = currentDate.getDate();
      const startOfWeek = new Date(year, month, currentDay - currentDate.getDay());
      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        days.push({
          date: day.getDate(),
          fullDate: day,
          dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day.getDay()]
        });
      }
      return days;
    } else { // day view
      return [{
        date: currentDate.getDate(),
        fullDate: currentDate,
        dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()]
      }];
    }
  };

  // Navigate calendar
  const navigateCalendar = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  // Get month name
  const getMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Handle adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      id: schedules.length + 1,
      ...newEvent,
      date: newEvent.date || currentDate.toISOString().split('T')[0]
    };
    setSchedules([...schedules, event]);
    setNewEvent({
      title: "",
      category: "Academic",
      date: "",
      time: "",
      notes: "",
      color: "bg-blue-200",
    });
    setShowAddForm(false);
  };

  // Handle editing event
  const handleEditEvent = (e) => {
    e.preventDefault();
    setSchedules(schedules.map(s => 
      s.id === editingEvent.id ? editingEvent : s
    ));
    setSelected(editingEvent);
    setEditingEvent(null);
  };

  // Handle deleting event
  const handleDeleteEvent = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    setSelected(null);
    setEditingEvent(null);
  };

  // Add new custom title
  const handleAddTitle = (e) => {
    e.preventDefault();
    if (newTitle && !customTitles.includes(newTitle)) {
      setCustomTitles([...customTitles, newTitle]);
      setNewTitle("");
    }
  };

  // Filter schedules based on selected title
  const filteredSchedules = selectedTitle === "All" 
    ? schedules 
    : schedules.filter(s => s.category === selectedTitle);

  // Get events for a specific day
  const getEventsForDay = (day) => {
    const dayNum = typeof day === 'object' ? day.date : day;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
    
    return filteredSchedules.filter(s => s.date === dateStr);
  };

  // Color options for events
  const colorOptions = [
    { value: "bg-blue-200", label: "Blue" },
    { value: "bg-pink-200", label: "Pink" },
    { value: "bg-cyan-200", label: "Cyan" },
    { value: "bg-green-200", label: "Green" },
    { value: "bg-yellow-200", label: "Yellow" },
    { value: "bg-purple-200", label: "Purple" },
  ];

useEffect(() => {
  const savedEvents =
    JSON.parse(localStorage.getItem("calendarEvents")) || [];

  if (savedEvents.length > 0) {
    setSchedules((prev) => [...prev, ...savedEvents]);
  }
}, []);

// const [customTitles, setCustomTitles] = useState([
//   "Academic",
//   "Events",
//   "Finance",
//   "Administration",
//   "Social Media"
// ]);

  return (
    <div className="p-6 grid grid-cols-12 gap-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="col-span-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Calendar v.2</h1>
          <p className="text-gray-500 text-sm">Complete calendar with all features</p>
        </div>
        <div className="flex gap-2 text-black">
          <input
            type="text"
            placeholder="Search anything"
            className="border rounded-lg px-3 py-2 w-64"
          />
          <button 
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} /> Add Agenda
          </button>
        </div>
      </div>

      {/* View Selector */}
      <div className="col-span-12 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-lg ${view === "month" ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded-lg  ${view === "week" ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Week
          </button>
          <button
            onClick={() => setView("day")}
            className={`px-4 py-2 rounded-lg  ${view === "day" ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Day
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => navigateCalendar(-1)}>
            <ChevronLeft className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold">
            {getMonthYear()}
            {view !== "month" && ` - ${view.charAt(0).toUpperCase() + view.slice(1)} View`}
          </h2>
          <button onClick={() => navigateCalendar(1)}>
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Custom Titles Section */}
      <div className="col-span-12 bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTitle("All")}
              className={`px-4 py-2 rounded-lg ${selectedTitle === "All" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-700'}`}
            >
              All Schedules ({schedules.length})
            </button>
            {customTitles.map((title) => (
              <button
                key={title}
                onClick={() => setSelectedTitle(title)}
                className={`px-4 py-2 rounded-lg ${selectedTitle === title ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-700'}`}
              >
                {title} ({schedules.filter(s => s.category === title).length})
              </button>
            ))}
          </div>
          <form onSubmit={handleAddTitle} className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add new title"
              className="border rounded-lg px-3 py-2 text-blue-700"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
              <Plus size={16} />
            </button>
          </form>
        </div>

        
      </div>

      {/* Calendar Grid */}
      <div className="col-span-9 space-y-4">
        {/* Calendar Header */}
        <div className="bg-white rounded-2xl p-4">
          <div className="grid grid-cols-7 gap-3 mb-2">
            {view === "month" 
              ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-sm font-medium text-gray-500">
                    {d}
                  </div>
                ))
              : generateDays().map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-500">
                    {view === "week" ? `${day.dayName} ${day.date}` : `${day.dayName} Full Day`}
                  </div>
                ))
            }
          </div>

          {/* Calendar Grid */}
          <div className={`grid ${view === "month" ? "grid-cols-7" : view === "week" ? "grid-cols-7" : "grid-cols-1"} gap-3`}>
            {generateDays().map((day, index) => {
              if (day === null && view === "month") {
                return <div key={index} className="border rounded-xl p-2 min-h-[100px] opacity-30"></div>;
              }
              
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={index}
                  className="border rounded-xl p-2 min-h-[100px] hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className={`text-sm font-medium ${typeof day === 'object' ? 'text-gray-700' : 'text-gray-900'}`}>
                      {typeof day === 'object' ? day.date : day}
                    </div>
                    {typeof day === 'object' && (
                      <span className="text-xs text-gray-400">
                        {day.dayName}
                      </span>
                    )}
                  </div>
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelected(ev)}
                      className={`${ev.color} mt-1 text-xs p-2 rounded cursor-pointer hover:opacity-80 truncate`}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Schedule Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-6 text-black">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Schedule</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="black text-sm font-medium mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {customTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    placeholder="e.g., 09:00 AM - 11:00 AM"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <select
                    value={newEvent.color}
                    onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Schedule Details Panel */}
      <div className="col-span-3 space-y-4">
        {selected && !editingEvent ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-start">
              <span className={`text-xs px-3 py-1 rounded-full ${selected.color}`}>
                {selected.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingEvent(selected)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(selected.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-blue-700">{selected.title}</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <CalendarDays size={16} className="text-gray-400" />
                <span>{selected.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-pink-700">
                <span>⏰</span>
                <span>{selected.time}</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2 text-blue-700">Notes</h4>
              <p className="text-sm text-gray-600">{selected.notes}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-full border rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
            >
              Close Details
            </button>
          </div>
        ) : editingEvent ? (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-blue-700 font-semibold">Edit Schedule</h3>
              <button onClick={() => setEditingEvent(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Title</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Category</label>
                <select
                  value={editingEvent.category}
                  onChange={(e) => setEditingEvent({...editingEvent, category: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-blue-700"
                >
                  {customTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Date</label>
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Time</label>
                <input
                  type="text"
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Color</label>
                <select
                  value={editingEvent.color}
                  onChange={(e) => setEditingEvent({...editingEvent, color: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Notes</label>
                <textarea
                  value={editingEvent.notes}
                  onChange={(e) => setEditingEvent({...editingEvent, notes: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  rows="3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  <Save size={16} className="inline mr-2" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="text-gray-400 mb-4">
              <CalendarDays size={48} className="mx-auto mb-2" />
              <p className="text-sm">Select an event to see details</p>
            </div>
          </div>
        )}

        {/* Add New Schedule Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
        >
          <Plus size={16} /> Add New Schedule
        </button>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold mb-4 text-blue-700">Upcoming Events ({filteredSchedules.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map(schedule => (
                <div
                  key={schedule.id}
                  onClick={() => setSelected(schedule)}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm text-black">{schedule.title}</div>
                      <div className="text-xs text-gray-500">{schedule.date} • {schedule.time}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${schedule.color}`}>
                      {schedule.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                No events found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}