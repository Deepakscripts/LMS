import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Award,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Gift,
  Headphones,
  Settings,
  Crown,
  Book,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

import { setStudentSidebarOpen, selectCurrentNavigation } from '@/redux/slices';
import { selectUser, selectProfileData } from '@/redux/slices';
import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';

// Sidebar items configuration - defined outside component to prevent recreation
const SIDEBAR_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, navigation: '/student/dashboard' },
  { label: 'My Courses', icon: Book, navigation: '/student/my-courses' },
  { label: 'Assignments', icon: FileText, navigation: '/student/assignments' },
  { label: 'Quizzes', icon: ClipboardList, navigation: '/student/quizzes' },
  { label: 'Certificates', icon: Award, navigation: '/student/certificates' },
  { label: 'Leaderboard', icon: Crown, navigation: '/student/leaderboard' },
  { label: 'Refer and Earn', icon: Gift, navigation: '/student/refer-and-earn' },
  { label: 'Support', icon: Headphones, navigation: '/student/support' },
  { label: 'Settings', icon: Settings, navigation: '/student/settings' },
];

// Mobile breakpoint constant
const MOBILE_BREAKPOINT = 768;

// Memoized sidebar item component for better performance
const SidebarItem = memo(({ item, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
        ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-medium'
            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
        }
      `}
    >
      <Icon size={20} />
      <span className="text-sm">{item.label}</span>
    </button>
  );
});

SidebarItem.displayName = 'SidebarItem';

// Memoized user profile section
const UserProfile = memo(({ displayName, displayAvatar, studentId, onClick }) => {
  const initials = useMemo(
    () =>
      displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    [displayName]
  );

  return (
    <div className="p-4 border-t border-zinc-800">
      <div
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover shadow-md"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-white">{displayName}</p>
          <p className="text-xs text-zinc-500 truncate">ID: {studentId}</p>
        </div>
      </div>
    </div>
  );
});

UserProfile.displayName = 'UserProfile';

const StudentNavbar = () => {
  const navigateAndStore = useNavigateWithRedux();
  const dispatch = useDispatch();
  const activeTab = useSelector(selectCurrentNavigation);
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfileData);

  // Use profile data if available, fallback to user data - memoized
  const displayName = useMemo(() => profile?.name || user?.name || 'Student', [profile?.name, user?.name]);
  const displayAvatar = useMemo(() => profile?.avatar || user?.avatar, [profile?.avatar, user?.avatar]);
  const studentId = useMemo(() => user?.id?.toString().slice(-4) || '----', [user?.id]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = useCallback(
    item => {
      navigateAndStore(item.navigation);
      if (isMobile) {
        dispatch(setStudentSidebarOpen(false));
      }
    },
    [navigateAndStore, isMobile, dispatch]
  );

  const handleProfileClick = useCallback(() => {
    navigateAndStore('/student/profile');
  }, [navigateAndStore]);

  // Memoize active state check
  const isItemActive = useCallback(
    navigation => activeTab.includes(navigation),
    [activeTab]
  );

  return (
    <div className="h-full w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800">
        <span className="text-xl font-bold tracking-tighter text-white">
          LMS<span className="text-blue-500">PORTAL</span>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {SIDEBAR_ITEMS.map(item => (
          <SidebarItem
            key={item.label}
            item={item}
            isActive={isItemActive(item.navigation)}
            onClick={() => handleClick(item)}
          />
        ))}
      </nav>

      {/* Footer */}
      <UserProfile
        displayName={displayName}
        displayAvatar={displayAvatar}
        studentId={studentId}
        onClick={handleProfileClick}
      />
    </div>
  );
};

export default memo(StudentNavbar);
