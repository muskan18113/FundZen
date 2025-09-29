import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">Sorry, this page does not exist.</p>
      <Link to={isAuthenticated ? "/app/dashboard" : "/"} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        {isAuthenticated ? "Go to Dashboard" : "Go Home"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
