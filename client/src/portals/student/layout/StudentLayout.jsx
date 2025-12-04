import { memo, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import StudentSidebar from '../components/StudentSidebar';
import StudentTopBar from '../components/StudentTopBar';

import {
  selectStudentSidebarOpen,
  selectCurrentNavigation,
  setStudentSidebarOpen,
} from '@/redux/slices';

const StudentLayout = () => {
  const dispatch = useDispatch();
  const studentSidebarOpen = useSelector(selectStudentSidebarOpen);
  const currentNavigation = useSelector(selectCurrentNavigation);

  // Check if we're on the learning page (my-courses/:coursename) - memoized
  const isLearningPage = useMemo(
    () => currentNavigation.split('/').at(-2) === 'my-courses',
    [currentNavigation]
  );

  // Memoized callbacks to prevent unnecessary re-renders
  const handleOverlayClick = useCallback(() => {
    dispatch(setStudentSidebarOpen(false));
  }, [dispatch]);

  const toggleSidebar = useCallback(() => {
    dispatch(setStudentSidebarOpen(!studentSidebarOpen));
  }, [dispatch, studentSidebarOpen]);

  // Memoized class names
  const sidebarContainerClass = useMemo(
    () => `z-40 fixed md:static h-screen shrink-0 overflow-hidden transition-all ${studentSidebarOpen ? 'w-64' : 'w-0'}`,
    [studentSidebarOpen]
  );

  const mainContentClass = useMemo(
    () => `grow flex flex-col ${isLearningPage ? 'overflow-hidden' : 'overflow-auto'}`,
    [isLearningPage]
  );

  const outletContainerClass = useMemo(
    () => `grow ${isLearningPage ? 'overflow-hidden' : 'container mx-auto'}`,
    [isLearningPage]
  );

  const toggleButtonClass = useMemo(
    () => `fixed top-4 z-50 border-2 border-s-0 rounded-e-full overflow-hidden border-zinc-700 text-zinc-400 hover:text-white cursor-pointer transition-all ${studentSidebarOpen ? 'left-64' : 'left-0'}`,
    [studentSidebarOpen]
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay - closes sidebar when clicking outside */}
      {studentSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={handleOverlayClick} />
      )}

      {/* Sidebar Toggle Button - Always visible */}
      <button onClick={toggleSidebar} className={toggleButtonClass}>
        <div className="size-12 bg-zinc-900 flex items-center justify-center">
          {studentSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>

      <div className={sidebarContainerClass}>
        <StudentSidebar />
      </div>
      <div className={mainContentClass}>
        <div className="w-full shrink-0 sticky top-0 z-10">
          <StudentTopBar />
        </div>
        <div className={outletContainerClass}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(StudentLayout);
