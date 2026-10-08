import { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../config/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const loginInitiate = async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  };

  const loginVerify = async (username, otp) => {
    await apiClient.post('/auth/verify-otp', { username, otp });
    const userResponse = await apiClient.get('/auth/me');
    setUser(userResponse.data);
  };

  const logout = async () => {
    await apiClient.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      loginInitiate, 
      loginVerify, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
