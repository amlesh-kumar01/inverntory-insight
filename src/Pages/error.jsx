import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mt-4">Oops! The page you're looking for can't be found.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
