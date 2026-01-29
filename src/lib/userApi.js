import api from './api';

/**
 * User Management API Service
 * 
 * Admin-only API calls for user management:
 * - Get all users
 * - Get user by ID
 * - Update user role
 * - Delete user
 */

/**
 * Get all users (Admin only)
 * GET /api/users
 * 
 * Requires: JWT token with admin role
 * @returns {Promise} Response with users array
 */
export const getAllUsers = async () => {
  return await api.get('/users');
};

/**
 * Get user by ID (Admin only)
 * GET /api/users/:id
 * 
 * Requires: JWT token with admin role
 * @param {string} userId - User ID
 * @returns {Promise} Response with user data
 */
export const getUserById = async (userId) => {
  return await api.get(`/users/${userId}`);
};

/**
 * Update user role (Admin only)
 * PATCH /api/users/:id/role
 * 
 * Requires: JWT token with admin role
 * @param {string} userId - User ID
 * @param {string} role - New role ('user', 'moderator', or 'admin')
 * @returns {Promise} Response with updated user
 */
export const updateUserRole = async (userId, role) => {
  return await api.patch(`/users/${userId}/role`, { role });
};

/**
 * Delete user (Admin only, soft delete)
 * DELETE /api/users/:id
 * 
 * Requires: JWT token with admin role
 * @param {string} userId - User ID
 * @returns {Promise} Response confirming deletion
 */
export const deleteUser = async (userId) => {
  return await api.delete(`/users/${userId}`);
};

/**
 * Get public user profile
 * This is a helper function for public user info
 * 
 * @param {string} userId - User ID
 * @returns {Promise} Response with public user data
 */
export const getPublicUserProfile = async (userId) => {
  return await api.get(`/users/${userId}`);
};
