import { useAuth } from '../contexts/AuthContext';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { PostCard } from '../components/PostCard';
import { mockPosts } from '../lib/mockData';
import { Link } from 'react-router';

export function MyProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  // Filter posts by current user
  const myPosts = mockPosts.filter(
    (post) => post.author.id === user.id || post.author.name === user.name
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-reading py-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar name={user.name} src={user.avatar} size="xl" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-950 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              {user.bio && <p className="text-gray-800 mb-4">{user.bio}</p>}
              <Link to="/me/settings">
                <Button variant="secondary">Edit Profile</Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-950">{myPosts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-950">1.2k</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-950">89</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <div className="container-reading py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-950">My Posts</h2>
          <Link to="/me/posts" className="text-primary hover:underline text-sm">
            View all →
          </Link>
        </div>

        {myPosts.length > 0 ? (
          <div className="space-y-8">
            {myPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't published any posts yet</p>
            <Link to="/write">
              <Button variant="primary">Write your first post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}