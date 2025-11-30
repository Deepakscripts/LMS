import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCertificates, selectCertificates } from '@/redux/slices';

// Cache duration: 10 minutes for certificates (rarely updated)
const CACHE_DURATION = 10 * 60 * 1000;

/**
 * Check if cache is still valid
 */
const isCacheValid = lastFetched => {
  if (!lastFetched) return false;
  return Date.now() - lastFetched < CACHE_DURATION;
};

/**
 * Hook for fetching certificates (Redux-powered)
 */
export const useCertificates = () => {
  const dispatch = useDispatch();
  const { list: certificates, loading, error, lastFetched } = useSelector(selectCertificates);

  const fetchCertificatesData = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchCertificates());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchCertificatesData();
  }, [fetchCertificatesData]);

  return {
    certificates,
    loading,
    error,
    refetch: () => fetchCertificatesData(true),
  };
};
