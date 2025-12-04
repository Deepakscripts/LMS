import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import StudentProtectedRoute from './components/StudentProtectedRoute';

// Lazy load components for better code splitting
const StudentLayout = lazy(() => import('./layout/StudentLayout'));
const StudentDashboardPage = lazy(() => import('./pages/StudentDashboardPage'));
const StudentMyCoursesPage = lazy(() => import('./pages/StudentMyCoursesPage'));
const StudentLearningPage = lazy(() => import('./pages/StudentLearningPage'));
const StudentAssignmentsPage = lazy(() => import('./pages/StudentAssignmentsPage'));
const StudentCourseAssignmentsPage = lazy(() => import('./pages/StudentCourseAssignmentsPage'));
const StudentCourseQuizzesPage = lazy(() => import('./pages/StudentCourseQuizzesPage'));
const StudentQuizzesPage = lazy(() => import('./pages/StudentQuizzesPage'));
const StudentLeaderboardPage = lazy(() => import('./pages/StudentLeaderboardPage'));
const StudentCertificatesPage = lazy(() => import('./pages/StudentCertificatesPage'));
const StudentReferandEarnPage = lazy(() => import('./pages/StudentReferandEarnPage'));
const StudentSupportPage = lazy(() => import('./pages/StudentSupportPage'));
const StudentSettingsPage = lazy(() => import('./pages/StudentSettingsPage'));
const StudentProfilePage = lazy(() => import('./pages/StudentProfilePage'));
const StudentCourseCertificatesPage = lazy(() => import('./pages/StudentCourseCertificatesPage'));
const StudentLoginPage = lazy(() => import('./pages/StudentLoginPage'));
const StudentLandingPage = lazy(() => import('./pages/StudentLandingPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
);

const StudentPortal = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<StudentLandingPage />} />
        <Route path="/login" element={<StudentLoginPage />} />
        {/* Protected routes - require authentication AND enrolled courses */}
        <Route element={<StudentProtectedRoute />}>
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<StudentDashboardPage />} />
            <Route path="/my-courses" element={<StudentMyCoursesPage />} />
            <Route path="/my-courses/:coursename" element={<StudentLearningPage />} />
            <Route path="/quizzes" element={<StudentQuizzesPage />} />
            <Route path="/quizzes/:coursename" element={<StudentCourseQuizzesPage />} />
            <Route path="/assignments" element={<StudentAssignmentsPage />} />
            <Route path="/assignments/:coursename" element={<StudentCourseAssignmentsPage />} />
            <Route path="/certificates" element={<StudentCertificatesPage />} />
            <Route path="/certificates/:coursename" element={<StudentCourseCertificatesPage />} />
            <Route path="/leaderboard" element={<StudentLeaderboardPage />} />
            <Route path="/refer-and-earn" element={<StudentReferandEarnPage />} />
            <Route path="/support" element={<StudentSupportPage />} />
            <Route path="/settings" element={<StudentSettingsPage />} />
            <Route path="/profile" element={<StudentProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default StudentPortal;
