import { Routes, Route } from 'react-router-dom';

import StudentDashboard from './pages/StudentDashboard';
import StudentLayout from './layout/StudentLayout.jsx';
import MyCourses from './pages/MyCoursesList.jsx';
import CourseLearningInterface from './pages/CourseLearningInterface.jsx';
import StudentLeaderBoard from './pages/StudentLeaderBoard.jsx';

const StudentPortal = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course-learning" element={<CourseLearningInterface />} />
        <Route path="/leaderboard" element={<StudentLeaderBoard />} />
      </Route>
    </Routes>
  );
};

export default StudentPortal;
