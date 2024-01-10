import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLoggedIn } from '@utils/apiHandlers';

const ProtectedRoutes = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  } else if (isLoggedIn()) return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
