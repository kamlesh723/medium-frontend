import api from './api';

/**
 * Authentication API Service
 * 
 * All authentication-related API calls including:
 * - User registration
 * - User login
 * - Get current user
 * - Update profile
 * - Change password
 */

/**
 * Register a new user
 * POST /api/auth/register
 * 
 * @param {Object} userData - User registration data
 * @param {string} userData.name - Full name
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password (min 6 characters)
 * @returns {Promise} Response with token and user data
 */
export const registerUser = async (userData) => {
  return await api.post('/auth/register', userData);
};

/**
 * Login user
 * POST /api/auth/login
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response with token and user data
 */
export const loginUser = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

/**
 * Get current logged-in user
 * GET /api/auth/me
 * 
 * Requires: JWT token in Authorization header
 * @returns {Promise} Response with user data
 */
export const getCurrentUser = async () => {
  return await api.get('/auth/me');
};

/**
 * Update user profile
 * PUT /api/auth/update-profile
 * 
 * @param {Object} profileData - Profile data to update
 * @param {string} profileData.name - User's name
 * @param {string} profileData.bio - User's bio
 * @param {string} profileData.avatar - Avatar URL
 * @returns {Promise} Response with updated user data
 */
export const updateProfile = async (profileData) => {
  return await api.put('/auth/update-profile', profileData);
};

/**
 * Change user password
 * PUT /api/auth/update-password
 * 
 * @param {Object} passwordData - Password change data
 * @param {string} passwordData.currentPassword - Current password
 * @param {string} passwordData.newPassword - New password
 * @returns {Promise} Response confirming password change
 */
export const changePassword = async (passwordData) => {
  return await api.put('/auth/update-password', passwordData);
};
