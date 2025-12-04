import React, { memo, useMemo, useCallback } from 'react';
import { NotepadText, Loader2, BookOpen } from 'lucide-react';

import LearningCard from '../components/LearningCard';
import { useMyCourses } from '../hooks';
import { COURSE_COLOR_VARIANTS, formatLastAccessed } from '../utils';

// Loading component
const MyCoursesLoading = memo(() => (
  <div className="flex items-center justify-center min-h-[60vh] bg-black">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
));

MyCoursesLoading.displayName = 'MyCoursesLoading';

// Error component
const MyCoursesError = memo(({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 bg-black text-white">
    <p className="text-red-400">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Retry
    </button>
  </div>
));

MyCoursesError.displayName = 'MyCoursesError';

// Empty state component
const EmptyCoursesState = memo(({ onBrowse }) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
    <BookOpen size={64} className="text-zinc-600" />
    <h2 className="text-xl font-bold text-zinc-300">No Enrolled Courses</h2>
    <p className="text-zinc-500 text-center max-w-md">
      You haven't enrolled in any courses yet. Browse our catalog to start your learning journey.
    </p>
    <button
      onClick={onBrowse}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Browse Courses
    </button>
  </div>
));

EmptyCoursesState.displayName = 'EmptyCoursesState';

// Course grid component
const CoursesGrid = memo(({ courses }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses.map(course => (
      <LearningCard key={course.id} course={course} destination={`my-courses/${course.slug}`} />
    ))}
  </div>
));

CoursesGrid.displayName = 'CoursesGrid';

const StudentMyCoursesPage = () => {
  const { courses, loading, error, refetch } = useMyCourses();

  // Memoized course icon creator
  const createCourseIcon = useCallback((colorIndex) => (
    <NotepadText size={32} className={COURSE_COLOR_VARIANTS[colorIndex].icon} />
  ), []);

  // Memoized formatted courses
  const formattedCourses = useMemo(() => {
    if (!courses?.length) return [];

    return courses.map((course, index) => {
      const colorIndex = index % COURSE_COLOR_VARIANTS.length;
      return {
        id: course.id,
        title: course.title,
        slug: course.slug,
        progress: course.progress || 0,
        type: 'Modules',
        total: course.totalModules || 0,
        completed: course.completedModules || 0,
        lastAccessed: formatLastAccessed(course.lastAccessed),
        image: COURSE_COLOR_VARIANTS[colorIndex].bg,
        icon: createCourseIcon(colorIndex),
        buttonText: course.isCompleted ? 'Review Course' : 'Continue Learning',
        thumbnail: course.thumbnail,
      };
    });
  }, [courses, createCourseIcon]);

  // Memoized browse handler
  const handleBrowseCourses = useCallback(() => {
    window.location.href = '/courses';
  }, []);

  if (loading) {
    return <MyCoursesLoading />;
  }

  if (error) {
    return <MyCoursesError error={error} onRetry={refetch} />;
  }

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-zinc-400">Continue your learning journey</p>
      </div>

      {formattedCourses.length === 0 ? (
        <EmptyCoursesState onBrowse={handleBrowseCourses} />
      ) : (
        <CoursesGrid courses={formattedCourses} />
      )}
    </div>
  );
};

export default memo(StudentMyCoursesPage);
