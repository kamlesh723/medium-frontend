import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/authApi';

/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app
 * - user: Current logged-in user object or null
 * - setUser: Function to update user state
 * - logout: Function to logout user
 * - isAuthenticated: Boolean indicating if user is logged in
 * - loading: Boolean indicating if auth state is being loaded
 */

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        // Parse stored user data
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Optionally: Verify token with backend
        verifyToken();
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  /**
   * Verify JWT token with backend
   * Fetches current user data to ensure token is still valid
   */
  const verifyToken = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Token verification failed:', error);
      // Token invalid or expired
      logout();
    }
  };

  /**
   * Logout user
   * Clears auth token and user data from localStorage and state
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * Must be used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
