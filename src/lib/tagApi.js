import api from './api';

/**
 * Tag API Service
 * 
 * All tag-related API calls including:
 * - Get all tags
 * - Get trending tags
 * - Get posts by tag
 */

/**
 * Get all tags
 * GET /api/tags
 * 
 * @returns {Promise} Response with tags array
 */
export const getAllTags = async () => {
  return await api.get('/tags');
};

/**
 * Get trending tags (sorted by usage count)
 * GET /api/tags/trending
 * 
 * @param {number} limit - Number of tags to return (default: 10)
 * @returns {Promise} Response with trending tags
 */
export const getTrendingTags = async (limit = 10) => {
  return await api.get('/tags/trending', {
    params: { limit }
  });
};

/**
 * Get posts by tag name
 * GET /api/tags/:tagName
 * 
 * @param {string} tagName - Tag name
 * @returns {Promise} Response with posts array
 */
export const getPostsByTag = async (tagName) => {
  return await api.get(`/tags/${tagName}`);
};
