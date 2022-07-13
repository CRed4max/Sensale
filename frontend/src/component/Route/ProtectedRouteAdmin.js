import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // useEffect(() => {

  // }, [dispatch])

  // if (!isAuthenticated) {
  //   console.log('login nahi hai' + user);
  //   return <Navigate to='/' />;
  // }

  // if (user.role.toString() !== 'admin') {
  //   return <Navigate to='/' />;
  // }
  return children;
};

export default ProtectedRouteAdmin;
