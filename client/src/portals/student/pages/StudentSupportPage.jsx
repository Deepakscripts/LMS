import { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  HelpCircle,
  FileText,
  BookOpen,
  Award,
  ChevronDown,
  Menu,
  X,
  Search,
  Bell,
  LayoutDashboard,
  ClipboardList,
  Crown,
  Gift,
  Headphones,
  Settings,
  LogOut,
} from 'lucide-react';

// Reusing Sidebar Layout for consistency
// In a real app, the Sidebar would be a shared layout component

const StudentSupportPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState('Select a topic');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState('alex.johnson@example.com'); // Pre-filled for logged-in user
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Mock User Data
  const studentName = 'Alex Johnson';

  const categories = [
    { id: 'courses', label: 'My Courses', icon: <BookOpen size={18} /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText size={18} /> },
    { id: 'quizzes', label: 'Quizzes', icon: <HelpCircle size={18} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
    { id: 'other', label: 'Other', icon: <MessageSquare size={18} /> },
  ];

  const handleSend = e => {
    e.preventDefault();
    if (category === 'Select a topic' || !message) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  // Sidebar Navigation Data
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

  // Use window.location.pathname as a fallback for active state in preview
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

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
            <h1 className="text-xl font-bold hidden sm:block">Support</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
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

        {/* Support Form Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar flex justify-center">
          <div className="w-full max-w-2xl">
            {!isSent ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Get in touch</h2>
                  <p className="text-zinc-400">
                    Facing an issue? Let our support team know and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                <form onSubmit={handleSend} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Your Email</label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        size={18}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-black border border-zinc-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-zinc-300">Topic</label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-xl flex justify-between items-center focus:outline-none focus:border-blue-500 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        {category !== 'Select a topic' &&
                          categories.find(c => c.label === category)?.icon}
                        {category}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden">
                        {categories.map(item => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setCategory(item.label);
                              setIsDropdownOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-zinc-700 cursor-pointer flex items-center gap-3 text-sm text-zinc-200 hover:text-white transition-colors"
                          >
                            {item.icon}
                            {item.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Area */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Message</label>
                    <textarea
                      rows="5"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-black border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe your issue in detail..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSending || category === 'Select a topic' || !message}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isSending || category === 'Select a topic' || !message
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/25'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              // Success State
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 shadow-2xl text-center flex flex-col items-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
                <p className="text-zinc-400 mb-8 max-w-xs mx-auto">
                  Thank you for reaching out. Our support team will review your query about{' '}
                  <span className="text-white font-bold">{category}</span> and respond to{' '}
                  <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                    setCategory('Select a topic');
                  }}
                  className="px-8 py-3 border border-zinc-700 rounded-xl hover:bg-zinc-800 text-white font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentSupportPage;
