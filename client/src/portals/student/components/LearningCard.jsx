import { memo, useCallback, useMemo } from 'react';
import { PlayCircle, Clock, CheckCircle } from 'lucide-react';

import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';

const LearningCard = memo(({ course, destination }) => {
  const navigate = useNavigateWithRedux();

  // Memoize the navigation handler
  const handleClick = useCallback(() => {
    navigate(`/student/${destination}`);
  }, [navigate, destination]);

  // Determine if we should show a gradient background or an image
  const hasImageUrl = useMemo(
    () => course.thumbnail && course.thumbnail.startsWith('http'),
    [course.thumbnail]
  );

  // Memoize progress bar color
  const progressBarClass = useMemo(
    () => `h-2 rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`,
    [course.progress]
  );

  // Memoize thumbnail style
  const thumbnailStyle = useMemo(
    () =>
      hasImageUrl
        ? {
            backgroundImage: `url(${course.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {},
    [hasImageUrl, course.thumbnail]
  );

  // Memoize thumbnail class
  const thumbnailClass = useMemo(
    () => `h-40 w-full relative p-6 flex flex-col justify-between ${!hasImageUrl ? course.image : ''}`,
    [hasImageUrl, course.image]
  );

  return (
    <div
      onClick={handleClick}
      className="group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Course Thumbnail / Glimpse */}
      <div className={thumbnailClass} style={thumbnailStyle}>
        {/* Overlay for image thumbnails */}
        {hasImageUrl && (
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        )}

        <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl w-fit border border-white/10 relative z-10">
          {course.icon}
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <div className="flex items-center text-xs font-bold text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
            <Clock size={12} className="mr-2" /> Last: {course.lastAccessed}
          </div>
          {course.progress === 100 && (
            <div className="flex items-center text-xs font-bold text-green-400 bg-green-900/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
              <CheckCircle size={12} className="mr-1" /> Completed
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {course.title}
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>{course.progress}% Complete</span>
            <span>
              {course.completed}/{course.total} {course.type}
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div
              className={progressBarClass}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        <button className="w-full bg-zinc-800 text-white py-3 rounded-xl font-medium group-hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          {course.buttonText}
        </button>
      </div>
    </div>
  );
});

LearningCard.displayName = 'LearningCard';

export default LearningCard;
