import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
      // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authToken'); 

        // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
 // If the user is authenticated, render the children components
    return children;
};

export default AuthGuard;
