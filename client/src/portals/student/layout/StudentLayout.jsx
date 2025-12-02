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

  // Check if we're on the learning page (my-courses/:coursename)
  const isLearningPage = currentNavigation.split('/').at(-2) === 'my-courses';

  const handleOverlayClick = () => {
    dispatch(setStudentSidebarOpen(false));
  };

  const toggleSidebar = () => {
    dispatch(setStudentSidebarOpen(!studentSidebarOpen));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay - closes sidebar when clicking outside */}
      {studentSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={handleOverlayClick} />
      )}

      {/* Sidebar Toggle Button - Always visible */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 border-2 border-s-0 rounded-e-full overflow-hidden border-zinc-700 text-zinc-400 hover:text-white cursor-pointer transition-all ${
          studentSidebarOpen ? 'left-64' : 'left-0'
        }`}
      >
        <div className="size-12 bg-zinc-900 flex items-center justify-center">
          {studentSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>

      <div
        className={`z-40 fixed md:static h-screen shrink-0 overflow-hidden transition-all ${studentSidebarOpen ? 'w-64' : 'w-0'}`}
      >
        <StudentSidebar />
      </div>
      <div className={`grow flex flex-col ${isLearningPage ? 'overflow-hidden' : 'overflow-auto'}`}>
        <div className="w-full shrink-0 sticky top-0 z-10">
          <StudentTopBar />
        </div>
        <div className={`grow ${isLearningPage ? 'overflow-hidden' : 'container mx-auto'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
