import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import authService from '../../../services/global/authService';
import { toast } from 'sonner';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useParams();

  useEffect(() => {
    if (accessToken && refreshToken) {
      authService.handleOAuthSuccess(accessToken, refreshToken).then(user => {
        dispatch(login({ accessToken, refreshToken, user }));
        navigate('/');
      });
    } else {
      // toast.error('Authentication tokens not found. Please log in again.');
      alert(accessToken);
      alert(refreshToken);
      navigate('/');
    }
  }, [navigate, dispatch, accessToken, refreshToken]);

  return (
    <div className="relative flex flex-col min-h-screen w-screen items-center justify-center text-center">
      <div className="relative mb-6 h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-1">Authentication Successful!</h2>
        <p className="text-zinc-400">Your tokens have been securely stored. Redirecting...</p>
      </div>
    </div>
  );
}

