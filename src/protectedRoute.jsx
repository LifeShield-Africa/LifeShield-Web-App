import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useAuth } from './useAuth';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
