import { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { Spinner } from '../components/Spinner';
import { getPosts } from '../lib/postApi';
import { toast } from 'sonner';

/**
 * Post Feed Page Component
 * 
 * Displays paginated list of published posts from backend
 * - Fetches posts on mount
 * - Tab switching between "For You" and "Following"
 * - Loading and error states
 * - Pagination support (can add infinite scroll later)
 */
export function PostFeedPage() {
  const [activeTab, setActiveTab] = useState('foryou');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetch posts from backend
   * Called on component mount and when page/tab changes
   */
  useEffect(() => {
    fetchPosts();
  }, [page, activeTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // API call to get posts with pagination
      const response = await getPosts({
        page: page,
        limit: 10,
        sort: '-createdAt' // Sort by newest first
      });
      
      // Extract posts from response
      const { posts: fetchedPosts, pagination } = response.data;
      
      // Update posts state
      setPosts(fetchedPosts || []);
      
      // Check if there are more pages
      setHasMore(pagination?.hasNextPage || false);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle load more posts
   * Increments page number to fetch next page
   */
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Loading state
  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-reading py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-reading py-8">
        {/* Tab Navigation */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('foryou')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'foryou'
                ? 'border-b-2 border-gray-950 text-gray-950'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            For you
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'following'
                ? 'border-b-2 border-gray-950 text-gray-950'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Following
          </button>
        </div>

        {/* Post Feed */}
        {posts.length > 0 ? (
          <>
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 text-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-primary hover:underline disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load more posts'}
                </button>
              ) : (
                <p className="text-gray-600">You've reached the end of the feed</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No posts yet</p>
            <p className="text-sm text-gray-500">Be the first to write!</p>
          </div>
        )}
      </div>
    </div>
  );
}
