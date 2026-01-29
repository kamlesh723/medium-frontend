import api from './api';

/**
 * Clap API Service
 * 
 * All clap-related API calls including:
 * - Clap a post
 * - Get clap count for post
 * - Check if user has clapped
 */

/**
 * Clap a post (Medium-style appreciation)
 * POST /api/claps/:postId
 * 
 * Note: Each user can only clap once per post
 * Requires: JWT token
 * 
 * @param {string} postId - Post ID
 * @returns {Promise} Response with updated clap count
 */
export const clapPost = async (postId) => {
  return await api.post(`/claps/${postId}`);
};

/**
 * Get total clap count for a post
 * GET /api/claps/:postId
 * 
 * @param {string} postId - Post ID
 * @returns {Promise} Response with clap count
 */
export const getClapCount = async (postId) => {
  return await api.get(`/claps/${postId}`);
};

/**
 * Check if current user has clapped a post
 * GET /api/claps/:postId/user
 * 
 * Requires: JWT token
 * @param {string} postId - Post ID
 * @returns {Promise} Response with boolean hasClapped
 */
export const hasUserClapped = async (postId) => {
  return await api.get(`/claps/${postId}/user`);
};
