import React from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  //   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
