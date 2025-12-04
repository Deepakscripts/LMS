import { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { addNotification } from '@/redux/slices';

// Notification types - defined outside component
const NOTIFICATION_TYPES = ['success', 'error', 'warning', 'info', 'course'];

const Notify = () => {
  const dispatch = useDispatch();

  // Memoized random type selector
  const getRandomType = useCallback(() => {
    return NOTIFICATION_TYPES[Math.floor(Math.random() * NOTIFICATION_TYPES.length)];
  }, []);

  const handleSomeAction = useCallback(() => {
    const notificationType = getRandomType();
    dispatch(
      addNotification({
        title: `${notificationType}!`,
        message: 'Your action was completed successfully.',
        type: notificationType,
      }),
    );
  }, [dispatch, getRandomType]);

  return <button onClick={handleSomeAction} />;
};

export default memo(Notify);
