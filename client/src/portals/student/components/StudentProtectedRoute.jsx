import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { selectIsAuthenticated } from '@/redux/slices';
import { getMyCourses } from '@/services/student/studentService';
import authService from '@/services/global/authService';

/**
 * StudentProtectedRoute component that wraps routes requiring:
 * 1. Authentication
 * 2. At least one enrolled course
 *
 * Redirects to login page if user is not authenticated or has no enrolled courses.
 */
const StudentProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState(false);

  useEffect(() => {
    const checkEnrolledCourses = async () => {
      if (!isAuthenticated) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await getMyCourses();
        if (response.success && response.data && response.data.length > 0) {
          setHasEnrolledCourses(true);
        } else {
          // No courses - logout user
          await authService.logout();
          setHasEnrolledCourses(false);
        }
      } catch (error) {
        console.error('Failed to check enrolled courses:', error);
        // On error, logout user
        await authService.logout();
        setHasEnrolledCourses(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkEnrolledCourses();
  }, [isAuthenticated]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  // Redirect to login if no enrolled courses
  if (!hasEnrolledCourses) {
    return (
      <Navigate
        to="/student/login"
        state={{
          from: location,
          error: 'You have no courses enrolled. Please enroll in a course first.',
        }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default StudentProtectedRoute;
