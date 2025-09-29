import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService.js';
import Spinner from '../components/common/spinner.jsx';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    const token = localStorage.getItem('fintrack_token');
    if (token) {
      try {
        const response = await apiService.get('/auth/me');
        // Correctly access response.data
        if (response.data.success) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('fintrack_token');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const login = async (email, password) => {
    const response = await apiService.post('/auth/login', { email, password });
    // Correctly access response.data
    if (response.data.success) {
      localStorage.setItem('fintrack_token', response.data.data.token);
      setUser(response.data.data.user);
      setIsAuthenticated(true);
    }
    return response.data; // Return the actual data object
  };
  
  const register = async (userData) => {
    const response = await apiService.post('/auth/register', userData);
    // Correctly access response.data
    if (response.data.success) {
      localStorage.setItem('fintrack_token', response.data.data.token);
      setUser(response.data.data.user);
      setIsAuthenticated(true);
    }
    return response.data; // Return the actual data object
  };

  const logout = () => {
    localStorage.removeItem('fintrack_token');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const updateUser = (newUserData) => setUser(prev => ({...prev, ...newUserData}));

  const value = { user, isAuthenticated, loading, login, register, logout, updateUser };

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};