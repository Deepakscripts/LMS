import { Routes, Route } from 'react-router-dom';

import StudentDashboard from './pages/StudentDashboard';
import StudentLayout from './layout/StudentLayout.jsx';
import MyCourses from './pages/MyCoursesList.jsx';
import CourseLearningInterface from './pages/CourseLearningInterface.jsx';
import StudentLeaderBoard from './pages/StudentLeaderBoard.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ReferandEarnPage from './pages/ReferandEarnPage.jsx';
import SupportPage from './pages/SupportPage.jsx';

const StudentPortal = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course-learning" element={<CourseLearningInterface />} />
        <Route path="/leaderboard" element={<StudentLeaderBoard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/refer-and-earn" element={<ReferandEarnPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>
    </Routes>
  );
};

export default StudentPortal;
