import api from './api';

/**
 * Follow API Service
 * 
 * All follow-related API calls including:
 * - Follow/unfollow users
 * - Get followers list
 * - Get following list
 * - Check follow status
 */

/**
 * Follow a user
 * POST /api/follow/:userId
 * 
 * Requires: JWT token
 * @param {string} userId - User ID to follow
 * @returns {Promise} Response confirming follow
 */
export const followUser = async (userId) => {
  return await api.post(`/follow/${userId}`);
};

/**
 * Unfollow a user
 * DELETE /api/follow/:userId
 * 
 * Requires: JWT token
 * @param {string} userId - User ID to unfollow
 * @returns {Promise} Response confirming unfollow
 */
export const unfollowUser = async (userId) => {
  return await api.delete(`/follow/${userId}`);
};

/**
 * Get list of user's followers
 * GET /api/follow/:userId/followers
 * 
 * @param {string} userId - User ID
 * @returns {Promise} Response with followers array
 */
export const getFollowers = async (userId) => {
  return await api.get(`/follow/${userId}/followers`);
};

/**
 * Get list of users being followed by a user
 * GET /api/follow/:userId/following
 * 
 * @param {string} userId - User ID
 * @returns {Promise} Response with following array
 */
export const getFollowing = async (userId) => {
  return await api.get(`/follow/${userId}/following`);
};

/**
 * Check if current user is following another user
 * GET /api/follow/check/:userId
 * 
 * Requires: JWT token
 * @param {string} userId - User ID to check
 * @returns {Promise} Response with boolean isFollowing
 */
export const checkFollowStatus = async (userId) => {
  return await api.get(`/follow/check/${userId}`);
};
