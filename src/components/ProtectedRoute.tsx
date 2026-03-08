import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();  // Use the useNavigate hook
  const { user } = useAuth();

  // 1. If not logged in, go Home
  if (!user) {
    navigate("/");  // Use navigate instead of Navigate component
    return null;
  }

  // 2. If logged in but wrong role (e.g. User trying to access Admin), go Home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    navigate("/home");  // Use navigate instead of Navigate component
    return null;
  }

  // 3. Allowed!
  return <>{children}</>;
}