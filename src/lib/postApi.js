import api from './api';

/**
 * Post API Service
 * 
 * All post-related API calls including:
 * - Get all posts (with pagination, search, filtering)
 * - Get single post
 * - Create post
 * - Update post
 * - Delete post
 * - Get user's posts and drafts
 * - Publish draft
 */

/**
 * Get all published posts (with pagination and filtering)
 * GET /api/posts
 * 
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.sort - Sort field (e.g., '-createdAt')
 * @param {string} params.tags - Comma-separated tag names
 * @param {string} params.q - Search query
 * @returns {Promise} Response with posts array and pagination info
 */
export const getPosts = async (params = {}) => {
  return await api.get('/posts', { params });
};

/**
 * Get single post by ID
 * GET /api/posts/:id
 * 
 * @param {string} postId - Post ID
 * @returns {Promise} Response with post data
 */
export const getPost = async (postId) => {
  return await api.get(`/posts/${postId}`);
};

/**
 * Search posts
 * GET /api/posts/search?q=query
 * 
 * @param {string} query - Search query
 * @returns {Promise} Response with matching posts
 */
export const searchPosts = async (query) => {
  return await api.get('/posts/search', {
    params: { q: query }
  });
};

/**
 * Get logged-in user's published posts
 * GET /api/posts/my-posts
 * 
 * Requires: JWT token
 * @returns {Promise} Response with user's posts
 */
export const getMyPosts = async () => {
  return await api.get('/posts/my-posts');
};

/**
 * Get logged-in user's draft posts
 * GET /api/posts/my-drafts
 * 
 * Requires: JWT token
 * @returns {Promise} Response with user's drafts
 */
export const getMyDrafts = async () => {
  return await api.get('/posts/my-drafts');
};

/**
 * Create new post
 * POST /api/posts
 * 
 * @param {Object} postData - Post data
 * @param {string} postData.title - Post title
 * @param {string} postData.content - Post content (HTML or Markdown)
 * @param {string} postData.excerpt - Short description (optional)
 * @param {string[]} postData.tags - Array of tag names
 * @param {string} postData.status - 'draft' or 'published'
 * @param {string} postData.coverImage - Cover image URL (optional)
 * @returns {Promise} Response with created post
 */
export const createPost = async (postData) => {
  return await api.post('/posts', postData);
};

/**
 * Update existing post
 * PUT /api/posts/:id
 * 
 * Requires: User must be post owner
 * @param {string} postId - Post ID
 * @param {Object} postData - Updated post data
 * @returns {Promise} Response with updated post
 */
export const updatePost = async (postId, postData) => {
  return await api.put(`/posts/${postId}`, postData);
};

/**
 * Delete post (soft delete)
 * DELETE /api/posts/:id
 * 
 * Requires: User must be post owner or admin
 * @param {string} postId - Post ID
 * @returns {Promise} Response confirming deletion
 */
export const deletePost = async (postId) => {
  return await api.delete(`/posts/${postId}`);
};

/**
 * Publish a draft post
 * PATCH /api/posts/:id/publish
 * 
 * @param {string} postId - Post ID
 * @returns {Promise} Response with published post
 */
export const publishPost = async (postId) => {
  return await api.patch(`/posts/${postId}/publish`);
};
