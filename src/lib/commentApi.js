import api from './api';

/**
 * Comment API Service
 * 
 * All comment-related API calls including:
 * - Get comments for a post
 * - Add comment to post
 * - Delete comment
 */

/**
 * Get all comments for a specific post
 * GET /api/comments/:postId
 * 
 * @param {string} postId - Post ID
 * @returns {Promise} Response with comments array
 */
export const getComments = async (postId) => {
  return await api.get(`/comments/${postId}`);
};

/**
 * Add comment to a post
 * POST /api/comments/:postId
 * 
 * Requires: JWT token
 * @param {string} postId - Post ID
 * @param {string} content - Comment content
 * @returns {Promise} Response with created comment
 */
export const addComment = async (postId, content) => {
  return await api.post(`/comments/${postId}`, { content });
};

/**
 * Delete a comment
 * DELETE /api/comments/:commentId
 * 
 * Requires: User must be comment owner, moderator, or admin
 * @param {string} commentId - Comment ID
 * @returns {Promise} Response confirming deletion
 */
export const deleteComment = async (commentId) => {
  return await api.delete(`/comments/${commentId}`);
};
