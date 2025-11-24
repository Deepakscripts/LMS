import React from 'react';
import { Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminSidebarOpen } from '@/redux/slice';

const TopBar = () => {
  const dispatch = useDispatch();
  const currentNavigation = useSelector(state => state.global.currentNavigation);
  const adminSidebarOpen = useSelector(state => state.global.adminSidebarOpen);

  const toggleSidebar = () => {
    dispatch(setAdminSidebarOpen(!adminSidebarOpen));
  };

  // Extract and format the active tab name from the navigation path
  const getActiveTabName = () => {
    if (!currentNavigation) return 'Dashboard';

    const pathSegments = currentNavigation.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Handle root path (/admin)
    if (lastSegment === 'admin' || !lastSegment) {
      return 'Dashboard';
    }

    // Format: replace dashes/underscores with spaces and capitalize each word
    return lastSegment
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="h-20 bg-black/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between pe-4 sm:pe-8">
      {/* Active Tab with Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`text-zinc-400 hover:text-white cursor-pointer transition-all md:m-0 ${
            adminSidebarOpen ? 'ms-64' : 'ms-0'
          }`}
        >
          <div className="size-12 rounded-e-full bg-zinc-900 flex items-center justify-center">
            {adminSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </div>
        </button>
        <h1
          className={`text-xl font-bold text-zinc-100 capitalize transition-all ${
            adminSidebarOpen ? 'hidden md:block' : 'block'
          }`}
        >
          {getActiveTabName()}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-zinc-900 w-full pl-10 pr-4 py-2 border-2 border-zinc-400/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-zinc-400 text-zinc-100"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative group">
          <Bell className="w-6 h-6 text-zinc-400 group-hover:text-white cursor-pointer transition-colors" />
          <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
