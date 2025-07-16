import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
  });

  const logout = useCallback(() => {
    setAuth({ token: null });
    localStorage.removeItem('token');
  }, []);

  const login = useCallback(
    (token) => {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          logout(); // Expired token, log out
        } else {
          localStorage.setItem('token', token);
          setAuth({ token });

          setTimeout(logout, (decodedToken.exp - currentTime) * 1000);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    },
    [logout]
  ); // ✅ Include `logout` in dependencies

  useEffect(() => {
    if (auth.token) {
      try {
        const decodedToken = jwtDecode(auth.token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          setTimeout(logout, (decodedToken.exp - currentTime) * 1000);
        }
      } catch (error) {
        console.error('Invalid token on load:', error);
        logout();
      }
    }
  }, [auth.token, logout]); // ✅ Add `logout` as a dependency

  const contextValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout]); // ✅ Fixed useMemo

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
