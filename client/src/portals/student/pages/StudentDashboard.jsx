import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
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

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [leaderboardFilter, setLeaderboardFilter] = useState('Global');

  // Mock User Data
  const studentName = 'Alex Johnson';

  // --- ANALYTICS DATA ---
  const stats = [
    {
      title: 'Enrolled Courses',
      value: '4',
      icon: <BookOpen size={24} className="text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Hours Learned',
      value: '126',
      icon: <Clock size={24} className="text-green-500" />,
      color: 'bg-green-500/10 border-green-500/20',
    },
    {
      title: 'Avg. Quiz Score',
      value: '88%',
      icon: <TrendingUp size={24} className="text-purple-500" />,
      color: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Certificates',
      value: '2',
      icon: <Award size={24} className="text-yellow-500" />,
      color: 'bg-yellow-500/10 border-yellow-500/20',
    },
  ];

  const activeCourse = {
    title: 'Full Stack Web Development',
    progress: 65,
    nextLesson: 'React Hooks: useEffect & Custom Hooks',
    thumbnail: 'bg-gradient-to-r from-blue-900 to-slate-900',
  };

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Frontend Portfolio Submission',
      date: 'Due Tomorrow',
      type: 'Assignment',
      color: 'text-orange-400',
    },
    {
      id: 2,
      title: 'React Basics Quiz',
      date: 'Due in 3 Days',
      type: 'Quiz',
      color: 'text-blue-400',
    },
  ];

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

  // Sidebar Navigation Data
  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Courses', icon: <BookOpen size={20} /> },
    { label: 'Assignments', icon: <FileText size={20} /> },
    { label: 'Quizzes', icon: <ClipboardList size={20} /> },
    { label: 'Leaderboard', icon: <Crown size={20} /> }, // New Leaderboard Item
    { label: 'Certificates', icon: <Award size={20} /> },
    { label: 'Refer and Earn', icon: <Gift size={20} /> },
    { label: 'Support', icon: <Headphones size={20} /> },
    { label: 'Settings', icon: <Settings size={20} /> },
  ];

  // --- LEADERBOARD COMPONENT ---
  const LeaderboardView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 bg-linear-to-r from-blue-900/40 to-purple-900/40 p-6 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Leaderboard</h2>
          <p className="text-zinc-400 max-w-lg">
            Compete with fellow learners! Earn XP by completing lessons, maintaining streaks, and
            acing quizzes.
          </p>
        </div>
        <div className="relative z-10">
          <select
            className="bg-black/50 border border-zinc-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            value={leaderboardFilter}
            onChange={e => setLeaderboardFilter(e.target.value)}
          >
            <option value="Global">Global Ranking</option>
            <option value="Web Dev">Full Stack Web Dev</option>
            <option value="Data Science">Data Science & AI</option>
          </select>
        </div>
        {/* Decor */}
        <Crown size={120} className="absolute -top-4 -right-4 text-white/5 rotate-12" />
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-5 gap-4 text-zinc-500 text-xs uppercase font-bold px-4">
        <div className="col-span-2">Rank & Student</div>
        <div className="text-center hidden sm:block">XP Earned</div>
        <div className="text-center hidden sm:block">Day Streak</div>
        <div className="text-right">Quizzes Aced</div>
      </div>

      <div className="space-y-3 pb-24">
        {leaderboardData.map(user => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
              user.isMe
                ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {/* Rank & Name */}
            <div className="flex items-center gap-4 col-span-2 flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${
                  user.rank === 1
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : user.rank === 2
                      ? 'bg-zinc-400/20 text-zinc-300'
                      : user.rank === 3
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'text-zinc-500'
                }`}
              >
                {user.rank <= 3 ? <Crown size={18} /> : `#${user.rank}`}
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${user.color}`}
              >
                {user.avatar}
              </div>

              <div>
                <p className={`font-bold ${user.isMe ? 'text-blue-400' : 'text-white'}`}>
                  {user.name} {user.isMe && '(You)'}
                </p>
                <p className="text-xs text-zinc-500 sm:hidden">
                  {user.xp} XP • {user.streak} Day Streak
                </p>
              </div>
            </div>

            {/* Metrics (Desktop) */}
            <div className="text-center hidden sm:block font-mono font-medium text-blue-400 w-32">
              <div className="flex items-center justify-center gap-2">
                <Zap size={16} /> {user.xp.toLocaleString()}
              </div>
            </div>
            <div className="text-center hidden sm:block font-mono font-medium text-orange-400 w-32">
              <div className="flex items-center justify-center gap-2">
                <Flame size={16} /> {user.streak}
              </div>
            </div>
            <div className="text-right font-mono font-medium text-purple-400 w-24">
              <div className="flex items-center justify-end gap-2">
                <Target size={16} /> {user.quizzes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky User Stats (Mobile) */}
      {/* <div className="fixed bottom-6 left-6 right-6 md:left-72 bg-zinc-900 border border-blue-500/30 p-4 rounded-2xl shadow-2xl flex justify-between items-center z-30">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">AJ</div>
                <div>
                    <p className="font-bold text-white">Alex Johnson</p>
                    <p className="text-xs text-blue-400">Rank #14</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-white">5,400 XP</p>
            </div>
      </div> */}
    </div>
  );

  // --- DASHBOARD COMPONENT ---
  const DashboardView = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-1">Welcome back, {studentName.split(' ')[0]}! 👋</h2>
          <p className="text-zinc-400">You've learned 32 minutes today. Keep it up!</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Current Streak</p>
          <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
            <span className="animate-pulse">🔥</span> 12 Days
          </div>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border ${stat.color} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-black/20">{stat.icon}</div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-zinc-400 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-1 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    In Progress
                  </span>
                  <h3 className="text-2xl font-bold mt-1">{activeCourse.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-zinc-800 flex items-center justify-center text-xs font-bold bg-zinc-900 text-white">
                  {activeCourse.progress}%
                </div>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${activeCourse.progress}%` }}
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/30 rounded-xl p-4 border border-zinc-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <PlayCircle size={20} className="ml-1 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Up Next</p>
                    <p className="text-sm font-medium text-white">{activeCourse.nextLesson}</p>
                  </div>
                </div>
                <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors w-full sm:w-auto">
                  Resume
                </button>
              </div>
            </div>
          </div>

          {/* Learning Activity Graph */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Learning Activity</h3>
              <select className="bg-black border border-zinc-700 text-xs text-white rounded-lg px-3 py-1 focus:outline-none cursor-pointer">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="flex items-end justify-between h-32 gap-2 px-2">
              {[40, 70, 35, 90, 60, 80, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-zinc-800 rounded-t-lg relative group hover:bg-blue-600/50 transition-colors cursor-pointer"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}m
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-500 px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Deadlines */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock size={18} className="text-orange-500" /> Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {upcomingDeadlines.map(task => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-black/40 border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded bg-zinc-800 ${task.color === 'text-orange-400' ? 'text-orange-400' : 'text-blue-400'}`}
                    >
                      {task.type}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{task.date}</span>
                  </div>
                  <p className="text-sm font-medium leading-tight">{task.title}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-sm text-zinc-500 hover:text-white transition-colors">
              View All Tasks
            </button>
          </div>

          {/* Notice */}
          <div className="bg-linear-to-br from-blue-900/50 to-purple-900/50 border border-blue-800/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2 text-white">Live Masterclass</h3>
              <p className="text-sm text-blue-100 mb-4">
                "System Design Patterns" with an Ex-Google Engineer starts in 2 hours.
              </p>
              <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 w-full transition-colors">
                Join Waiting Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white flex overflow-hidden">
      {/* --- SIDEBAR (Desktop) --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
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

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {sidebarItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.label
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-medium'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

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
        <header className="h-20 bg-black/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold hidden sm:block">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search courses..."
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

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
          {activeTab === 'Dashboard' && <DashboardView />}
          {activeTab === 'Leaderboard' && <LeaderboardView />}

          {/* Placeholder for other tabs */}
          {activeTab !== 'Dashboard' && activeTab !== 'Leaderboard' && (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <div className="p-6 bg-zinc-900 rounded-full mb-4">
                <Settings size={48} className="opacity-20" />
              </div>
              <p className="text-lg font-medium">The {activeTab} module is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
