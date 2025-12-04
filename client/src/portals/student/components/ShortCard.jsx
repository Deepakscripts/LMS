import { memo, useCallback, useMemo } from 'react';
import { LockOpen, Lock, CheckCircle } from 'lucide-react';

// Status icon component - memoized
const StatusIcon = memo(({ isLocked, isCompleted }) => {
  if (isLocked) return <Lock size={20} className="text-zinc-500" />;
  if (isCompleted) return <CheckCircle size={20} className="text-green-500" />;
  return <LockOpen size={20} className="text-blue-400" />;
});

StatusIcon.displayName = 'StatusIcon';

const ShortCard = memo(({ course, setModule, cardFor }) => {
  const handleClick = useCallback(() => {
    if (!course.isLocked) {
      if (cardFor === 'certificates') {
        // Logic to download certificate
        alert(`Downloading certificate for ${course.title}`);
      } else {
        setModule(course);
      }
    }
  }, [course, setModule, cardFor]);

  // Memoize button text
  const buttonText = useMemo(() => {
    if (course.isLocked) return 'Locked';
    if (cardFor === 'certificates') return 'Download Certificate';
    if (course.isCompleted) {
      return `Review ${cardFor === 'assignments' ? 'Assignment' : 'Quiz'}`;
    }
    return `Take ${cardFor === 'assignments' ? 'Assignment' : 'Quiz'}`;
  }, [course.isLocked, course.isCompleted, cardFor]);

  // Memoize button class
  const buttonClass = useMemo(
    () =>
      `px-4 py-2 rounded-xl font-medium transition-colors ${
        course.isLocked
          ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`,
    [course.isLocked]
  );

  // Memoize item type text
  const itemTypeText = useMemo(
    () => (cardFor === 'assignments' ? 'Assignments' : 'Quizzes'),
    [cardFor]
  );

  return (
    <div className="group flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 p-4">
      <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl w-fit border border-white/10 mr-4">
        <StatusIcon isLocked={course.isLocked} isCompleted={course.isCompleted} />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {course.title}
        </h3>
        {cardFor !== 'certificates' && (
          <p className="text-sm text-zinc-400">
            {course.total} {itemTypeText}
          </p>
        )}
      </div>

      <button className={buttonClass} disabled={course.isLocked} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
});

ShortCard.displayName = 'ShortCard';

export default ShortCard;
