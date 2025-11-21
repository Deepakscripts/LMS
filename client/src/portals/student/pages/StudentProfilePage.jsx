import React, { useState, useRef } from 'react';
import {
  Camera,
  Save,
  ExternalLink,
  User,
  Linkedin,
  Github,
  Globe,
  Mail,
  Building,
  BookOpen,
  Calendar,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Crown,
  Award,
  Gift,
  Headphones,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from 'lucide-react';
// Link removed to prevent Router errors in preview
// import { Link } from 'react-router-dom';

const StudentProfilePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Use window.location.pathname as a fallback for active state in preview
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // --- PROFILE STATE ---
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Alex');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    college: 'Indore Institute of Science & Technology',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    linkedin: 'https://linkedin.com/in/alex',
    github: 'https://github.com/alexcode',
    portfolio: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle read/edit mode

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = e => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Sidebar Navigation Data (Consistent with Dashboard)
  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
    { label: 'My Courses', icon: <BookOpen size={20} />, path: '/app/courses' },
    { label: 'Assignments', icon: <FileText size={20} />, path: '/app/assignments' },
    { label: 'Quizzes', icon: <ClipboardList size={20} />, path: '/app/quizzes' },
    { label: 'Leaderboard', icon: <Crown size={20} />, path: '/app/leaderboard' },
    { label: 'Certificates', icon: <Award size={20} />, path: '/app/certificates' },
    { label: 'Refer and Earn', icon: <Gift size={20} />, path: '/app/refer' },
    { label: 'Support', icon: <Headphones size={20} />, path: '/app/support' },
    { label: 'Profile Settings', icon: <Settings size={20} />, path: '/app/profile' }, // Updated Label
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white flex overflow-hidden">
      {/* --- SIDEBAR --- */}
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

          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md overflow-hidden">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">
                  {formData.firstName} {formData.lastName}
                </p>
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
            <h1 className="text-xl font-bold hidden sm:block">My Profile</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
              <Bell
                size={20}
                className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-blue-900/50 to-purple-900/50 border-b border-white/5"></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-end gap-6 mt-12">
                {/* Avatar with Edit Button */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-black bg-zinc-800 overflow-hidden shadow-2xl">
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-1 right-1 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors shadow-lg border-2 border-black"
                    title="Change Photo"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="flex-1 mb-2">
                  <h2 className="text-3xl font-bold">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-zinc-400 flex items-center gap-2 mt-1">
                    <Building size={16} /> {formData.college || 'Add College Name'}
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-white/10"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>

            {/* Details Form */}
            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Personal Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User size={20} className="text-blue-500" /> Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        College / University <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          size={18}
                        />
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="Institute Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Course Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BookOpen
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          size={18}
                        />
                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="B.Tech CS"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          size={18}
                        />
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Social & Portfolio */}
              <div className="space-y-8">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-purple-500" /> Social Presence
                  </h3>

                  <div className="space-y-5">
                    {/* LinkedIn */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <Linkedin size={12} /> LinkedIn
                        </label>
                        {formData.linkedin && (
                          <a
                            href={formData.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                          >
                            Visit <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    {/* GitHub */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <Github size={12} /> GitHub
                        </label>
                        {formData.github && (
                          <a
                            href={formData.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                          >
                            Visit <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <Globe size={12} /> Portfolio
                        </label>
                        {formData.portfolio && (
                          <a
                            href={formData.portfolio}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                          >
                            Visit <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="https://myportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage;
