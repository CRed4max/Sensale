import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ user, isAuthenticated, children }) => {
  //   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (user.role.toString() !== 'admin') {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRouteAdmin;
