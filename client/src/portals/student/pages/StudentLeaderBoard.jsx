import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Gift,
  Headphones,
  Settings,
  Crown,
  Zap,
  Flame,
  Target,
} from 'lucide-react';
// Removed Link and useLocation to prevent Router errors in preview
// import { Link, useLocation } from 'react-router-dom';

const Leaderboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState('Global');
  // Use window.location.pathname as a fallback for active state in preview
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const studentName = 'Alex Johnson';

  // --- LEADERBOARD DATA ---
  const leaderboardData = [
    {
      rank: 1,
      name: 'Sarah Connor',
      xp: 12500,
      streak: 45,
      quizzes: 12,
      hours: 180,
      avatar: 'SC',
      color: 'bg-yellow-500',
    },
    {
      rank: 2,
      name: 'John Wick',
      xp: 11200,
      streak: 30,
      quizzes: 10,
      hours: 160,
      avatar: 'JW',
      color: 'bg-gray-400',
    },
    {
      rank: 3,
      name: 'Tony Stark',
      xp: 10800,
      streak: 12,
      quizzes: 15,
      hours: 140,
      avatar: 'TS',
      color: 'bg-orange-500',
    },
    {
      rank: 4,
      name: 'Bruce Wayne',
      xp: 9500,
      streak: 20,
      quizzes: 8,
      hours: 120,
      avatar: 'BW',
      color: 'bg-blue-500',
    },
    {
      rank: 5,
      name: 'Clark Kent',
      xp: 9200,
      streak: 5,
      quizzes: 9,
      hours: 110,
      avatar: 'CK',
      color: 'bg-red-500',
    },
    {
      rank: 14,
      name: 'Alex Johnson',
      xp: 5400,
      streak: 12,
      quizzes: 4,
      hours: 50,
      avatar: 'AJ',
      color: 'bg-purple-500',
      isMe: true,
    }, // Current User
  ];

  // Sidebar Navigation Data (Updated with Links)
  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
    { label: 'My Courses', icon: <BookOpen size={20} />, path: '/app/courses' },
    { label: 'Assignments', icon: <FileText size={20} />, path: '/app/assignments' },
    { label: 'Quizzes', icon: <ClipboardList size={20} />, path: '/app/quizzes' },
    { label: 'Leaderboard', icon: <Crown size={20} />, path: '/app/leaderboard' },
    { label: 'Certificates', icon: <Award size={20} />, path: '/app/certificates' },
    { label: 'Refer and Earn', icon: <Gift size={20} />, path: '/app/refer' },
    { label: 'Support', icon: <Headphones size={20} />, path: '/app/support' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/app/settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white flex overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-zinc-800">
            <span className="text-xl font-bold tracking-tighter">
              LMS<span className="text-blue-500">PORTAL</span>
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden ml-auto text-zinc-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {sidebarItems.map(item => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.label}
                  href={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-medium'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
                AJ
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">{studentName}</p>
                <p className="text-xs text-zinc-500 truncate">Student ID: 9021</p>
              </div>
              <LogOut size={18} className="text-zinc-400 hover:text-red-400 transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-black/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold hidden sm:block">Leaderboard</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search student..."
                className="bg-zinc-900 border border-zinc-700 text-sm text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:border-blue-500 transition-colors placeholder-zinc-600"
              />
            </div>
            <div className="relative group">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
              <Bell
                size={20}
                className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Hero Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-end gap-4 bg-linear-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Hall of Fame 🏆</h2>
                <p className="text-blue-200 max-w-lg">
                  Rise to the top! Earn XP by completing lessons, maintaining streaks, and acing
                  quizzes.
                </p>
              </div>
              <div className="relative z-10">
                <select
                  className="bg-black/60 border border-zinc-600 text-white rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 cursor-pointer backdrop-blur-md hover:bg-black/80 transition-colors"
                  value={leaderboardFilter}
                  onChange={e => setLeaderboardFilter(e.target.value)}
                >
                  <option value="Global">Global Ranking</option>
                  <option value="Web Dev">Full Stack Web Dev</option>
                  <option value="Data Science">Data Science & AI</option>
                </select>
              </div>
              <Crown
                size={150}
                className="absolute -top-6 -right-6 text-white/5 rotate-12 pointer-events-none"
              />
            </div>

            {/* Leaderboard Table/List */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-zinc-500 text-xs uppercase font-bold p-6 border-b border-zinc-800 bg-black/20">
                <div className="col-span-6 sm:col-span-5">Rank & Student</div>
                <div className="col-span-2 text-center hidden sm:block">XP Earned</div>
                <div className="col-span-2 text-center hidden sm:block">Streak</div>
                <div className="col-span-6 sm:col-span-3 text-right">Quizzes Aced</div>
              </div>

              <div className="p-4 space-y-2">
                {leaderboardData.map(user => (
                  <div
                    key={user.rank}
                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] cursor-default ${
                      user.isMe
                        ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                        : 'bg-zinc-900/50 border-transparent hover:border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    {/* Rank & Avatar */}
                    <div className="col-span-6 sm:col-span-5 flex items-center gap-4">
                      <div
                        className={`w-8 h-8 flex shrink-0 items-center justify-center font-bold rounded-full ${
                          user.rank === 1
                            ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                            : user.rank === 2
                              ? 'bg-zinc-300 text-black shadow-lg shadow-zinc-300/50'
                              : user.rank === 3
                                ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/50'
                                : 'text-zinc-500 bg-zinc-800'
                        }`}
                      >
                        {user.rank <= 3 ? <Crown size={16} /> : user.rank}
                      </div>

                      <div
                        className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center font-bold text-sm text-white shadow-inner ${user.color}`}
                      >
                        {user.avatar}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`font-bold truncate ${user.isMe ? 'text-blue-400' : 'text-white'}`}
                        >
                          {user.name} {user.isMe && '(You)'}
                        </p>
                        {/* Mobile Only Metadata */}
                        <p className="text-xs text-zinc-500 sm:hidden flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <Zap size={10} /> {user.xp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame size={10} /> {user.streak}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* XP */}
                    <div className="col-span-2 text-center hidden sm:flex items-center justify-center font-mono font-medium text-blue-400">
                      <Zap size={16} className="mr-2 opacity-70" /> {user.xp.toLocaleString()}
                    </div>

                    {/* Streak */}
                    <div className="col-span-2 text-center hidden sm:flex items-center justify-center font-mono font-medium text-orange-400">
                      <Flame size={16} className="mr-2 opacity-70" /> {user.streak}
                    </div>

                    {/* Quizzes */}
                    <div className="col-span-6 sm:col-span-3 text-right font-mono font-medium text-purple-400 flex items-center justify-end">
                      <span className="mr-2 text-white hidden sm:inline">Total:</span>
                      <Target size={16} className="mr-2 opacity-70" /> {user.quizzes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
